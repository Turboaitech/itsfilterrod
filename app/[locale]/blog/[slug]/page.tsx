import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost, getAllBlogSlugs } from '@/lib/blog';
import { siteConfig } from '@/lib/seo/config';
import { locales } from '@/lib/i18n/config';
import { StructuredData } from '@/components/seo/structured-data';
import { Link } from '@/lib/i18n/navigation';
import Image from 'next/image';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.flatMap((slug) =>
    locales.map((locale) => ({
      locale,
      slug: slug.replace(/\.(en|zh|id|vi|ms|ja|ko)$/, ''),
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug, locale);

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

function generateArticleSchema(post: Awaited<ReturnType<typeof getBlogPost>>, locale: string) {
  if (!post) return null;
  
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

const backLabels: Record<string, string> = {
  en: '← Back to Blog',
  zh: '← 返回博客',
  id: '← Kembali ke Blog',
  vi: '← Quay lại Blog',
  ms: '← Kembali ke Blog',
  ja: '← ブログに戻る',
  ko: '← 블로그로 돌아가기',
};

const readTimeLabels: Record<string, string> = {
  en: 'min read',
  zh: '分钟阅读',
  id: 'menit baca',
  vi: 'phút đọc',
  ms: 'minit baca',
  ja: '分で読める',
  ko: '분 읽기',
};

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug, locale);

  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleSchema(post, locale);

  return (
    <>
      {articleSchema && <StructuredData data={articleSchema} />}
      <div className="page page-blog-post">
        <article className="max-w-4xl mx-auto p-[10px] lg:p-[30px]">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-block mb-8 text-gray-400 hover:text-white transition-colors"
          >
            {backLabels[locale] || backLabels.en}
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-white/10 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-gray-400 mb-4">{post.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{post.author}</span>
              <span>•</span>
              <span>{post.publishedAt}</span>
              <span>•</span>
              <span>{post.readingTime} {readTimeLabels[locale] || readTimeLabels.en}</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-video relative rounded-2xl overflow-hidden mb-8 bg-gray-800">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
          />

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-white/10">
            <Link
              href="/blog"
              className="inline-block text-gray-400 hover:text-white transition-colors"
            >
              {backLabels[locale] || backLabels.en}
            </Link>
          </footer>
        </article>
      </div>
    </>
  );
}
