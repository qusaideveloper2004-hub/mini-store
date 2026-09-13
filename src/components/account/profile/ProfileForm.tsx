'use client';

import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  useLocale,
  useTranslations,
} from 'next-intl';
import {z} from 'zod';

import {useAuthStore} from '@/store/authStore';
import {createAccountSchema} from '@/schemas/account/accountSchema';

import styles from './ProfileForm.module.css';

export default function ProfileForm() {
  const locale = useLocale();

  const t = useTranslations('account');

  const user = useAuthStore(
    (state) => state.user
  );

  const updateProfile = useAuthStore(
    (state) => state.updateProfile
  );

  const updatePassword = useAuthStore(
    (state) => state.updatePassword
  );

  const [successMessage, setSuccessMessage] =
    useState('');

  const accountSchema = createAccountSchema(
    locale === 'ar' ? 'ar' : 'en'
  );

  type AccountFormData = z.infer<
    typeof accountSchema
  >;

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  }, [user, reset]);

  function onSubmit(data: AccountFormData) {
    setSuccessMessage('');

    updateProfile({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address: data.address,
    });

    const hasPasswordInput =
      data.currentPassword ||
      data.newPassword ||
      data.confirmPassword;

    if (hasPasswordInput) {
      const passwordUpdated = updatePassword(
        data.currentPassword ?? '',
        data.newPassword ?? ''
      );

      if (!passwordUpdated) {
        return;
      }
    }

    setSuccessMessage(t('changesSaved'));

    reset({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address: data.address,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  }

  function handleCancel() {
    if (!user) {
      return;
    }

    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });

    setSuccessMessage('');
  }

  if (!user) {
    return null;
  }

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>{t('editProfile')}</h1>

      <div className={styles.profileFields}>
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
          label={t('email')}
          error={errors.email?.message}
        >
          <input
            id="email"
            type="text"
            autoComplete="email"
            {...register('email')}
          />
        </Field>

        <Field
          label={t('address')}
          error={errors.address?.message}
        >
          <input
            id="address"
            type="text"
            autoComplete="street-address"
            {...register('address')}
          />
        </Field>
      </div>

      <section className={styles.passwordSection}>
        <h2>{t('passwordChanges')}</h2>

        <div className={styles.passwordFields}>
          <Field
            label={t('currentPassword')}
            error={errors.currentPassword?.message}
          >
            <input
              id="currentPassword"
              type="password"
              autoComplete="current-password"
              {...register('currentPassword')}
            />
          </Field>

          <Field
            label={t('newPassword')}
            error={errors.newPassword?.message}
          >
            <input
              id="newPassword"
              type="password"
              autoComplete="new-password"
              {...register('newPassword')}
            />
          </Field>

          <Field
            label={t('confirmNewPassword')}
            error={errors.confirmPassword?.message}
          >
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              {...register('confirmPassword')}
            />
          </Field>
        </div>
      </section>

      <div className={styles.actions}>
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

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
          >
            {t('cancel')}
          </button>

          <button
            type="submit"
            className={styles.saveButton}
            disabled={isSubmitting}
          >
            {t('saveChanges')}
          </button>
        </div>
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