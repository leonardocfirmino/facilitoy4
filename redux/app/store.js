import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../features/cartSlice";
import { cepReducer } from "../features/cepSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  cart: cartReducer,
  cep: cepReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({ reducer: persistedReducer });

export default store;
