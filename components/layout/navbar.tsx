'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { locales, localeNames, type Locale } from '@/lib/i18n/config';
import { Logo } from '@/components/svg/logo';

const navItems = [
  { id: 'home', path: '/' as const, name: 'home' },
  { id: 'join-us', path: '/join-us' as const, name: 'join us' },
  { id: 'about', path: '/about' as const, name: 'about' },
  { id: 'product', path: '/product' as const, name: 'product' },
  { id: 'blog', path: '/blog' as const, name: 'blog' },
  { id: 'faq', path: '/faq' as const, name: 'FAQ' },
];

export function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuType, setMenuType] = useState<'nav' | 'langs' | ''>('');

  const availableLocales = locales.filter((l) => l !== locale);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
    setMenuType('');
  }, [pathname]);

  const switchMenu = (type?: 'langs') => {
    if (open) {
      setOpen(false);
      setMenuType('');
    } else {
      setOpen(true);
      setMenuType(type === 'langs' ? 'langs' : 'nav');
    }
  };

  const isActive = (path: string) => {
    const cleanPath = pathname.replace(`/${locale}`, '') || '/';
    return cleanPath === path;
  };

  return (
    <div className="navs w-full px-4">
      <div className="navs-wrap w-full flex justify-between items-center py-4 border-t relative z-10">
        {/* Left: Logo + Language Switcher */}
        <div className="flex gap-4">
          <div className="font-bold">
            <Logo size={21} />
          </div>
          {/* Desktop language switcher */}
          <div className="gap-2 border-l px-5 split-line hidden md:flex">
            {availableLocales.map((l) => (
              <Link key={l} href={pathname.replace(`/${locale}`, '') || '/'} locale={l} className="capitalize nav-link">
                {localeNames[l as Locale]}
              </Link>
            ))}
          </div>
          {/* Mobile language switcher */}
          <div className="flex gap-2 border-l px-5 split-line md:hidden">
            {availableLocales.slice(0, 3).map((l) => (
              <Link key={l} href={pathname.replace(`/${locale}`, '') || '/'} locale={l} className="capitalize nav-link">
                {localeNames[l as Locale]}
              </Link>
            ))}
            {!open && (
              <div
                className="capitalize nav-link cursor-pointer select-none flex items-center"
                onClick={() => switchMenu('langs')}
              >
                {t('more')} +
              </div>
            )}
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-4">
          {navItems.map((nav) => (
            <Link
              key={nav.id}
              href={nav.path}
              className={`capitalize nav-link ${isActive(nav.path) ? 'active' : ''}`}
            >
              {t(nav.name)}
            </Link>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <div className="capitalize nav-link cursor-pointer select-none" onClick={() => switchMenu()}>
            {open ? t('close') : t('menu')}
          </div>
        </div>
      </div>

      {/* Mobile fullscreen menu */}
      {open && (
        <div className="md:hidden fixed top-0 left-0 w-full h-screen bg-black flex flex-col justify-center items-center gap-3 z-50">
          {/* Close button */}
          <div
            className="absolute top-4 right-4 capitalize nav-link cursor-pointer select-none text-white text-xl"
            onClick={() => switchMenu()}
          >
            {t('close')}
          </div>
          {menuType === 'langs'
            ? availableLocales.map((l) => (
                <Link
                  key={l}
                  href={pathname.replace(`/${locale}`, '') || '/'}
                  locale={l}
                  className="capitalize text-3xl font-bold nav-link text-white"
                >
                  {localeNames[l as Locale]}
                </Link>
              ))
            : navItems.map((nav) => (
                <Link
                  key={nav.id}
                  href={nav.path}
                  className={`capitalize text-3xl font-bold nav-link text-white ${isActive(nav.path) ? 'active' : ''}`}
                >
                  {t(nav.name)}
                </Link>
              ))}
        </div>
      )}
    </div>
  );
}
