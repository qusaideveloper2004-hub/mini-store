"use client";

import Image from "next/image";
import type {Product} from "@/types/product";
import QuantitySelector from "@/components/ui/quantity-selector/QuantitySelector";
import styles from "./CartItemRow.module.css";

type CartItem = Product & {quantity: number};

type CartItemRowProps = {
  item: CartItem;
  price: string;
  subtotal: string;
  decreaseLabel: string;
  increaseLabel: string;
  removeLabel: string;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
};

export default function CartItemRow({
  item,
  price,
  subtotal,
  decreaseLabel,
  increaseLabel,
  removeLabel,
  onDecrease,
  onIncrease,
  onRemove,
}: CartItemRowProps) {
  return (
    <article className={styles.row}>
      <div className={styles.product}>
        <button type="button" className={styles.removeButton} onClick={onRemove} aria-label={removeLabel}>
          <CloseIcon />
        </button>
        <div className={styles.imageSurface}>
          <Image className={styles.image} src={item.image} alt={item.title} width={96} height={96} />
        </div>
        <p className={styles.title}>{item.title}</p>
      </div>

      <p className={styles.price}>{price}</p>

      <div className={styles.quantity}>
        <QuantitySelector
          quantity={item.quantity}
          decreaseLabel={decreaseLabel}
          increaseLabel={increaseLabel}
          decreaseDisabled={item.quantity <= 1}
          increaseDisabled={item.quantity >= Math.max(1, item.stock)}
          onDecrease={onDecrease}
          onIncrease={onIncrease}
        />
      </div>

      <p className={styles.subtotal}>{subtotal}</p>
    </article>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
