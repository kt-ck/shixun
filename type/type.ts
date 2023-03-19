export type ProductType = {
  productId: string;
  name: string;
  details: { content?: string; lists?: string[] }[];
  images: string[];
  description: string;
  tags: { title: string; description: string }[];
  services: { title: string; icon: string; desc: string }[];
  price: number;
  recommand: SimpleProduct[];
  detail: string;
  status: number;
  color: string;
};

export interface Cart {
  productId: string;
  image: string;
  count: number;
  name: string;
  price: number;
  color: string;
  isUpload: boolean;
}

export interface SimpleProduct {
  images: string[];
  name: string;
  price: number;
  color: string;
}

export interface NotificationType {
  notificationTitle: string;
  notificationContent: string;
  notificationType: "error" | "info";
  notifacationShow: boolean;
}

export interface CategoryType {
  categoryId: string;
  level: number;
  name: string;
  parentId: string;
}
