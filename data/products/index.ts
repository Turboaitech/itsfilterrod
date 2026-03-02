import product1 from './product1';
import product2 from './product2';
import product3 from './product3';
import product4 from './product4';
import product5 from './product5';
import product6 from './product6';
import product7 from './product7';
import type { Product } from './types';

export type { Product, ProductDetail, ActualInquiry } from './types';

export const products: Product[] = [
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
  product7,
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
