import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../features/cartSlice";
import { cepReducer } from "../features/cepSlice";

const reducer = {
  cart: cartReducer,
  cep: cepReducer,
};

const store = configureStore({
  reducer,
});

export default store;
