export const getProductsListFromCat = async (
  categoryId: string,
  pageNum: number,
  pageSize: number
) => {
  const res = await fetch(process.env.BaseUrl + "/product/list", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categoryId,
      pageNum,
      pageSize,
    }),
  });
  const res_json = await res.json();
  console.log(res_json);
  const data = {
    productList: res_json.data.productList,
    pageTotal: res_json.data.pagesCount,
  };
  return data;
};

export const getProductDetail = async (productId: string) => {
  const res = await fetch(process.env.BaseUrl + "/product/detail/", {
    method: "post",
    body: JSON.stringify({
      productId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res_json = await res.json();
  const data = res_json.data;
  console.log(res_json);
  const product = {
    productNo: data.productNo,
    productId: data.productId,
    name: data.name,
    details: [
      {
        content: "34 x 24 x 12 cm",
        lists: [
          "Grey",
          "Monogram-embossed puffy lambskin",
          "Calfskin-leather trim",
          "Microfiber lining",
          "Gold-color hardware",
          "3 inside compartments",
          "Zip closure",
          "Strap: Removable, adjustable",
          "Strap drop:30.0 cm",
          "Strap drop max:50.0 cm",
          "Chain: Removable",
          "Chain drop:21.0 cm",
        ],
      },
    ],
    images: data.images.map((item: string) => process.env.BaseUrl + item),
    description:
      "本款 Coussin 小号手袋为蓬软羊皮革压印经典 Monogram 图案，与粗链条等金属件共同释放耀目莹泽。系上宽幅织物肩带，解锁肩背和斜挎方式，令简约造型释放潮流格调,解锁肩背和斜挎方式，令简约造型释放潮流格调",
    tags: [
      { title: "Sustainability", description: "" },
      { title: "Product Care", description: "" },
    ],
    services: [],
    price: data.price,
    detail: data.detail,
    status: data.status,
    color: data.color,
    saleCount: data.saleCount,
    recommand: [
      {
        images: [
          process.env.BaseUrl +
            "/images/VL%20bags/Fragrances/Women%27s%20Fragrances/Attrape-R%C3%AAves/1.webp",
          process.env.BaseUrl +
            "/images/VL%20bags/Fragrances/Women%27s%20Fragrances/Attrape-R%C3%AAves/2.webp",
          process.env.BaseUrl +
            "/images/VL%20bags/Fragrances/Women%27s%20Fragrances/Rose%20des%20Vents/2.webp",
          process.env.BaseUrl +
            "/images/VL%20bags/Fragrances/Women%27s%20Fragrances/Travel%20Spray%20Spell%20on%20You/1.webp",
        ],
        name: "Coussin MM",
        price: 39100,
        color: "green",
        productId: "e3002b74ec61f0467dbb6e1f89d36df4",
        productNo: "M1234",
        saleCount: 10,
      },
      {
        images: [
          process.env.BaseUrl +
            "/images/VL%20bags/Fragrances/Women%27s%20Fragrances/Travel%20Spray%20Spell%20on%20You/2.webp",
          process.env.BaseUrl +
            "/images/VL%20bags/MEN/Christopher/Christopher%20MM/2.webp",
          process.env.BaseUrl +
            "/images/VL%20bags/MEN/Christopher/Christopher%20MM/4.webp",
          process.env.BaseUrl +
            "/images/VL%20bags/MEN/Christopher/Christopher%20Slim%20Backpack/4.webp",
        ],
        name: "Coussin SM",
        price: 29100,
        color: "red",
        productId: "e3002b74ec61f0467dbb6e1f89d36df5",
        productNo: "M1234",
        saleCount: 10,
      },
      {
        images: [
          process.env.BaseUrl +
            "/images/VL%20bags/MEN/Christopher/Christopher%20Wearable%20Wallet/2.webp",
          process.env.BaseUrl +
            "/images/VL%20bags/MEN/Christopher/Christopher%20Wearable%20Wallet/5.webp",
          process.env.BaseUrl +
            "/images/VL%20bags/MEN/Exotic%20Leather%20Bags/Avenue%20Slingbag/1.webp",
          process.env.BaseUrl +
            "/images/VL%20bags/MEN/Exotic%20Leather%20Bags/Avenue%20Slingbag/3.webp",
        ],
        name: "Coussin PM",
        price: 59100,
        color: "gray",
        productId: "e3002b74ec61f0467dbb6e1f89d36df5",
        productNo: "M1234",
        saleCount: 12,
      },
    ],
  };
  return { product, status: data.status };
};
