import type { SimulationMetrics } from "../types";

export function createInitialMetrics(): SimulationMetrics {
  return {
    bestDistance: 0,
    averageDistance: 0,
    generation: 0,
    evaluatedCreatures: 0
  };
}
