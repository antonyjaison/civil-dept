"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  placements: [],
};

export const placementsSlice = createSlice({
  name: "placements",
  initialState,
  reducers: {
    setPlacements: (state, action) => {
      state.placements = action.payload;
    },
    addPlacement: (state, action) => {
      state.placements.push(action.payload);
    },
    deletePlacement: (state, action) => {
      state.placements = state.placements.filter((placement) => {
        return placement.id !== action.payload;
      });
    },
  },
});

export const { setPlacements, addPlacement, deletePlacement } =
  placementsSlice.actions;
export default placementsSlice.reducer;
