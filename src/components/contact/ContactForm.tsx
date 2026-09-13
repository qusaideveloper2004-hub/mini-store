'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useLocale, useTranslations} from 'next-intl';
import {z} from 'zod';

import {createContactSchema} from '@/schemas/contact/contactSchema';

import styles from './ContactForm.module.css';

export default function ContactForm() {
  const locale = useLocale();

  const t = useTranslations('contact');

  const contactSchema = createContactSchema(
    locale === 'ar' ? 'ar' : 'en'
  );

  type ContactFormData = z.infer<
    typeof contactSchema
  >;

  const [successMessage, setSuccessMessage] =
    useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  function onSubmit(data: ContactFormData) {
    console.log('Contact form data:', data);

    setSuccessMessage(t('successMessage'));

    reset();
  }

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.fieldRow}>
        <Field
          label={t('name')}
          error={errors.name?.message}
        >
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder={t('namePlaceholder')}
            {...register('name')}
          />
        </Field>

        <Field
          label={t('emailLabel')}
          error={errors.email?.message}
        >
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t('emailPlaceholder')}
            {...register('email')}
          />
        </Field>
      </div>

      <Field
        label={t('message')}
        error={errors.message?.message}
      >
        <textarea
          id="message"
          rows={7}
          placeholder={t('messagePlaceholder')}
          {...register('message')}
        />
      </Field>

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
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {t('sendMessage')}
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