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
        startGetPosts: (state) => {
            state.isLoading = true;
            state.error = false;
        },
        getPostsSuccess: (state, action) => {
            state.isLoading = false;
            state.error = false;

            // posts contains the tweet object including a property "user"
            const posts = action.payload.tweets.forEach(tweet => {
                // search the user that published "tweet"
                const user = action.payload.users.find(
                    user => user.id === tweet.author_id
                );
                Object.defineProperty(tweet, 'user', user);
                return tweet;
            });
            // posts
            Object.defineProperties(
                state.posts, action.payload.list, posts
            );
            
        },
        getPostsFailed: (state) => {
            state.isLoading = false;
            state.error = true;
        },
        // SEARCH TERM
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setSelectedList: (state, action) => {
            state.selectedList = action.payload;
            state.searchTerm = '';
        },
    }
})

export const {
    startGetPosts,
    getPostsSuccess,
    getPostsFailed,
    setSearchTerm,
    setSelectedList,
} = tweetsSlice.actions;

export default tweetsSlice.reducer;


export const fetchPosts = (list) => async (dispatch) => {
    const url = `/netlify/functions/getListTweets?listId=${list.id}`;

    try {
        dispatch(startGetPosts());
        const listTweets = await fetch(url)
        .then(res => {
            // converts into string, then to js object (problems with \n character)
            return JSON.parse(JSON.stringify(res));
        });
        
        const tweets = listTweets.data;
        const users = listTweets.includes.users;
        dispatch(getPostsSuccess(list, tweets, users));
    } catch (err) {
        dispatch(getPostsFailed())
    }
}

export const selectSelectedList = (state) => state.tweets.selectedList;
const selectListPosts = (state) => state.tweets.posts;
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
);