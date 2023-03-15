import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { Cart,SimpleProduct } from "@/type/type";
// Define a type for the slice state
interface UserInfo {
  role: string;
  name: string;
  email: string;
  avatar: string;
  isLogIn: boolean;
  token: string;
}

interface RoleState {
  userInfo: UserInfo;
  cart: { products: Cart[] };
  wishlist: {
    products: SimpleProduct[]
  }
}

// Define the initial state using that type
const initialState: RoleState = {
  userInfo: {
    role: "guest",
    name: "",
    email: "",
    avatar: "",
    isLogIn: false,
    token: ""
  },

  cart: {
    products: [],
  },

  wishlist: {
    products:[]
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
        if (
          item.pid === action.payload.pid &&
          item.sku === action.payload.sku
        ) {
          state.cart.products[index].count += 1;
          f = true;
        }
      });

      if (!f) {
        state.cart.products.push(action.payload);
      }
    },
    removeProduct: (state, action: PayloadAction<Cart>) => {
      state.cart.products = state.cart.products.filter(
        (item) =>
          item.pid !== action.payload.pid || item.sku !== action.payload.sku
      );
    },
    setProduct: (state, action: PayloadAction<Cart>) => {
      state.cart.products = state.cart.products.map((item) => {
        if (
          item.pid === action.payload.pid &&
          item.sku === action.payload.sku
        ) {
          return { ...item, count: action.payload.count };
        }
        return item;
      });
    },
    addWishlist: (state, action: PayloadAction<SimpleProduct>) => {
      let flag = true
      state.wishlist.products.forEach((item)=>{
        if(item.name === action.payload.name){
          flag = false
        }
      })

      if(flag){
        state.wishlist.products.push(action.payload)
      }
    },
    setToken:(state, action:PayloadAction<string>)=>{
      state.userInfo.token = action.payload
    }
  },
});

export const { setInfo, setIsLogIn, addProduct, removeProduct, setProduct,setToken,addWishlist } =
  RoleSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserInfo = (state: RootState) => state.role.userInfo;
export const selectWishList = (state: RootState) => state.role.wishlist;

export default RoleSlice.reducer;
