# Reference checks

This validates the standalone HTML specimen only, not the user's repository.

Checked in Chromium on 23 November 2026:

- 1440, 1024, 768, 620, 390 and 320 CSS-pixel widths, each in light and dark mode: no page-level horizontal overflow or JavaScript page errors.
- Both cache-scenario buttons update the active state and pressed state at every tested width. The miss scenario updates the cache symbol and explanatory caption.
- Keyboard activation of the scenario switch, theme switch and native answer disclosure works.
- At 390px with JavaScript disabled, the title, diagram and both outcome explanations remain readable; enhanced controls are hidden and the native answer disclosure still works.
- Desktop dark, desktop light and mobile dark screenshots were visually inspected. The mobile light screenshot is also included for inspection.
- Chromium reported Inter for the headline. This is a local fallback, not verified Geist rendering. No fonts are bundled, downloaded by the reference, or redistributed.

Not checked: the real site build, its search, index and menu, actual installed Geist fonts, a repository build, Safari/Firefox, screen-reader output, comprehensive accessibility compliance or the production deployment. No performance scores are claimed. The reference has no backend, external scripts or installation step.

The page is a design specimen, not a completed curriculum guide. Its simplified HTTP examples have inline MDN source links and omit browser caching and revalidation flows.
