import { GenomeFactory } from "../genetics/GenomeFactory";
import { PopulationManager } from "../genetics/PopulationManager";
import type {
  Genome,
  SimulationMetrics,
  SimulationParameters,
  SimulationPhase
} from "../types";
import { createInitialMetrics } from "../utils/metrics";

export class SimulationController {
  private _parameters: SimulationParameters;
  private readonly genomeFactory: GenomeFactory;
  private readonly populationManager: PopulationManager;
  private currentPhase: SimulationPhase = "idle";
  private metrics: SimulationMetrics = createInitialMetrics();
  private currentGeneration = 0;
  private activeSeed: number;

  constructor(parameters: SimulationParameters) {
    this._parameters = parameters;
    this.activeSeed = parameters.seed;
    this.genomeFactory = new GenomeFactory(parameters);
    this.populationManager = new PopulationManager(parameters, this.genomeFactory);
  }

  public get parameters(): SimulationParameters {
    return this._parameters;
  }

  public get phase(): SimulationPhase {
    return this.currentPhase;
  }

  public get generation(): number {
    return this.currentGeneration;
  }

  public get bestGenome(): Genome | null {
    return this.populationManager.bestGenome;
  }

  public get currentMetrics(): SimulationMetrics {
    return this.metrics;
  }

  public start(): void {
    if (this.currentPhase === "running") {
      return;
    }

    if (this.currentPhase === "idle") {
      this.bootstrapPopulation();
    }

    this.currentPhase = "running";
    this.syncMetrics();
    // TODO: integrate physics loop and creature evaluation.
  }

  public pause(): void {
    if (this.currentPhase !== "running") {
      return;
    }

    this.currentPhase = "paused";
  }

  public reset(): void {
    this.currentPhase = "idle";
    this.currentGeneration = 0;
    this.metrics = createInitialMetrics();
    this.populationManager.clear();
  }

  public updateParameters(parameters: SimulationParameters): void {
    this._parameters = parameters;
    this.populationManager.updateParameters(parameters);
    this.genomeFactory.updateParameters(parameters);
    this.syncMetrics();
  }

  public updateSeed(seed: number): void {
    this.activeSeed = seed;
    this.populationManager.updateSeed(seed);
    this.syncMetrics();
  }

  private bootstrapPopulation(): void {
    this.populationManager.initialize(this.activeSeed);
    this.currentGeneration = 0;
    this.syncMetrics();
  }

  private syncMetrics(): void {
    this.metrics = this.populationManager.getMetrics();
  }
}
