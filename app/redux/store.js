'use client'

import { configureStore} from '@reduxjs/toolkit'
import facilityReducer from './features/facilities/facilitiesSlice';

  export const store = configureStore({
    reducer: {
      facility: facilityReducer,
    },
  
   });