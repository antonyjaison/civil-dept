'use client'

import { configureStore} from '@reduxjs/toolkit'
import facilityReducer from './features/facilities/facilitiesSlice';
import facultyReducer from './features/faculty/facultySlice'
import achivementReducer from './features/achivements/achivementsSlice'

export const store = configureStore({
  reducer: {
    facility: facilityReducer,
    faculty:facultyReducer,
    achivements:achivementReducer
  },
});