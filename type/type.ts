export type ProductType = {
  pid: string;
  name: string;
  sku: { color?: string; size?: string; price: number }[];
  details: { content?: string; lists?: string[] }[];
  images: string[];
  description: string;
  tags: { title: string; description: string }[];
  services: { title: string; icon: string; desc: string }[];
  defaultPrice: number;
  recommand: SimpleProduct[];
};

export interface Cart {
  pid: string;
  image: string;
  count: number;
  name: string;
  price: number;
  sku: string;
}

export interface SimpleProduct {
  images: string[];
  name: string;
  defaultPrice: number;
  sku: { color?: string; size?: string; price: number }[];
}


