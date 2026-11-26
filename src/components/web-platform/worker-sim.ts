// Teaching model, simplified: the main thread runs one task at a time, oldest first
// (HTML event loop). The worker runs on its own thread. Times are illustrative,
// not measured: reading all returned rows stands for "a big result costs main-thread time".
import type { Tone } from '../../scripts/sim';

export type Mode = 'block' | 'pieces' | 'worker';
export type Back = 'all' | 'screen';
type Kind = 'parse' | 'piece' | 'key' | 'render' | 'send' | 'copy';

export const SPAN = 2400;
const DROP = 100; // the file is dropped and the work starts
export const PARSE = 1500; // parsing time, the same on either thread
const PIECE = 40;
const KEY = 10; // one key handler
export const RENDER = 40; // build the table of visible rows: a short task
const SEND = 5; // post the file's bytes to the worker (transferred, no copy)
const COPY: Record<Back, number> = { all: 450, screen: 5 }; // read the returned rows on the main thread
const KEYS = [300, 600, 900, 1200, 1500, 1800];
export const WORD = 'berlin';

interface Block { kind: Kind; start: number; end: number }
interface Key { at: number; start: number; end: number; wait: number }
interface Job { kind: Kind; ready: number; dur: number; order: number; left?: number; key?: number }

export const simulate = (mode: Mode, back: Back) => {
  const queue: Job[] = [];
  let order = 0;
  const push = (j: Omit<Job, 'order'>) => queue.push({ ...j, order: order++ });
  if (mode === 'block') push({ kind: 'parse', ready: DROP, dur: PARSE });
  if (mode === 'pieces') push({ kind: 'piece', ready: DROP, dur: PIECE, left: PARSE - PIECE });
  if (mode === 'worker') push({ kind: 'send', ready: DROP, dur: SEND });
  KEYS.forEach((k, i) => push({ kind: 'key', ready: k, dur: KEY, key: i }));

  const blocks: Block[] = [];
  const keys: Key[] = [];
  let worker: { start: number; end: number } | null = null;
  let parseEnd = 0;
  let copy: Block | null = null;
  let table = 0;
  let t = 0;
  while (queue.length) {
    const ready = queue.filter((j) => j.ready <= t);
    if (!ready.length) {
      t = Math.min(...queue.map((j) => j.ready));
      continue;
    }
    ready.sort((a, b) => a.ready - b.ready || a.order - b.order);
    const job = ready[0];
    queue.splice(queue.indexOf(job), 1);
    const b = { kind: job.kind, start: t, end: t + job.dur };
    blocks.push(b);
    t = b.end;
    if (job.kind === 'key') keys[job.key!] = { at: job.ready, start: b.start, end: b.end, wait: b.start - job.ready };
    if (job.kind === 'parse') {
      parseEnd = t;
      push({ kind: 'render', ready: t, dur: RENDER });
    }
    if (job.kind === 'piece') {
      if (job.left! > 0) {
        const d = Math.min(PIECE, job.left!);
        push({ kind: 'piece', ready: t, dur: d, left: job.left! - d });
      } else {
        parseEnd = t;
        push({ kind: 'render', ready: t, dur: RENDER });
      }
    }
    if (job.kind === 'send') {
      worker = { start: t, end: t + PARSE };
      parseEnd = worker.end;
      push({ kind: 'copy', ready: worker.end, dur: COPY[back] });
    }
    if (job.kind === 'copy') {
      copy = b;
      push({ kind: 'render', ready: t, dur: RENDER });
    }
    if (job.kind === 'render') table = t;
  }
  const maxWait = Math.max(...keys.map((k) => k.wait));
  return { mode, back, blocks, keys, worker, parseEnd, copy, table, maxWait };
};

export type Sim = ReturnType<typeof simulate>;

export const ms = (n: number) => `${Math.round(n)} ms`;
const letter = (i: number) => `“${WORD[i]}”`;

