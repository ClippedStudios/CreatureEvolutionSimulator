# Creature Evolution Simulator

Early-stage scaffold for a browser-based evolutionary physics playground. The app is implemented in TypeScript, bundled with Vite, and targets GitHub Pages deployment.

## Getting Started

```bash
npm install
npm run dev
```

Open the printed local URL to access the simulator UI. The current build includes placeholder evolutionary logic and a canvas view ready for physics integration.

## Scripts

- `npm run dev` &mdash; start Vite dev server.
- `npm run build` &mdash; produce production assets in `dist/`.
- `npm run preview` &mdash; serve the built assets locally.
- `npm run lint` &mdash; run ESLint checks.
- `npm run test` &mdash; execute Vitest suite (placeholder).

## Project Structure

- `src/app` &mdash; UI composition and application lifecycle.
- `src/genetics` &mdash; genome creation and population management scaffolding.
- `src/simulation` &mdash; simulation controller hook for physics/evolution loop.
- `src/config` &mdash; default parameter sets.
- `src/utils` &mdash; shared helper utilities.

Refer to `REQUIREMENTS.md` for the full functional specification driving future work.
