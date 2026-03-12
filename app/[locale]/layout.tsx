import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { locales, type Locale } from '@/lib/i18n/config';
import { Toaster } from 'sonner';
import { Footer } from '@/components/layout/footer';
import { LayeredBackground } from '@/components/layout/layered-background';
import { Navbar } from '@/components/layout/navbar';
import { StructuredData } from '@/components/seo/structured-data';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { 
  generateOrganizationSchema, 
  generateLocalBusinessSchema,
  generateWebsiteSchema 
} from '@/lib/seo/structured-data';
import { siteConfig, localeMetadata } from '@/lib/seo/config';
import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = localeMetadata[locale as Locale] || localeMetadata.en;
  
  const localeMap: Record<string, string> = {
    en: 'en_US',
    zh: 'zh_CN',
    id: 'id_ID',
    vi: 'vi_VN',
    ms: 'ms_MY',
    ja: 'ja_JP',
    ko: 'ko_KR',
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteConfig.url}/${l}`])
      ),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: localeMap[locale] || 'en_US',
      alternateLocale: Object.values(localeMap).filter(l => l !== localeMap[locale]),
    },
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) notFound();

  const messages = await getMessages();

  const structuredData = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generateWebsiteSchema(),
  ];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <StructuredData data={structuredData} />
      <div className="w-full">
        <main>{children}</main>
      </div>
      <Footer />
      <LayeredBackground />
      <div className="fixed bottom-0 left-0 w-full z-40">
        <Navbar />
      </div>
      <Toaster position="top-center" />
      <WhatsAppButton />
    </NextIntlClientProvider>
  );
}
