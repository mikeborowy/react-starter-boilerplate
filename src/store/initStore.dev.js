/*eslint-disable no-alert, no-console */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../reducers';

const Logger = (store) => (next) => (action) => {
    let result;
    result = next(action);
    console.log('store', store.getState());
    return result;
};

export default function initStore() {
    return createStore(
        rootReducers,
        compose(
            applyMiddleware(
                thunk,
                Logger
            ),
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
        )
    );
}

