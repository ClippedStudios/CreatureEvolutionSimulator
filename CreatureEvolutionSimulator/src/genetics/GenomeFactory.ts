import type { Genome, SimulationParameters } from "../types";
import { Random } from "../utils/random";
import { clamp } from "../utils/math";
import { generateId } from "../utils/id";

export class GenomeFactory {
  private parameters: SimulationParameters;
  private random: Random;

  constructor(parameters: SimulationParameters) {
    this.parameters = parameters;
    this.random = new Random(parameters.seed);
  }

  public updateParameters(parameters: SimulationParameters): void {
    this.parameters = parameters;
    this.random = new Random(parameters.seed);
  }

  public createRandomGenome(seedOverride?: number): Genome {
    const random = seedOverride ? new Random(seedOverride) : this.random;
    const limbCount = random.intInRange(
      this.parameters.limbs.min,
      this.parameters.limbs.max
    );

    const limbs = Array.from({ length: limbCount }, () => ({
      id: generateId("limb"),
      length: random.floatInRange(
        this.parameters.limbLength.min,
        this.parameters.limbLength.max
      ),
      mass: random.floatInRange(
        this.parameters.limbMass.min,
        this.parameters.limbMass.max
      ),
      angle: random.floatInRange(-Math.PI / 2, Math.PI / 2)
    }));

    const joints = limbs.slice(1).map((limb, index) => ({
      id: generateId("joint"),
      parentId: limbs[index].id,
      childId: limb.id,
      pivot: {
        x: clamp(
          random.floatInRange(-0.5, 0.5),
          -this.parameters.jointOffsetLimit,
          this.parameters.jointOffsetLimit
        ),
        y: clamp(
          random.floatInRange(-0.5, 0.5),
          -this.parameters.jointOffsetLimit,
          this.parameters.jointOffsetLimit
        )
      },
      limits: {
        min: -Math.PI / 3,
        max: Math.PI / 3
      }
    }));

    const actuators = joints.map((joint) => ({
      jointId: joint.id,
      torque: random.floatInRange(
        this.parameters.actuatorTorque.min,
        this.parameters.actuatorTorque.max
      ),
      frequency: random.floatInRange(
        this.parameters.actuatorFrequency.min,
        this.parameters.actuatorFrequency.max
      ),
      phase: random.floatInRange(0, Math.PI * 2)
    }));

    return {
      id: generateId("genome"),
      limbs,
      joints,
      actuators
    };
  }
}
