import { useRawT } from '@/lib/i18n/use-raw-t';
import { getRawT } from '@/lib/i18n/get-raw-t';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/seo/config';
import { locales, type Locale } from '@/lib/i18n/config';
import { AboutContent } from './about-content';

type Props = {
  params: Promise<{ locale: string }>;
};

const aboutMetadata: Record<string, { title: string; description: string }> = {
  en: {
    title: 'About Us - Cigarette Filter Rod Manufacturer in Indonesia',
    description: 'Learn about PT. Indonesian Tobacco Special Filter Rod - a leading cigarette filter rod manufacturer based in Batam, Indonesia. Quality, innovation, and reliability since establishment.',
  },
  zh: {
    title: '关于我们 - 印尼香烟滤棒制造商',
    description: '了解印尼烟草专用滤嘴厂 - 位于印尼巴淡岛的领先香烟滤棒制造商。自成立以来，始终坚持品质、创新与可靠。',
  },
  id: {
    title: 'Tentang Kami - Produsen Filter Rod Rokok di Indonesia',
    description: 'Pelajari tentang PT. Indonesian Tobacco Special Filter Rod - produsen filter rod rokok terkemuka di Batam, Indonesia. Kualitas, inovasi, dan keandalan.',
  },
  vi: {
    title: 'Về Chúng Tôi - Nhà Sản Xuất Đầu Lọc Thuốc Lá tại Indonesia',
    description: 'Tìm hiểu về PT. Indonesian Tobacco Special Filter Rod - nhà sản xuất đầu lọc thuốc lá hàng đầu tại Batam, Indonesia.',
  },
  ms: {
    title: 'Tentang Kami - Pengeluar Filter Rod Rokok di Indonesia',
    description: 'Ketahui tentang PT. Indonesian Tobacco Special Filter Rod - pengeluar filter rod rokok terkemuka di Batam, Indonesia.',
  },
  ja: {
    title: '会社概要 - インドネシアのタバコフィルターロッドメーカー',
    description: 'PT. Indonesian Tobacco Special Filter Rodについて - インドネシア・バタム島の大手タバコフィルターロッドメーカー。',
  },
  ko: {
    title: '회사 소개 - 인도네시아 담배 필터 로드 제조업체',
    description: 'PT. Indonesian Tobacco Special Filter Rod에 대해 알아보세요 - 인도네시아 바탐의 선두 담배 필터 로드 제조업체.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = aboutMetadata[locale as Locale] || aboutMetadata.en;
  
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/about`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteConfig.url}/${l}/about`])
      ),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteConfig.url}/${locale}/about`,
      type: 'website',
      images: [
        {
          url: `${siteConfig.url}/images/photo3.jpg`,
          width: 800,
          height: 600,
          alt: 'PT. Indonesian Tobacco Special Filter Rod Factory',
        },
      ],
    },
  };
}

export default function AboutPage() {
  return <AboutContent />;
}
