import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { Cart, SimpleProduct } from "@/type/type";
import { Category } from "tabler-icons-react";
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
  pickedCategory: { name: string; categoryId: string; level: number }[];
  search: { searchName:string};
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

  pickedCategory: [],

  search: {
    searchName: ""
  }
  
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

    setWishlist: (state, action: PayloadAction<SimpleProduct[]>) => {
      state.wishlist.products = action.payload;
    },
    clearWishlist: (state) => {
      state.wishlist.products = [];
    },

    clearAll: (state) => {
      state.userInfo = { role: 0, name: "", phone: "", isLogIn: false };
      state.cart.products = [];
      state.wishlist.products = [];
    },
    setPickedCategory: (
      state,
      action: PayloadAction<{
        category: string;
        level: number;
        categoryId: string;
      }>
    ) => {
      if (state.pickedCategory.length < action.payload.level) {
        state.pickedCategory.push({
          name: action.payload.category,
          categoryId: action.payload.categoryId,
          level: action.payload.level,
        });
      } else {
        state.pickedCategory[action.payload.level - 1] = {
          name: action.payload.category,
          categoryId: action.payload.categoryId,
          level: action.payload.level,
        };
      }
    },
    setSearchName: (state,action:PayloadAction<string>)=>{
      state.search.searchName = action.payload
    }
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
  setPickedCategory,
  setWishlist,
  clearWishlist,
  setSearchName
} = RoleSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserInfo = (state: RootState) => state.role.userInfo;
export const selectWishList = (state: RootState) => state.role.wishlist;
export const selectCart = (state: RootState) => state.role.cart;
export const selectSearchInfo = (state: RootState) => state.role.search;
export default RoleSlice.reducer;
