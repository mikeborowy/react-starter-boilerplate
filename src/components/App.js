import React, {Component} from 'react';
import { hot } from 'react-hot-loader';
import MainScreen from './mainScreen/MainScreen';

class App extends Component{

    render(){
        return(
             <MainScreen />
        );
    }
} 

export default hot(module)(App);
