import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { locales } from '@/lib/i18n/config';
import { Toaster } from 'sonner';
import { Footer } from '@/components/layout/footer';
import { LayeredBackground } from '@/components/layout/layered-background';
import { Navbar } from '@/components/layout/navbar';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="w-full">
        <main>{children}</main>
      </div>
      <Footer />
      <LayeredBackground />
      <div className="fixed bottom-0 left-0 w-full z-40">
        <Navbar />
      </div>
      <Toaster position="top-center" />
    </NextIntlClientProvider>
  );
}
