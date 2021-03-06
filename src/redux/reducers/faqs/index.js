import { IS_LOAD_FAQ, VIEW_FAQS, DELETE_FAQ, UPDATE_FAQ, ADD_FAQ } from '../../actionTypes/faqs';

const initialState = {
    faq: {},
    faqs: [],
    isLoadFaq: false,
}

function reducer(state=initialState, action){
    switch(action.type) {
        case IS_LOAD_FAQ:
            return {...state, isLoadFaq: !state.isLoadFaq}
        case VIEW_FAQS:
            return { ...state, isLoadFaq: false }, { faqs: action.payload }
        case DELETE_FAQ:
            return { ...state, faqs: state.faqs.filter( faq => faq.id !== action.payload ) }
        case UPDATE_FAQ:
            return { ...state, isLoadFaq: false, faqs: state.faqs.map((item) => { 
              if(item.id === action.payload.id) {
                return { ...item, ask: action.payload.faqs.ask, answer: action.payload.faqs.answer }  
              }
              return item
            }
            )};
        case ADD_FAQ:
            return { ...state, faqs: [...state.faqs, {ask: action.payload.ask, answer: action.payload.answer}] };
        default: 
            return state;
    }
}

export default reducer;