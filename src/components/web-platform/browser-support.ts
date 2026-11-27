// Baseline data from web-features 3.48.0, checked 27 November 2026.
// A feature is safe for a target when it became Newly available on or before the target's cut-off.

export const CHECKED = '2026-11-27';
export const AXIS = { from: 2021, to: 2028 };

export type TargetId = '2022' | 'widely' | 'newly';

export interface Feature {
  name: string;
  /** The name inside a sentence. */
  short: string;
  code: string;
  low?: string;
  high?: string;
  note?: string;
}

export const FEATURES: Feature[] = [
  { name: 'Logical properties', short: 'logical properties', code: 'margin-inline', low: '2021-09-20', high: '2024-03-20' },
  { name: 'Cascade layers', short: 'cascade layers', code: '@layer', low: '2022-03-14', high: '2024-09-14' },
  { name: 'Container queries', short: 'container queries', code: '@container', low: '2023-02-14', high: '2025-08-14' },
  { name: 'Parent selector', short: ':has()', code: ':has()', low: '2023-12-19', high: '2026-06-19' },
  { name: 'Popover', short: 'popover', code: 'popover', low: '2025-01-27', high: '2027-07-27' },
  { name: 'Anchor positioning', short: 'anchor positioning', code: 'anchor-name', note: 'Limited: parts missing in Firefox' },
];

export const TARGETS: {
  id: TargetId;
  name: string;
  sub: string;
  query: string;
  cutoff: string;
  cutLabel: string;
}[] = [
  {
    id: '2022',
    name: 'Baseline 2022',
    sub: 'older devices, back to Safari 16',
    query: 'baseline 2022',
    cutoff: '2022-12-31',
    cutLabel: 'end of 2022',
  },
  {
    id: 'widely',
    name: 'Widely available',
    sub: 'in all core browsers for 30 months',
    query: 'baseline widely available',
    cutoff: '2024-05-27',
    cutLabel: '30 months before',
  },
  {
    id: 'newly',
    name: 'Newly available',
    sub: 'the newest browsers only',
    query: 'baseline newly available',
    cutoff: CHECKED,
    cutLabel: '27 Nov 2026',
  },
];

const day = (iso: string) => Date.parse(`${iso}T00:00:00Z`);
const start = day(`${AXIS.from}-01-01`);
const end = day(`${AXIS.to}-01-01`);

/** Position of a date on the axis, in percent. */
export const at = (iso?: string) => (iso ? ((day(iso) - start) / (end - start)) * 100 : 0);

/** Dates after the check are expected, not yet reached. */
export const future = (iso?: string) => !!iso && iso > CHECKED;

export const safeFor = (f: Feature) =>
  TARGETS.filter((t) => f.low && day(f.low) <= day(t.cutoff)).map((t) => t.id);

const list = (items: string[]) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

export const resultFor = (id: TargetId) => {
  const missing = FEATURES.filter((f) => !safeFor(f).includes(id)).map((f) => f.short);
  return `${FEATURES.length - missing.length} of ${FEATURES.length} work in every browser of this target. Plan for browsers without ${list(missing)}: the core task must still work.`;
};

export const fmt = (iso?: string) =>
  iso ? new Date(day(iso)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : '';
