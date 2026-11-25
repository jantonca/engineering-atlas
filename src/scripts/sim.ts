// Small helpers shared by the timeline simulators.

export type Tone = 'good' | 'warn' | 'bad' | 'net';

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Place an element on a track: `left` and `width` as percentages of the span. */
export const place = (el: HTMLElement, start: number, end: number, span: number) => {
  el.style.left = `${(start / span) * 100}%`;
  el.style.width = `${(Math.max(end - start, 0) / span) * 100}%`;
};

export const el = (tag: string, className: string, text?: string) => {
  const node = document.createElement(tag);
  node.className = className;
  if (text) node.textContent = text;
  return node;
};

/** Numbered steps: the text version of the animation. */
export const steps = (list: HTMLElement) => ({
  clear: () => list.replaceChildren(),
  set: (lines: string[]) =>
    list.replaceChildren(
      ...lines.map((line, i) => {
        const li = el('li', '');
        li.append(el('span', 'sx-step-n', String(i + 1)), document.createTextNode(line));
        return li;
      }),
    ),
  /** Highlight the steps that have happened by time `t`. */
  reveal: (times: number[], t: number) => {
    [...list.children].forEach((li, i) => {
      const done = times[i] <= t;
      (li as HTMLElement).hidden = !done;
      li.classList.toggle('is-now', done && (times[i + 1] === undefined || times[i + 1] > t));
    });
  },
});

export const verdict = (root: HTMLElement) => {
  const big = root.querySelector<HTMLElement>('.sx-big')!;
  const unit = root.querySelector<HTMLElement>('.sx-unit')!;
  const text = root.querySelector<HTMLElement>('.sx-text')!;
  return {
    hide: () => root.classList.remove('is-on'),
    show: (b: string, u: string, t: string, tone: Tone) => {
      big.textContent = b;
      unit.textContent = u;
      text.textContent = t;
      root.dataset.tone = tone;
      root.classList.add('is-on');
    },
  };
};

/**
 * Play simulated time from 0 to `span` ms, `slow` times slower than real time.
 * Returns a stop function. With reduced motion, jumps straight to the end.
 */
export const play = (span: number, slow: number, onTime: (t: number) => void, onEnd: () => void) => {
  if (reducedMotion()) {
    onTime(span);
    onEnd();
    return () => {};
  }
  let raf = 0;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min((now - start) / slow, span);
    onTime(t);
    if (t < span) raf = requestAnimationFrame(tick);
    else onEnd();
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
};

/** Run `fn` once when `target` is mostly on screen. */
export const whenVisible = (target: Element, fn: () => void) => {
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        fn();
      }
    },
    { threshold: 0.5 },
  );
  io.observe(target);
};

/**
 * Put a label inside a bar only if it fits. Tries each text in order;
 * removes the label when none fits, so labels are never cut off.
 */
export const fitLabel = (label: HTMLElement, bar: HTMLElement, texts: string[]) => {
  for (const t of texts) {
    label.textContent = t;
    if (label.offsetWidth <= bar.offsetWidth) return;
  }
  label.remove();
};

/** Call `fn` after the element changes width. */
export const onResize = (target: Element, fn: () => void) => {
  let w = 0;
  let timer = 0;
  new ResizeObserver(([entry]) => {
    const nw = Math.round(entry.contentRect.width);
    if (nw === w) return;
    const first = w === 0;
    w = nw;
    if (first) return;
    clearTimeout(timer);
    timer = window.setTimeout(fn, 150);
  }).observe(target);
};

/**
 * Keep a tag inside its track. Anchored at its `left` percentage, it sits to the
 * right of the anchor, else to the left, else as close as it can without clipping.
 */
export const keepInside = (tag: HTMLElement, track: HTMLElement) => {
  const tw = track.clientWidth;
  const w = tag.offsetWidth;
  const anchor = (parseFloat(tag.style.left) / 100) * tw;
  const shift = parseFloat(getComputedStyle(tag).marginLeft) || 0;
  tag.classList.remove('is-left');
  if (anchor + shift + w <= tw) return;
  if (anchor - w >= 0) {
    tag.style.marginLeft = '0';
    tag.classList.add('is-left');
    return;
  }
  tag.style.marginLeft = '0';
  tag.style.left = `${Math.max(0, Math.min(anchor - w / 2, tw - w))}px`;
};
