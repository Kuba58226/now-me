import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    userToken: null,
  },
  reducers: {
    enterUserToken: (state, action) => {
      state.userToken = action.payload.userToken;
    },
  },
});

export const { enterUserToken } = appSlice.actions;

export const selectUserToken = (state) => state.app.userToken;

export default appSlice.reducer;