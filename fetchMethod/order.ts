export const getStoreList = async (pageNum: number) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await fetch(
      process.env.OptionalUrl +
        `/store_info/getList/?pageSize=8&pageNum=${pageNum}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    const res_json = await res.json();
    console.log(res_json);
    return { storeList: res_json.stores, total: res_json["pageTotal "] };
  }
};

export const createOrder = async (
  deliveryWay: number,
  storeId: string,
  recAddressId: string
) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await fetch(process.env.BaseUrl + `/order/create`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        deliveryWay,
        storeId,
        recAddressId,
      }),
    });
    const res_json = await res.json();
    console.log(res_json);
    return res_json.data.orderId;
  }
};

export const pay = async (orderId: string) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    // console.log(process.env.BaseUrl + `/order/pay?orderId=${orderId}`)
    const res = await fetch(process.env.BaseUrl + `/order/pay?out_trade_no=${orderId}&trade_no=1`, {
      method: "get",
      headers: {
        Authorization: token,
      },
    });
    const res_json = await res.json();
    console.log(res_json);
    // return res_json.data.orderId;
  }
};
