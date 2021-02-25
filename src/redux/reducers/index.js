import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './auth';
import companies from './companies';
import visitors from './visitors';
import faqs from './faqs';

const rootReducer = (history) => combineReducers({
  auth,
  companies,
  visitors,
  faqs,
  router: connectRouter(history),
});

export default rootReducer;
