import { SET_TOKEN, UNSET_TOKEN, VALIDATE_LOGIN, PERSIST_TOKEN } from 'src/redux/actionTypes/auth';
import { ME } from 'src/redux/actionTypes/users';
import { API, LSTOKEN, LSUSER } from 'src/utils/environmets';

export function logIn (user) {
    let formData = new FormData();
    formData.append('email', user.email);
    formData.append('password', user.password);
    return function(dispatch) {
        dispatch({type: VALIDATE_LOGIN})
        return fetch(`${API}/login`, { method: 'POST' , body: formData })
            .then(response => response.json())
            .then( json => {
                if (json.status === true){
                    localStorage.setItem(LSTOKEN, json.data.token)
                    dispatch({ type: ME, payload: json.data.user })
                    localStorage.setItem(LSUSER, JSON.stringify(json.data.user))
                }
                dispatch({ type: SET_TOKEN });
            })
            .catch(e => { console.log(e) })
    }
}

export function persistLogin () {
  return (dispatch) => {
    dispatch({type: PERSIST_TOKEN})
  }
}

export function logOut () {
    return function(dispatch) {
      fetch(`${API}/api/logout`, {
        method: 'POST',
        headers:{
          Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}`
        }
      }).then(response => response.json())
      .then(json => {
        if (json.status) {
          dispatch({type: UNSET_TOKEN})
        }
      }).catch(e => console.log(e));
    }
}