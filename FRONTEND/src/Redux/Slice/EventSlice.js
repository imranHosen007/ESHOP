import { createSlice } from "@reduxjs/toolkit";
import { getAllEvent, getShopEvent } from "../Api/EventApi";

const initialState = {
  isLoading: true,
  error: null,
  event: [],
  allEvent: [],
};

const EventSlice = createSlice({
  name: "event",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getShopEvent.pending, state => {
        state.isLoading = true;
      })
      .addCase(getShopEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.event = action.payload.events;
      })
      .addCase(getShopEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllEvent.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allEvent = action.payload.events;
      })
      .addCase(getAllEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
  reducers: {
    deleteEvent: (store, action) => {
      store.event = store.event.filter(item => {
        return item._id !== action.payload;
      });
    },
    removeEvent: (store, action) => {
      store.allEvent = store.allEvent.filter(item => {
        return item._id !== action.payload;
      });
    },
  },
});

export const { deleteEvent, removeEvent } = EventSlice.actions;
export default EventSlice.reducer;
