import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './auth';
import companies from './companies';
import visitors from './visitors';
import faqs from './faqs';
import users from './users';
import alert from './alert';

const rootReducer = (history) => combineReducers({
  auth,
  users,
  companies,
  visitors,
  faqs,
  alert,
  router: connectRouter(history),
});

export default rootReducer;
