// Real engines decide when to collect; here a collection runs after each close.
import type { Tone } from '../../scripts/sim';

export type Mode = 'none' | 'clear' | 'cache';
export type Root = 'doc' | 'timers' | 'cache';
type State = 'new' | 'open' | 'held' | 'garbage' | 'freed';
type Kind = 'open' | 'close' | 'gc';

export const VIEWS = 4;
// Ticket 1 plays slowly enough to follow. Tickets 2 and 3 repeat the same
// pattern, so they play fast; the whole run stays close to the other scenes.
const SLOW = 900; // ms of animation per event
const FAST = 300;
const EVENTS: { kind: Kind; view: number; ms: number }[] = [
  { kind: 'open', view: 0, ms: SLOW },
  { kind: 'close', view: 0, ms: SLOW },
  { kind: 'gc', view: 0, ms: SLOW },
  { kind: 'open', view: 1, ms: FAST },
  { kind: 'close', view: 1, ms: FAST },
  { kind: 'gc', view: 1, ms: FAST },
  { kind: 'open', view: 2, ms: FAST },
  { kind: 'close', view: 2, ms: FAST },
  { kind: 'gc', view: 2, ms: FAST },
  { kind: 'open', view: 3, ms: SLOW },
];
const START = EVENTS.map((_, i) => EVENTS.slice(0, i).reduce((sum, ev) => sum + ev.ms, 0));
export const SPAN = START[START.length - 1] + EVENTS[EVENTS.length - 1].ms;

export interface Snapshot {
  kind: Kind | 'start';
  views: State[];
  refs: Record<Root, number[]>;
}

const reachable = (refs: Snapshot['refs']) => new Set(Object.values(refs).flat());

export const simulate = (mode: Mode): Snapshot[] => {
  const views: State[] = Array(VIEWS).fill('new');
  const refs: Record<Root, number[]> = { doc: [], timers: [], cache: [] };
  const out: Snapshot[] = [{ kind: 'start', views: [...views], refs: { doc: [], timers: [], cache: [] } }];
  EVENTS.forEach((ev) => {
    const v = ev.view;
    if (ev.kind === 'open') {
      views[v] = 'open';
      refs.doc.push(v);
      refs.timers.push(v);
      if (mode === 'cache') refs.cache.push(v);
    }
    if (ev.kind === 'close') {
      refs.doc = refs.doc.filter((x) => x !== v);
      if (mode !== 'none') refs.timers = refs.timers.filter((x) => x !== v);
    }
    const live = reachable(refs);
    views.forEach((s, i) => {
      if (s === 'freed' || s === 'new' || refs.doc.includes(i)) return;
      views[i] = live.has(i) ? 'held' : ev.kind === 'gc' ? 'freed' : 'garbage';
    });
    out.push({ kind: ev.kind, views: [...views], refs: { doc: [...refs.doc], timers: [...refs.timers], cache: [...refs.cache] } });
  });
  return out;
};

export type Sim = Snapshot[];

export const snapshotAt = (sim: Sim, t: number) => {
  let i = 0;
  while (i + 1 < START.length && START[i + 1] <= t) i++;
  return sim[i + 1];
};

export const ROOT_NAMES: Record<Root, string> = {
  doc: 'document',
  timers: 'Active timers',
  cache: 'viewCache',
};

export const ROOT_SUBS: Record<Root, string> = {
  doc: 'the page',
  timers: 'kept by window',
  cache: 'Map held by the page',
};

const who = (snap: Snapshot, i: number) => {
  const by = [];
  if (snap.refs.timers.includes(i)) by.push(`timer ${i + 1}`);
  if (snap.refs.cache.includes(i)) by.push('viewCache');
  return by.join(' and ');
};

export const stateText = (snap: Snapshot, i: number) => {
  switch (snap.views[i]) {
    case 'new':
      return 'not opened yet';
    case 'open':
      return 'on the page';
    case 'held':
      return `detached, held by ${who(snap, i)}`;
    case 'garbage':
      return 'unreachable, waiting for the collector';
    case 'freed':
      return 'freed';
  }
};

export const counts = (snap: Snapshot) => {
  const inMemory = snap.views.filter((s) => s === 'open' || s === 'held' || s === 'garbage').length;
  const detached = snap.views.filter((s) => s === 'held' || s === 'garbage').length;
  return { inMemory, detached };
};

const close: Record<Mode, string> = {
  none: 'You close ticket 1. The page removes its view from the document. Nobody stops the timer, so it keeps running every second.',
  clear: 'You close ticket 1. The page removes its view from the document. It also calls clearInterval(), so the timer stops and lets go of the view.',
  cache: 'You close ticket 1. The page removes its view from the document and stops the timer. viewCache still holds the view.',
};

const gc: Record<Mode, string> = {
  none: 'The garbage collector runs. It starts at the roots and follows every reference. Timer 1 still reaches view 1, so view 1 stays in memory. It is now a detached element: off the page, but still reachable.',
  clear: 'The garbage collector runs. It starts at the roots and follows every reference. Nothing reaches view 1 any more, so the collector frees it.',
  cache: 'The garbage collector runs. It starts at the roots and follows every reference. viewCache still reaches view 1, so view 1 stays in memory, detached.',
};

const last: Record<Mode, string> = {
  none: 'You open ticket 4. Memory now holds 4 views: 1 on the page and 3 detached. Four timers still run every second, three of them for views nobody can see.',
  clear: 'You open ticket 4. Memory holds 1 view: the one on the page. One timer runs.',
  cache: 'You open ticket 4. The cache holds all four views. Three are detached and one is still on the page. The cache grows with every new ticket.',
};

export const stepsFor = (mode: Mode) => [
  {
    t: START[0],
    text:
      'You open ticket 1. The page adds its view to the document and starts a timer that updates “updated 2 min ago” every second. The timer’s function uses the view, so it keeps a reference to it.' +
      (mode === 'cache' ? ' The code also stores the view in viewCache, so the ticket opens fast next time.' : ''),
  },
  { t: START[1], text: close[mode] },
  { t: START[2], text: gc[mode] },
  { t: START[3], text: 'You open and close tickets 2 and 3. The same thing happens each time.' },
  { t: START[9], text: last[mode] },
];

export const verdictFor = (mode: Mode): [string, string, string, Tone] => {
  const unit = 'ticket views in memory, with one on screen';
  if (mode === 'none') {
    return ['4', unit, 'Each closed view stayed, because its timer still pointed to it. Over a day of tickets, memory and timer work keep growing until the tab is slow. Stop the timer when the view closes.', 'bad'];
  }
  if (mode === 'clear') {
    return ['1', unit, 'Each close stopped its timer. Nothing pointed to the old views, so the collector freed them. Memory stays flat, however many tickets you open.', 'good'];
  }
  return ['4', unit, 'The timers stopped, but the cache kept every view. A cache with no limit only grows, so it leaks like the timers did. Give it a limit, such as the last 10 tickets.', 'warn'];
};