export const stepsFor = (s: Sim) => {
  const ev: { t: number; text: string }[] = [];
  const during = s.keys.filter((k) => k.at < s.parseEnd);
  const after = s.keys.filter((k) => k.at >= s.parseEnd);
  const [k0, k1] = during;

  if (s.mode === 'block') {
    ev.push({ t: DROP, text: `You drop orders.csv at ${ms(DROP)}. The page parses it on the main thread, in one task of ${ms(PARSE)}.` });
    ev.push({ t: k0.at, text: `You type ${letter(0)} at ${ms(k0.at)}. The main thread is busy, so the key press waits in the task queue.` });
    if (k1) ev.push({ t: k1.at, text: `You type ${during.length - 1} more letters. Each key press waits behind the parse.` });
    ev.push({ t: s.parseEnd, text: `The parse ends at ${ms(s.parseEnd)}. Now the ${during.length} waiting key handlers run, one after another.` });
  } else if (s.mode === 'pieces') {
    ev.push({ t: DROP, text: `You drop orders.csv at ${ms(DROP)}. The page parses it on the main thread, in pieces of ${ms(PIECE)}. Between two pieces, the event loop can run other tasks.` });
    ev.push({ t: k0.at, text: k0.wait > 0
      ? `You type ${letter(0)} at ${ms(k0.at)}. The key press waits only for the current piece: ${ms(k0.wait)}.`
      : `You type ${letter(0)} at ${ms(k0.at)}, just as a piece ends. The key handler starts at once.` });
    if (k1) ev.push({ t: k1.at, text: `Each key handler runs between two pieces. The longest wait is ${ms(Math.max(...during.map((k) => k.wait)))}.` });
    ev.push({ t: s.parseEnd, text: `The last piece ends at ${ms(s.parseEnd)}, ${ms(s.parseEnd - DROP - PARSE)} later than one block would. The key presses ran in between.` });
  } else {
    ev.push({ t: DROP, text: `You drop orders.csv at ${ms(DROP)}. The page sends the file’s bytes to the worker. It transfers them, so nothing is copied.` });
    ev.push({ t: s.worker!.start, text: `The worker parses the file on its own thread, for ${ms(PARSE)}. The main thread stays free.` });
    ev.push({ t: k0.at, text: `You type ${letter(0)} at ${ms(k0.at)}. The main thread is free, so the key handler starts at once.` });
    if (k1) ev.push({ t: k1.at, text: 'Every key handler during the parse starts at once.' });
    ev.push({ t: s.worker!.end, text: s.back === 'all'
      ? `At ${ms(s.worker!.end)} the worker sends back all 500,000 rows. Row objects are copied by default: the worker writes them into the message, and the main thread builds them again. Reading them is one long task on the main thread: ${ms(COPY.all)} here.`
      : `At ${ms(s.worker!.end)} the worker sends back only the 50 rows the table shows. It keeps the rest. Reading 50 rows on the main thread takes ${ms(COPY.screen)}.` });
  }
  for (const k of after) {
    const i = s.keys.indexOf(k);
    ev.push({ t: k.at, text: k.wait > 0
      ? `You type ${letter(i)} at ${ms(k.at)}. The main thread is busy ${s.copy && k.at < s.copy.end ? 'reading the returned rows' : 'with other work'}, so the key handler waits ${ms(k.wait)}.`
      : `You type ${letter(i)} at ${ms(k.at)}. The main thread is free, so the key handler starts at once.` });
  }
  ev.push({ t: s.table - RENDER, text: `The page builds the table on the main thread. At ${ms(s.table)}, the first 50 rows are on screen.` });
  ev.sort((a, b) => a.t - b.t); // stable: same-time steps keep the order above
  return ev;
};

export const verdictFor = (s: Sim): [string, string, string, Tone] => {
  const w = s.maxWait;
  const tone: Tone = w <= 50 ? 'good' : w <= 500 ? 'warn' : 'bad';
  const unit = 'the longest wait before a key handler started';
  if (s.mode === 'block') {
    return [ms(w), unit, `The parse ran as one long task. Every key handler during it waited until it ended, and the search box could not change. The table showed at ${ms(s.table)}.`, tone];
  }
  if (s.mode === 'pieces') {
    return [ms(w), unit, `Each key handler waited at most for one ${ms(PIECE)} piece. The cost: you must split the parser into pieces yourself, and the main thread is still busy the whole time. The table showed at ${ms(s.table)}.`, tone];
  }
  if (s.back === 'all') {
    return [ms(w), unit, `Typing stayed fast while the worker parsed. But the 500,000 rows came back as a copy, and reading them was a long task on the main thread. A key handler during it had to wait. The table showed at ${ms(s.table)}.`, tone];
  }
  return [ms(w), unit, `The main thread stayed free, so every key handler started at once. The worker sent back only what the screen needs. The table showed at ${ms(s.table)}.`, tone];
};
