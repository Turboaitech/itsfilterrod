'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { MapPin, Phone, Mail } from 'lucide-react';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

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
          <div className="flex items-center gap-2 text-[21px]">
            <WhatsAppIcon className="w-[21px] h-[21px] shrink-0" />
            <a href="https://wa.me/6282112588168" target="_blank" rel="noopener noreferrer">+62 821-1258-8168</a>
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
        <div className="flex items-center gap-2 text-[18px]">
          <WhatsAppIcon className="w-[18px] h-[18px] shrink-0" />
          <a href="https://wa.me/6282112588168" target="_blank" rel="noopener noreferrer">+62 821-1258-8168</a>
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
