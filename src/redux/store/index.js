import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import reducer from '../reducers/index';

export const history = createBrowserHistory();

export default function configureStore(preloadState) {
  const storeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducer(history),
    preloadState,
    storeEnhancer(applyMiddleware(thunk, routerMiddleware(history))),
  );

  return store;
}
