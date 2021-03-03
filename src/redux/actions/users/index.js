import { IS_LOAD, VIEW_USERS, ME } from 'src/redux/actionTypes/users';
import { SHOW_ALERT, ALERT_STATUS } from 'src/redux/actionTypes/alert';
import { API, ENV, LSTOKEN } from 'src/utils/environmets';

export function getUser() {
    return function(dispatch) {
        dispatch({type: IS_LOAD});
        return fetch(`${ENV}/character`)
            .then(response => response.json())
            .then(json => {
                return dispatch({
                    type: VIEW_USERS,
                    payload: json.results
                })
            })
            .catch((e) => console.log(e))
    }
}

export function me() {
  return function(dispatch) {
    dispatch({type: IS_LOAD});
    return fetch(`${API}/api/me` , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}`
      }
    })
      .then(response => response.json())
      .then(json => {
        return dispatch({
          type: ME,
          payload: json.data
        })
      })
      .catch((e) => console.log(e))
  }
}

export function updateMe(userInfo) {
  const formData = new FormData();
  Object.keys(userInfo).forEach(key => formData.append(key, userInfo[key]));
  return function(dispatch) {
    dispatch({type: IS_LOAD});
    return fetch(`${API}/api/update/info`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}`
      },
      body: formData
    }).then(response => response.json())
    .then(json => {

      if( json.status ) {
      dispatch({type: SHOW_ALERT })
      dispatch({type: ALERT_STATUS, payload:true})
      dispatch({
        type: ME,
        payload: json.data
      });
      }
      else {
        dispatch({type: ALERT_STATUS, payload:false})
        dispatch({type: SHOW_ALERT })
      }
      setTimeout(()=>{dispatch({type: SHOW_ALERT })}, 4000);
    })
  }
}
