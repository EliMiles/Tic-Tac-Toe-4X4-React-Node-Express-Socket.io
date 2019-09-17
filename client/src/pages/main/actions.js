import axios from 'axios';
import { GET_ALL_COMMENTS , FILTER_COMMENTS , GET_ALL_LAST_ACTIVE_TIME } from './types';

export const addComment = (body) => async dispatch => {
    
    axios.post('/api/insert',body); // do an http post request and insert a comment to the DB

    let today = new Date();
    const currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    today = today.toDateString();

    let lastActive = {
        email: body.email,
        date: today,
        time: currentTime
    }

    axios.post('/api/updateLastActive',lastActive);
};

export const getAllComments = () => async dispatch => {
    
    const res = await axios.get('/api/comments'); // do an http get request and get all comments from the DB

    dispatch({ type: GET_ALL_COMMENTS, payload: res.data }); // dispatch to reducers/commentsReducer.js
};

export const filterComments = (value) => async dispatch => {

    const res = await axios.get('/api/comments'); // do an http get request and get all comments from the DB

    const data = res.data.filter((item) => item.email.toLowerCase().includes(value.toLowerCase()));
    
    dispatch({ type: FILTER_COMMENTS, payload: data }); // dispatch to reducers/commentsReducer.js
};

export const getAllLastActive = () => async dispatch => {
    
    const res = await axios.get('/api/allLastActive'); // do an http get request and get all LastActive from the DB

    dispatch({ type: GET_ALL_LAST_ACTIVE_TIME, payload: res.data }); // dispatch to reducers/commentsReducer.js
};
