import type { Tone } from '../../scripts/sim';

export type Stage = 'parse' | 'style' | 'layout' | 'paint' | 'composite';
export type Change = 'load' | 'width' | 'colour' | 'transform';

export const STAGES: { id: Stage; name: string; makes: [string, string] }[] = [
  { id: 'parse', name: 'Parse', makes: ['HTML → DOM,', 'CSS → CSSOM'] },
  { id: 'style', name: 'Style', makes: ['the render tree:', 'elements with their styles'] },
  { id: 'layout', name: 'Layout', makes: ['the size and position', 'of every box'] },
  { id: 'paint', name: 'Paint', makes: ['pixels, drawn', 'into layers'] },
  { id: 'composite', name: 'Composite', makes: ['layers put together:', 'the frame on screen'] },
];

// Which steps run for each change. Matches the three pipelines on web.dev,
// plus parsing for the first load.
export const RUNS: Record<Change, Stage[]> = {
  load: ['parse', 'style', 'layout', 'paint', 'composite'],
  width: ['style', 'layout', 'paint', 'composite'],
  colour: ['style', 'paint', 'composite'],
  transform: ['style', 'composite'],
};

const SKIP_PARSE = 'Parse is skipped. The HTML did not change, so the DOM stays the same.';

export const STEP_TEXT: Record<Change, Record<Stage, string>> = {
  load: {
    parse: 'Parse. The browser reads the HTML and builds the DOM, a tree of all the elements. It reads the CSS and builds the CSSOM, a tree of all the style rules.',
    style: 'Style. It matches the rules to each element and combines the two trees into the render tree. The render tree leaves out elements with display: none. An element with visibility: hidden stays in, because it still takes up space.',
    layout: 'Layout. It computes the size and position of every box. Nothing is drawn yet.',
    paint: 'Paint. It draws the text, colours and borders of each box into layers.',
    composite: 'Composite. It puts the layers together in the right order and shows the frame. Only now does the user see the first pixels.',
  },
  width: {
    parse: SKIP_PARSE,
    style: 'Style. The script changed the box’s CSS width, so the browser computes the new styles of the elements it affects.',
    layout: 'Layout. The box is wider, so the text beside it moves. The browser computes new sizes and positions for both.',
    paint: 'Paint. It draws the changed boxes again.',
    composite: 'Composite. It shows the new frame: a wider box, and the text moved to the right.',
  },
  colour: {
    parse: SKIP_PARSE,
    style: 'Style. The script changed the box’s background colour, so the browser computes its new style.',
    layout: 'Layout is skipped. A colour does not change any size or position.',
    paint: 'Paint. It draws the box again with its new colour.',
    composite: 'Composite. It shows the new frame: the same box in a new colour.',
  },
  transform: {
    parse: SKIP_PARSE,
    style: 'Style. The script changed the box’s transform, so the browser computes its new style.',
    layout: 'Layout is skipped. A transform moves the box on screen, but not in the layout. The text beside it stays where it was.',
    paint: 'Paint is skipped. The box is already painted in its own layer.',
    composite: 'Composite. The compositor moves the layer that is already painted, and shows the frame. The box now covers part of the text.',
  },
};

export const VERDICT: Record<Change, [string, string, string, Tone]> = {
  load: ['5 of 5', 'steps on the path to the first frame', 'Every step runs once for this frame. Until Composite ends, the user sees nothing. A slow render-blocking stylesheet can delay the first frame while the browser continues parsing HTML.', 'net'],
  width: ['4 of 5', 'steps run again for a new width', 'A new size can move other boxes, so layout runs for them too. If you animate width, these four steps run on every frame.', 'warn'],
  colour: ['3 of 5', 'steps run again for a new colour', 'No size or position changed, so layout is skipped. The pixels changed, so paint still runs.', 'good'],
  transform: ['2 of 5', 'steps run again for a transform', 'Layout and paint are skipped, because the box keeps its place in the layout and its pixels. This is why smooth animations use transform and opacity.', 'good'],
};

export const SCREEN: Record<Change, { before: string; after: Partial<Record<Stage, string>> }> = {
  load: {
    before: 'On screen: a blank page.',
    after: {
      layout: 'Sizes and positions known. Nothing drawn yet.',
      paint: 'Pixels drawn into layers. Not on screen yet.',
      composite: 'On screen: the page.',
    },
  },
  width: { before: 'On screen: the old frame.', after: { composite: 'On screen: the wider box.' } },
  colour: { before: 'On screen: the old frame.', after: { composite: 'On screen: the new colour.' } },
  transform: { before: 'On screen: the old frame.', after: { composite: 'On screen: the moved box. The dashed line is its place in the layout.' } },
};

export const STATE_TEXT = { wait: 'waiting', run: 'running', done: 'ran', skip: 'skipped' } as const;
