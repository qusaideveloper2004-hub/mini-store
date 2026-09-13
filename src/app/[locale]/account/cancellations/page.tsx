import {getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {localeFrom, pageMetadata} from '@/lib/seo';
import AccountLayout from '@/components/account/AccountLayout';
import CancellationList from '@/components/account/cancellations/CancellationList';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadata(localeFrom(locale), 'account/cancellations', 'cancellations');
}

export default async function CancellationsPage() {
  const t = await getTranslations('account');

  return (
    <AccountLayout
      homeLabel={t('home')}
      accountLabel={t('account')}
      pageTitle={t('cancellations')}
      breadcrumbLabel={t('account')}
    >
      <CancellationList />
    </AccountLayout>
  );
}
