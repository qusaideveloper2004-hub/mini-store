'use client';

import {useState} from 'react';
import {useForm, useWatch} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useLocale, useTranslations} from 'next-intl';
import {z} from 'zod';

import type {Order} from '@/types/order';
import {createReturnSchema} from '@/schemas/account/returnSchema';
import {useReturnStore} from '@/store/returnStore';

import styles from './ReturnForm.module.css';

type ReturnFormProps = {
  order: Order;
};

export default function ReturnForm({
  order,
}: ReturnFormProps) {
  const locale = useLocale();
  const t = useTranslations('account');

  const createReturn = useReturnStore(
    (state) => state.createReturn
  );

  const returnSchema = createReturnSchema(
    locale === 'ar' ? 'ar' : 'en'
  );

  type ReturnFormData = z.infer<
    typeof returnSchema
  >;

  const [successMessage, setSuccessMessage] =
    useState('');

  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
    reset,
  } = useForm<ReturnFormData>({
    resolver: zodResolver(returnSchema),
  });

  const selectedProductId = useWatch({
    control,
    name: 'productId',
  });

  const selectedItem = order.items.find(
    (item) => item.productId === selectedProductId
  );

  function onSubmit(data: ReturnFormData) {
    const selectedOrderItem = order.items.find(
      (item) => item.productId === data.productId
    );

    if (!selectedOrderItem) {
      return;
    }

    createReturn({
      orderId: order.id,
      item: {
        productId: selectedOrderItem.productId,
        title: selectedOrderItem.title,
        image: selectedOrderItem.image,
        price: selectedOrderItem.price,
      },
      quantity: data.quantity,
      reason: data.reason,
      status: 'requested',
    });

    setSuccessMessage(t('returnSubmitted'));
    reset();
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={styles.title}>
        {t('requestReturn')}
      </h2>

      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="productId">
            {t('returnProduct')}
          </label>

          <select
            id="productId"
            defaultValue=""
            {...register('productId', {
              valueAsNumber: true,
            })}
          >
            <option value="" disabled>
              {t('selectProduct')}
            </option>

            {order.items.map((item) => (
              <option
                key={item.productId}
                value={item.productId}
              >
                {item.title}
              </option>
            ))}
          </select>

          {errors.productId && (
            <p
              className={styles.error}
              role="alert"
            >
              {errors.productId.message}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="quantity">
            {t('returnQuantity')}
          </label>

          <input
            id="quantity"
            type="number"
            min="1"
            max={selectedItem?.quantity ?? 1}
            disabled={!selectedItem}
            {...register('quantity', {
              valueAsNumber: true,
            })}
          />

          {errors.quantity && (
            <p
              className={styles.error}
              role="alert"
            >
              {errors.quantity.message}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="reason">
            {t('returnReason')}
          </label>

          <select
            id="reason"
            defaultValue=""
            {...register('reason')}
          >
            <option value="" disabled>
              {t('selectReason')}
            </option>

            <option value="wrong-size">
              {t('wrongSize')}
            </option>

            <option value="wrong-product">
              {t('wrongProduct')}
            </option>

            <option value="damaged">
              {t('damagedProduct')}
            </option>

            <option value="not-needed">
              {t('notNeeded')}
            </option>
          </select>

          {errors.reason && (
            <p
              className={styles.error}
              role="alert"
            >
              {errors.reason.message}
            </p>
          )}
        </div>
      </div>

      {successMessage && (
        <p
          className={styles.success}
          role="status"
        >
          {successMessage}
        </p>
      )}

      <button
        className={styles.submitButton}
        type="submit"
      >
        {t('submitReturn')}
      </button>
    </form>
  );
}