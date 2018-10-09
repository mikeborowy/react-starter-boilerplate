import {combineReducers} from 'redux';
//reducers
import {preloader} from './store/reducers/preloader';
import {weather} from './store/reducers/weather';

const rootReducer = combineReducers({
    preloader,
    weather
});

export default rootReducer;