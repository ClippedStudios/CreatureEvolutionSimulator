export class Random {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  public next(): number {
    // Mulberry32 PRNG for deterministic cross-platform randomness.
    this.seed |= 0;
    this.seed = (this.seed + 0x6d2b79f5) | 0;
    let t = Math.imul(this.seed ^ (this.seed >>> 15), 1 | this.seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  public floatInRange(min: number, max: number): number {
    return min + (max - min) * this.next();
  }

  public intInRange(min: number, max: number): number {
    const lower = Math.ceil(min);
    const upper = Math.floor(max);
    return Math.floor(this.floatInRange(lower, upper + 1));
  }
}
