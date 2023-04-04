import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  product: {
    pid: string;
    name:string;
    sku:{color?:string;size?:string;price:string}[];
    details: {content?:string;lists?:string[]}[];
    images: string[];
    description:string;
    tags: string[];
    services: {title:string; icon:string}[];
    recommand:{
        images: string[];
        name: string;
        price: string;
        colors: string[];
    }[]
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ product:  {
    pid: "M21769",
    name: "COUSSIN",
    sku:[{color:"green", size:"xl",price:"¥32,500"}],
    details: [{content: "26 x 20 x 12 厘米",lists: ["羊皮革", "肩带：可拆卸"]}],
    images: [],
    description: "本款 Coussin 小号手袋为蓬软羊皮革压印经典 Monogram 图案，与粗链条等金属件共同释放耀目莹泽。系上宽幅织物肩带，解锁肩背和斜挎方式，令简约造型释放潮流格调",
    tags: ["环保与可持续性", "Product Care"],
    services: [{title: "支付方式", icon:""},{title: "配送服务", icon:""},{title:"退换货服务", icon:""}],
    recommand: [{
        images:[],
        name: "COUSSIN 中号",
        price: "12000",
        colors: ["green", "red"]
    }]
  }})
}