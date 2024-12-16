import { createSlice } from "@reduxjs/toolkit";
import { ItemKeys } from "@/components/common/custom_dashboard_layout/enums/item_names_and_keys.enums";

const initialState = {
  selectedKey: ItemKeys.ITEM_CREATE_REPORT_KEY,
  selectedOpenKeys: [""],
};

export const itemMenuSelectedKeySlice = createSlice({
  name: "itemMenuSelectedKey",
  initialState,
  reducers: {
    setSelectedKey: (state, action) => {
      state.selectedKey = action.payload;
    },
    setSelectedOpenKeys: (state, action) => {
      state.selectedOpenKeys = action.payload;
    },
    setResetSelectedKey: (state) => {
      state.selectedKey = ItemKeys.ITEM_CREATE_REPORT_KEY;
      state.selectedOpenKeys = [""];
    },
  },
});

export const { setSelectedKey, setSelectedOpenKeys, setResetSelectedKey } =
  itemMenuSelectedKeySlice.actions;

export default itemMenuSelectedKeySlice.reducer;
