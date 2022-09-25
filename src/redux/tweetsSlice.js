import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    error: false,
    isLoading: false,
    searchTerm: '',
    selectedList: '1566842355059154945',
};


const tweetsSlice = createSlice({
    name: 'tweets',
    initialState,
    reducers: {
        // POSTS
        // prescindible?
        setPosts(state, action) {
            state.posts = action.payload;
        },
        startGetPosts(state) {
            state.isLoading = true;
            state.error = false;
        },
        getPostsSuccess(state, action) {
            state.isLoading = false;
            state.error = false;
            state.posts = action.payload
        },
        getPostsFailed(state) {
            state.isLoading = false;
            state.error = true;
        },
        // SEARCH TERM
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
        setSelectedList(state, action) {
            state.selectedList = action.payload;
            state.searchTerm = '';
        },
        
        // profile info
    }
})

export const {
    setPosts,
    startGetPosts,
    getPostsSuccess,
    getPostsFailed,
    setSearchTerm,
    setSelectedList,
} = tweetsSlice.actions;

export default tweetsSlice.reducer;


export const fetchPOSTS = (list) => async (dispatch) => {
    const url = `/.netlify/functions/getListTweets?listId=${list.id}`;

    try {
        dispatch(startGetPosts());
        const posts = await fetch(url).then((res) => res.json());
        dispatch(getPostsSuccess(posts));
    } catch (err) {
        dispatch(getPostsFailed())
    }
}


export const selectSelectedList = (state) => state.tweets.selectedList;
export const selectListUsers = (state) => state.tweets.posts[selectedList].users;

const selectListPosts = (state) => state.tweets.posts[selectedList].data;
const selectSearchTerm = (state) => state.searchTerm;

export const selectFilteredPosts = createSelector(
    [selectListPosts, selectSearchTerm],
    (posts, searchTerm) => {
        if (searchTerm !== '') {
            return posts.filter((post) =>
            post.text.toLowerCase().includes(searchTerm.toLowerCase())
          ); 
        }
        return posts;
    }
)