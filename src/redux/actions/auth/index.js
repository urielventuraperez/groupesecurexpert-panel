import { SET_TOKEN, UNSET_TOKEN } from 'src/redux/actionTypes/auth';
import { API } from 'src/utils/environmets';

export function logIn (user) {
    let formData = new FormData();
    formData.append('email', user.email);
    formData.append('password', user.password);
    return function(dispatch) {
        return fetch(`${API}/login`, { method: 'POST' , body: formData })
            .then(response => response.json())
            .then( json => {
                if (json.status){
                    console.log(json.data.token);
                    // localStorage.setItem('token', json.data.token)
                    return dispatch({ action: SET_TOKEN })
                }
            }).catch(e => { console.log(e) })
    }
}

export function logOut () {
    return function (dispatch) {
        dispatch( UNSET_TOKEN);
    }
}