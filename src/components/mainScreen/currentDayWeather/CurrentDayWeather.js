import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {iconsGFX, infoIconsGFX} from '../../../assets/icons/icons';
import {daysOfWeek} from '../../../cfg';

const propTypes = {
    date: PropTypes.number.isRequired,
    cityName: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    humidity: PropTypes.number.isRequired,
    pressure: PropTypes.number.isRequired,
    temp: PropTypes.number.isRequired,
    tempMax: PropTypes.number.isRequired,
    tempMin: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    iconDesc: PropTypes.string.isRequired,
    windSpd: PropTypes.number.isRequired
};
  
const defaultProps = {
    date: 0,
    cityName: '',
    country: '',
    humidity: 0,
    pressure: 0,
    temp: 0,
    tempMax: 0,
    tempMin: 0,
    icon: '',
    iconDesc: '',
    windSpd: 0
};

const CurrentDayWeatherProps = (props) => {
    const date = new Date(props.date * 1000);
    const dayName = daysOfWeek[date.getDay()]; 
    const timeArr = date.toDateString().split(' '); 
    const time = `${dayName}, ${timeArr[1]} ${timeArr[2]} ${timeArr[3]}`;
    const {temp, tempMax, tempMin, windSpd} = props;

    return(
        <Grid container justify="center" className="current-date">
            <Grid item className="current-date-header">
                <h2>{time}</h2>
                <h1>{props.cityName}</h1>
            </Grid>
            <Grid item className="current-date-temp">
                <h3>
                    <img src={infoIconsGFX.temp} width={20} height={20}/>
                    <span>Temperature: {temp} °C</span>
                </h3>
                <h5>
                    <span>Max temperature: {tempMax} °C</span>
                </h5>
                <h5>
                    <span>Min temperature: {tempMin} °C</span>
                </h5>
                
            </Grid>
            <Grid item className="current-date-wind">
                <h3>
                    <img src={infoIconsGFX.wind} width={20} height={20}/>
                    <span>Wind speed: {windSpd} km\h</span>
                </h3>
            </Grid>
            <Grid item>
                <img src={iconsGFX[`i_${props.icon}`]}/>
            </Grid>
        </Grid>
    );
};

CurrentDayWeatherProps.propTypes = propTypes;
CurrentDayWeatherProps.defaultProps = defaultProps;

export default CurrentDayWeatherProps;