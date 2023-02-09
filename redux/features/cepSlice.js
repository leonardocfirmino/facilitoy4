import { createSlice } from "@reduxjs/toolkit";

const cepSlice = createSlice({
  name: "cep",
  initialState: { cep: null, value: 0, take_in_local: false },
  reducers: {
    addCep: (state, action) => {
      state.cep = action.payload.cep;
      state.value = action.payload.value;
    },
    setTakeInLocal: (state, action) => {
      state.take_in_local = action.payload;
    },
    removeCep: (state, action) => {
      state.cep = null;
      state.value = 0;
    },
  },
});

export const cepReducer = cepSlice.reducer;

export const { addCep, setTakeInLocal, removeCep } = cepSlice.actions;
