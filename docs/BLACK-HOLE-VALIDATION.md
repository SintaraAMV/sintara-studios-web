# Black hole validation

- Source: original user attachment from “Continuar Rango B agujero negro”. Stored byte-for-byte as `assets/black-hole-original.webp` (SHA-256 `2A74124290427EEA9513EE106C21ECD72D2117EA4159C496A5174FE0D1B75493`). No image generation, recoloring or NASA replacement.
- Integration: home Projects portal and Projects hero. Original 16:9 composition remains fully visible. Text occupies its own dark surface, without a global overlay on the image.
- Motion: one translucent copy of the original texture translates by at most 0.18% horizontally and 0.08% vertically, behind a fixed feathered mask following the disk. A 10-second eased loop returns to identical position with zero endpoint velocity. The original frame never transforms. Reduced motion removes the moving layer completely.
- No runtime dependencies, canvas rendering or animation JavaScript. One shared original image and one small SVG mask.

## Verification

Run `node tools/verify-black-hole.cjs` with Playwright available; `HOLE_BROWSER` can select Chrome and `HOLE_QA_OUTPUT` can select the screenshot folder.

Passed in Chrome at 1440×1000 and 390×844 for both pages:
- 0 and 10-second screenshots are pixel-identical.
- Intermediate frame differs, confirming visible localized activity.
- Image geometry stays fixed, including hover.
- No horizontal overflow, missing assets or page errors.
- Reduced motion disables animation.

Reviewed desktop and mobile screenshots. Existing `tools/verify-solar.cjs` also passed for the home and Studio pages. Prior uncommitted solar CSS edits were preserved. No deployment was performed.
