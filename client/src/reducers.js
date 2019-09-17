import { combineReducers } from 'redux';
import commentsStoreReducer from './pages/main/commentsReducer';
import lastActiveTimeStoreReducer from './pages/main/lastActiveTimeReducer';

export default combineReducers({
    commentsStore: commentsStoreReducer,
    lastActiveTimeStore: lastActiveTimeStoreReducer
});
