import { IS_LOAD, VIEW_USERS } from 'src/redux/actionTypes/users';

const initialState = {
    isLoad: false,
    users: [],
    user: {}
}

export function reducer(state=initialState, action) {
    switch(action.type) {
        case IS_LOAD:
            return {...state, isLoad: !state.isLoad}
        case VIEW_USERS:
            return Object.assign(
                { ...state, isLoad: false },
                { users: action.payload.slice(0,5) }
            )
        default:
            return state
    }
}
