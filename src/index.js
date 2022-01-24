import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {store} from "./reducers"
import { Provider } from 'react-redux';
import axios from 'axios';
axios.defaults.headers.common["Access-Control-Allow-Origin"]='*'
axios.defaults.headers.common["Access-Control-Allow-Methods"]='GET, POST, PATCH, PUT, DELETE, OPTIONS'
axios.defaults.headers.common["Access-Control-Allow-Headers"]='Origin, Content-Type, X-Auth-Token'

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={baseUrl}>
        <App />
    </BrowserRouter>
  </Provider>
  ,
  rootElement);

registerServiceWorker();
