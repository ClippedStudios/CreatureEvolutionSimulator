import type { ControlPanelOptions, SimulationParameters } from "../../types";
import { createElement } from "../../utils/dom";
import { cloneDeep } from "../../utils/object";

type NumericKey =
  | "populationSize"
  | "evaluationTime"
  | "mutationRate"
  | "crossoverRate"
  | "elitismCount";

type Controls = {
  startButton: HTMLButtonElement;
  pauseButton: HTMLButtonElement;
  resetButton: HTMLButtonElement;
  seedInput: HTMLInputElement;
  parameterInputs: Record<NumericKey, HTMLInputElement>;
};

export class ControlPanel {
  private readonly container: HTMLElement;
  private readonly options: ControlPanelOptions;
  private readonly controls: Controls;
  private workingParameters: SimulationParameters;

  constructor(container: HTMLElement, options: ControlPanelOptions) {
    this.container = container;
    this.options = options;
    this.workingParameters = cloneDeep(options.parameters);
    this.controls = {
      startButton: createElement("button"),
      pauseButton: createElement("button"),
      resetButton: createElement("button"),
      seedInput: createElement("input") as HTMLInputElement,
      parameterInputs: {
        populationSize: createElement("input") as HTMLInputElement,
        evaluationTime: createElement("input") as HTMLInputElement,
        mutationRate: createElement("input") as HTMLInputElement,
        crossoverRate: createElement("input") as HTMLInputElement,
        elitismCount: createElement("input") as HTMLInputElement
      }
    };

    this.render();
  }

  private render(): void {
    this.container.innerHTML = "";

    const title = createElement("h1", { textContent: "Simulation Controls" });
    const buttonGroup = this.renderButtonGroup();
    const parametersFieldset = this.renderParametersFieldset();
    const seedFieldset = this.renderSeedFieldset();

    this.container.append(title, buttonGroup, parametersFieldset, seedFieldset);
  }

  private renderButtonGroup(): HTMLElement {
    const { startButton, pauseButton, resetButton } = this.controls;
    startButton.textContent = "Start";
    pauseButton.textContent = "Pause";
    resetButton.textContent = "Reset";

    pauseButton.disabled = true;

    startButton.addEventListener("click", () => {
      this.options.onStart();
      startButton.disabled = true;
      pauseButton.disabled = false;
    });

    pauseButton.addEventListener("click", () => {
      this.options.onPause();
      startButton.disabled = false;
      pauseButton.disabled = true;
    });

    resetButton.addEventListener("click", () => {
      this.options.onReset();
      startButton.disabled = false;
      pauseButton.disabled = true;
    });

    const group = createElement("div", { className: "button-group" });
    group.append(startButton, pauseButton, resetButton);

    return group;
  }

  private renderParametersFieldset(): HTMLElement {
    const fieldset = createElement("fieldset");
    const legend = createElement("legend", { textContent: "Parameters" });
    const form = createElement("form");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.options.onParametersChanged(cloneDeep(this.workingParameters));
    });

    const descriptors: Array<[NumericKey, string, { min?: number; max?: number; step?: number }]> =
      [
        ["populationSize", "Population Size", { min: 2, step: 1 }],
        ["evaluationTime", "Evaluation Time (s)", { min: 1, step: 0.5 }],
        ["mutationRate", "Mutation Rate", { min: 0, max: 1, step: 0.01 }],
        ["crossoverRate", "Crossover Rate", { min: 0, max: 1, step: 0.01 }],
        ["elitismCount", "Elitism Count", { min: 0, step: 1 }]
      ];

    descriptors.forEach(([key, labelText, attrs]) => {
      const label = createElement("label");
      label.textContent = labelText;
      const input = this.controls.parameterInputs[key];
      input.type = "number";
      input.value = String(this.workingParameters[key]);
      if (attrs.min !== undefined) input.min = String(attrs.min);
      if (attrs.max !== undefined) input.max = String(attrs.max);
      if (attrs.step !== undefined) input.step = String(attrs.step);

      input.addEventListener("change", () => {
        const numericValue = Number.parseFloat(input.value);
        if (Number.isFinite(numericValue)) {
          this.workingParameters[key] = numericValue as never;
        }
      });

      label.appendChild(input);
      form.appendChild(label);
    });

    const submit = createElement("button", { textContent: "Apply Parameters" });
    submit.type = "submit";
    form.appendChild(submit);

    fieldset.append(legend, form);
    return fieldset;
  }

  private renderSeedFieldset(): HTMLElement {
    const { seedInput } = this.controls;
    seedInput.type = "number";
    seedInput.value = String(this.options.parameters.seed);

    const apply = createElement("button", { textContent: "Apply Seed" });
    apply.addEventListener("click", (event) => {
      event.preventDefault();
      const seed = Number.parseInt(seedInput.value, 10);
      if (Number.isFinite(seed)) {
        this.options.onSeedApplied(seed);
      }
    });

    const fieldset = createElement("fieldset");
    const legend = createElement("legend", { textContent: "Random Seed" });
    const wrapper = createElement("div");
    wrapper.append(seedInput, apply);
    fieldset.append(legend, wrapper);
    return fieldset;
  }
}
