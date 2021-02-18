import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import companies from './companies';
import visitors from './visitors';
import faqs from './faqs';

const rootReducer = (history) => combineReducers({
  companies,
  visitors,
  faqs,
  router: connectRouter(history),
});

export default rootReducer;
