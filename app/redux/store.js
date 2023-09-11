'use client'

import { combineReducers ,configureStore} from '@reduxjs/toolkit'
import facilityReducer from './features/facilities/facilitiesSlice';

const rootReducer = combineReducers({
    facility: facilityReducer,
    //add all your reducers here
  },);
  
  export const store = configureStore({
    reducer: rootReducer,
  
   });