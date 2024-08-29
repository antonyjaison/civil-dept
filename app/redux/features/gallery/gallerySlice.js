"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    galleryImages:[]
}

export const gallerySlice = createSlice({
    name:"gallery",
    initialState,
    reducers:{
        setGalleryImages:(state,action) => {
            state.galleryImages = action.payload
        },
        addGalleryImage:(state,action) => {
            state.galleryImages.push(action.payload)
        },
        deleteGalleryImage:(state,action) => {
            state.galleryImages = state.galleryImages.filter(image => {
                return image.id !== action.payload
            })
        }
    }
})

export const { setGalleryImages,addGalleryImage, deleteGalleryImage } = gallerySlice.actions
export default gallerySlice.reducer