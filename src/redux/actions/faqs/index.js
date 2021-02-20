import { VIEW_FAQS, IS_LOAD_FAQ, DELETE_FAQ, UPDATE_FAQ, ADD_FAQ } from '../../actionTypes/faqs';
import { ENV } from 'src/utils/environmets';

export function getFaqs() {
  return function(dispatch) {
    dispatch({ type: IS_LOAD_FAQ });
    return fetch(`${ENV}/character`)
      .then(response => response.json())
      .then(json => {
        return dispatch({
          type: VIEW_FAQS,
          payload: json.results
        });
      })
      .catch(e => {
        console.log(e);
      });
  };
}

export function addFaq(faq) {
  return {
    type: ADD_FAQ,
    payload: faq
  }
}

export function updateFaq( faq ) {
  return {
    type: UPDATE_FAQ,
    payload: faq
  }
}

export function deleteFaq( faq ) {
  return {
    type: DELETE_FAQ,
    payload: faq
  }
}
