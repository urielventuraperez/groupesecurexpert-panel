import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, { history } from '../src/redux/store';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = configureStore();
ReactDOM.render((
  <Provider store={store}>
    <App history={history} />
  </Provider>
), document.getElementById('root'));

serviceWorker.unregister();
