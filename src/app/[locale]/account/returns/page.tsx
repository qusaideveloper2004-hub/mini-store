import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';

import AccountLayout from '@/components/account/AccountLayout';
import ReturnList from '@/components/account/returns/ReturnList';
import {localeFrom, pageMetadata} from '@/lib/seo';

type ReturnsRouteProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: ReturnsRouteProps): Promise<Metadata> {
  const {locale} = await params;

  return pageMetadata(
    localeFrom(locale),
    'account/returns',
    'returns'
  );
}

export default async function ReturnsPage() {
  const t = await getTranslations('account');

  return (
    <AccountLayout
      homeLabel={t('home')}
      accountLabel={t('account')}
      pageTitle={t('returns')}
      breadcrumbLabel={t('account')}
    >
      <ReturnList />
    </AccountLayout>
  );
}