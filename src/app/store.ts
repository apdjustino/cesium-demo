import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { materialApi } from "../api/api";


export const store = configureStore({
  reducer: {
    [materialApi.reducerPath]: materialApi.reducer,
  },
  middleware: (gDM) => gDM().concat(materialApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
