import { VIEW_COMPANIES, VIEW_COMPANY, IS_LOAD_COMPANIES, FILTER_COMPANY, ADD_COMPANY, DELETE_COMPANY } from '../../actionTypes/companies';
import { API, LSTOKEN } from 'src/utils/environmets';
import { SHOW_ALERT, ALERT_STATUS } from 'src/redux/actionTypes/alert';

export function getCompanies() {
  return function (dispatch) {
    dispatch({type: IS_LOAD_COMPANIES});
    return fetch(`${API}/api/company`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}` }
    })
      .then(response => response.json())
      .then( json => {
        return dispatch({
          type: VIEW_COMPANIES,
          payload: json.data
        })
      }).catch(function(e){
        console.log(e.error);
      })
  }
}

export function addCompany(data) {
  let formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));

  return function(dispatch) {
    dispatch({type: IS_LOAD_COMPANIES});
    return fetch(`${API}/api/company`, {
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
        dispatch({ type: ADD_COMPANY, payload: json.data })
      }
      else {
        dispatch({type: ALERT_STATUS, payload:false})
        dispatch({type: SHOW_ALERT })
      }
      return setTimeout(()=>{dispatch({type: SHOW_ALERT })}, 4000);
    }).catch(e => { console.log(e) })
  }
}

export function deleteCompany(idCompany) {
    return function (dispatch) {
      return fetch(`${API}/api/company/${idCompany}`, {
        method: 'delete',
        headers: {
          Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}`
        }
      }).then( response => response.json() )
      .then(json => {
        if ( json.status ){
          dispatch({ type: DELETE_COMPANY, payload: idCompany })
        }
      })
    }
}

export function filterCompanies(input) {
    return {
      type: FILTER_COMPANY,
      payload: input
    }
}

export function getCompany(id) {
  return function(dispatch) {
    dispatch({type: IS_LOAD_COMPANIES});
    return fetch(`${API}/api/company/${id}`,
    {
      headers:{
        Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}`
      }
    })
    .then(response => response.json())
    .then( json => {
      return dispatch({
        type: VIEW_COMPANY,
        payload: json.data
      })
    }).catch(function(e){
      console.log(e.error);
    })
  }
}
