import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import companies from './companies';
import visitors from './visitors';

const rootReducer = (history) => combineReducers({
  companies,
  visitors,
  router: connectRouter(history),
});

export default rootReducer;
