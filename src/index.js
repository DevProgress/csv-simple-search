import 'normalize.css';

import 'bootstrap/dist/css/bootstrap.css'

// https://babeljs.io/docs/usage/polyfill/
import 'babel-polyfill';

// fetch polyfill: https://github.com/github/fetch
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';

import MainView from './components/MainView';

ReactDOM.render(
  <MainView />,
  document.getElementById('main-view')
);
