import type { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { locales, defaultLocale } from '@/lib/i18n/config';
import { siteConfig } from '@/lib/seo/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/product', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/faq', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/join-us', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  // Static pages for all locales
  const staticPages = routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteConfig.url}/${l}${route.path}`])
        ),
      },
    }))
  );

  // Product pages for all locales
  const productPages = products.flatMap((product) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}/product/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [`${l}`, `${siteConfig.url}/${l}/product/${product.slug}`])
        ),
      },
    }))
  );

  return [...staticPages, ...productPages];
}
