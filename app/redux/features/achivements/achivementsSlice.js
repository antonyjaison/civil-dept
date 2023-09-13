"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    achivements:[]
}

export const achivementsSlice = createSlice({
    name:"achivements",
    initialState,
    reducers:{
        setAchivements:(state,action) => {
            state.achivements = action.payload
        },
        addAchivement:(state,action) => {
            state.achivements.push(action.payload)
        },
        deleteAchivement:(state,action) => {
            state.achivements = state.achivements.filter(achivement => {
                return achivement.id !== action.payload
            })
        }
    }
})

export const { setAchivements,addAchivement,deleteAchivement } = achivementsSlice.actions
export default achivementsSlice.reducer