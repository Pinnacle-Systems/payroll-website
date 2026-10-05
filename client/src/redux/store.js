import { configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
import authApi from "./services/authApi";
import authReducer, { logout } from "./features/authSlice";

import paymentApi from "./services/paymentApi";
import { adminApi } from "./services/adminApi";
import { publicApi } from "./services/publicApi";

// Auto-logout on any 401 response from any RTK Query endpoint
const authErrorMiddleware = (api) => (next) => (action) => {
  if (isRejectedWithValue(action) && action.payload?.status === 401) {
    api.dispatch(logout());
  }
  return next(action);
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,

    [paymentApi.reducerPath]: paymentApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [publicApi.reducerPath]: publicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authErrorMiddleware)
      .concat(authApi.middleware)
      .concat(paymentApi.middleware)
      .concat(adminApi.middleware)
      .concat(publicApi.middleware),
});

export default store;
