'use client';

import { useRawT } from '@/lib/i18n/use-raw-t';
import { useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import type { BlogPost } from '@/data/blog';
import { getBlogContent } from '@/data/blog/content';
import { ArrowLeft } from 'lucide-react';

interface BlogContentProps {
  post: BlogPost;
}

export function BlogContent({ post }: BlogContentProps) {
  const t = useRawT();
  const locale = useLocale();
  
  const localizedContent = getBlogContent(post.slug, locale);
  
  const title = localizedContent?.title || post.title;
  const description = localizedContent?.description || post.description;

  return (
    <div className="page page-blog-post">
      <article className="max-w-4xl mx-auto p-[10px] lg:p-[30px]">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>{locale === 'zh' ? '返回博客' : locale === 'ja' ? 'ブログに戻る' : locale === 'ko' ? '블로그로 돌아가기' : 'Back to Blog'}</span>
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 bg-white/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-300 mb-6">{description}</p>
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.publishedAt}</span>
            <span>•</span>
            <span>{post.readingTime} {locale === 'zh' ? '分钟阅读' : locale === 'ja' ? '分で読める' : locale === 'ko' ? '분 읽기' : 'min read'}</span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {localizedContent?.sections.map((section, index) => (
            <section key={index} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
              {section.content && (
                <p className="text-gray-300 mb-4">{section.content}</p>
              )}
              {section.features && section.features.length > 0 && (
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {section.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-white/5 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold mb-4">
            {t('Get In Touch') || 'Get In Touch'}
          </h3>
          <p className="text-gray-300 mb-6">
            {t('If you need any of our ') || 'If you need any of our '}
            <Link href="/product" className="underline font-bold">
              {t('products') || 'products'}
            </Link>
            {t(', please fill in the form. Our team is here to assist you every step of the way.') || ', please contact us.'}
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
          >
            {locale === 'zh' ? '联系我们' : locale === 'ja' ? 'お問い合わせ' : locale === 'ko' ? '문의하기' : locale === 'id' ? 'Hubungi Kami' : 'Contact Us'}
          </Link>
        </div>
      </article>
    </div>
  );
}
