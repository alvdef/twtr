import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchLists = createAsyncThunk(
    'lists/fetchLists',	
    async () => {
        const response = await fetch(`/.netlify/functions/listsByUserId`);
        const lists = await response.json();

        return lists.body.data;
    }
)

const initialState = {
    lists: [],
    error: false,
    isLoading: false,
};


const listsSlice = createSlice({
    name: 'lists',
    initialState,
    extraReducers: {
        [fetchLists.pending]: (state, action) => {
            state.isLoading = true;
            state.error = false;
        },
        [fetchLists.fulfilled]: (state, action) => {
            state.lists = action.payload;
            state.isLoading = false;
            state.error = false;
        },
        [fetchLists.rejected]: (state, action) => {
            state.error = true;
            console.dir(action, { depth: null });
            state.isLoading = false;
        },
    }
});

export default listsSlice.reducer;

export const selectLists = (state) => state.lists.lists;