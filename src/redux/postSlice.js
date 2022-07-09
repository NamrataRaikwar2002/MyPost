import {
    createSlice
} from "@reduxjs/toolkit";
import {
    getPost
} from "./postThunk";

const initialState = {
    post: []
}

const postSlice = createSlice({
    name: "posts ",
    initialState,
    reducers: {
        afterDeletePostHandler: (state, action) => {
            state.post = action.payload
        },

        addPostHandler: (state, action) => {
            state.post = action.payload
        },
        editPost: (state, action) => {
            state.post[action.payload.indexOfpostToEdit] = action.payload.data
        }

    },
    extraReducers: {
        [getPost.fulfilled]: (state, action) => {
            const reversedPost = action.payload
            state.post = action.payload
        }
    }
})

export const {
    afterDeletePostHandler,
    addPostHandler,
    editPost
} = postSlice.actions;
export default postSlice.reducer