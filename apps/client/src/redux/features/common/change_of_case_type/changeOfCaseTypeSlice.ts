import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idOfCaseType: 0,
  nameOfCaseType: "",
};

export const changeOfCaseTypeSlice = createSlice({
  name: "changeOfCaseType",
  initialState,
  reducers: {
    setIdOfCaseType: (state, action) => {
      state.idOfCaseType = action.payload;
    },
    setNameOfCaseType: (state, action) => {
      state.nameOfCaseType = action.payload;
    },
  },
});

export const { setIdOfCaseType, setNameOfCaseType } =
  changeOfCaseTypeSlice.actions;

export default changeOfCaseTypeSlice.reducer;
