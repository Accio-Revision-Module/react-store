import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/productsSlice";
import logger from "redux-logger";
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
  },
  middlewar: [logger],
});
