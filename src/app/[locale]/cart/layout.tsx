import type {Metadata} from 'next';
import {localeFrom, pageMetadata} from '@/lib/seo';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadata(localeFrom(locale), 'cart', 'cart');
}

export default function CartLayout({children}: Readonly<{children: React.ReactNode}>) {
  return children;
}
