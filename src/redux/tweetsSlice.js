import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
    'tweets/fetchPosts',
    async (list) => {
        let response = await fetch(`/.netlify/functions/getListTweets?listId=${list.id}`);
        response = await response.json()

        const tweets = response.data;
        const users = response.includes.users;

        return { list, tweets, users };
    }
)

const initialState = {
    posts: [],
    error: false,
    isLoading: false,
    searchTerm: '',
    selectedList: {
        id:"1566842355059154945",
        name:"Tecnologia"
    },
};

const tweetsSlice = createSlice({
    name: 'tweets',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setSelectedList: (state, action) => {
            state.selectedList = action.payload;
            state.searchTerm = '';
        },
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.isLoading = true;
            state.error = false;
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = false;
            console.dir(action.payload, { depth: null });
            
            // posts contains the tweet object including a property "user"
            action.payload.tweets.forEach(tweet => {
                // search the user that published "tweet"
                const userObj = action.payload.users.find(
                    user => user.id === tweet.author_id
                );
                Object.assign(tweet, {user: userObj});
                console.dir(tweet);

                return tweet;
            });
            console.dir(action.payload.tweets, { depth: null });
            state.posts = action.payload.tweets;
        },
        [fetchPosts.rejected]: (state, action) => {
            state.error = true;
            state.isLoading = false;
        },
    }
})

export const {
    setSearchTerm,
    setSelectedList,
} = tweetsSlice.actions;

export default tweetsSlice.reducer;

export const selectSelectedList = (state) => state.tweets.selectedList;
const selectListPosts = (state) => state.tweets.posts;
const selectSearchTerm = (state) => state.searchTerm;

export const selectFilteredPosts = createSelector(
    [selectListPosts, selectSearchTerm],
    (posts, searchTerm) => {
        // if (searchTerm !== '') {
        //     return posts.filter((post) =>
        //         post.text.toLowerCase().includes(searchTerm.toLowerCase())
        //   ); 
        // }
        return posts;
    }
);