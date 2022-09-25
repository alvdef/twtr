import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLists } from '../../.netlify/functions/listsByUserId';

const initialState = {
    lists: [],
    error: false,
    isLoading: false,
};


const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        startGetLists(state) {
            state.error = false;
            state.isLoading = true;
        },
        getListsSuccess(state) {
            state.error = false;
            state.isLoading = false;
        },
        getListsFailed(state) {
            state.error = true;
            state.isLoading = false;
        },
    },
});


export const {
    startGetLists,
    getListsSuccess,
    getListsFailed,
} = listsSlice.actions;

export default listsSlice.reducer;

// This is a Redux Thunk that gets lists from a user.
export const fetchLists = () => async (dispatch) => {
    const url = `/.netlify/functions/listsByUserId`;
    
    try {
        dispatch(startGetLists());
        const lists = await fetch(url).then((res) => res.json());
        dispatch(getListsSuccess());
    } catch (err) {
        dispatch(getListsFailed());
    }
}  

export const selectLists = (state) => state.lists.lists;