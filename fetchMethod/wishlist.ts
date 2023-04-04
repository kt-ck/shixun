import { AppDispatch } from "@/store/store";
import { setNotification } from "@/features/layoutFeature/layoutSlice";
export const addWishlist = async (productId: string, dispatch: AppDispatch) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await fetch(process.env.BaseUrl + "/favorites/add", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        productId,
      }),
    });
    const res_json = await res.json();
    console.log(res_json);
    if (Number(res_json.status) === 0) {
      dispatch(
        setNotification({
          notifacationShow: true,
          notificationContent: res_json.msg,
          notificationTitle: "ADD TO WISHLIST ERROR",
          notificationType: "error",
        })
      );
    }
  }
};

export const delWishlist = async (productId: string, dispatch: AppDispatch) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await fetch(process.env.BaseUrl + "/favorites/delete", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        productId,
      }),
    });
    const res_json = await res.json();
    console.log(res_json);
    if (Number(res_json.status) === 0) {
      dispatch(
        setNotification({
          notifacationShow: true,
          notificationContent: res_json.msg,
          notificationTitle: "DELETE Product FROM WISHLIST ERROR",
          notificationType: "error",
        })
      );
    }
  }
};
// interface GetWishListType{images:string[]; name:string;price:number;productId:string}[]
export const getWishlist = async (dispatch: AppDispatch) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await fetch(process.env.BaseUrl + "/favorites/list", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        pageNum: 1,
        pageSize: 5,
      }),
    });
    const res_json = await res.json();
    console.log("getWishList", res_json);
    if (Number(res_json.status) === 0) {
      dispatch(
        setNotification({
          notifacationShow: true,
          notificationContent: res_json.msg,
          notificationTitle: "DELETE Product FROM WISHLIST ERROR",
          notificationType: "error",
        })
      );
      return [];
    } else {
      return res_json.data.product;
    }
  }
  return [];
};
