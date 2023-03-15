import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { NotificationType } from "@/type/type";
interface LayoutStateType {
  notification: NotificationType;
}

const initialState: LayoutStateType = {
  notification: {
    notifacationShow: false,
    notificationContent: "",
    notificationTitle: "",
    notificationType: "info",
  },
};

export const LayoutSlice = createSlice({
  name: "role",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<NotificationType>) => {
      state.notification = action.payload;
    },
  },
});

export const { setNotification } = LayoutSlice.actions;
export const selectUserInfo = (state: RootState) => state.layout.notification;

export default LayoutSlice.reducer;
