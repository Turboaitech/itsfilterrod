import type { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { locales, defaultLocale } from '@/lib/i18n/config';

const BASE_URL = 'https://itsfilterrod.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/product', '/faq', '/join-us'];

  const staticPages = routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${BASE_URL}${locale === defaultLocale ? '' : `/${locale}`}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1.0 : 0.8,
    }))
  );

  const productPages = products.flatMap((product) =>
    locales.map((locale) => ({
      url: `${BASE_URL}${locale === defaultLocale ? '' : `/${locale}`}/product/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...productPages];
}
