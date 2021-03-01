import { IS_LOAD, VIEW_USERS, ME } from 'src/redux/actionTypes/users';
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
