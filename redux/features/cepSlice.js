import { createSlice } from "@reduxjs/toolkit";

const cepSlice = createSlice({
  name: "cep",
  initialState: {
    cep: null,
    value: 0,
    take_in_local: false,
    cidade: null,
    bairro: null,
  },
  reducers: {
    addCep: (state, action) => {
      state.cep = action.payload.cep;
      state.value = action.payload.value;
      state.bairro = action.payload.bairro;
      state.cidade = action.payload.cidade;
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
