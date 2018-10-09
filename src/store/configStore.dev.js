/*eslint-disable no-alert, no-console */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../reducers';

export default function initStore() {
    return createStore(
        rootReducers, 
        compose(
            applyMiddleware(thunk, consoleMessages),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
}

const consoleMessages = (store) => (next) => (action) => {
    let result;
    result = next(action);
    console.log('store', store.getState()); 
    return result;
};
