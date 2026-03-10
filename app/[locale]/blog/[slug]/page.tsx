import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPost } from '@/data/blog';
import { siteConfig } from '@/lib/seo/config';
import { locales } from '@/lib/i18n/config';
import { StructuredData } from '@/components/seo/structured-data';
import { BlogContent } from './blog-content';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.flatMap((post) =>
    locales.map((locale) => ({
      locale,
      slug: post.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: 'Not Found' };
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `${siteConfig.url}/${locale}/blog/${slug}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteConfig.url}/${l}/blog/${slug}`])
      ),
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/${locale}/blog/${slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: `${siteConfig.url}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

function generateArticleSchema(post: NonNullable<ReturnType<typeof getBlogPost>>, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: `${siteConfig.url}${post.image}`,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/${locale}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleSchema(post, locale);

  return (
    <>
      <StructuredData data={articleSchema} />
      <BlogContent post={post} />
    </>
  );
}
