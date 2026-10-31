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
- The base photograph is currently loaded from NASA's CDN, with a local SVG used only as a fallback. The external dependency should be optimized or localized in a later pass.
- The user-provided reference sets the color mood, **not** a mandate to copy its image.

### Appearance
- Brighter golden-yellow sunlight and warm amber, with **moderate orange**.
- Preserve real irregular structures and tonal separation; no flat uniform orange fill.
- A few localized warm-white highlights, especially where observational features already show activity.
- Deep, uncluttered dark surroundings and readable text.

### Movement
- The solar disc stays **completely still**: no rotation and no zoom animation.
- Only broad, low-amplitude corona illumination and localized light fluctuations may animate.
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
