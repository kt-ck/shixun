import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { NotificationType } from "@/type/type";
interface LayoutStateType {
  notification: NotificationType;
  cartIsOpen: boolean;
}

const initialState: LayoutStateType = {
  notification: {
    notifacationShow: false,
    notificationContent: "",
    notificationTitle: "",
    notificationType: "info",
  },
  cartIsOpen: false,
};

export const LayoutSlice = createSlice({
  name: "role",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<NotificationType>) => {
      state.notification = action.payload;
    },
    setCart: (state, action: PayloadAction<boolean>) => {
      state.cartIsOpen = action.payload;
    },
  },
});

export const { setNotification, setCart } = LayoutSlice.actions;
export const selectUserInfo = (state: RootState) => state.layout.notification;
export const selectCart = (state: RootState) => state.layout.cartIsOpen;

export default LayoutSlice.reducer;
