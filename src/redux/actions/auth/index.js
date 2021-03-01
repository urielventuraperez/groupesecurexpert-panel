import { SET_TOKEN, UNSET_TOKEN, VALIDATE_LOGIN } from 'src/redux/actionTypes/auth';
import { API } from 'src/utils/environmets';

export function logIn (user) {
    let formData = new FormData();
    formData.append('email', user.email);
    formData.append('password', user.password);
    return function(dispatch) {
        dispatch({type: VALIDATE_LOGIN})
        return fetch(`${API}/login`, { method: 'POST' , body: formData })
            .then(response => response.json())
            .then( json => {
                if (json.status){
                    console.log(json.data.token);
                    localStorage.setItem('user', json.data.token)
                    return dispatch({ type: SET_TOKEN })
                }
                return dispatch({type: VALIDATE_LOGIN})
            }).catch(e => { console.log(e) })
    }
}

export function logOut () {
    return function (dispatch) {
        dispatch( UNSET_TOKEN);
    }
}