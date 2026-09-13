'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useLocale, useTranslations} from 'next-intl';
import {z} from 'zod';

import type {Order} from '@/types/order';
import {createCancellationSchema} from '@/schemas/account/cancellationSchema';
import {useCancellationStore} from '@/store/cancellationStore';
import {useOrderStore} from '@/store/orderStore';

import styles from './CancellationForm.module.css';

const createCancellationId = () =>
  `CAN-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

type CancellationFormProps = {
  order: Order;
};

export default function CancellationForm({order}: CancellationFormProps) {
  const locale = useLocale();
  const t = useTranslations('account');
  const createCancellation = useCancellationStore(
    (state) => state.createCancellation
  );
  const updateOrderStatus = useOrderStore(
    (state) => state.updateOrderStatus
  );
  const cancellationSchema = createCancellationSchema(
    locale === 'ar' ? 'ar' : 'en'
  );

  type CancellationFormData = z.infer<typeof cancellationSchema>;

  const [successMessage, setSuccessMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<CancellationFormData>({
    resolver: zodResolver(cancellationSchema),
  });

  function onSubmit(data: CancellationFormData) {
    createCancellation({
      id: createCancellationId(),
      orderId: order.id,
      reason: data.reason,
      date: new Date().toISOString(),
      status: 'requested',
    });

    updateOrderStatus(order.id, 'cancelled');
    setSuccessMessage(t('cancellationSubmitted'));
    reset();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>{t('cancelOrder')}</h2>

      <div className={styles.field}>
        <label htmlFor="cancellationReason">
          {t('cancellationReason')}
        </label>

        <select
          id="cancellationReason"
          defaultValue=""
          {...register('reason')}
        >
          <option value="" disabled>
            {t('selectCancellationReason')}
          </option>
          <option value="changed-my-mind">{t('changedMyMind')}</option>
          <option value="ordered-by-mistake">{t('orderedByMistake')}</option>
          <option value="found-better-price">{t('foundBetterPrice')}</option>
          <option value="delivery-too-late">{t('deliveryTooLate')}</option>
        </select>

        {errors.reason && (
          <p className={styles.error} role="alert">
            {errors.reason.message}
          </p>
        )}
      </div>

      {successMessage && (
        <p className={styles.success} role="status">
          {successMessage}
        </p>
      )}

      <button className={styles.submitButton} type="submit">
        {t('submitCancellation')}
      </button>
    </form>
  );
}
