import { configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
import authApi from "./services/authApi";
import authReducer, { logout } from "./features/authSlice";

import paymentApi from "./services/paymentApi";

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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authErrorMiddleware)
      .concat(authApi.middleware)

      .concat(paymentApi.middleware),
});

export default store;
