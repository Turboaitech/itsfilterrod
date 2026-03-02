import { useRawT } from '@/lib/i18n/use-raw-t';
import { getRawT } from '@/lib/i18n/get-raw-t';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Link } from '@/lib/i18n/navigation';
import { products, getProductBySlug } from '@/data/products';
import { ContactForm } from '@/components/contact-form';
import { ProductCarousel } from '@/components/product-carousel';
import { ChevronLeft } from 'lucide-react';

export async function generateStaticParams() {
  return products.map((product) => ({ name: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const product = getProductBySlug(name);
  if (!product) return {};
  const t = await getRawT();
  return {
    title: `${t('product')} - ${t(product.name)}`,
    description: t(product.description),
    openGraph: {
      title: `${t('product')} - ${t(product.name)}`,
      description: t(product.description),
      images: [product.thumb],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const product = getProductBySlug(name);

  if (!product) {
    notFound();
  }

  return <ProductDetailContent product={product} />;
}

function ProductDetailContent({
  product,
}: {
  product: NonNullable<ReturnType<typeof getProductBySlug>>;
}) {
  const t = useRawT();

  return (
    <div className="page page-product">
      <section className="w-full">
        <div className="banner w-full relative">
          <div className="banner-bg w-full h-[200px] lg:h-[400px] opacity-30" />
          <Link
            href="/product"
            className="absolute left-5 lg:left-20 top-5 bg-white rounded-full w-10 h-10 hover:bg-gray-300 flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </Link>
          <h1 className="absolute left-5 lg:left-20 bottom-0 mb-5 lg:mb-20 font-bold text-3xl lg:text-6xl">
            {t(product.name)}
          </h1>
        </div>

        <div className="p-[10px] lg:p-[30px]">
          <div className="flex flex-col gap-y-4 lg:flex-row gap-x-10">
            <Image
              src={product.thumb}
              alt={t(product.name)}
              width={400}
              height={400}
              className="w-full lg:w-1/3 object-contain rounded-xl bg-white"
            />
            <div>
              <h2 className="text-2xl lg:text-4xl font-bold mb-5 lg:mb-10">
                {t('description')}
              </h2>
              <ul className="pl-4 list-disc text-sm lg:text-lg">
                {product.details.map((detail, index) => (
                  <li key={index}>
                    <div>{t(detail.text)}</div>
                    {detail.image && (
                      <div>
                        <Image
                          src={detail.image}
                          alt={t(detail.text)}
                          width={200}
                          height={100}
                          className="h-1/2 lg:h-full max-h-[50px] lg:max-h-[100px] rounded"
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-y-10 mt-10">
            <h2 className="w-full text-center text-2xl lg:text-5xl font-bold">
              {t('actual inquiries')}
            </h2>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
              {product.actualInquiries.map((item, index) => (
                <div key={index} className="flex flex-col gap-y-4">
                  <Image
                    src={item.image}
                    alt={`Inquiry ${index + 1}`}
                    width={400}
                    height={400}
                    className="rounded-xl"
                  />
                  <ul className="list-disc list-inside text-sm lg:text-lg">
                    {item.details.map((detail, i) => (
                      <li key={i}>{t(detail)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <ProductCarousel slides={product.slides} />
          </div>
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
