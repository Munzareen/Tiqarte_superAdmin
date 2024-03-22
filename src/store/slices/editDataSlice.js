// editDataSlice.js

import { createSlice } from "@reduxjs/toolkit";

const editDataSlice = createSlice({
  name: "editData",
  initialState: null,
  reducers: {
    setEditData: (state, action) => action.payload,
    clearEditData: (state) => null,
  },
});

export const { setEditData, clearEditData } = editDataSlice.actions;

export default editDataSlice.reducer;
