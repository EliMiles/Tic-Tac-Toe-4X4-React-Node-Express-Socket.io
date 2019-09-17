import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import AppRouter from './AppRouter';
import reducers from './reducers.js';

const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(reduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
); // store = Redux!

// const store = createStore(
//     reducers,
//     {},
//     compose(
//         applyMiddleware(reduxThunk)
//     )
// ); // store = Redux!

ReactDOM.render(
    <Provider store={store}><AppRouter /></Provider>, // Provider is the Glue between Redux & React
    document.querySelector('#root')
);
