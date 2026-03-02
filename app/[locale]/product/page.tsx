import { useRawT } from '@/lib/i18n/use-raw-t';
import { getRawT } from '@/lib/i18n/get-raw-t';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/lib/i18n/navigation';
import { products } from '@/data/products';
import { ContactForm } from '@/components/contact-form';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getRawT();
  return {
    title: `${t('product')} - ${t('seo.title')}`,
    description: t('seo.description'),
    keywords: t('seo.keywords'),
  };
}

export default function ProductPage() {
  const t = useRawT();

  return (
    <div className="page page-product">
      <section className="w-full flex justify-center p-[10px] lg:p-[30px]">
        <div className="products flex flex-col gap-y-2 lg:gap-y-4">
          {products.map((item) => (
            <div
              key={item.slug}
              className="product-item flex gap-x-2 lg:gap-x-4 p-4 lg:p-10 rounded-2xl border-2 border-white"
            >
              <Link href={`/product/${item.slug}`} className="flex">
                <Image
                  src={item.thumb}
                  alt={t(item.name)}
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
            </div>
          ))}
        </div>
      </section>

      <section className="w-full flex justify-center p-[10px] lg:p-[30px]">
        <div className="w-full flex flex-col gap-5">
          <div className="text-[60px] md:text-[80px] lg:text-[100px] leading-none capitalize font-bold">
            {t('contact us')}
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
