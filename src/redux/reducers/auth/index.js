import { SET_TOKEN, UNSET_TOKEN } from "src/redux/actionTypes/auth";

const initialState = {
    user: {},
    isLogged: false,
}

function reducer (state=initialState, action) {

    switch(action.type) {
        case SET_TOKEN:
            return {
                isLogged: true,
                user: {}
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
