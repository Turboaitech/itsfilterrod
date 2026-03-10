'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { MapPin, Phone, Mail } from 'lucide-react';

const navs = [
  { id: 'home', path: '/' as const, name: 'home' },
  { id: 'about', path: '/about' as const, name: 'about' },
  { id: 'product', path: '/product' as const, name: 'product' },
  { id: 'blog', path: '/blog' as const, name: 'blog' },
];

const contacts = [
  { id: 'x', url: 'https://x.com/itsfilterrod', name: 'X' },
];

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="w-full px-4 mb-[54px]">
      <div className="flex justify-between p-[10px] lg:p-[30px] border-t border-t-white">
        {/* Navigation Links */}
        <div className="flex flex-col">
          {navs.map((nav) => (
            <Link
              key={nav.id}
              href={nav.path}
              className="capitalize text-[18px] md:text-[24px] lg:text-[30px] font-bold leading-[1.2] transition-all duration-300 hover:text-stone-500"
            >
              {t(nav.name)}
            </Link>
          ))}
        </div>

        {/* Contact Info - Desktop */}
        <div className="hidden lg:flex lg:flex-col">
          <div className="flex items-center gap-2 text-[21px]">
            <MapPin className="w-[21px] h-[21px] shrink-0" />
            Tunas Industrial Estate (Bizpark) Type 10D, Belian, Kec. Batam Kota, Batam, Indonesia
          </div>
          <div className="flex items-center gap-2 text-[21px]">
            <Phone className="w-[21px] h-[21px] shrink-0" />
            (0778) 5508045
          </div>
          <div className="flex items-center gap-2 text-[21px]">
            <Mail className="w-[21px] h-[21px] shrink-0" />
            indotobaccospecial@gmail.com
          </div>
          <div className="font-bold text-[21px] mt-2">{t('Marketing Agent Contact')}:</div>
          <div className="flex items-center gap-2 text-[21px]">
            <Mail className="w-[21px] h-[21px] shrink-0" />
            marketing@itsfilterrod.com
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col">
          {contacts.map((contact) => (
            <a
              key={contact.id}
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              className="capitalize text-[18px] md:text-[24px] lg:text-[30px] font-bold leading-[1.2] transition-all duration-300 hover:text-stone-500"
            >
              {contact.name}
            </a>
          ))}
        </div>
      </div>

      {/* Contact Info - Mobile */}
      <div className="flex lg:hidden flex-col gap-2 my-[20px]">
        <div className="flex items-center gap-2 text-[18px]">
          <MapPin className="w-[18px] h-[18px] shrink-0" />
          Tunas Industrial Estate (Bizpark) Type 10D, Belian, Kec. Batam Kota, Batam, Indonesia
        </div>
        <div className="flex items-center gap-2 text-[18px]">
          <Phone className="w-[18px] h-[18px] shrink-0" />
          (0778) 5507045
        </div>
        <div className="flex items-center gap-2 text-[18px]">
          <Mail className="w-[18px] h-[18px] shrink-0" />
          indotobaccospecial@gmail.com
        </div>
        <div className="font-bold text-[18px] mt-2">{t('Marketing Agent Contact')}:</div>
        <div className="flex items-center gap-2 text-[18px]">
          <Mail className="w-[18px] h-[18px] shrink-0" />
          <a href="mailto:marketing@itsfilterrod.com">marketing@itsfilterrod.com</a>
        </div>
      </div>

      <div className="w-full text-center">
        Copyright &copy; 2024 PT. Indonesian Tobacco Special Filter Rod
      </div>
    </div>
  );
}
