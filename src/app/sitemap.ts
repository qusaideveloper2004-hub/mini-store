import type {MetadataRoute} from 'next';
import {getCategories, getProducts} from '@/lib/product/data';
import {absoluteUrl, localizedPath} from '@/lib/seo';

const locales = ['en', 'ar'] as const;
const staticPages = ['', 'shop', 'about', 'contact'];

function alternatives(path: string) {
  return {
    languages: {
      en: absoluteUrl(localizedPath('en', path)),
      ar: absoluteUrl(localizedPath('ar', path)),
      'x-default': absoluteUrl(localizedPath('en', path)),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const staticEntries = staticPages.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, path)),
      changeFrequency: path ? 'monthly' as const : 'weekly' as const,
      priority: path ? 0.8 : 1,
      alternates: alternatives(path),
    }))
  );

  const categoryEntries = categories.flatMap((slug) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, `category/${slug}`)),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: alternatives(`category/${slug}`),
    }))
  );

  const productEntries = products.flatMap((product) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, `product/${product.id}`)),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: alternatives(`product/${product.id}`),
      images: [product.image],
    }))
  );

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
