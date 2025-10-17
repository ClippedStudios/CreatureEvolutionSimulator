import { ControlPanel } from "./ui/ControlPanel";
import { SimulationView } from "./ui/SimulationView";
import { SimulationController } from "../simulation/SimulationController";
import { defaultSimulationParameters } from "../config/defaults";
import type { SimulationParameters } from "../types";

export class Application {
  private readonly root: HTMLElement;
  private readonly controller: SimulationController;
  private simulationView: SimulationView | null = null;
  private controlPanel: ControlPanel | null = null;

  constructor(root: HTMLElement) {
    this.root = root;
    this.controller = new SimulationController(defaultSimulationParameters);
  }

  public async initialize(): Promise<void> {
    this.root.innerHTML = "";

    const sidebar = document.createElement("aside");
    const main = document.createElement("main");

    this.root.append(sidebar, main);

    this.simulationView = new SimulationView(main);
    this.controlPanel = new ControlPanel(sidebar, {
      parameters: this.controller.parameters,
      onStart: () => this.handleStart(),
      onPause: () => this.handlePause(),
      onReset: () => this.handleReset(),
      onParametersChanged: (params) => this.handleParameterChange(params),
      onSeedApplied: (seed) => this.handleSeedApplied(seed)
    });

    await this.simulationView.initialize();
  }

  private handleStart(): void {
    this.controller.start();
    this.simulationView?.setStatus("Running");
    this.simulationView?.updateMetrics(this.controller.currentMetrics);
  }

  private handlePause(): void {
    this.controller.pause();
    this.simulationView?.setStatus("Paused");
    this.simulationView?.updateMetrics(this.controller.currentMetrics);
  }

  private handleReset(): void {
    this.controller.reset();
    this.simulationView?.setStatus("Ready");
    this.simulationView?.updateMetrics(this.controller.currentMetrics);
  }

  private handleParameterChange(params: SimulationParameters): void {
    this.controller.updateParameters(params);
    this.simulationView?.updateMetrics(this.controller.currentMetrics);
  }

  private handleSeedApplied(seed: number): void {
    this.controller.updateSeed(seed);
    this.simulationView?.updateMetrics(this.controller.currentMetrics);
  }
}
