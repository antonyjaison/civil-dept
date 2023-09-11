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
        },
        addFacilities:(state,action) => {
            state.facilities.push(action.payload)
        },
        deleteFacility:(state,action) => {
            state.facilities = state.facilities.filter(facility => {
                return facility.id !== action.payload
            })
        }
    }
})

export const { setFacilities,addFacilities,deleteFacility } = facilitiesSlice.actions
export default facilitiesSlice.reducer