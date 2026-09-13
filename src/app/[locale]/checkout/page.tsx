// اهم ملحوظه انا هنا استخدمت getTranslations بدل useTranslations لان useTranslations لا تعمل في server component و getTranslations تعمل في server component
import type {Metadata} from 'next';
import {localeFrom, pageMetadata} from '@/lib/seo';
import CheckoutPage from '@/components/checkout/CheckoutPage';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadata(localeFrom(locale), 'checkout', 'checkout');
}

export default function CheckoutRoute() {
  return <CheckoutPage />;
}
