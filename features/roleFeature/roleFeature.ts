import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { Cart, SimpleProduct } from "@/type/type";
// Define a type for the slice state
interface UserInfo {
  role: number;
  name: string;
  phone: string;
  isLogIn: boolean;
}

interface RoleState {
  userInfo: UserInfo;
  cart: { products: Cart[]; stale: boolean };
  wishlist: {
    products: SimpleProduct[];
  };
}

// Define the initial state using that type
const initialState: RoleState = {
  userInfo: {
    role: 0,
    name: "",
    phone: "",
    isLogIn: false,
  },

  cart: {
    products: [],
    stale: false,
  },

  wishlist: {
    products: [],
  },
};

export const RoleSlice = createSlice({
  name: "role",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    setIsLogIn: (state, action: PayloadAction<boolean>) => {
      state.userInfo.isLogIn = action.payload;
    },
    addProduct: (state, action: PayloadAction<Cart>) => {
      let f = false;
      state.cart.products.forEach((item, index) => {
        if (item.productId === action.payload.productId) {
          state.cart.products[index].count += 1;
          state.cart.products[index].isUpload = action.payload.isUpload;
          f = true;
        }
      });

      if (!f) {
        state.cart.products.push(action.payload);
      }
    },
    removeProduct: (state, action: PayloadAction<Cart>) => {
      state.cart.products = state.cart.products.filter(
        (item) => item.productId !== action.payload.productId
      );
    },
    setCartStale: (state, action: PayloadAction<boolean>) => {
      state.cart.stale = action.payload;
    },
    setProduct: (state, action: PayloadAction<Cart>) => {
      state.cart.products = state.cart.products.map((item) => {
        if (item.productId === action.payload.productId) {
          return { ...item, count: action.payload.count };
        }
        return item;
      });
    },
    setProducts: (state, action: PayloadAction<Cart[]>) => {
      state.cart.products = action.payload;
    },
    clearCart: (state) => {
      state.cart.products = [];
    },
    addWishlist: (state, action: PayloadAction<SimpleProduct>) => {
      let flag = true;
      state.wishlist.products.forEach((item) => {
        if (item.name === action.payload.name) {
          flag = false;
        }
      });

      if (flag) {
        state.wishlist.products.push(action.payload);
      }
    },
    clearAll: (state) => {
      state.userInfo = { role: 0, name: "", phone: "", isLogIn: false };
      state.cart.products = [];
      state.wishlist.products = [];
    },
  },
});

export const {
  setInfo,
  setIsLogIn,
  addProduct,
  removeProduct,
  setProduct,
  addWishlist,
  clearCart,
  clearAll,
  setCartStale,
  setProducts,
} = RoleSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserInfo = (state: RootState) => state.role.userInfo;
export const selectWishList = (state: RootState) => state.role.wishlist;
export const selectCart = (state: RootState) => state.role.cart;
export default RoleSlice.reducer;
