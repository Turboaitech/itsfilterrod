import { useRawT } from '@/lib/i18n/use-raw-t';
import { getRawT } from '@/lib/i18n/get-raw-t';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/lib/i18n/navigation';
import { products } from '@/data/products';
import { ContactForm } from '@/components/contact-form';
import { siteConfig } from '@/lib/seo/config';
import { locales, type Locale } from '@/lib/i18n/config';

type Props = {
  params: Promise<{ locale: string }>;
};

const productMetadata: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Cigarette Filter Rod Products - Mono, Dual, Capsule & Custom Filters',
    description: 'Explore our complete range of cigarette filter rods: mono acetate, dual filters, capsule filters, flavored filters, inner/outer shaped filters. Custom solutions available.',
  },
  zh: {
    title: '香烟滤棒产品 - 单醋酸、双重、胶囊及定制滤嘴',
    description: '探索我们完整的香烟滤棒系列：单醋酸滤芯、双重滤嘴、胶囊滤嘴、调味滤嘴、异形滤嘴。提供定制解决方案。',
  },
  id: {
    title: 'Produk Filter Rod Rokok - Mono, Dual, Kapsul & Filter Kustom',
    description: 'Jelajahi rangkaian lengkap filter rod rokok kami: mono asetat, filter dual, filter kapsul, filter beraroma, filter berbentuk. Solusi kustom tersedia.',
  },
  vi: {
    title: 'Sản phẩm Đầu Lọc Thuốc Lá - Mono, Kép, Viên Nang & Tùy Chỉnh',
    description: 'Khám phá đầy đủ các loại đầu lọc thuốc lá: mono acetate, lọc kép, lọc viên nang, lọc hương vị, lọc hình dạng đặc biệt.',
  },
  ms: {
    title: 'Produk Filter Rod Rokok - Mono, Dwi, Kapsul & Filter Tersuai',
    description: 'Terokai rangkaian lengkap filter rod rokok kami: mono asetat, filter dwi, filter kapsul, filter berperisa, filter berbentuk.',
  },
  ja: {
    title: 'タバコフィルターロッド製品 - モノ、デュアル、カプセル＆カスタムフィルター',
    description: 'タバコフィルターロッドの完全なラインナップ：モノアセテート、デュアルフィルター、カプセルフィルター、フレーバーフィルター、成形フィルター。',
  },
  ko: {
    title: '담배 필터 로드 제품 - 모노, 듀얼, 캡슐 및 맞춤형 필터',
    description: '담배 필터 로드 전체 제품군: 모노 아세테이트, 듀얼 필터, 캡슐 필터, 향료 필터, 성형 필터. 맞춤형 솔루션 제공.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = productMetadata[locale as Locale] || productMetadata.en;
  
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/product`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteConfig.url}/${l}/product`])
      ),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteConfig.url}/${locale}/product`,
      type: 'website',
    },
  };
}

export default function ProductPage() {
  const t = useRawT();

  return (
    <div className="page page-product">
      <section className="w-full flex justify-center p-[10px] lg:p-[30px]">
        <div className="products flex flex-col gap-y-2 lg:gap-y-4">
          {products.map((item) => (
            <article
              key={item.slug}
              className="product-item flex gap-x-2 lg:gap-x-4 p-4 lg:p-10 rounded-2xl border-2 border-white"
            >
              <Link href={`/product/${item.slug}`} className="flex">
                <Image
                  src={item.thumb}
                  alt={`${t(item.name)} - Cigarette Filter Rod Product`}
                  width={350}
                  height={350}
                  className="h-[200px] lg:h-[350px] w-auto object-cover rounded-2xl"
                />
              </Link>
              <div className="flex flex-col flex-1 gap-y-4 lg:gap-y-10">
                <h2 className="text-xl lg:text-5xl font-bold">
                  <Link href={`/product/${item.slug}`}>{t(item.name)}</Link>
                </h2>
                <p className="text-sm lg:text-2xl">{t(item.description)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="w-full flex justify-center p-[10px] lg:p-[30px]">
        <div className="w-full flex flex-col gap-5">
          <h2 className="text-[60px] md:text-[80px] lg:text-[100px] leading-none capitalize font-bold">
            {t('contact us')}
          </h2>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
