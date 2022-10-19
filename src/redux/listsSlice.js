import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// 0
// : 
// id
// : 
// "1566842355059154945"
// name
// : 
// "Tecnologia"
// [[Prototype]]
// : 
// Object
// 1
// : 
// id
// : 
// "1566842155594833922"
// name
// : 
// "Deportes"

export const fetchLists = createAsyncThunk(
    'lists/fetchLists',	
    async () => {
        const response = await fetch(`/.netlify/functions/listsByUserId`);
        const data = await response.json();

        console.dir(data);
        return data.data;
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
            console.log(action.payload);
            
            state.lists = action.payload;
            state.isLoading = false;
            state.error = false;
        },
        [fetchLists.rejected]: (state, action) => {
            state.error = true;
            state.isLoading = false;
        },
    }
});

export default listsSlice.reducer;

export const selectLists = (state) => state.lists.lists;