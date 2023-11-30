import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../actions/productsActions";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    originalProducts: [],
    error: null,
  },
  reducers: {
    filter: (state, action) => {
      if (!action.payload) {
        state.products = state.originalProducts;
      } else {
        state.products = state.originalProducts.filter((e) =>
          e.title.toLowerCase().includes(action.payload.toLowerCase()),
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.originalProducts = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { filter } = productsSlice.actions;
export default productsSlice.reducer;
