// The 18 guides in study order, from docs/plan.md.
// `href` is set only when a page exists, so menus never link to missing pages.
interface Guide {
  number: string;
  title: string;
  href?: string;
  state: 'done' | 'in-progress' | 'not-written';
  optional?: boolean;
}

export const guides: Guide[] = [
  { number: '01', title: 'Frontend system design', state: 'not-written' },
  { number: '02', title: 'AI-assisted engineering', state: 'not-written' },
  { number: '03', title: 'Web platform foundations', href: '/web-platform-foundations/', state: 'done' },
  { number: '04', title: 'Rendering and app architecture', state: 'not-written' },
  { number: '05', title: 'State and real-time data', state: 'not-written' },
  { number: '06', title: 'Web performance', state: 'not-written' },
  { number: '07', title: 'Testing and quality', state: 'not-written' },
  { number: '08', title: 'Accessibility', state: 'not-written' },
  { number: '09', title: 'Web security and privacy', state: 'not-written' },
  { number: '10', title: 'Technical leadership and strategy', state: 'not-written' },
  { number: '11', title: 'Design systems', state: 'not-written' },
  { number: '12', title: 'Delivery and developer experience', state: 'not-written' },
  { number: '13', title: 'Monitoring and reliability', state: 'not-written' },
  { number: '14', title: 'Backend, API and cloud basics', state: 'not-written' },
  { number: '15', title: 'How LLMs work', state: 'not-written' },
  { number: '16', title: 'Building AI features', state: 'not-written' },
  { number: '17', title: 'Product experiments', state: 'not-written' },
  { number: '18', title: 'Graphics on the web', state: 'not-written', optional: true },
];

export const stateLabel: Record<Guide['state'], string> = {
  done: 'Done',
  'in-progress': 'Being written',
  'not-written': 'Not written yet',
};

export const nextGuide = (number: string) => {
  const i = guides.findIndex((g) => g.number === number);
  return i >= 0 ? guides[i + 1] : undefined;
};
