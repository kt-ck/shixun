export type ProductType = {
  pid: string;
  name: string;
  sku: { color?: string; size?: string; price: string }[];
  details: { content?: string; lists?: string[] }[];
  images: string[];
  description: string;
  tags: { title: string; description: string }[];
  services: { title: string; icon: string; desc: string }[];
  defaultPrice: string;
  recommand: {
    images: string[];
    name: string;
    price: string;
    colors: string[];
  }[];
};
