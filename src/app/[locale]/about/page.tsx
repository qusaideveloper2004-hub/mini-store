import type {Metadata} from 'next';

import AboutPage from '@/components/about/AboutPage';
import {
  localeFrom,
  pageMetadata,
} from '@/lib/seo';

type AboutRouteProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: AboutRouteProps): Promise<Metadata> {
  const {locale} = await params;

  return pageMetadata(
    localeFrom(locale),
    'about',
    'about',
    true
  );
}

export default function AboutRoute() {
  return <AboutPage />;
}