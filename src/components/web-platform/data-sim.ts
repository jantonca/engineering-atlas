// Data and text for the runtime validation scene: an order page reads an API response.
// The error messages are the real Zod 4.6.7 messages, checked 26 November 2026.
import type { Tone } from '../../scripts/sim';

export type Data = 'ok' | 'string' | 'status';
export type Code = 'trust' | 'schema';
type Field = 'status' | 'total' | 'shipping';

export const FIELDS: Field[] = ['status', 'total', 'shipping'];
export const STEP = 1100; // ms per stage: build, response, edge, screen
export const SPAN = 4 * STEP;

/** What the API sends, and which field it changed. */
export const RESPONSE: Record<Data, { json: Record<Field, string>; changed?: Field }> = {
  ok: { json: { status: '"shipped"', total: '42.95', shipping: '5' } },
  string: { json: { status: '"shipped"', total: '"42.95"', shipping: '5' }, changed: 'total' },
  status: { json: { status: '"returned"', total: '42.95', shipping: '5' }, changed: 'status' },
};

const PASS: Record<Field, string> = { status: 'one of the three', total: 'a number', shipping: 'a number' };
const FAIL: Partial<Record<Field, string>> = {
  total: 'expected number, received string',
  status: 'expected one of "paid" | "shipped" | "delivered"',
};

/** What the edge says about one field: true passed, false failed, null not checked. */
export const check = (d: Data, c: Code, f: Field): [boolean | null, string] =>
  c === 'trust' ? [null, 'not checked'] : RESPONSE[d].changed === f ? [false, FAIL[f]!] : [true, PASS[f]];

/** What the order page shows, or null when it shows an error. */
export const screen = (d: Data, c: Code) =>
  c === 'schema' && d !== 'ok' ? null : { status: d === 'status' ? 'undefined' : 'On its way', price: d === 'string' ? '€42.955' : '€47.95' };

const ARRIVES: Record<Data, string> = {
  ok: 'The page runs. The API sends the order: status "shipped", total 42.95, shipping 5. This matches the type.',
  string: 'The page runs. The API team has changed total to a string, "42.95", to keep exact cents. Nobody changed the type.',
  status: 'The page runs. The API team has added a new status, "returned". The type still lists three statuses.',
};

const UNCHECKED = 'The response goes straight to the code. “as Order” was removed by the build. TypeScript gives await res.json() the type any, so nothing compares the data with the type.';
const CHECKED: Record<Data, string> = {
  ok: 'Order.parse() checks each field. All three match, so it returns the data, now typed as Order.',
  string: 'Order.parse() checks each field. total fails: “Invalid input: expected number, received string”. parse() throws a ZodError with the path ["total"].',
  status: 'Order.parse() checks each field. status fails: “Invalid option: expected one of "paid"|"shipped"|"delivered"”. parse() throws a ZodError with the path ["status"].',
};

const END: Record<Data, string> = {
  ok: 'The code adds 42.95 and 5. The page shows €47.95 and “On its way”.',
  string: 'JavaScript adds a string and a number by joining them: "42.95" + 5 is "42.955". The page shows €42.955. Nothing throws, so nobody is told.',
  status: 'LABELS has no entry for "returned", so the lookup gives undefined. String() turns it into the text "undefined", and the page shows “Status: undefined”. Nothing throws.',
};
const CAUGHT = 'The order code never runs with bad data. The page catches the error, shows a message and sends the error, with the field name, to your error reports.';

/** The numbered steps, one per stage. */
export const steps = (d: Data, c: Code) => [
  'Build. TypeScript checks the code against the Order type and finds 0 errors. Then it removes the types. ' +
    (c === 'schema' ? 'The schema is not a type: it stays in the JavaScript.' : 'The JavaScript that runs has no Order type.'),
  ARRIVES[d],
  c === 'trust' ? UNCHECKED : CHECKED[d],
  c === 'schema' && d !== 'ok' ? CAUGHT : END[d],
];

const CAUGHT_TEXT = 'The bad data stopped where it entered the app. The user sees a clear message, not a wrong order. Your error report says which field changed, so the fix is quick: update the schema and the code that uses it.';

export const VERDICT: Record<`${Data}-${Code}`, [string, string, string, Tone]> = {
  'ok-trust': ['€47.95', 'correct, but unchecked', 'It works because the API still sends what the type says. Nothing checked that. When the API changes, this code will not notice.', 'good'],
  'ok-schema': ['€47.95', 'correct and checked', 'The schema checked every field, and all matched. The cost is a little code and a little time for each response.', 'good'],
  'string-trust': ['€42.955', 'shown to the customer, no error', 'The types were correct, and TypeScript was right about your code. The data was wrong, and nothing checked it. The bug appears far from its cause, and no error report tells you.', 'bad'],
  'string-schema': ['1 error', 'at the edge, naming total', CAUGHT_TEXT, 'warn'],
  'status-trust': ['undefined', 'shown as the order status', 'The type said status has three possible values. At run time it had a fourth. Nothing checked it, so the bug reached the screen without an error.', 'bad'],
  'status-schema': ['1 error', 'at the edge, naming status', CAUGHT_TEXT, 'warn'],
};
