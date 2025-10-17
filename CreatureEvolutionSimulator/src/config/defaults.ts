import type { SimulationParameters } from "../types";

export const defaultSimulationParameters: SimulationParameters = {
  populationSize: 30,
  evaluationTime: 10,
  seed: 1337,
  mutationRate: 0.1,
  crossoverRate: 0.7,
  selectionStrategy: "tournament",
  elitismCount: 2,
  limbs: { min: 2, max: 6 },
  limbLength: { min: 0.3, max: 1.2 },
  limbMass: { min: 0.5, max: 3 },
  actuatorTorque: { min: 0.5, max: 5 },
  actuatorFrequency: { min: 0.2, max: 2 },
  jointOffsetLimit: 0.4
};
