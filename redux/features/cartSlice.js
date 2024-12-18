import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.find((item) => item.id === action.payload.id);
      if (itemExists) {
        return;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    editTime: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);

      item.time = action.payload.time;
    },

    removeFromCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  editTime,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;
