import { createSlice } from "@reduxjs/toolkit";
import { getAllUser, getFetchUser } from "../Api/UserApi";

const initialState = {
  isAtuhenticated: false,
  isLoading: true,
  error: null,
  user: [],
  allUser: [],
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: builder => {
    builder.addCase(getFetchUser.pending, (state, action) => {
      state.isLoading = true;
      state.isAtuhenticated = false;
    });
    builder.addCase(getFetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAtuhenticated = true;
    });
    builder
      .addCase(getFetchUser.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.error.message;

        state.isAtuhenticated = false;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.allUser = action.payload.users;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
  reducers: {
    addNewAddress: (state, action) => {
      state.user.addresses.push(action.payload);
    },
    removeAddress: (state, action) => {
      state.user = state.user.addresses.filter(item => {
        return item._id !== action.payload;
      });
    },
    removeUser: (state, action) => {
      state.allUser = state.allUser.filter(item => {
        return item._id !== action.payload;
      });
    },
  },
});

export const { addNewAddress, removeAddress, removeUser } = UserSlice.actions;

export default UserSlice.reducer;
