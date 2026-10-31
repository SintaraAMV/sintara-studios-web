# DESIGN DIRECTION

## Principle

The visual system should feel deliberate, cinematic and editorial rather than template-driven.

## Home

Two large visual territories:
- Sun = Studio
- Black Hole = Projects / Services

The split must communicate meaning through hierarchy and typography, not only through imagery.

## Interior pages

Once the visitor enters a section, clarity becomes more important than spectacle.

Rango B should prioritize:
1. problem recognition
2. service fit
3. starting price
4. evidence / process
5. contact

## Typography

Use strong contrast between restrained sans-serif UI text and serif display headlines.

## Motion

Motion is optional and minimal. Avoid decorative particle fields, perpetual floating, glowing cards, animated gradients or scrolling gimmicks without function.

## Solar realism standard (v1.2)

The Studio Sun uses a real NASA/GSFC/SDO observation as its
photographic source, with custom animated atmospheric overlays.
It does NOT rotate. No artificial expanding electromagnetic-wave rings.

- Static observational surface, true solar texture
- Slow asynchronous corona luminosity
- Three faint, localized prominence/field-aligned plasma treatments
- No looping flame sprite sheets or perfectly periodic bursts
- Respect `prefers-reduced-motion`
- Small attribution visible in the Studio hero

Source and credit:
https://science.nasa.gov/photojournal/image-of-sun-from-nasas-solar-dynamics-observatory/

Note: At this stage the photographic base is served by NASA's image CDN.
It is a network dependency and should later be optimized as a local,
properly credited asset if stability and performance tests justify it.

The visual overlays are artistic interpretations, NOT a numerical or
scientifically accurate plasma or electromagnetic field simulation.


## Solar refinement v1.3

- Surface palette: vivid orange / amber, with irregular high-temperature
  cream-white highlights; avoid flat saturated orange.
- Existing NASA/SDO observational source remains the static texture.
- Solar disc does not rotate.
- Six asymmetrical coronal prominences are provided by a separate
  `assets/solar-activity.svg` overlay. Each follows a unique arc and
  has its own flow/glow cadence, avoiding synchronized repetition.
- The same prominence overlay is displayed on the Studio hero and
  the Sun portal panel. Render independently of the disc.
- All optional motion must respect `prefers-reduced-motion`.
- Prominence paths and colors are illustrative and should not be
  described as a physically accurate simulation of solar plasma.


## Solar refinement v1.4: restrained color and density

- The prior v1.3 orange boost was reduced; the main disc stays warm amber/gold
  with orange only where it supports existing surface detail.
- Highlights remain yellow to warm-white rather than uniformly orange.
- Two small, low-intensity prominences were added to the existing six, at
  dissimilar positions near the north-west and lower limb.
- Additional prominence motion remains asynchronous; no object rotation,
  concentric electromagnetic-wave rings, or synchronized flame bursts.
- The existing observation imagery and its attribution are retained.
- This is an artistic atmospheric overlay, not a physically accurate solar model.
