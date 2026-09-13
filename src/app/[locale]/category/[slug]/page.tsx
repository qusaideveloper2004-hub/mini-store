import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {getCategories, getProductsByCategory} from '@/lib/product/data';
import ProductCard from '@/components/product/product-card/ProductCard';
import {categoryLabel, languageAlternates, localeFrom, localizedPath, SITE_NAME} from '@/lib/seo';

type CategoryPageProps = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

export async function generateMetadata({params}: CategoryPageProps): Promise<Metadata> {
  const {slug, locale: localeParam} = await params;
  const locale = localeFrom(localeParam);
  const categories = await getCategories();

  if (!categories.includes(slug)) {
    return {title: locale === 'ar' ? 'الفئة غير موجودة' : 'Category not found', robots: {index: false, follow: false}};
  }

  const name = categoryLabel(slug);
  const description = locale === 'ar'
    ? `تسوق منتجات ${name} في متجر ميني ستور.`
    : `Shop ${name} products at Mini Store.`;
  const path = `category/${slug}`;

  return {
    title: name,
    description,
    alternates: languageAlternates(locale, path),
    openGraph: {
      title: name,
      description,
      url: localizedPath(locale, path),
      siteName: SITE_NAME,
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      alternateLocale: locale === 'ar' ? 'en_US' : 'ar_EG',
      type: 'website',
    },
    twitter: {card: 'summary', title: name, description},
  };
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const {slug} = await params;
  const categories = await getCategories();

  if (!categories.includes(slug)) {
    notFound();
  }

  const products = await getProductsByCategory(slug);

  return (
    <main>
      <h1>{slug}</h1>

      <section className="container productGrid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </section>
    </main>
  );
}
