import { IS_LOAD, VIEW_USERS, ME } from 'src/redux/actionTypes/users';

const initialState = {
    isLoad: false,
    users: [],
    me: {},
    user: {}
}

function reducer(state=initialState, action) {
    switch(action.type) {
        case IS_LOAD:
            return {...state, isLoad: !state.isLoad}
        case ME: 
            return Object.assign ({ ...state, isLoad: false },{ me: action.payload })
        case VIEW_USERS:
            return Object.assign(
                { ...state, isLoad: false },
                { users: action.payload.slice(0,5) }
            )
        default:
            return state
    }
}

export default reducer;
