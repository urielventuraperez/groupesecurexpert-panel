import { SET_TOKEN, UNSET_TOKEN, VALIDATE_LOGIN, PERSIST_TOKEN } from 'src/redux/actionTypes/auth';
import { API, LSTOKEN } from 'src/utils/environmets';
// import { useHistory } from "react-router-dom";

export function logIn (user) {
    // const history = useHistory();
    let formData = new FormData();
    formData.append('email', user.email);
    formData.append('password', user.password);
    return function(dispatch) {
        dispatch({type: VALIDATE_LOGIN})
        return fetch(`${API}/login`, { method: 'POST' , body: formData })
            .then(response => response.json())
            .then( json => {
                if (json.status){
                    localStorage.setItem(LSTOKEN, json.data.token)
                }
                return dispatch({ type: SET_TOKEN });
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
        dispatch({type: UNSET_TOKEN})
    }
}