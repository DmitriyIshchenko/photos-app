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

export const fetchPhotoContent = createAsyncThunk("photos/fetchPhotoContent", async (id) => {
    const response = await fetchPhotoContentAsync(id);
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
            .addCase(fetchPhotoContent.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPhotoContent.fulfilled, (state, action) => {
                state.status = "succeeded"
                const { id, url: urlBig, comments } = action.payload;
                const photo = state.items.find(item => item.id == id);
                photo.urlBig = urlBig;
                photo.comments = comments;
            })
    }
})

export const selectAllPhotos = state => state.photos.items;
export const selectPhotoById = (state, photoId) => state.photos.items.find(item => item.id === photoId)

export default photosSlice.reducer;
