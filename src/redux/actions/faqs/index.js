import { VIEW_FAQS, IS_LOAD_FAQ, DELETE_FAQ, ADD_FAQ, UPDATE_FAQ } from '../../actionTypes/faqs';
import { API, LSTOKEN } from 'src/utils/environmets';
import { SHOW_ALERT, ALERT_STATUS } from 'src/redux/actionTypes/alert';

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
          payload: json.data
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
        dispatch({type: SHOW_ALERT })
        dispatch({type: ALERT_STATUS, payload:true})
        dispatch({ type: ADD_FAQ, payload: { ask: faq.ask, answer: faq.answer } })
      }
      else {
        dispatch({type: ALERT_STATUS, payload:false})
        dispatch({type: SHOW_ALERT })
      }
      return setTimeout(()=>{dispatch({type: SHOW_ALERT })}, 4000);
    }).catch(e => { console.log(e) })
  }
}

export function updateFaq( faq, id ) {
  return function(dispatch) {
    dispatch({type: IS_LOAD_FAQ})
    let formData = new FormData();
    Object.keys(faq).forEach(key => formData.append(key, faq[key]));
    return fetch(`${API}/api/faq/${id}`, 
    { method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}`
      },
      body: formData
    }).then( response => response.json() )
    .then(json => {
      if ( json.status ){
        dispatch({type: SHOW_ALERT })
        dispatch({type: ALERT_STATUS, payload:true})
        dispatch({ type: UPDATE_FAQ, payload: {faqs: faq, id: id} })
      }
      else {
        dispatch({type: ALERT_STATUS, payload:false})
        dispatch({type: SHOW_ALERT })
      }
      return setTimeout(()=>{dispatch({type: SHOW_ALERT })}, 4000);
    }).catch(e => { console.log(e) })
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
        dispatch({type: SHOW_ALERT })
        dispatch({type: ALERT_STATUS, payload:true})
        return dispatch({type: DELETE_FAQ, payload: faq})
      } else {
        dispatch({type: ALERT_STATUS, payload:false})
        dispatch({type: SHOW_ALERT })
      }
      return setTimeout(()=>{dispatch({type: SHOW_ALERT })}, 4000);
    } ).catch(e => console.log(e))
  }
}
