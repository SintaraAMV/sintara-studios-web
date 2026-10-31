# DESIGN DIRECTION

## Principles

The visual system must be specific to Sintara, not a generic technology template.

- Studio uses the Sun as its visual identity.
- Projects uses the Black Hole as its visual identity.
- Once inside either area, legibility and useful content take precedence over spectacle.
- Typography and composition lead; decoration is secondary.

## Current solar direction — v1.6

### Source and scope
- Studio's main photographic surface uses observational imagery credited to NASA/GSFC/SDO.
- Reference: https://science.nasa.gov/photojournal/image-of-sun-from-nasas-solar-dynamics-observatory/
- The original photograph is stored locally as `assets/solar-sdo.jpg`; `solar-surface.jpg` lifts midtones and warm-white highlights while preserving observational detail. `tools/build-solar.ps1` reproducibly derives this surface and three alpha masks from source luminance multiplied by soft regions around existing active structures. No generated plasma or drawn arcs.
- The user-provided reference sets the color mood, **not** a mandate to copy its image.

### Appearance
- Brighter golden-yellow sunlight and warm amber, with **moderate orange**.
- Preserve real irregular structures and tonal separation; no flat uniform orange fill.
- A few localized warm-white highlights, especially where observational features already show activity.
- Deep, uncluttered dark surroundings and readable text.

### Movement
- The solar disc stays **completely still**: no rotation and no zoom animation.
- Three fixed luminosity masks animate opacity only, with a shared 12-second period and staggered peaks at 6, 2.4 and 9.6 seconds. Identical 0%/100% values and zero endpoint easing velocity close the loop continuously. The portal also stays fixed on hover.
- Do not draw artificial line arcs or concentric electromagnetic waves.
- The previously added `assets/solar-activity.svg` was **removed**, with its references from Studio and the home portal.
- Animation must be gentle and respect `prefers-reduced-motion`.
- This is atmospheric brand motion, **not** a physical simulation of plasma.

### Anti-AI-slop test
- The still frame must look credible before animation is enabled.
- No symmetrical plasma patterns, duplicated fire shapes, glowing rings, intense blinking or attention-grabbing loops.
- Color grading must not erase the source's surface detail or overexpose the entire disc.

## Other constraints

- Maintain accessible semantic navigation and responsive layouts.
- Rango B pages should prioritize service fit, scope, evidence, pricing and contact.
- No false testimonials or claims of commercial validation.
