# Creature Evolution Simulator — Requirements

Goal: Build a browser-accessible (GitHub Pages) application that evolves 2‑D virtual creatures to maximize horizontal travel distance within a fixed evaluation time.

## 1. Scope and Target Users
- Audience: hobbyists, students, and researchers interested in evolutionary algorithms and procedural animation.
- Platform: runs fully client-side in modern desktop browsers; no backend services.
- Distribution: published through GitHub Pages under a public repository.

## 2. Core Functional Requirements
- **Population lifecycle**
  - Generate an initial population of randomly parameterized creatures.
  - Simulate each creature for `N` seconds in a physics world.
  - Score creatures by horizontal displacement (with optional penalties for energy usage or instability).
  - Select top performers and produce offspring via crossover and mutation.
  - Iterate for configurable generations or until user stops the run.
- **Genome representation**
  - Encodes limb count (within defined bounds), limb lengths, masses, relative angles, and connectivity graph.
  - Defines joint positions, angular limits, and motor/actuator parameters (torque, speed, timing).
  - Stores actuation phase/timing curves or piecewise control signals.
- **Evolution controls**
  - Configurable population size, evaluation length, selection strategy, mutation rates, crossover strategy, and elitism count.
  - Supports seeded RNG for reproducible runs.
- **Simulation controls**
  - Play, pause, reset to generation 0, step-by-step advance.
  - Hot-reload configuration changes for subsequent generations.
  - Save/load simulation snapshots (best genomes, population state) to/from JSON.

## 3. Physics and Creature Simulation
- Utilize a 2-D rigid-body physics engine (e.g., Matter.js, planck.js, or custom Box2D-like layer).
- Creature construction: rigid segments (rectangular/capsule) connected via revolute joints with motorized actuation.
- Deterministic timestep integration; consistent results given same seed.
- Environment:
  - Flat ground plane with configurable friction and restitution.
  - Optional features: slopes, steps, small obstacles.
  - Start line reference for distance measurement.
- Constraints:
  - Limit maximum limb count, lengths, and masses to maintain stability.
  - Enforce joint torque/velocity caps to avoid unrealistic motion.
  - Collision filters to prevent self-intersection instability where possible.

## 4. Evolutionary Algorithm
- **Selection methods**: tournament, roulette, or rank-based; selectable in UI.
- **Crossover**: combine genome segments while preserving connectivity validity.
- **Mutation**:
  - Numeric perturbations (e.g., lengths, angles, timing).
  - Structural changes (add/remove limb, reassign joint parent) within bounds.
  - Adjustable mutation probability and magnitude; optional adaptive rates.
- **Fitness evaluation**:
  - Single objective (distance) with optional penalty terms (energy, instability, body count).
  - Cache or memoize evaluations within a generation if duplicate genomes arise.
- **Diversity management**: maintain minimal diversity metric (e.g., speciation buckets or novelty score) to avoid premature convergence (optional but designed for extension).

## 5. Visualization and User Interface
- Render side-view of simulation via Canvas or WebGL.
- Visual cues:
  - Creatures with colored limbs and joints.
  - Ground, finish line, and trail of best performer.
  - Real-time display of active creature during evaluation.
- Dashboards:
  - Current generation, best distance, mean and median fitness, mutation rate.
  - Plot of best/average fitness over generations.
  - Genome inspector for selected creature (structural layout + parameters).
- Controls:
  - Buttons/toggles for run state, speed scaling (normal, fast-forward).
  - Sliders/inputs for configurable parameters.
  - Tooltips / inline descriptions for parameters.
- Responsiveness: optimized for desktop; tablet support nice-to-have; mobile optional.

## 6. Data Management
- Persist configuration presets and last session state in `localStorage`.
- Export/import runs, genomes, and settings as downloadable JSON.
- Optional auto-save interval to prevent data loss during long runs.
- Provide default presets (e.g., “Walker”, “Crawler”, “Random chaos”).

## 7. Architecture and Technology
- TypeScript codebase compiled to JavaScript with bundler (Vite, esbuild, or similar).
- Modular organization:
  - `physics/` wrapper, `genetics/` (genome operations), `simulation/` (loop), `ui/`, `utils/`.
  - Separation between simulation core and rendering layer to allow headless runs.
- Configurable interfaces for selection, crossover, mutation operators to foster extensibility.
- Clear error handling to recover from invalid genomes (e.g., fallback or penalize fitness).

## 8. Performance and Quality
- Support evaluating at least 50 creatures per generation at 60 Hz on modern desktop hardware with optional batch or parallel evaluation strategy.
- Optionally evaluate creatures in parallel Web Workers to prevent UI blocking.
- Deterministic results with identical seeds; log/track RNG seeds per generation.
- Automated tests:
  - Unit tests for genetic operators and configuration serialization.
  - Smoke test for simulation loop (short run verifying distance increases).
- Linting (ESLint) and formatting (Prettier) integrated into build pipeline.

## 9. Hosting and Deployment
- GitHub repository with `README` describing setup, usage, and deployment.
- NPM scripts for `dev`, `build`, `test`, `lint`.
- GitHub Actions workflow to run CI (lint/test) and deploy `dist/` or `docs/` to GitHub Pages.
- Relative paths for assets to ensure compatibility with project subpath.
- No runtime network dependencies; all assets bundled locally.

## 10. Accessibility and UX
- Keyboard navigation for primary controls (start/stop, generation stepping, parameter inputs).
- High-contrast color palette and colorblind-friendly overlays.
- Screen-reader-friendly descriptions for charts and statuses where feasible.
- Documentation or inline help explaining evolutionary concepts to new users.

## 11. Documentation
- Requirements (this document) and system architecture overview.
- Developer guide covering code structure, module responsibilities, and extension steps.
- User guide with quick start, parameter explanations, and troubleshooting.
- Changelog tracking notable updates.

## 12. Non-Functional Requirements
- Privacy: no telemetry or external analytics.
- Reliability: handle runtime physics errors gracefully; discard problematic creatures without halting simulation.
- Maintainability: consistent TypeScript typings, comments only for non-obvious logic.
- Compatibility: latest Chrome, Edge, and Firefox on desktop (baseline); Safari and tablets as stretch goals.

## 13. Acceptance Criteria
- User can configure a simulation, start evolution, observe creatures moving, and see metrics update over generations.
- Best performer improves (or stabilizes) in distance and can be exported/imported.
- UI remains responsive during evaluation; fast-forward mode does not freeze or lock up.
- Project builds successfully and deploys to GitHub Pages using documented steps.
- Unit test suite passes; linting reports no errors.

## 14. Nice-to-Haves
- Alternative fitness objectives (e.g., climbing, jumping, obstacle navigation).
- Multi-objective optimization (Pareto front visualization).
- Replay gallery of top performers across generations.
- Creature genome editor with drag-and-drop limb adjustments.
- Support for sharing presets via encoded URLs or Gist integration (if network restrictions lifted).
