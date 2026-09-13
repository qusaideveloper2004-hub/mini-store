import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {getProductOrNull} from '@/lib/product/data';
import {getProductsByCategory} from '@/lib/product/data';
import {absoluteUrl, categoryLabel, languageAlternates, localeFrom, localizedPath, SITE_NAME} from '@/lib/seo';
import ProductDetails from '@/components/product/product-details/ProductDetails';
import {getTranslations} from 'next-intl/server';

type ProductPageProps = {
  params: Promise<{
    id: string;
    locale: string;
  }>;
};

export async function generateMetadata({params}: ProductPageProps): Promise<Metadata> {
  const {id, locale: localeParam} = await params;
  const locale = localeFrom(localeParam);
  const product = await getProductOrNull(Number(id));

  if (!product) {
    return {
      title: locale === 'ar' ? 'المنتج غير موجود' : 'Product not found',
      robots: {index: false, follow: false},
    };
  }

  const path = `product/${product.id}`;
  const title = product.title;
  const description = product.description;
  const url = localizedPath(locale, path);

  return {
    title,
    description,
    alternates: languageAlternates(locale, path),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      alternateLocale: locale === 'ar' ? 'en_US' : 'ar_EG',
      type: 'website',
      images: [{url: product.image, alt: product.title}],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const {id, locale: localeParam} = await params;
  const locale = localeFrom(localeParam);

  const product = await getProductOrNull(Number(id));

  if (!product) {
    notFound();
  }

  const productUrl = absoluteUrl(localizedPath(locale, `product/${product.id}`));
  const categoryUrl = absoluteUrl(localizedPath(locale, `category/${product.category}`));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: product.title,
        description: product.description,
        image: product.image,
        category: product.category,
        url: productUrl,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {'@type': 'ListItem', position: 1, name: SITE_NAME, item: absoluteUrl(localizedPath(locale))},
          {'@type': 'ListItem', position: 2, name: categoryLabel(product.category), item: categoryUrl},
          {'@type': 'ListItem', position: 3, name: product.title, item: productUrl},
        ],
      },
    ],
  };

  const [t, categoryProducts] = await Promise.all([
    getTranslations('productDetails'),
    getProductsByCategory(product.category),
  ]);
  const relatedProducts = categoryProducts
    .filter((categoryProduct) => categoryProduct.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')}}
      />
      <ProductDetails
        product={product}
        relatedProducts={relatedProducts}
        homeLabel={t('home')}
        categoryLabel={categoryLabel(product.category)}
        relatedItemsLabel={t('relatedItems')}
      />
    </>
  );
}
