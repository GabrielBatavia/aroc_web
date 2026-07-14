# AROC_PL Editorial-Cinematic UI Polish Implementation Plan

## Objective

Polish the existing AROC_PL website without changing its routes, content, section order, brand identity, Lab behavior, or 3D experience. Combine editorial clarity with a more immersive, choreographed entry, hero, scroll, and cursor language.

## Implementation Sequence

1. Consolidate shared visual and motion tokens in `app/globals.css`, including reduced-motion and coarse-pointer fallbacks.
2. Upgrade the branded entry and custom cursor while preserving immediate content access and stable cleanup behavior.
3. Refine the shared navigation, footer, global atmosphere, buttons, cards, and focus states.
4. Choreograph the homepage hero and section reveals; reduce competing decorative effects and standardize transitions.
5. Apply shared polish to About, Lab, Updates, Press, and Robot 3D without changing their information architecture or interactive models.
6. Run lint and production build, inspect representative desktop/mobile views, check the browser console, and fix regressions.

## Verification Checklist

- Entry animation transitions cleanly into the hero and respects reduced motion.
- Cursor has clear default, interactive, media, drag, and pressed states on supported pointers.
- Cursor is absent on touch/coarse pointers and never interferes with keyboard focus.
- Navigation, buttons, cards, headings, and section transitions share consistent visual tokens.
- Homepage motion is sequenced and immersive without simultaneous visual noise.
- Secondary routes retain their functionality and receive the shared polish.
- Mobile navigation, Lab simulators, robot slider, gallery lightbox, and 3D viewer remain operational.
- `npm run lint` and `npm run build` pass.
