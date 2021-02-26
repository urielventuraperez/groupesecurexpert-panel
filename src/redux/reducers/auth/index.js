import { SET_TOKEN, UNSET_TOKEN, VALIDATE_LOGIN } from "src/redux/actionTypes/auth";

const initialState = {
    user: {},
    isLogged: false,
    validate: false,
}

function reducer (state=initialState, action) {

    switch(action.type) {
        case VALIDATE_LOGIN:
            return { ...state, validate: !state.validate }
        case SET_TOKEN:
            return {
                isLogged: true,
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
