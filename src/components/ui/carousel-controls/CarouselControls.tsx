"use client";

import styles from "./CarouselControls.module.css";

type CarouselControlsProps = {
  previousLabel: string;
  nextLabel: string;
  onPrevious: () => void;
  onNext: () => void;
};

export default function CarouselControls({
  previousLabel,
  nextLabel,
  onPrevious,
  onNext,
}: CarouselControlsProps) {
  return (
    <div className={styles.controls}>
      <button
        type="button"
        className={styles.controlButton}
        aria-label={previousLabel}
        onClick={onPrevious}
      >
        <ArrowIcon direction="left" />
      </button>

      <button
        type="button"
        className={styles.controlButton}
        aria-label={nextLabel}
        onClick={onNext}
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}

type ArrowIconProps = {
  direction: "left" | "right";
};

function ArrowIcon({direction}: ArrowIconProps) {
  const path =
    direction === "left"
      ? "m15 18-6-6 6-6"
      : "m9 18 6-6-6-6";

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}