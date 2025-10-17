import type { Genome, SimulationMetrics, SimulationParameters } from "../types";
import { GenomeFactory } from "./GenomeFactory";
import { Random } from "../utils/random";
import { createInitialMetrics } from "../utils/metrics";

export class PopulationManager {
  private readonly genomes: Genome[] = [];
  private best: Genome | null = null;
  private parameters: SimulationParameters;
  private readonly genomeFactory: GenomeFactory;
  private random: Random;
  private metrics: SimulationMetrics = createInitialMetrics();

  constructor(parameters: SimulationParameters, genomeFactory: GenomeFactory) {
    this.parameters = parameters;
    this.genomeFactory = genomeFactory;
    this.random = new Random(parameters.seed);
  }

  public get bestGenome(): Genome | null {
    return this.best;
  }

  public initialize(seed: number): void {
    this.clear();
    this.random = new Random(seed);

    for (let i = 0; i < this.parameters.populationSize; i += 1) {
      this.genomes.push(this.genomeFactory.createRandomGenome(this.random.intInRange(0, 1e9)));
    }

    this.evaluateFitness();
  }

  public clear(): void {
    this.genomes.length = 0;
    this.best = null;
    this.metrics = createInitialMetrics();
  }

  public updateParameters(parameters: SimulationParameters): void {
    this.parameters = parameters;
  }

  public updateSeed(seed: number): void {
    this.random = new Random(seed);
  }

  public getMetrics(): SimulationMetrics {
    return this.metrics;
  }

  private evaluateFitness(): void {
    // Placeholder fitness evaluation. Integrate physics to obtain real values.
    const mockScores = this.genomes.map((_genome, index) => ({
      genome: this.genomes[index],
      score: this.random.floatInRange(0, 10)
    }));

    mockScores.sort((a, b) => b.score - a.score);
    const top = mockScores[0];
    this.best = top?.genome ?? null;
    const average =
      mockScores.reduce((sum, entry) => sum + entry.score, 0) / mockScores.length || 0;

    this.metrics = {
      bestDistance: top?.score ?? 0,
      averageDistance: average,
      generation: 0,
      evaluatedCreatures: mockScores.length
    };
  }
}
