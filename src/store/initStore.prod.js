import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../reducers';

export default function initStore() {
    return createStore(
        rootReducers, 
        applyMiddleware(thunk)
    );
}
