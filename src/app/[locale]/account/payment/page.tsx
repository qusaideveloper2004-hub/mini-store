import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';

import AccountLayout from '@/components/account/AccountLayout';
import PaymentList from '@/components/account/payment/PaymentList';
import PaymentForm from '@/components/account/payment/PaymentForm';

import {
  localeFrom,
  pageMetadata,
} from '@/lib/seo';

type PaymentOptionsRouteProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: PaymentOptionsRouteProps): Promise<Metadata> {
  const {locale} = await params;

  return pageMetadata(
    localeFrom(locale),
    'account/payment',
    'payment'
  );
}

export default async function PaymentOptionsPage() {
  const t = await getTranslations('account');

  return (
    <AccountLayout
      homeLabel={t('home')}
      accountLabel={t('account')}
      pageTitle={t('paymentOptions')}
      breadcrumbLabel={t('account')}
    >
      <PaymentList />

      <PaymentForm />
    </AccountLayout>
  );
}