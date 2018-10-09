import axios from 'axios';
import {host,units,APPID} from '../../cfg';

const types = {
    SET_SINGLE_DAY_WEATHER: 'SET_SINGLE_DAY_WEATHER',
    SET_MORE_DAYS_WEATHER: 'SET_MORE_DAYS_WEATHER'
};

/** ACTIONS START */
export const onSetSingleDayWeather = (day) => ({type: types.SET_SINGLE_DAY_WEATHER, day});
export const onSetMoreDaysWeather = (days) => ({type: types.SET_MORE_DAYS_WEATHER, days});
export const onGetWeatherAjax = (city, cc, daysNum) => {
    return (dispatch) => {

        const options = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        const weathetType = daysNum === 1 ? 'weather' : 'forecast';
        const url = `${host}/${weathetType}?q=${city},${cc}&units=${units}&appid=${APPID}`;

        return axios
                .get(url, options)
                .then(response => {
                    daysNum === 1 
                    ? dispatch(onSetSingleDayWeather(response.data))
                    : dispatch(onSetMoreDaysWeather(response.data));
                });
    };
};
/** ACTIONS END */

/** REDUCER START */
export const weather = (state, action = {}) => {
    switch (action.type) {
        case types.SET_SINGLE_DAY_WEATHER:
            return {
                day: action.day
            };
        case types.SET_MORE_DAYS_WEATHER:
            return {
                ...state,
                days: action.days
            };
        default:
            return state || {};
    }
};
/** REDUCER END */