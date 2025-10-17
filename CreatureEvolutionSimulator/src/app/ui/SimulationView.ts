import type { SimulationMetrics } from "../../types";
import { createElement } from "../../utils/dom";

export class SimulationView {
  private readonly container: HTMLElement;
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly statusEl: HTMLDivElement;
  private readonly metricsEl: HTMLDivElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.canvas = createElement("canvas");
    const context = this.canvas.getContext("2d");
    if (!context) {
      throw new Error("Unable to initialize 2D canvas context.");
    }
    this.context = context;
    this.statusEl = createElement("div", { className: "status-indicator" });
    this.metricsEl = createElement("div", { className: "metrics" });
  }

  public async initialize(): Promise<void> {
    this.container.append(this.canvas, this.statusEl, this.metricsEl);
    this.setStatus("Ready");
    this.updateMetrics({
      bestDistance: 0,
      averageDistance: 0,
      generation: 0,
      evaluatedCreatures: 0
    });
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
    this.drawPlaceholder();
  }

  public setStatus(status: string): void {
    this.statusEl.textContent = `Status: ${status}`;
  }

  public updateMetrics(metrics: SimulationMetrics): void {
    this.metricsEl.innerHTML = `
      <dl>
        <dt>Generation</dt>
        <dd>${metrics.generation}</dd>
        <dt>Best Distance</dt>
        <dd>${metrics.bestDistance.toFixed(2)} m</dd>
        <dt>Average Distance</dt>
        <dd>${metrics.averageDistance.toFixed(2)} m</dd>
        <dt>Evaluated Creatures</dt>
        <dd>${metrics.evaluatedCreatures}</dd>
      </dl>
    `;
  }

  private resizeCanvas(): void {
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  private drawPlaceholder(): void {
    const { width, height } = this.canvas;
    this.context.clearRect(0, 0, width, height);
    this.context.fillStyle = "#cbd5f5";
    this.context.fillRect(0, height - 60, width, 60);
    this.context.fillStyle = "#334155";
    this.context.font = "20px Segoe UI";
    this.context.fillText("Simulation visualization will appear here.", 24, height / 2);
  }
}
