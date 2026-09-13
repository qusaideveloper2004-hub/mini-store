'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  useLocale,
  useTranslations,
} from 'next-intl';
import {z} from 'zod';

import {useAddressStore} from '@/store/addressStore';
import {createAddressSchema} from '@/schemas/account/addressSchema';

import styles from './AddressForm.module.css';

export default function AddressForm() {
  const locale = useLocale();

  const t = useTranslations('account');

  const addAddress = useAddressStore(
    (state) => state.addAddress
  );

  const [successMessage, setSuccessMessage] =
    useState('');

  const addressSchema = createAddressSchema(
    locale === 'ar' ? 'ar' : 'en'
  );

  type AddressFormData = z.infer<
    typeof addressSchema
  >;

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      street: '',
      city: '',
      country: '',
      postalCode: '',
    },
  });

  function onSubmit(data: AddressFormData) {
    setSuccessMessage('');

    addAddress({
      id: crypto.randomUUID(),
      ...data,
      isDefault: false,
    });

    reset();

    setSuccessMessage(t('addressAdded'));
  }

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>{t('addAddress')}</h1>

      <div className={styles.fields}>
        <Field
          label={t('firstName')}
          error={errors.firstName?.message}
        >
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            {...register('firstName')}
          />
        </Field>

        <Field
          label={t('lastName')}
          error={errors.lastName?.message}
        >
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            {...register('lastName')}
          />
        </Field>

        <Field
          label={t('phone')}
          error={errors.phone?.message}
        >
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            {...register('phone')}
          />
        </Field>

        <Field
          label={t('street')}
          error={errors.street?.message}
        >
          <input
            id="street"
            type="text"
            autoComplete="street-address"
            {...register('street')}
          />
        </Field>

        <Field
          label={t('city')}
          error={errors.city?.message}
        >
          <input
            id="city"
            type="text"
            autoComplete="address-level2"
            {...register('city')}
          />
        </Field>

        <Field
          label={t('country')}
          error={errors.country?.message}
        >
          <input
            id="country"
            type="text"
            autoComplete="country-name"
            {...register('country')}
          />
        </Field>

        <Field
          label={t('postalCode')}
          error={errors.postalCode?.message}
        >
          <input
            id="postalCode"
            type="text"
            autoComplete="postal-code"
            {...register('postalCode')}
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
          {t('saveAddress')}
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