# Solar loop validation

- Source: NASA/GSFC/SDO, PIA26681 (1024px derivative), stored unchanged in `assets/solar-sdo.jpg`.
- Source URL: https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia26/pia26681/PIA26681.jpg?crop=faces%2Cfocalpoint&fit=clip&h=1024&w=1024
- The user reference guides the golden/orange palette and warm-white highlights; its pixels are not copied. The real SDO surface and irregular structures remain visible.
- Rebuild: from the repository root, run `powershell -NoProfile -ExecutionPolicy Bypass -File tools/build-solar.ps1` on Windows with System.Drawing.
- All solar assets are local. The two JPGs plus three masks total approximately 600 KB; the runtime surface and masks total approximately 465 KB. No new runtime JavaScript or third-party dependency.

## Executed checks

Chrome, 1440x1000 and 390x844, home and Studio:

- Exactly three opacity animations, each 12 seconds; every keyframe sequence has identical 0%/100% values, with ease-in-out giving zero endpoint velocity.
- Captures at 0 and 12000 ms matched exactly in three cases. Mobile Studio differed by one channel level (1/255) in five color channels, within browser compositor rounding. The verification allows at most 1/255 in fewer than 0.1% of channels; it does not claim bit-identical browser rasterization.
- A 6000 ms capture visibly differs, confirming that the masks actually animate.
- Solar bounds stay fixed across frames and hover.
- No horizontal document overflow, failed asset requests or page errors.
- Reduced-motion mode disables all three emissions and retains the static photograph.
- Desktop and mobile full-page screenshots reviewed for readability and composition.
- `git diff --check` and `git fsck --full` passed.

To rerun: install Playwright in your preferred development environment, make it available to Node, then run `node tools/verify-solar.cjs`. Set `SOLAR_BROWSER` to an installed Chromium executable if needed. Captures go to the sibling `solar-qa` directory by default; override with `SOLAR_QA_OUTPUT`.
