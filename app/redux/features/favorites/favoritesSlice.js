"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    deleteFavorite: (state, action) => {
      state.favorites = state.favorites.filter((favorite) => {
        return favorite.id !== action.payload;
      });
    },
    addFavorite: (state, action) => {
      const newData = [...state.favorites, action.payload];
      newData.sort((a, b) => a.name.localeCompare(b.name));
      state.favorites = newData;
    },
  },
});

export const { setFavorites, deleteFavorite, addFavorite } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
