import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';

import ContactPage from '@/components/contact/ContactPage';
import ContactForm from '@/components/contact/ContactForm';

import {
  localeFrom,
  pageMetadata,
} from '@/lib/seo';

type ContactRouteProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: ContactRouteProps): Promise<Metadata> {
  const {locale} = await params;

  return pageMetadata(
    localeFrom(locale),
    'contact',
    'contact',
    true
  );
}

export default async function ContactRoute() {
  const t = await getTranslations('contact');

  return (
    <ContactPage
      homeLabel={t('home')}
      title={t('title')}
      breadcrumbLabel={t('breadcrumbLabel')}
      callUsTitle={t('callUsTitle')}
      callUsDescription={t('callUsDescription')}
      phone={t('phone')}
      writeUsTitle={t('writeUsTitle')}
      writeUsDescription={t('writeUsDescription')}
      email={t('contactEmail')}
    >
      <ContactForm />
    </ContactPage>
  );
}