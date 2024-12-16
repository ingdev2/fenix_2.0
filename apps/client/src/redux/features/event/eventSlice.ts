import { createSlice } from "@reduxjs/toolkit";

const initialState: Event = {
  id: 0,
  eve_eventtype_id_fk: 0,
  eve_unit_id_fk: 0,
  eve_name: "",
  eve_description: "",
  eve_status: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const eventSlice = createSlice({
  name: "Event",
  initialState,
  reducers: {
    setIdEvent: (state, action) => {
      state.id = action.payload;
    },
    setEventTypeIdFk: (state, action) => {
      state.eve_eventtype_id_fk = action.payload;
    },
    setUnitIdFk: (state, action) => {
      state.eve_unit_id_fk = action.payload;
    },
    setNameEvent: (state, action) => {
      state.eve_name = action.payload;
    },
    setDescriptionEvent: (state, action) => {
      state.eve_description = action.payload;
    },
    setStatusEvent: (state, action) => {
      state.eve_status = action.payload;
    },
    setCreateDateEvent: (state, action) => {
      state.createdAt = action.payload;
    },
    setUpdateDateEvent: (state, action) => {
      state.updateAt = action.payload;
    },
    setDeleteDateEvent: (state, action) => {
      state.deletedAt = action.payload;
    },
    setDefaultValuesEvent: (state) => {
      state.id = 0;
      state.eve_name = "";
      state.eve_description = "";
      state.eve_status = true;
      state.createdAt = "";
      state.updateAt = "";
      state.deletedAt = "";
    },
  },
});

export const {
  setIdEvent,
  setEventTypeIdFk,
  setUnitIdFk,
  setNameEvent,
  setDescriptionEvent,
  setStatusEvent,
  setCreateDateEvent,
  setUpdateDateEvent,
  setDeleteDateEvent,
  setDefaultValuesEvent,
} = eventSlice.actions;

export default eventSlice.reducer;
