import { createSlice } from "@reduxjs/toolkit";

const initialState: UnsafeAction = {
  id: 0,
  uns_a_name: "",
  uns_a_description: "",
  uns_a_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const unsafeActionSlice = createSlice({
  name: "unsafeAction",
  initialState,
  reducers: {
    setIdCaseType: (state, action) => {
      state.id = action.payload;
    },
    setNameCaseType: (state, action) => {
      state.uns_a_name = action.payload;
    },
    setDescriptionCaseType: (state, action) => {
      state.uns_a_description = action.payload;
    },
    setStatusCaseType: (state, action) => {
      state.uns_a_status = action.payload;
    },
    setCreateDateCaseType: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateCaseType: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateCaseType: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesCaseType: (state) => {
      state.id = 0;
      state.uns_a_name = "";
      state.uns_a_description = "";
      state.uns_a_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdCaseType,
  setNameCaseType,
  setDescriptionCaseType,
  setStatusCaseType,
  setCreateDateCaseType,
  setUpdateDateCaseType,
  setDeleteDateCaseType,
  setDefaultValuesCaseType,
} = unsafeActionSlice.actions;

export default unsafeActionSlice.reducer;
