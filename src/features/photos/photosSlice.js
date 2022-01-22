import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchImagesAsync, fetchPhotoContentAsync } from "./photosAPI";

const initialState = {
    items: [],
    status: "idle",
    error: null
};

export const fetchImages = createAsyncThunk("photos/fetchImages", async () => {
    const response = await fetchImagesAsync();
    return response;
})


const photosSlice = createSlice({
    name: "photos",
    initialState,
    reducers: {

    },
    extraReducers(buider) {
        buider
            .addCase(fetchImages.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchImages.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.concat(action.payload);
            })
            .addCase(fetchImages.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
})

export const selectAllPhotos = state => state.photos.items;
export const selectPhotoById = (state, photoId) => state.photos.items.find(item => item.id == photoId)

export default photosSlice.reducer;
