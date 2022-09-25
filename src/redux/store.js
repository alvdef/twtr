import { configureStore, combineReducers } from '@reduxjs/toolkit';
import tweetsReducer from './tweetsSlice';
import listsReducer from './listsSlice';

export default configureStore({
  reducer: combineReducers({
    tweets: tweetsReducer,
    lists: listsReducer,
  }),
});
