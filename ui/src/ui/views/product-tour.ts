import { html, nothing } from "lit";
import type { ProductTourStep } from "../navigation.ts";

export type ProductTourProps = {
  active: boolean;
  stepIndex: number;
  steps: ProductTourStep[];
  onNext: () => void;
  onSkip: () => void;
};

export function renderProductTour(props: ProductTourProps) {
  if (!props.active || props.steps.length === 0) {
    return nothing;
  }

  const index = Math.min(Math.max(0, props.stepIndex), props.steps.length - 1);
  const step = props.steps[index]!;
  const isLast = index >= props.steps.length - 1;

  return html`
    <div
      class="product-tour"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-tour-title"
      aria-describedby="product-tour-body"
      @keydown=${(e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          props.onSkip();
        }
      }}
    >
      <div class="product-tour__backdrop" @click=${props.onSkip}></div>
      <div class="product-tour__card card">
        <p class="product-tour__progress">步骤 ${index + 1} / ${props.steps.length}</p>
        <h2 id="product-tour-title" class="product-tour__title">${step.title}</h2>
        <p id="product-tour-body" class="product-tour__body">${step.body}</p>
        <div class="product-tour__actions">
          <button type="button" class="btn" @click=${props.onSkip}>跳过</button>
          <button type="button" class="btn primary" @click=${props.onNext}>
            ${isLast ? "开始使用" : "下一步"}
          </button>
        </div>
      </div>
    </div>
  `;
}
