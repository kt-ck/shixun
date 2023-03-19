import { Cart } from "@/type/type";
import { AppDispatch } from "@/store/store";
import { setNotification } from "@/features/layoutFeature/layoutSlice";

export const delProduct = async (product: Cart, dispatch: AppDispatch) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await fetch(process.env.BaseUrl + "/cart/delete", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        productId: product.productId,
      }),
    });
    const res_json = await res.json();
    if (res_json.status === 0) {
      dispatch(
        setNotification({
          notifacationShow: true,
          notificationContent: res_json.msg,
          notificationTitle: "DElETE PRODUCTS ERROR",
          notificationType: "error",
        })
      );
    }
  }
};

export const getCartList = async () => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await fetch(process.env.BaseUrl + "/cart/list", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const res_json = await res.json();
    console.log(res_json);
    return res_json.data.cartList.cartList;
  }
};

export const changeNum = async (
  product: Cart,
  count: number,
  dispatch: AppDispatch
) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await fetch(process.env.BaseUrl + "/cart/modify", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        productId: product.productId,
        num: count,
      }),
    });
    const res_json = await res.json();
    if (res_json.status === 0) {
      dispatch(
        setNotification({
          notifacationShow: true,
          notificationContent: res_json.msg,
          notificationTitle: "MODIFY ERROR",
          notificationType: "error",
        })
      );
    }
  }
};

export const addProductToCart = async (productId: string) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await fetch(process.env.BaseUrl + "/cart/add", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        productId,
        num: 1,
      }),
    });
    const res_json = await res.json();
  }
};
