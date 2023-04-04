export const getFirstCategory = async () => {
  try {
    const res = await fetch(process.env.OptionalUrl + "/category/list/", {
      method: "get",
    });
    const res_json = await res.json();
    console.log(res_json);
    return res_json.categories;
  } catch (err) {
    console.log(err);
  }
};

export const getNextCategory = async (category: string) => {
  console.log(category);
  const res = await fetch(
    process.env.OptionalUrl + `/category/getChildList/?parent_id=${category}`,
    {
      method: "get",
    }
  );
  const res_json = await res.json();
  console.log(res_json);
  return res_json.categories;
};
