export interface LimbGene {
  id: string;
  length: number;
  mass: number;
  angle: number;
}

export interface JointGene {
  id: string;
  parentId: string;
  childId: string;
  pivot: {
    x: number;
    y: number;
  };
  limits: {
    min: number;
    max: number;
  };
}

export interface ActuatorGene {
  jointId: string;
  torque: number;
  frequency: number;
  phase: number;
}

export interface Genome {
  id: string;
  limbs: LimbGene[];
  joints: JointGene[];
  actuators: ActuatorGene[];
}

export interface Range {
  min: number;
  max: number;
}

export interface SimulationParameters {
  populationSize: number;
  evaluationTime: number;
  seed: number;
  mutationRate: number;
  crossoverRate: number;
  selectionStrategy: "tournament" | "roulette" | "rank";
  elitismCount: number;
  limbs: Range;
  limbLength: Range;
  limbMass: Range;
  actuatorTorque: Range;
  actuatorFrequency: Range;
  jointOffsetLimit: number;
}

export interface SimulationMetrics {
  bestDistance: number;
  averageDistance: number;
  generation: number;
  evaluatedCreatures: number;
}

export type SimulationPhase = "idle" | "running" | "paused";

export interface ControlPanelOptions {
  parameters: SimulationParameters;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onParametersChanged: (parameters: SimulationParameters) => void;
  onSeedApplied: (seed: number) => void;
}
