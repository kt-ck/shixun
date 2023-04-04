import {
    Action,
    configureStore,
    ThunkAction,
  } from '@reduxjs/toolkit';
import testReducer from "@/features/testFeature/testSlice";
import RoleReducer from "@/features/roleFeature/roleFeature";
import layoutSlice from '@/features/layoutFeature/layoutSlice';
export const store = configureStore({
  reducer: {
    // reference reducers here
    test: testReducer,
    role: RoleReducer,
    layout: layoutSlice,
  }
})

// create types for state and dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
 >;