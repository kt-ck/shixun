import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import ProductContainer from "@/components/Product/Product";
import ProductMContainer from "@/components/Product/ProductM";
import { ProductType } from "@/type/type";

export default function Product({ product }: { product: ProductType }) {
  return (
    <>
      <ProductContainer />
      <ProductMContainer product={product} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  //   const res = await fetch("/api/productIds");
  //   const { productIds } = await res.json();
  const productIds = ["1", "2", "3", "4", "5", "6"];
  const paths = productIds.map((item: string) => ({
    params: {
      id: item,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

type Props = {
  product: ProductType;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { id } = context.params!;
  console.log(id);
  //   const res = await fetch("https://localhost:3000/api/product", {
  //     method: "post",
  //     body: JSON.stringify({ id }),
  //   });
  //   const product = await res.json();
  const product = {
    pid: "M21769",
    name: "COUSSIN",
    sku: [{ color: "green", size: "xl", price: "¥32,500" }],
    details: [
      { content: "26 x 20 x 12 厘米", lists: ["羊皮革", "肩带：可拆卸"] },
    ],
    defaultPrice: "$10000",
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
      "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
      "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    ],
    description:
      "本款 Coussin 小号手袋为蓬软羊皮革压印经典 Monogram 图案，与粗链条等金属件共同释放耀目莹泽。系上宽幅织物肩带，解锁肩背和斜挎方式，令简约造型释放潮流格调",
    tags: [
      { title: "Sustainability", description: "" },
      { title: "Product Care", description: "" },
    ],
    services: [
      {
        title: "支付方式",
        icon: "",
        desc: "Credit card, debit card or bank transfer",
      },
      {
        title: "配送服务",
        icon: "",
        desc: "Complimentary Delivery or Collect-in-Store",
      },
      {
        title: "退换货服务",
        icon: "",
        desc: "Complimentary, in store and online",
      },
    ],
    recommand: [
      {
        images: [
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
          "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
          "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
          "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
          "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
        ],
        name: "COUSSIN 中号",
        price: "12000",
        colors: ["green", "red"],
      },
      {
        images: [
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
          "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
          "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
          "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
          "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
        ],
        name: "COUSSIN 中号2",
        price: "12000",
        colors: ["green", "red"],
      },
    ],
  };

  return {
    props: {
      product,
    },
  };
};
