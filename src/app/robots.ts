import type {MetadataRoute} from 'next';
import {absoluteUrl} from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/en/login', '/ar/login', '/en/signup', '/ar/signup',
        '/en/forgot-password', '/ar/forgot-password',
        '/en/cart', '/ar/cart', '/en/wishlist', '/ar/wishlist',
        '/en/checkout', '/ar/checkout', '/en/account', '/ar/account',
      ],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
