import { createSlice } from "@reduxjs/toolkit";

const cepSlice = createSlice({
  name: "cep",
  initialState: { cep: null, value: 0 },
  reducers: {
    addCep: (state, action) => {
      state.cep = action.payload.cep;
      state.value = action.payload.value;
    },

    removeCep: (state, action) => {
      state.cep = null;
      state.value = 0;
    },
  },
});

export const cepReducer = cepSlice.reducer;

export const {
  addCep,

  removeCep,
} = cepSlice.actions;
