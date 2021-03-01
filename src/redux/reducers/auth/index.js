import { SET_TOKEN, UNSET_TOKEN, VALIDATE_LOGIN, PERSIST_TOKEN } from "src/redux/actionTypes/auth";
import { LSTOKEN } from 'src/utils/environmets';

const initialState = {
    user: {},
    isLogged: false,
    validate: false,
}

function reducer (state=initialState, action) {
    switch(action.type) {
        case VALIDATE_LOGIN:
            return { ...state, validate: !state.validate }
        case PERSIST_TOKEN: 
            return { ...state, isLogged: localStorage.getItem(LSTOKEN) !== null ? true : false }
        case SET_TOKEN:
            return {
                isLogged: localStorage.getItem(LSTOKEN) !== null ? true : false,
                validate: false,
                user: {},
            };
        case UNSET_TOKEN:
            localStorage.clear();
            return {
                isLogged: false,
                user: {}
            };
        default: return state;
    }

}

export default reducer;
