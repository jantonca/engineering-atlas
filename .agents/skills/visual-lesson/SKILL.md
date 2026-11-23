---
name: visual-lesson
description: Create or improve an Engineering Atlas lesson or teaching diagram in Astro MDX. Use for new topics, visual explanations, or turning text-heavy lessons into scannable study pages. Do not use for review-only requests or general site setup.
---
# Visual Lesson

Follow the applicable `AGENTS.md` and the study plan it references. Keep project rules there, not in this skill.

## Workflow

1. Read the requested topic, a nearby finished lesson and existing components. Choose one learning outcome and the question the page should answer; stay within the requested scope.
2. Check the facts needed for that explanation. Use the project's source rules, flag unsupported claims and distinguish a teaching simplification from how a system actually behaves.
3. Prototype the overview at its real reading width: a clear takeaway beside a strong concept visual. Match existing typography, spacing and colour roles; establish them here only if the project has none. Get this section right before expanding the lesson.
4. Make the visual explain the mechanism. For a rendering comparison, trace the same request through browser, server and network lanes; keep labels and stages comparable. Use an annotated example for consequences, not a decorative picture. Trace every arrow and state against the explanation.
5. Cover all eight parts of the plan's template, in whatever order and form teaches best. Alternate short explanations with the visual form each idea needs, without forcing a diagram into every section. Place meaning and caveats beside the visual; compare choices on the same criteria and explain when each fails.
6. Add a realistic self-test: ask the learner to predict an outcome or justify a choice before revealing the answer. Include the reasoning and a likely misconception, not just a memorised definition.
7. Implement in MDX with existing components. Introduce a component only for a clear teaching interaction or real repetition. Finish the requested lesson, not a component catalogue.
8. Run the applicable checks from `AGENTS.md`. Inspect the actual page, fix unreadable diagrams or weak hierarchy, and report any checks unavailable in this environment.

## Deliver

Save the lesson and necessary assets in the existing structure. Finish with changed paths, checks performed and remaining gaps. Do not create extra planning documents or start other lessons unasked.
