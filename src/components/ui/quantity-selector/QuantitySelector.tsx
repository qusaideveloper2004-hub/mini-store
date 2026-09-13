"use client";

import styles from "./QuantitySelector.module.css";

type QuantitySelectorProps = {
  quantity: number;
  decreaseLabel: string;
  increaseLabel: string;
  onDecrease: () => void;
  onIncrease: () => void;
  decreaseDisabled?: boolean;
  increaseDisabled?: boolean;
};

export default function QuantitySelector({
  quantity,
  decreaseLabel,
  increaseLabel,
  onDecrease,
  onIncrease,
  decreaseDisabled = false,
  increaseDisabled = false,
}: QuantitySelectorProps) {
  return (
    <div className={styles.selector}>
      <button
        type="button"
        className={styles.button}
        aria-label={decreaseLabel}
        disabled={decreaseDisabled}
        onClick={onDecrease}
      >
        <MinusIcon />
      </button>

      <output className={styles.value} aria-live="polite">
        {quantity}
      </output>

      <button
        type="button"
        className={`${styles.button} ${styles.increaseButton}`}
        aria-label={increaseLabel}
        disabled={increaseDisabled}
        onClick={onIncrease}
      >
        <PlusIcon />
      </button>
    </div>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
