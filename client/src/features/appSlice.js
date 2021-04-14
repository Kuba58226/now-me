import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    userToken: null,
    userRole: null,
  },
  reducers: {
    enterUserToken: (state, action) => {
      state.userToken = action.payload.userToken;
    },
    enterUserRole: (state, action) => {
      state.userRole = action.payload.userRole;
    },
  },
});

export const { enterUserToken, enterUserRole } = appSlice.actions;

export const selectUserToken = (state) => state.app.userToken;

export const selectUserRole = (state) => state.app.userRole;

export default appSlice.reducer;
