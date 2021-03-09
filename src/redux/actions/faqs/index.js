import { VIEW_FAQS, IS_LOAD_FAQ, DELETE_FAQ, ADD_FAQ, UPDATE_FAQ } from '../../actionTypes/faqs';
import { API, LSTOKEN } from 'src/utils/environmets';

export function getFaqs() {
  return function(dispatch) {
    dispatch({ type: IS_LOAD_FAQ });
    return fetch(`${API}/api/faq`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}`
      }
    })
      .then(response => response.json())
      .then(json => {
        return dispatch({
          type: VIEW_FAQS,
          payload: json.data.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  };
}

export function addFaq(faq) {
  let formData = new FormData();
  Object.keys(faq).forEach(key => formData.append(key, faq[key]));

  return function(dispatch) {
    dispatch({type: IS_LOAD_FAQ});
    return fetch(`${API}/api/faq`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}`
      },
      body : formData
    })
    .then( response => response.json() )
    .then( json => {
      if (json.status) {
        return dispatch({ type: ADD_FAQ, payload: { ask: faq.ask, answer: faq.answer } })
      }
    }).catch(e => { console.log(e) })
  }
}

export function updateFaq( faq ) {
  return function(dispatch) {
    dispatch({type: IS_LOAD_FAQ})
    let formData = new FormData();
    Object.keys(faq).forEach(key => formData.append(key, faq[key]));
    return fetch(`${API}/api/faq/${faq.id}`, 
    { method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}`
      }
    }).then( response => response.json() )
    .then(json => {
      if ( json.status ){
        return dispatch({ type: UPDATE_FAQ })
      }
    })
  }
}

export function deleteFaq( faq ) {
  
  return function(dispatch) {
    dispatch({ type: IS_LOAD_FAQ });
    return fetch(`${API}/api/faq/${faq}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}`
      }
    }).then( response => response.json() )
    .then( json => {
      if(json.status){
        return dispatch({type: DELETE_FAQ, payload: faq})
      }
    } )
  }
}
