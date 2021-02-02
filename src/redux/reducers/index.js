import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import companies from './companies';

const rootReducer = (history) => combineReducers({
  companies,
  router: connectRouter(history),
});

export default rootReducer;
