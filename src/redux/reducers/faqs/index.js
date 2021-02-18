import { IS_LOAD_FAQ } from '../../actionTypes/faqs';

const initialState = {
    faq: {},
    faqs: [],
    isLoadFaq: false
}

function reducer(state=initialState, action){
    switch(action.type) {
        case IS_LOAD_FAQ:
            return {...state, isLoadFaq: !state.isLoadFaq}
        default: 
            return state;
    }
}

export default reducer;