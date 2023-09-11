"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    facilities:[]
}

export const facilitiesSlice = createSlice({
    name:"facilities",
    initialState,
    reducers:{
        setFacilities:(state,action) => {
            state.facilities = action.payload
        }
    }
})

export const { setFacilities } = facilitiesSlice.actions
export default facilitiesSlice.reducer