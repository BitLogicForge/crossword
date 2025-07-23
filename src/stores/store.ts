import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '../notifications/notificationSlice';
import appReducer from './slices/appSlice';
import crossReducer from './slices/crossSlice';
export const store = configureStore({
  reducer: {
    cross: crossReducer,
    app: appReducer,
    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
