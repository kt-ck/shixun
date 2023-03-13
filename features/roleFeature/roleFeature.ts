import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { Cart } from "@/type/type";
// Define a type for the slice state
interface UserInfo {
  role: string;
  name: string;
  email: string;
  avatar: string;
  isLogIn: boolean;
}
interface RoleState {
  userInfo: UserInfo;
  cart: { products: Cart[]};
}

// Define the initial state using that type
const initialState: RoleState = {
  userInfo: {
    role: "guest",
    name: "",
    email: "",
    avatar: "",
    isLogIn: false,
  },

  cart: {
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
        if (item.pid === action.payload.pid && item.sku === action.payload.sku) {
          state.cart.products[index].count += 1;
          f = true;
        }
      });

      if (!f) {
        state.cart.products.push(action.payload);
      }
    },
    removeProduct: (state, action:PayloadAction<Cart>) => {
      state.cart.products =  state.cart.products.filter((item)=>item.pid !== action.payload.pid || item.sku !== action.payload.sku )
    }
  },
});

export const { setInfo, setIsLogIn, addProduct, removeProduct } = RoleSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserInfo = (state: RootState) => state.role.userInfo;

export default RoleSlice.reducer;
