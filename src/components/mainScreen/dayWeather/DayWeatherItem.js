import React from 'react';
import PropTypes from 'prop-types';
import {iconsGFX, infoIconsGFX} from '../../../assets/icons/icons';

const propTypes = {
    itemId: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    wind: PropTypes.number.isRequired
};

const defaultProps = {
    itemId: -1,
    time: '',
    temp: 0,
    icon: '',
    wind: 0,
};

const DayWeatherItem = (props) => {
    const {time, temp, icon, wind} = props;
    return(
        <li className="day-row">
            <div className="day-data">
                <div className="day-data-time">{time}</div>
                <div className="day-data-temp">
                    <img src={infoIconsGFX.temp} width={14} height={14}/>
                    <span>{temp} °C</span>
                </div>
                <div className="day-data-wind">
                    <img src={infoIconsGFX.wind} width={14} height={14}/>
                    <span>{wind} km\h</span>
                </div>
            </div>
            <img src={iconsGFX[`i_${icon}`]} className={`icon-${icon}`} width={40} height={40}/>
        </li>
    );
};

DayWeatherItem.propTypes = propTypes;
DayWeatherItem.defaultProps = defaultProps;

export default DayWeatherItem;