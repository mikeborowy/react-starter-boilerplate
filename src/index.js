//React
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//Redux
import {Provider} from 'react-redux';
import initStore from './store';
//CSS
import './styles/styles.scss';
//3rd party libs
import 'babel-polyfill';
//Compnents
import App from './components/App';

const store = initStore();

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, 
  document.getElementById('app')
);
