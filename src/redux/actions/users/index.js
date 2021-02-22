import { IS_LOAD, VIEW_USERS } from 'src/redux/actionTypes/users';
import { ENV } from 'src/utils/environmets';

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