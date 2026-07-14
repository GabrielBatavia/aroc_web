# AROC_PL Editorial-Cinematic UI Polish Design

Date: 2026-07-14
Status: Approved for implementation

## Context

The AROC_PL website already has a complete structure, a recognizable navy-cream-yellow identity, real team and robot content, a cinematic homepage, an interactive Lab, and a 3D robot experience. This work is a refinement pass, not a redesign. The approved direction combines editorial restraint with choreographed cinematic motion.

The result should feel like a serious university robotics team commissioned a careful design studio. It should not feel like a template swap, a visual-effects demonstration, or a collection of unrelated animation tricks.

## Goals

- Preserve all routes, sections, content, data, imagery, and page order.
- Preserve the current brand palette, Barlow Condensed display type, Geist body type, hero video, Lab interactions, and 3D robot experience.
- Make typography, spacing, borders, radii, shadows, buttons, and section transitions more consistent.
- Keep and improve the branded entry experience and custom cursor.
- Add immersion through deliberate animation sequences and meaningful interaction states.
- Reduce simultaneous visual competition so photographs, robots, achievements, and team information remain the focus.
- Apply the same visual discipline to Home, About, Lab, Updates, Press, and Robot 3D.

## Non-goals

- No content rewrite, new marketing claims, navigation changes, route changes, or section reordering.
- No replacement of the existing visual identity.
- No major component or data-layer rearchitecture.
- No animation dependency unless the native CSS and React approach proves insufficient during implementation.
- No continuous animation added merely to fill empty space.

## Design Principles

### Editorial clarity

Typography and imagery lead. Display text remains bold, but line length, scale, contrast, and vertical rhythm become more disciplined. Supporting labels, body copy, controls, and metadata should not compete with the main message.

### Choreographed cinema

Immersion comes from sequencing. Entry, hero, section, and interaction animations should have a clear beginning and end. The site should avoid launching several unrelated looping effects at the same time.

### One primary effect per moment

Each section receives one dominant motion idea, such as a mask reveal, stagger, line draw, counter, image depth shift, or controlled slider transition. Secondary effects remain subtle and reinforce the primary effect.

### Quiet consistency

Reusable spacing, radius, border, shadow, button, and motion tokens should replace isolated values where practical. Shared visual rules must remain recognizable across light and dark surfaces.

## Visual System Refinement

### Color and contrast

The existing navy, cream, and yellow palette remains unchanged. Yellow is reserved for emphasis, progress, selected states, and primary actions. Decorative yellow glows should be reduced when they compete with text or imagery. Body copy must retain comfortable contrast on both dark and light surfaces.

### Typography

Barlow Condensed remains the display face and Geist remains the reading face. The implementation should:

- Normalize heading line-height and tracking by scale.
- Keep body copy within readable line lengths.
- Reduce overuse of small all-caps labels and excessive letter spacing.
- Use font weight and spacing before introducing additional color or ornament.
- Preserve the existing assertive homepage voice without adding another font family.

### Spacing and surfaces

- Establish a compact set of section gaps and container widths.
- Reduce oversized pill treatment where a simpler surface communicates the same hierarchy.
- Standardize card radii and reserve fully rounded shapes for badges, compact controls, and intentional brand motifs.
- Use fewer shadow strengths and fewer border opacities.
- Simplify large transition gradients between sections while preserving the current light-dark narrative.

### Buttons and navigation

The existing navigation structure and actions remain. Polish focuses on consistent control heights, quieter default surfaces, precise hover and focus states, and reduced visual weight. Primary buttons remain yellow; secondary actions should rely on border, contrast, and motion rather than repeated shimmer.

## Motion Choreography

### Entry signature

The entry experience remains and becomes a purposeful handoff to the hero:

1. The AROC mark resolves against the navy field.
2. A short pulse or ring confirms the brand mark.
3. The entry surface becomes a curtain or aperture reveal instead of simply fading away.
4. The hero poster or video is already visible behind the reveal to avoid a blank frame.
5. Entry animation completes quickly and never blocks navigation longer than necessary.

The entry must be skipped or reduced when `prefers-reduced-motion: reduce` is active. It must not replay on every client-side route transition.

### Hero sequence

Hero elements enter in a hierarchy rather than simultaneously:

1. Championship badge or primary credibility signal.
2. Main headline.
3. Description and primary action.
4. Navigation and supporting facts.
5. A limited amount of contextual HUD detail, only where it improves the robotics narrative.

The hero video, directional veil, and one atmospheric layer may coexist. Redundant particle, scan, glow, ring, grain, and shimmer layers should be reduced or consolidated.

### Scroll chapters

