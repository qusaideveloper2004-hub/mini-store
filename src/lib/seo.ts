import type {Metadata} from 'next';

export const SITE_NAME = 'Mini Store';

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const siteUrl = new URL(
  configuredSiteUrl && /^https?:\/\//.test(configuredSiteUrl)
    ? configuredSiteUrl
    : 'http://localhost:3000'
);

export type Locale = 'en' | 'ar';

const copy = {
  en: {
    home: ['Shop products online', 'Browse products and categories at Mini Store.'],
    shop: ['Shop', 'Browse all products at Mini Store.'],
    about: ['About us', 'Learn about Mini Store and our approach to simple online shopping.'],
    contact: ['Contact us', 'Get in touch with the Mini Store team.'],
    login: ['Log in', 'Sign in to your Mini Store account.'],
    signup: ['Create an account', 'Create a Mini Store account.'],
    'forgot-password': ['Reset your password', 'Request a password reset for your Mini Store account.'],
    cart: ['Your cart', 'Review the items in your shopping cart.'],
    wishlist: ['Your wishlist', 'Review products saved to your wishlist.'],
    checkout: ['Checkout', 'Complete your Mini Store order.'],
    account: ['My account', 'Manage your Mini Store account.'],
    orders: ['My orders', 'View your Mini Store orders.'],
    returns: ['My returns', 'Manage your return requests.'],
    cancellations: ['My cancellations', 'Manage your cancellation requests.'],
    payment: ['Payment options', 'Manage your saved payment options.'],
    address: ['Address book', 'Manage your saved addresses.'],
  },
  ar: {
    shop: ['المتجر', 'تصفح كل المنتجات في متجر ميني ستور.'],
    home: ['تسوق المنتجات عبر الإنترنت', 'تصفح المنتجات والفئات في متجر ميني ستور.'],
    about: ['من نحن', 'تعرف على متجر ميني ستور ونهجنا في التسوق الإلكتروني البسيط.'],
    contact: ['اتصل بنا', 'تواصل مع فريق متجر ميني ستور.'],
    login: ['تسجيل الدخول', 'سجّل الدخول إلى حسابك في متجر ميني ستور.'],
    signup: ['إنشاء حساب', 'أنشئ حسابًا في متجر ميني ستور.'],
    'forgot-password': ['إعادة تعيين كلمة المرور', 'اطلب إعادة تعيين كلمة مرور حسابك في متجر ميني ستور.'],
    cart: ['سلة التسوق', 'راجع المنتجات الموجودة في سلة التسوق.'],
    wishlist: ['قائمة المفضلة', 'راجع المنتجات المحفوظة في قائمة المفضلة.'],
    checkout: ['إتمام الطلب', 'أكمل طلبك من متجر ميني ستور.'],
    account: ['حسابي', 'أدر حسابك في متجر ميني ستور.'],
    orders: ['طلباتي', 'اعرض طلباتك من متجر ميني ستور.'],
    returns: ['مرتجعاتي', 'أدر طلبات الإرجاع الخاصة بك.'],
    cancellations: ['إلغاءات طلباتي', 'أدر طلبات الإلغاء الخاصة بك.'],
    payment: ['خيارات الدفع', 'أدر خيارات الدفع المحفوظة لديك.'],
    address: ['دفتر العناوين', 'أدر العناوين المحفوظة لديك.'],
  },
} as const;

type PageKey = keyof typeof copy.en;

export function localeFrom(value: string): Locale {
  return value === 'ar' ? 'ar' : 'en';
}

export function localizedPath(locale: Locale, path = ''): string {
  const suffix = path ? `/${path.replace(/^\//, '')}` : '';
  return `/${locale}${suffix}`;
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

export function languageAlternates(locale: Locale, path = ''): Metadata['alternates'] {
  return {
    canonical: localizedPath(locale, path),
    languages: {
      en: localizedPath('en', path),
      ar: localizedPath('ar', path),
      'x-default': localizedPath('en', path),
    },
  };
}

export function pageMetadata(
  locale: Locale,
  path: string,
  key: PageKey,
  indexable = false
): Metadata {
  const [title, description] = copy[locale][key];
  const url = localizedPath(locale, path);

  return {
    title,
    description,
    alternates: languageAlternates(locale, path),
    robots: indexable ? undefined : {index: false, follow: false},
    openGraph: indexable
      ? {
          title,
          description,
          url,
          siteName: SITE_NAME,
          locale: locale === 'ar' ? 'ar_EG' : 'en_US',
          alternateLocale: locale === 'ar' ? 'en_US' : 'ar_EG',
          type: 'website',
        }
      : undefined,
    twitter: indexable
      ? {card: 'summary', title, description}
      : undefined,
  };
}

export function categoryLabel(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}
