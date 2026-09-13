'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  useLocale,
  useTranslations,
} from 'next-intl';
import {z} from 'zod';

import {usePaymentStore} from '@/store/paymentStore';
import {createPaymentSchema} from '@/schemas/account/paymentSchema';

import styles from './PaymentForm.module.css';

export default function PaymentForm() {
  const locale = useLocale();

  const t = useTranslations('account');

  const addPayment = usePaymentStore(
    (state) => state.addPayment
  );

  const [successMessage, setSuccessMessage] =
    useState('');

  const paymentSchema = createPaymentSchema(
    locale === 'ar' ? 'ar' : 'en'
  );

  type PaymentFormData = z.infer<
    typeof paymentSchema
  >;

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardholderName: '',
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
    },
  });

  function detectCardBrand(cardNumber: string) {
    if (cardNumber.startsWith('4')) {
      return 'Visa';
    }

    if (
      cardNumber.startsWith('5') ||
      cardNumber.startsWith('2')
    ) {
      return 'Mastercard';
    }

    if (cardNumber.startsWith('3')) {
      return 'American Express';
    }

    return 'Card';
  }

  function onSubmit(data: PaymentFormData) {
    setSuccessMessage('');

    const last4 = data.cardNumber.slice(-4);

    const brand = detectCardBrand(data.cardNumber);

    addPayment({
      id: crypto.randomUUID(),
      cardholderName: data.cardholderName,
      last4,
      expiryMonth: data.expiryMonth,
      expiryYear: data.expiryYear,
      brand,
      isDefault: false,
    });

    reset();

    setSuccessMessage(t('paymentAdded'));
  }

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>{t('addPayment')}</h1>

      <Field
        label={t('cardholderName')}
        error={errors.cardholderName?.message}
      >
        <input
          id="cardholderName"
          type="text"
          autoComplete="cc-name"
          {...register('cardholderName')}
        />
      </Field>

      <Field
        label={t('cardNumber')}
        error={errors.cardNumber?.message}
      >
        <input
          id="cardNumber"
          type="text"
          inputMode="numeric"
          autoComplete="cc-number"
          {...register('cardNumber')}
        />
      </Field>

      <div className={styles.cardFields}>
        <Field
          label={t('expiryMonth')}
          error={errors.expiryMonth?.message}
        >
          <input
            id="expiryMonth"
            type="text"
            inputMode="numeric"
            placeholder="MM"
            autoComplete="cc-exp-month"
            {...register('expiryMonth')}
          />
        </Field>

        <Field
          label={t('expiryYear')}
          error={errors.expiryYear?.message}
        >
          <input
            id="expiryYear"
            type="text"
            inputMode="numeric"
            placeholder="YYYY"
            autoComplete="cc-exp-year"
            {...register('expiryYear')}
          />
        </Field>

        <Field
          label={t('cvv')}
          error={errors.cvv?.message}
        >
          <input
            id="cvv"
            type="password"
            inputMode="numeric"
            autoComplete="cc-csc"
            {...register('cvv')}
          />
        </Field>
      </div>

      <div className={styles.footer}>
        {successMessage ? (
          <p
            className={styles.successMessage}
            role="status"
          >
            {successMessage}
          </p>
        ) : (
          <span />
        )}

        <button
          type="submit"
          className={styles.saveButton}
          disabled={isSubmitting}
        >
          {t('savePayment')}
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

function Field({
  label,
  error,
  children,
}: FieldProps) {
  return (
    <label className={styles.field}>
      <span>{label}</span>

      {children}

      {error ? (
        <small role="alert">
          {error}
        </small>
      ) : null}
    </label>
  );
}