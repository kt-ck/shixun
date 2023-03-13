import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

// Define a type for the slice state
interface UserInfo {
  role: string;
  name: string;
  email: string;
  avatar: string;
  isLogIn: boolean;
  cart: { pid: string }[];
}
interface RoleState {
  userInfo: UserInfo;
}

// Define the initial state using that type
const initialState: RoleState = {
  userInfo: {
    role: "guest",
    name: "",
    email: "",
    avatar: "",
    isLogIn: false,
    cart: [],
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
    addProduct: (state, action: PayloadAction<{ pid: string }>) => {
      console.log("add")
      state.userInfo.cart = [...state.userInfo.cart, action.payload];
    },
  },
});

export const { setInfo, setIsLogIn, addProduct } = RoleSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserInfo = (state: RootState) => state.role.userInfo;

export default RoleSlice.reducer;
