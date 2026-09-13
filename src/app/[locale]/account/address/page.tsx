import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';

import AccountLayout from '@/components/account/AccountLayout';
import AddressList from '@/components/account/address/AddressList';
import AddressForm from '@/components/account/address/AddressForm';

import {
  localeFrom,
  pageMetadata,
} from '@/lib/seo';

type AddressBookRouteProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: AddressBookRouteProps): Promise<Metadata> {
  const {locale} = await params;

  return pageMetadata(
    localeFrom(locale),
    'account/address',
    'address'
  );
}

export default async function AddressBookPage() {
  const t = await getTranslations('account');

  return (
    <AccountLayout
      homeLabel={t('home')}
      accountLabel={t('account')}
      pageTitle={t('addressBook')}
      breadcrumbLabel={t('account')}
    >
      <AddressList />

      <AddressForm />
    </AccountLayout>
  );
}