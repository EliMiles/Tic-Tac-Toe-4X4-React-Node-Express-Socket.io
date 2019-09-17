import { combineReducers } from 'redux';
import mainReducer from './pages/main/mainReducer';

export default combineReducers({
    main: mainReducer
});
