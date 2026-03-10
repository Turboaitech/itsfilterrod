import type { Metadata } from 'next';
import { siteConfig } from '@/lib/seo/config';
import { locales, type Locale } from '@/lib/i18n/config';
import { FaqContent } from './faq-content';
import { StructuredData } from '@/components/seo/structured-data';
import { generateFAQSchema } from '@/lib/seo/structured-data';

type Props = {
  params: Promise<{ locale: string }>;
};

const faqMetadata: Record<string, { title: string; description: string }> = {
  en: {
    title: 'FAQ - Frequently Asked Questions About Cigarette Filter Rods',
    description: 'Find answers to common questions about our cigarette filter rods: product specifications, MOQ, customization options, delivery times, quality certifications, and more.',
  },
  zh: {
    title: '常见问题 - 香烟滤棒相关问答',
    description: '查找有关我们香烟滤棒的常见问题解答：产品规格、最小起订量、定制选项、交货时间、质量认证等。',
  },
  id: {
    title: 'FAQ - Pertanyaan Umum Tentang Filter Rod Rokok',
    description: 'Temukan jawaban atas pertanyaan umum tentang filter rod rokok kami: spesifikasi produk, MOQ, opsi kustomisasi, waktu pengiriman, sertifikasi kualitas.',
  },
  vi: {
    title: 'FAQ - Câu Hỏi Thường Gặp Về Đầu Lọc Thuốc Lá',
    description: 'Tìm câu trả lời cho các câu hỏi thường gặp về đầu lọc thuốc lá: thông số kỹ thuật, MOQ, tùy chỉnh, thời gian giao hàng, chứng nhận chất lượng.',
  },
  ms: {
    title: 'FAQ - Soalan Lazim Mengenai Filter Rod Rokok',
    description: 'Cari jawapan untuk soalan lazim tentang filter rod rokok kami: spesifikasi produk, MOQ, pilihan penyesuaian, masa penghantaran, pensijilan kualiti.',
  },
  ja: {
    title: 'FAQ - タバコフィルターロッドに関するよくある質問',
    description: 'タバコフィルターロッドに関するよくある質問と回答：製品仕様、最小注文数量、カスタマイズオプション、納期、品質認証など。',
  },
  ko: {
    title: 'FAQ - 담배 필터 로드에 관한 자주 묻는 질문',
    description: '담배 필터 로드에 대한 자주 묻는 질문 답변: 제품 사양, MOQ, 맞춤화 옵션, 배송 시간, 품질 인증 등.',
  },
};

const faqItems = [
  {
    question: 'What are the main functions and features of your special filter sticks?',
    answer: 'Our filter sticks can include different flavored capsules based on customer requirements to enhance aroma, reduce throat irritation, and improve the smoking-replacement experience. The structure is a round cotton rod that improves the overall taste.',
  },
  {
    question: 'For which types of tobacco products or usage scenarios are these capsule filter tips suitable?',
    answer: 'Our capsule essence extraction technology is suitable for all types of tobacco products and compatible with various cigarette and flavor-enhancement scenarios.',
  },
  {
    question: 'What sizes or specifications do your products have? Can the length or capsule flavor be customized?',
    answer: 'Filter length ranges from 80–150 mm, diameter 5.0–8.0 mm. We can customize length, diameter, and capsule flavors based on customer needs.',
  },
  {
    question: 'What is the minimum order quantity (MOQ)? What is the general delivery time?',
    answer: 'MOQ: 20-foot container: shipped in 3 days; 40-foot container: shipped in 8 days.',
  },
  {
    question: 'How many capsule flavors do you offer?',
    answer: 'We offer various flavors such as strawberry and banana, and can expand based on customer needs.',
  },
  {
    question: 'Can capsule flavors or aromas be customized?',
    answer: 'Yes, capsule flavors and aromas can be fully customized, including mint and fruit types.',
  },
  {
    question: 'What quality standards or certifications does your production follow?',
    answer: 'International standards.',
  },
  {
    question: 'Do you provide sample testing or prototyping services?',
    answer: 'If a contract is signed and payment completed, we offer free samples. If not, customers must pay for samples and shipping.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = faqMetadata[locale as Locale] || faqMetadata.en;
  
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/faq`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteConfig.url}/${l}/faq`])
      ),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteConfig.url}/${locale}/faq`,
      type: 'website',
    },
  };
}

export default function FaqPage() {
  const faqSchema = generateFAQSchema(faqItems);
  
  return (
    <>
      <StructuredData data={faqSchema} />
      <FaqContent />
    </>
  );
}
