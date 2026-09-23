export type ProductImage = {
  src: string;
  alt: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  size: string;
  colorway: string;
  availableForSale: boolean;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  price: string;
  compareAtPrice?: string;
  badge?: string;
  description: string;
  images: ProductImage[];
  variants: ProductVariant[];
  tags: string[];
  fitNote?: string;
  productCode?: string;
  features?: string[];
  materials?: string[];
};
