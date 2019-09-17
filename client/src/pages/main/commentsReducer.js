import { GET_ALL_COMMENTS, FILTER_COMMENTS } from './types';

const initialState = {
    comments: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_COMMENTS:
            return {...state,comments:action.payload} || {}; // updating the general state ( the store! ) in src/index.js
        case FILTER_COMMENTS:
            return {...state,comments:action.payload} || {}; // updating the general state ( the store! ) in src/index.js
        default:
            return state;
    }
}