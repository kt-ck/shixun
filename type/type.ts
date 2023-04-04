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
  productNo: string;
  saleCount: number;
};

export interface Cart {
  productId: string;
  image: string;
  count: number;
  name: string;
  price: number;
  color: string;
  isUpload: boolean;
  productNo: string;
}

export interface SimpleProduct {
  images: string[];
  name: string;
  price: number;
  color: string;
  productId: string;
  productNo: string;
  saleCount: number;
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

export interface OrderType{
  orderId:string;
  deliveryWay:number;
  createTime:number;
  status: number;
  totalCount: number;
  totalPrice:number;
  storeInfo:{
    address: string;
    phoneNumber:string;
    storeId:string;
    storeName:string;
    status:number;
  };
  recAddress: {
    address: string;
    phoneNumber:string;
    recName: string;
  };
  orderItemList:{
    color: string;
    image:string;
    name:string;
    num:number;
    price:number;

  }[]
}