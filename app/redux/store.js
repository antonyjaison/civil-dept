'use client'

import { configureStore } from "@reduxjs/toolkit";
import facilityReducer from "./features/facilities/facilitiesSlice";
import facultyReducer from "./features/faculty/facultySlice";
import achivementReducer from "./features/achivements/achivementsSlice";
import favoritesSlice from "./features/favorites/favoritesSlice";
import placementsReducer from "./features/placement/placementSlice";
import gallerySlice from "./features/gallery/gallerySlice";

export const store = configureStore({
  reducer: {
    facility: facilityReducer,
    faculty: facultyReducer,
    achivements: achivementReducer,
    favorites: favoritesSlice,
    placement: placementsReducer,
    gallery: gallerySlice 
  },
});