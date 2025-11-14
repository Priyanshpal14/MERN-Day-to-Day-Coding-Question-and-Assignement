// src/features/products/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API call
const mockAPI = {
  fetchProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'Laptop', price: 999, stock: 5 },
          { id: 2, name: 'Smartphone', price: 699, stock: 10 },
          { id: 3, name: 'Headphones', price: 199, stock: 15 },
          { id: 4, name: 'Tablet', price: 499, stock: 8 },
        ]);
      }, 1000);
    });
  },
};

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await mockAPI.fetchProducts();
    return response;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    updateProduct: (state, action) => {
      const { id, updates } = action.payload;
      const product = state.items.find(item => item.id === id);
      if (product) {
        Object.assign(product, updates);
      }
    },
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { updateProduct, addProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;