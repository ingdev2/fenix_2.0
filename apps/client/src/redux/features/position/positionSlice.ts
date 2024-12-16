import { createSlice } from "@reduxjs/toolkit";

const initialState: Position = {
  id: 0,
  pos_code_k: 0,
  pos_name: "",
  pos_level: 0,
  pos_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    setIdPosition: (state, action) => {
      state.id = action.payload;
    },
    setCodePosition: (state, action) => {
      state.pos_code_k = action.payload;
    },
    setNamePosition: (state, action) => {
      state.pos_name = action.payload;
    },
    setLevelPosition: (state, action) => {
      state.pos_level = action.payload;
    },
    setStatusPosition: (state, action) => {
      state.pos_status = action.payload;
    },
    setCreateDatePosition: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDatePosition: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDatePosition: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesPosition: (state) => {
      state.id = 0;
      state.pos_code_k = 0;
      state.pos_name = "";
      state.pos_level = 0;
      state.pos_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdPosition,
  setCodePosition,
  setNamePosition,
  setLevelPosition,
  setStatusPosition,
  setCreateDatePosition,
  setUpdateDatePosition,
  setDeleteDatePosition,
  setDefaultValuesPosition,
} = positionSlice.actions;

export default positionSlice.reducer;
