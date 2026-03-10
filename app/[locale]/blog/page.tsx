import type { Metadata } from 'next';
import { Link } from '@/lib/i18n/navigation';
import { blogPosts } from '@/data/blog';
import { getBlogContent } from '@/data/blog/content';
import { siteConfig } from '@/lib/seo/config';
import { locales, type Locale } from '@/lib/i18n/config';
import Image from 'next/image';
import { getRawT } from '@/lib/i18n/get-raw-t';
import { useRawT } from '@/lib/i18n/use-raw-t';
import { useLocale } from 'next-intl';

type Props = {
  params: Promise<{ locale: string }>;
};

const blogMetadata: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Blog - Cigarette Filter Rod Industry Insights & News',
    description: 'Expert articles on cigarette filter rod manufacturing, technology, industry trends, and best practices. Stay informed with ITS Filter Rod.',
  },
  zh: {
    title: '博客 - 香烟滤棒行业资讯与动态',
    description: '香烟滤棒制造、技术、行业趋势和最佳实践的专业文章。了解 ITS Filter Rod 最新动态。',
  },
  id: {
    title: 'Blog - Wawasan & Berita Industri Filter Rod Rokok',
    description: 'Artikel ahli tentang manufaktur filter rod rokok, teknologi, tren industri, dan praktik terbaik.',
  },
  vi: {
    title: 'Blog - Tin tức & Thông tin Ngành Đầu Lọc Thuốc Lá',
    description: 'Bài viết chuyên gia về sản xuất đầu lọc thuốc lá, công nghệ, xu hướng ngành và thực tiễn tốt nhất.',
  },
  ms: {
    title: 'Blog - Wawasan & Berita Industri Filter Rod Rokok',
    description: 'Artikel pakar tentang pembuatan filter rod rokok, teknologi, trend industri, dan amalan terbaik.',
  },
  ja: {
    title: 'ブログ - タバコフィルターロッド業界のインサイト＆ニュース',
    description: 'タバコフィルターロッドの製造、技術、業界トレンド、ベストプラクティスに関する専門記事。',
  },
  ko: {
    title: '블로그 - 담배 필터 로드 산업 인사이트 & 뉴스',
    description: '담배 필터 로드 제조, 기술, 산업 동향 및 모범 사례에 관한 전문 기사.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = blogMetadata[locale as Locale] || blogMetadata.en;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/blog`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteConfig.url}/${l}/blog`])
      ),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteConfig.url}/${locale}/blog`,
      type: 'website',
    },
  };
}

const subtitles: Record<string, string> = {
  en: 'Industry insights, news, and expert articles',
  zh: '行业洞察、新闻和专业文章',
  id: 'Wawasan industri, berita, dan artikel ahli',
  vi: 'Thông tin ngành, tin tức và bài viết chuyên gia',
  ms: 'Wawasan industri, berita, dan artikel pakar',
  ja: '業界の洞察、ニュース、専門家記事',
  ko: '산업 인사이트, 뉴스 및 전문가 기사',
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

export default function BlogPage() {
  const t = useRawT();
  const locale = useLocale();

  return (
    <div className="page page-blog">
      <section className="flex flex-col justify-between items-center p-[10px] lg:p-[30px]">
        <div className="text-center">
          <h1 className="text-[60px] md:text-[80px] lg:text-[100px] leading-none uppercase font-bold">
            {t('blog') || 'Blog'}
          </h1>
          <p className="text-xl mt-4 text-gray-300">
            {subtitles[locale] || subtitles.en}
          </p>
        </div>
      </section>

      <section className="w-full p-[10px] lg:p-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => {
            const localizedContent = getBlogContent(post.slug, locale);
            const title = localizedContent?.title || post.title;
            const description = localizedContent?.description || post.description;
            
            return (
              <article
                key={post.slug}
                className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="aspect-video bg-gray-800 relative overflow-hidden">
                    <Image
                      src={post.image}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-white/10 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-bold mb-2 line-clamp-2">
                      {title}
                    </h2>
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {description}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                      <span>{post.publishedAt}</span>
                      <span>{post.readingTime} {readTimeLabels[locale] || readTimeLabels.en}</span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
