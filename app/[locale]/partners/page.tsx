import type { Metadata } from 'next';
import { siteConfig } from '@/lib/seo/config';
import { locales, type Locale } from '@/lib/i18n/config';
import { useRawT } from '@/lib/i18n/use-raw-t';
import { useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

const partnersMetadata: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Partners & Certifications - ITS Filter Rod',
    description: 'Our partnerships, certifications, and quality standards. PT. Indonesian Tobacco Special Filter Rod works with leading tobacco companies worldwide.',
  },
  zh: {
    title: '合作伙伴与认证 - ITS滤棒',
    description: '我们的合作伙伴、认证和质量标准。印尼烟草专用滤嘴厂与全球领先的烟草企业合作。',
  },
  id: {
    title: 'Mitra & Sertifikasi - ITS Filter Rod',
    description: 'Kemitraan, sertifikasi, dan standar kualitas kami. PT. Indonesian Tobacco Special Filter Rod bekerja sama dengan perusahaan tembakau terkemuka di seluruh dunia.',
  },
  vi: {
    title: 'Đối tác & Chứng nhận - ITS Filter Rod',
    description: 'Quan hệ đối tác, chứng nhận và tiêu chuẩn chất lượng của chúng tôi.',
  },
  ms: {
    title: 'Rakan Kongsi & Pensijilan - ITS Filter Rod',
    description: 'Perkongsian, pensijilan, dan standard kualiti kami.',
  },
  ja: {
    title: 'パートナー＆認証 - ITS Filter Rod',
    description: '当社のパートナーシップ、認証、品質基準。',
  },
  ko: {
    title: '파트너 & 인증 - ITS Filter Rod',
    description: '당사의 파트너십, 인증 및 품질 표준.',
  },
};

const content: Record<string, { heading: string; intro: string; certTitle: string; partnerTitle: string; cta: string }> = {
  en: {
    heading: 'Partners & Certifications',
    intro: 'We maintain the highest quality standards and work with trusted partners worldwide.',
    certTitle: 'Quality Certifications',
    partnerTitle: 'Industry Partnerships',
    cta: 'Become a Partner',
  },
  zh: {
    heading: '合作伙伴与认证',
    intro: '我们保持最高的质量标准，与全球值得信赖的合作伙伴合作。',
    certTitle: '质量认证',
    partnerTitle: '行业合作',
    cta: '成为合作伙伴',
  },
  id: {
    heading: 'Mitra & Sertifikasi',
    intro: 'Kami menjaga standar kualitas tertinggi dan bekerja sama dengan mitra terpercaya di seluruh dunia.',
    certTitle: 'Sertifikasi Kualitas',
    partnerTitle: 'Kemitraan Industri',
    cta: 'Menjadi Mitra',
  },
  vi: {
    heading: 'Đối tác & Chứng nhận',
    intro: 'Chúng tôi duy trì các tiêu chuẩn chất lượng cao nhất và hợp tác với các đối tác đáng tin cậy trên toàn thế giới.',
    certTitle: 'Chứng nhận Chất lượng',
    partnerTitle: 'Quan hệ Đối tác Ngành',
    cta: 'Trở thành Đối tác',
  },
  ms: {
    heading: 'Rakan Kongsi & Pensijilan',
    intro: 'Kami mengekalkan standard kualiti tertinggi dan bekerjasama dengan rakan kongsi yang dipercayai di seluruh dunia.',
    certTitle: 'Pensijilan Kualiti',
    partnerTitle: 'Perkongsian Industri',
    cta: 'Menjadi Rakan Kongsi',
  },
  ja: {
    heading: 'パートナー＆認証',
    intro: '私たちは最高の品質基準を維持し、世界中の信頼できるパートナーと協力しています。',
    certTitle: '品質認証',
    partnerTitle: '業界パートナーシップ',
    cta: 'パートナーになる',
  },
  ko: {
    heading: '파트너 & 인증',
    intro: '우리는 최고의 품질 표준을 유지하고 전 세계의 신뢰할 수 있는 파트너와 협력합니다.',
    certTitle: '품질 인증',
    partnerTitle: '산업 파트너십',
    cta: '파트너 되기',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = partnersMetadata[locale as Locale] || partnersMetadata.en;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/partners`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteConfig.url}/${l}/partners`])
      ),
    },
  };
}

const certifications = [
  { name: 'ISO 9001:2015', desc: 'Quality Management System' },
  { name: 'GMP', desc: 'Good Manufacturing Practice' },
  { name: 'HACCP', desc: 'Hazard Analysis Critical Control Points' },
];

const partnerships = [
  { name: 'KADIN Indonesia', desc: 'Indonesian Chamber of Commerce' },
  { name: 'BIFZA', desc: 'Batam Indonesia Free Zone Authority' },
  { name: 'GAPRINDO', desc: 'Indonesian Cigarette Manufacturers Association' },
];

export default function PartnersPage() {
  const locale = useLocale();
  const c = content[locale] || content.en;

  return (
    <div className="page page-partners">
      <section className="flex flex-col justify-between items-center p-[10px] lg:p-[30px]">
        <div className="text-center">
          <h1 className="text-[40px] md:text-[60px] lg:text-[80px] leading-none uppercase font-bold">
            {c.heading}
          </h1>
          <p className="text-xl mt-4 text-gray-300 max-w-2xl mx-auto">
            {c.intro}
          </p>
        </div>
      </section>

      <section className="w-full p-[10px] lg:p-[30px]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">{c.certTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {certifications.map((cert) => (
              <div key={cert.name} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold">{cert.name}</h3>
                <p className="text-gray-400 mt-2">{cert.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold mb-8">{c.partnerTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {partnerships.map((partner) => (
              <div key={partner.name} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold">{partner.name}</h3>
                <p className="text-gray-400 mt-2">{partner.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors text-lg"
            >
              {c.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
