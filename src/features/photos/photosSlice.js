import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { fetchImages, fetchPhotoContent, postComment } from "./photosAPI";

const initialState = {
    items: [],
    status: "idle",
    singlePhotoStatus: "idle",
    error: null
};

export const fetchImagesAsync = createAsyncThunk("photos/fetchImagesAsync", async () => {
    const response = await fetchImages();
    return response;
})

export const fetchPhotoContentAsync = createAsyncThunk("photos/fetchPhotoContentAsync", async (photoId) => {
    const response = await fetchPhotoContent(photoId);
    return response;
})

export const postCommentAsync = createAsyncThunk("photos/postComment", async (data) => {
    const response = await postComment(data);
    if (response.ok) {
        return data
    } else return response;
})

const photosSlice = createSlice({
    name: "photos",
    initialState,
    reducers: {

    },
    extraReducers(buider) {
        buider
            .addCase(fetchImagesAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchImagesAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.concat(action.payload);
            })
            .addCase(fetchImagesAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchPhotoContentAsync.pending, (state) => {
                state.singlePhotoStatus = "loading";
            })
            .addCase(fetchPhotoContentAsync.fulfilled, (state, action) => {
                state.singlePhotoStatus = "succeeded"
                const { id, url: urlBig, comments } = action.payload;
                const photo = state.items.find(item => item.id === id);
                photo.urlBig = urlBig;
                photo.comments = comments;
            })
            .addCase(postCommentAsync.fulfilled, (state, action) => {
                const { photoId, comment } = action.payload;
                const photo = state.items.find(item => item.id === photoId);
                photo.comments.push({
                    id: nanoid(),
                    text: comment,
                    date: Date.now()
                })
            })
            .addCase(postCommentAsync.rejected, (state, action) => {
                state.error = action.error.message;
            })
    }
})

export const selectAllPhotos = state => state.photos.items;
export const selectPhotoById = (state, photoId) => state.photos.items.find(item => item.id === photoId)

export default photosSlice.reducer;
