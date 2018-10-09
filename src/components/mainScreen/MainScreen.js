//React
import React from 'react';
import PropTypes from 'prop-types';
//Redux
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
//Store
import {
  onLoadingStart,
  onLoadingEnd
} from '../../store/reducers/preloader';
import {onGetWeatherAjax} from '../../store/reducers/weather';
//MDL
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
//3rd party
import _ from 'lodash';
//Config
import {mdlStyles} from '../common/mdlSyles';
import {daysOfWeek} from '../../cfg';
//Components
import Preloader from '../preloader/Preloader';
import CurrentDayWeather from './currentDayWeather/CurrentDayWeather';
import DayWeather from './dayWeather/DayWeather';

const propTypes = {
  classes: PropTypes.object.isRequired,
  day: PropTypes.object.isRequired,
  days: PropTypes.object.isRequired,
};

const defaultProps = {
  classes: {},
  day: {},
  days: {}
};

class MainScreen extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onLoadingStart();
    Promise.all([
      this.props.onGetWeatherAjax('warsaw','pl', 1),
      this.props.onGetWeatherAjax('warsaw','pl', 5)
    ]).then( () => {
      this.props.onLoadingEnd();
    });
  }

  addZero(i) {
    return i = i < 10 ? '0' + i: i;
  }

  renderPreloader() {
    return this.props.loaders > 0 
            ? <Preloader data={this.props.preloader}/>
            : null;
  }

  renderCurrentDay() {
    if(_.isEmpty(this.props.day) !== true)
    {
      const {day} = this.props;
      const currentDayProps = {
        date: day.dt,
        cityName: day.name,
        country: day.sys.country,
        humidity: day.main.humidity,
        pressure: day.main.pressure,
        temp: day.main.temp,
        tempMax: day.main.temp_max,
        tempMin: day.main.temp_min,
        icon: day.weather[0].icon,
        iconDesc: day.weather[0].main,
        windSpd: day.wind.speed
      };
      
      return <CurrentDayWeather {...currentDayProps}/>;
    }
  }

  renderDays() {
    if(_.isEmpty(this.props.days) !== true)
    {
      const {
        days:{
          list
        } 
      } = this.props;

      let prevTime = null;
      let headers = [];
      let hours = [];
      let daysSeparatedArray = [];

      list.map( day => {
        const date = new Date(day.dt * 1000);
        const currentTime = date.toLocaleDateString();
        day.fixedHour = `${this.addZero(date.getHours())}:${this.addZero(date.getMinutes())}`;

        if(!hours.includes(date.toLocaleTimeString())){
          hours.push(date.toLocaleTimeString());
        }

        if(currentTime !== prevTime){
          headers.push(daysOfWeek[new Date(day.dt * 1000).getDay()]);
          daysSeparatedArray[daysSeparatedArray.length] = [];
        }
        daysSeparatedArray[daysSeparatedArray.length -1].push(day);
        prevTime = currentTime;
      });

      return(
        daysSeparatedArray.map( (day, id) => (
          id > 0 
          ? <Grid key={id} item className="week-item">
                <DayWeather dayId={id} dayHeader={headers[id]} dayHours={hours[id]} dayProps={day}/> 
            </Grid>
          : null
          ))
      );
    }
  }

  render() {
    const {
      classes:{
        base,
        layout,
        paper,
        paperAtNight
      }
    } = this.props;

    const hours = new Date().getHours();
    const theme = hours > 6 && hours < 20 ? paper : paperAtNight;

    return(
      <React.Fragment>
        <main className={layout}>
          <Paper className={`${theme}`}>
              {this.renderPreloader()}
              {this.renderCurrentDay()}
              <Grid container justify="center" className="week">
                {this.renderDays()}
              </Grid>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
} 

MainScreen.propTypes = propTypes;
MainScreen.defaultProps = defaultProps;

const MainScreenWithMDL = withStyles(mdlStyles)(MainScreen);

function mapStateToProps(state) {
  return {
    day: state.weather.day,
    days: state.weather.days,
    loaders: state.preloader.loaders
  };
}

function mapDispatchToProps(dispatch) {
  return Redux.bindActionCreators({   
    onGetWeatherAjax,
    onLoadingStart,
    onLoadingEnd
  }, dispatch);
}

export default ReactRedux.connect(
  mapStateToProps, 
  mapDispatchToProps
)(MainScreenWithMDL);