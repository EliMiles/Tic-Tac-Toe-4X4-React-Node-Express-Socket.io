import { GET_ALL_LAST_ACTIVE_TIME } from './types';

const initialState = {
    lastActiveTime: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_LAST_ACTIVE_TIME:
            return {...state,lastActiveTime:action.payload} || {}; // updating the general state ( the store! ) in src/index.js
        default:
            return state;
    }
}