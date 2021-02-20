import { IS_LOAD_FAQ, VIEW_FAQS, DELETE_FAQ } from '../../actionTypes/faqs';

const initialState = {
    faq: {},
    faqs: [],
    isLoadFaq: false
}

function reducer(state=initialState, action){
    switch(action.type) {
        case IS_LOAD_FAQ:
            return {...state, isLoadFaq: !state.isLoadFaq}
        case VIEW_FAQS:
            return { ...state, isLoadFaq: false }, { faqs: action.payload.slice(0,10) }
        case DELETE_FAQ:
            return { ...state, faqs: state.faqs.filter( faq => faq.id !== action.payload ) }
        default: 
            return state;
    }
}

export default reducer;