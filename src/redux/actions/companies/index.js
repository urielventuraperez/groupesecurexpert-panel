import { VIEW_COMPANIES, VIEW_COMPANY, IS_LOAD_COMPANIES, FILTER_COMPANY } from '../../actionTypes/companies';
import { ENV } from 'src/utils/environmets';

export function getCompanies() {
  return function (dispatch) {
    dispatch({type: IS_LOAD_COMPANIES});
    return fetch(`${ENV}/character`)
      .then(response => response.json())
      .then( json => {
        return dispatch({
          type: VIEW_COMPANIES,
          payload: json.results
        })
      }).catch(function(e){
        console.log(e.error);
      })
  }
}

export function filterCompanies(input) {
  console.log(input)
    return {
      type: FILTER_COMPANY,
      payload: input
    }
}

export function getCompany(id) {
  return function(dispatch) {
    dispatch({type: IS_LOAD_COMPANIES});
    return fetch(`${ENV}/character/${id}`)
    .then(response => response.json())
    .then( json => {
      return dispatch({
        type: VIEW_COMPANY,
        payload: json
      })
    }).catch(function(e){
      console.log(e.error);
    })
  }
}
