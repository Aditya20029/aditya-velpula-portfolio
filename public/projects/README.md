# Project screenshots

Drop project screenshots in this folder, then reference them from
`src/data/projects.js`.

## How to add a screenshot to a project card

1. Save the image here. Recommended:
   - Format: WebP or PNG
   - Aspect: roughly 16:9 (the card preview is 320×160 on desktop)
   - File size: < 200 KB (use squoosh.app to compress)
   - Filename: `{project-id}.webp` (e.g. `wildfire-prediction.webp`)

2. Open `src/data/projects.js`, find the project entry, and add an
   `image` field pointing to your file. Optional `imageAlt` for
   accessibility:

```js
{
  id: "wildfire-prediction",
  title: "Wildfire Risk Prediction",
  // ...existing fields...
  image: "/projects/wildfire-prediction.webp",
  imageAlt: "Wildfire risk heatmap showing high-risk zones in red",
}
```

3. Push. The card preview swaps from the animated SVG to your image
   automatically. The modal preview swaps too.

## How to remove a screenshot

Either delete the `image` line from `projects.js` or remove the file
from this folder. The card falls back to the animated SVG preview.

## Recommended next screenshots (in priority order)

These are the ones that would lift credibility most:

1. **DAPSE** — even a partial UI screenshot redacted, shows the system
   exists. Could be the architecture diagram, a sample query/response,
   or the cost dashboard.
2. **Wildfire Prediction** — the actual heatmap output. AUC 0.99 on
   a real geographic visualization is striking.
3. **SLA Breach Prediction** — the Power BI dashboard.
4. **Movie Recommender** — the React frontend with recommendations.
5. **Support Circle** — the chat-first UI.
