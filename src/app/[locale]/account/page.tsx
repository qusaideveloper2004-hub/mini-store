import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';

import AccountLayout from '@/components/account/AccountLayout';
import ProfileForm from '@/components/account/profile/ProfileForm';

import {
  localeFrom,
  pageMetadata,
} from '@/lib/seo';

type AccountRouteProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: AccountRouteProps): Promise<Metadata> {
  const {locale} = await params;

  return pageMetadata(
    localeFrom(locale),
    'account',
    'account'
  );
}

export default async function AccountPage() {
  const t = await getTranslations('account');

  return (
    <AccountLayout
      homeLabel={t('home')}
      accountLabel={t('account')}
      pageTitle={t('myProfile')}
      breadcrumbLabel={t('account')}
    >
      <ProfileForm />
    </AccountLayout>
  );
}