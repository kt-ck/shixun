export const userInfo = async () => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await fetch(process.env.BaseUrl + "/user/detail", {
      method: "get",
      headers: {
        Authorization: token,
      },
    });
    const res_json = await res.json();
    console.log("getuserinfo", res_json);
    return res_json.data;
  }
};

export const getAddress = async (pageNum: number) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await fetch(
      process.env.OptionalUrl +
        `/rec_address/getList/?pageNum=${pageNum}&pageSize=${5}`,
      {
        method: "get",
        headers: {
          Authorization: token,
        },
      }
    );
    const res_json = await res.json();
    console.log("address", res_json);
    return res_json.recAddresses;
  }
};

export const removeAddress = async (recAddressId: string) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await fetch(
      process.env.OptionalUrl +
        `/rec_address/delete/?recAddressId=${recAddressId}`,
      {
        method: "post",
        headers: {
          Authorization: token,
        },
      }
    );
    const res_json = await res.json();
    console.log("remove", res_json);
    return res_json;
  }
};

export const addAddress = async (
  rec_name: string,
  address: string,
  phone_number: string
) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await fetch(
      process.env.OptionalUrl +
        `/rec_address/add/?rec_name=${rec_name}&address=${address}&phone_number=${phone_number}`,
      {
        method: "post",
        headers: {
          Authorization: token,
        },
      }
    );
    const res_json = await res.json();
    console.log("add address", res_json);
    return res_json;
  }
};

export const listOrder = async (pageNum: number) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await fetch(process.env.OptionalUrl + `/order/list`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        pageNum,
        pageSize: 8,
      }),
    });
    const res_json = await res.json();
    console.log("list order", res_json);
    return res_json.data;
  }
};

export const finish = async (orderId:string) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const res = await fetch(process.env.OptionalUrl + `/order/finish?orderId=${orderId}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const res_json = await res.json();
    console.log("finished", res_json);
    // return res_json.data;
  }
};
