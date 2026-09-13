import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';

import AccountLayout from '@/components/account/AccountLayout';
import OrderList from '@/components/account/orders/OrderList';
import {localeFrom, pageMetadata} from '@/lib/seo';

type OrdersRouteProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: OrdersRouteProps): Promise<Metadata> {
  const {locale} = await params;

  return pageMetadata(
    localeFrom(locale),
    'account/orders',
    'orders'
  );
}

export default async function OrdersPage() {
  const t = await getTranslations('account');

  return (
    <AccountLayout
      homeLabel={t('home')}
      accountLabel={t('account')}
      pageTitle={t('orders')}
      breadcrumbLabel={t('account')}
    >
      <OrderList />
    </AccountLayout>
  );
}