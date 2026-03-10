import { useRawT } from '@/lib/i18n/use-raw-t';
import { getRawT } from '@/lib/i18n/get-raw-t';
import type { Metadata } from 'next';
import { TextSlideUp } from '@/components/animations/text-slide-up';
import { ContactForm } from '@/components/contact-form';
import { Logo } from '@/components/svg/logo';
import { Link } from '@/lib/i18n/navigation';
import { siteConfig, localeMetadata } from '@/lib/seo/config';
import { locales, type Locale } from '@/lib/i18n/config';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getRawT();
  const meta = localeMetadata[locale as Locale] || localeMetadata.en;
  
  return {
    title: meta.title,
    description: meta.description,
    keywords: t('seo.keywords'),
    authors: [{ name: t('seo.author') }],
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteConfig.url}/${l}`])
      ),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      type: 'website',
      images: [
        {
          url: `${siteConfig.url}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${siteConfig.url}/og-image.jpg`],
    },
  };
}

export default function HomePage() {
  const t = useRawT();

  return (
    <div className="page page-home">
      <div className="flex gap-x-4 items-center p-5">
        <Logo size={24} />
        <h1 className="lg:text-2xl font-bold">
          {t('PT. Indonesian')} {t('Tobacco')} {t('Special')} {t('Filter')} {t('Rod')}
        </h1>
      </div>

      <section className="flex flex-col p-[10px] lg:p-[30px]">
        <h2 className="text-center w-full my-20">
          <TextSlideUp classes="text-[32px] md:text-[42px] lg:text-[52px] leading-none uppercase font-bold">
            {t('Get In Touch')}
          </TextSlideUp>
        </h2>
        <div className="w-full flex justify-center relative">
          <TextSlideUp>
            <div className="text-lg lg:text-2xl">
              {t('If you need any of our ')}
              <Link href="/product" className="underline font-bold">
                {t('products')}
              </Link>
              {t(', please fill in the form. Our team is here to assist you every step of the way.')}
            </div>
          </TextSlideUp>
        </div>
      </section>

      <section className="flex flex-col p-[10px] lg:p-[30px]">
        <ContactForm />
      </section>
    </div>
  );
}
