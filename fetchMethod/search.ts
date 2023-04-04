export const search = async (name: string, pageNum: number) => {
  const res = await fetch(process.env.BaseUrl + "/product/findProduct", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      pageNum,
      pageSize: 8,
    }),
  });
  const res_json = await res.json();
  console.log("findProduct", res_json);
  return res_json.data;
};
