import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { locales } from './config';
import { sanitizeKeys } from './create-raw-t';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!hasLocale(locales, locale)) locale = 'en';

  const raw = (await import(`@/messages/${locale}.json`)).default;
  return {
    locale,
    messages: sanitizeKeys(raw),
  };
});
