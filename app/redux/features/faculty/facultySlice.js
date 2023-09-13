"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    faculties:[]
}

export const facultiesSlice = createSlice({
    name:"faculties",
    initialState,
    reducers:{
        setFaculties:(state,action) => {
            state.faculties = action.payload
        },
        addFaculty:(state,action) => {
            state.faculties.push(action.payload)
        },
        deleteFaculty:(state,action) => {
            state.faculties = state.faculties.filter(facility => {
                return facility.id !== action.payload
            })
        }
    }
})

export const { setFaculties,addFaculty,deleteFaculty } = facultiesSlice.actions
export default facultiesSlice.reducer