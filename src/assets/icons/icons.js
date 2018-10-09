import sunny from './day/sunny.png';
import sunny_night from './night/sunny_night.png';
import cloudy2 from './day/cloudy2.png';
import cloudy2_night from './night/cloudy2_night.png';
import cloudy5 from './day/cloudy5.png';
import overcast from './day/overcast.png';
import shower3 from './day/shower3.png';
import shower2 from './day/shower2.png';
import shower2_night from './night/shower2_night.png';
import tstorm3 from './day/tstorm3.png';
import snow4 from './day/snow4.png';
import fog from './day/fog.png';
import fog_night from './night/fog_night.png';
import temp from './day/temp.svg';
import wind from './day/wind.svg';
import tempNight from './night/temp_night.svg';
import windNight from './night/wind_night.svg';

//https://openweathermap.org/weather-conditions
export const iconsGFX = {
    i_01d: sunny,
    i_01n: sunny_night,
    i_02d: cloudy2,
    i_02n: cloudy2_night,
    i_03d: cloudy5,
    i_03n: cloudy5,
    i_04d: overcast,
    i_04n: overcast,
    i_09d: shower3,
    i_09n: shower3,
    i_10d: shower2,
    i_10n: shower2_night,
    i_11d: tstorm3,
    i_11n: tstorm3,
    i_13d: snow4,
    i_13n: snow4,
    i_50d: fog,
    i_50n: fog_night,
};

//Quick fix
const hours = new Date().getHours();

export const infoIconsGFX = {
    temp: hours > 6 && hours < 20 ? temp : tempNight,
    wind: hours > 6 && hours < 20 ? wind : windNight
};