# DAPSE screenshots

The DAPSE case study (`/projects/dapse`) and project card both look in this
folder for the five screenshots below. Drop them here with these exact
filenames and the gallery + card preview will pick them up automatically.

## Required filenames

| Filename                    | What it should show                                           |
|-----------------------------|---------------------------------------------------------------|
| `scenario-tab.png`          | The scenario input tab (this is also used as the card preview) |
| `pipeline-running.png`      | The seven-stage pipeline streaming progress in real time      |
| `situation-awareness.png`   | The country-by-country risk dimension view                     |
| `technical-details.png`     | The technical details / per-claim grounding panel             |
| `system-health.png`         | The system health dashboard                                    |

## Format guidance

- **Format:** PNG or WebP (PNG is fine — these aren't perf-critical, just polish).
- **Resolution:** 1600 px wide is plenty. Anything wider than 2400 px is overkill.
- **Compression:** Run through https://squoosh.app or `cwebp` and aim for
  < 400 KB each. The case study renders all 5 in sequence, so total page
  weight matters.
- **Cropping:** Show the *interesting* part of the screen. Crop out empty
  browser chrome.
- **Redaction:** If anything in a screenshot is sensitive, blur it before
  saving. Treat anything that lands in `public/` as world-readable.

## How to drop the screenshots

1. Save each screenshot from the chat (right-click → "Save image as…") into
   this folder using the filename in the table above.
2. (Optional) Compress with squoosh.app — set quality to ~80 for PNG.
3. Run `npm run build` to confirm Next.js picks up the new files.
4. Commit + push.

If you skip a file, only the gallery item for that file will be broken —
everything else still renders. The card preview falls back to the
animated SVG illustration if `scenario-tab.png` is missing.

## Removing the gallery

To hide the gallery section entirely, delete the `screenshots` array on the
`dapse` entry in `src/data/caseStudies.js`. The case study page checks
`study.screenshots?.length > 0` before rendering the section.
