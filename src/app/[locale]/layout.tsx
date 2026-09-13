import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';

import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const {locale} = await params;

  setRequestLocale(locale);

  const messages = await getMessages();

  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
    >
      <div lang={locale} dir={direction}>
        <Header />

        {children}

        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}

// src/app/layout.tsx
// └── مسؤول عن html و body
//src/app/layout.tsx
//↓ يلف كل المشروع
//أما src/app/layout.tsx فمسؤوليته مختلفة قليلًا:
//- يضع <html> و<body>.
//- يستورد globals.css.
//- يضبط lang وdir الأساسيين.
//- يضع Metadata وSEO العام.
//ولا نضع داخله Header وFooter في مشروعك؛ لأن Header يحتاج ترجمة، والترجمة موجودة داخل NextIntlClientProvider في الـLocale Layout.



// src/app/[locale]/layout.tsx
// └── يقرأ locale من الرابط
// └── يحدد direction
// └── يجهز الترجمة
// └── يعرض Header والصفحات
//src/app/[locale]/layout.tsx
//↓ يلف كل الصفحات التي تبدأ بـ /en أو /ar
