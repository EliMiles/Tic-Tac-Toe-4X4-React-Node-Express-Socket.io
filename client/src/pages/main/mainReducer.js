//import { } from './types';

// const initialState = {
//     comments: []
// }

//export default function (state = initialState, action) {
export default function (state = {}, action) {
    switch (action.type) {
        // case GET_ALL_COMMENTS:
        //     return {...state,comments:action.payload} || {}; // updating the general state ( the store! ) in src/index.js
        default:
            return state;
    }
}