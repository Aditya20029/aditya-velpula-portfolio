# Pulse screenshots

Drop screenshots in this folder to feed the Pulse project card and the
`/projects/pulse` case-study page.

## Card preview

`globe.png` is what `src/data/projects.js` points at as the Pulse card's
preview image. Until that file exists, the card falls back to the
animated "grid" SVG preview. Drop a 1600x900 (or similar 16:9) hero
screenshot of the globe with several active clusters lit up. Compress
to under ~400 KB via squoosh.app.

## Optional case-study gallery

If you want a multi-shot gallery on `/projects/pulse` like the DAPSE
case study has, add a `screenshots` array to the `pulse` entry in
`src/data/caseStudies.js`. Each entry should look like:

```
{
  src: "/projects/pulse/<filename>.png",
  alt: "<short description>",
  caption: "<longer caption shown under the image>",
}
```

Then drop each file into this folder. The case-study page filters out
any screenshot whose file isn't on disk yet (via fs.existsSync at
build time), so the gallery degrades cleanly while you're still
collecting screenshots.

Suggested shots:
- `globe.png` (hero, used by the card preview)
- `cluster-briefing.png` (cluster open with a Claude briefing streaming)
- `terminator.png` (day/night terminator + atmosphere shader)
- `auroras.png` (sentiment-reactive aurora over a high-severity cluster)
- `multi-lang.png` (briefing in a non-English locale)

## Format guidance

- PNG or WebP, target under ~400 KB each
- 1600 px wide is plenty; anything past 2400 is overkill
- Crop tight; lose the browser chrome
