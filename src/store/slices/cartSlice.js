import { createSlice } from "@reduxjs/toolkit";
import { fetchCart } from "../actions/cartActions";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    error: null,
    cart: [],
    cartIds: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload?.products;
      state.cartIds = action.payload?.productIds;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default cartSlice.reducer;
