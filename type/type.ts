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
  recommand: {
    images: string[];
    name: string;
    price: number;
    colors: string[];
  }[];
};

export interface  Cart {
  pid: string;
  image: string;
  count: number;
  name: string;
  price: number;
  sku: string
}
