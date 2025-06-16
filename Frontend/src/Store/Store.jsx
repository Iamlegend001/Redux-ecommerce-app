import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Reducers/userSlice';
import productSlice from './Reducers/productSlice';
import cartSlice from './Reducers/cartSlice';

export const store = configureStore({
  reducer: {
    userReducers: userSlice,
    productReducers: productSlice,
    cartReducers: cartSlice,
  },
});
