export interface ProductDetail {
  text: string;
  image?: string;
}

export interface ActualInquiry {
  image: string;
  details: string[];
}

export interface Product {
  name: string;
  slug: string;
  description: string;
  thumb: string;
  details: ProductDetail[];
  slides: string[];
  actualInquiries: ActualInquiry[];
}