The existing page order and chapter rail remain. Each homepage section receives one primary reveal behavior. Shared reveal timing should use the same easing and duration families. Long sections may use controlled depth or pinned storytelling, but animation must not obscure content, hijack scrolling, or create layout shift.

### Custom cursor

The existing custom cursor remains and gains purposeful states:

- Default: compact brand ring or mark.
- Link/button: expanded ring with clear hover feedback.
- Media: a view or play affordance when relevant.
- Drag/slider: a directional or drag state.
- Active press: short compression response.

Cursor states must be driven by stable interaction semantics rather than per-component one-off logic. The native cursor and all custom cursor effects are disabled for coarse pointers, touch-first devices, and reduced-motion users. Keyboard focus remains fully visible and never depends on cursor feedback.

## Component Scope

### Shared shell

- `app/globals.css`: consolidate visual and motion tokens, shared surfaces, focus states, and reduced-motion fallbacks.
- `app/layout.tsx`: retain the shared atmosphere, progress, cursor, and page shell while ensuring global effects do not compete.
- `components/layout/Navbar.tsx`: reduce surface weight, align control sizing, and refine scrolled/mobile states.
- `components/layout/Footer.tsx`: apply the same typography, spacing, border, and interaction discipline.
- `components/shared/CustomCursor.tsx`: add semantic cursor states, pointer capability checks, and complete cleanup of listeners.
- `components/shared/ScrollAtmosphere.tsx` and `ScrollProgress.tsx`: keep only the layers that meaningfully support orientation and depth.
- `hooks/useScrollReveal.ts`: reuse or extend the current reveal contract instead of creating unrelated observers.

### Homepage

`components/campaign/HomeCampaign.tsx` retains its content, sections, and ordering. The implementation will improve the branded entry, hero reveal, effect density, section transitions, card consistency, slider feedback, and final partnership call to action. Large component splitting is allowed only where it directly improves safe implementation or reusable motion boundaries; unrelated refactoring is excluded.

### Secondary pages

About, Lab, Updates, Press, and Robot 3D keep their current information architecture and functionality. They receive the shared spacing, typography, surface, button, focus, and reveal refinements. Lab simulators and the 3D viewer retain their interaction models and receive only visual feedback and motion consistency improvements.

## State and Data Flow

Content continues to come from the existing files under `data/` and through current component props. The polish introduces no new server state or persistence.

Motion state remains local to the component that owns the visual behavior. Shared capability decisions—reduced motion, coarse pointer, and cursor semantics—should use small reusable hooks or shared attributes. Event listeners, observers, animation frames, and media-query subscriptions must be removed during component cleanup.

## Failure and Fallback Behavior

- If the hero video cannot play, the existing poster image remains a complete visual fallback.
- If JavaScript is delayed, primary content and navigation remain readable and usable.
- Reduced-motion mode shows content without staged delays and removes nonessential parallax, looping, and cursor movement.
- Touch and coarse-pointer devices use native interaction without a custom cursor.
- Animations must not leave content hidden after interruption, route changes, backgrounding, or hydration.
- Loading and error states in the Lab and 3D viewer remain legible and should not rely on animation alone.

## Accessibility and Performance Guardrails

- Preserve semantic headings, landmarks, alternative text, keyboard access, and visible focus.
- Do not animate layout-affecting properties when transforms and opacity can express the same behavior.
- Avoid new large media assets for decorative animation.
- Keep hero media loading behavior and poster fallback intentional.
- Avoid scroll listeners when an observer or CSS solution provides the required behavior.
- Limit continuous animation to a small number of composited layers.
- Verify that custom cursor and magnetic behaviors do not interfere with links, form controls, selection, or touch.

## Verification

Implementation is complete when all of the following pass:

- `npm run lint`
- `npm run build`
- No new browser console errors on representative routes.
- Desktop and mobile visual checks for Home, About, Lab, Updates, Press, and Robot 3D.
- Keyboard navigation and focus visibility checks.
- Reduced-motion and coarse-pointer behavior checks.
- No horizontal overflow at representative breakpoints.
- Entry animation hands off cleanly to the hero and does not replay unexpectedly.
- Cursor states work on supported desktop pointers and disappear completely on touch/coarse pointers.
- Hero video fallback, Lab interactions, sliders, lightbox, mobile navigation, and 3D viewer remain functional.

## Acceptance Criteria

- A returning visitor recognizes the same AROC_PL site immediately.
- The interface feels calmer and more intentional even though animation is more immersive.
- Entry, hero, scroll, and cursor motion share a coherent timing language.
- Real imagery and content carry more visual authority than decorative effects.
- No content, route, or functional regression is introduced.
- The site remains accessible, responsive, and production-buildable.
