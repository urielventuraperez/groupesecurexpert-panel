import { VIEW_COMPANIES, IS_LOAD_COMPANIES, VIEW_COMPANY, FILTER_COMPANY, ADD_COMPANY, DELETE_COMPANY } from "../../actionTypes/companies";

const initialState = {
  isLoadCompanies: false,
  companies: [],
  company: {},
  companiesResult: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case IS_LOAD_COMPANIES:
      return { ...state, isLoadCompanies: !state.isLoadBusiness };
    case VIEW_COMPANIES:
      return Object.assign(
        { ...state, isLoadCompanies: false },
        { companies: action.payload }
      );
    case ADD_COMPANY:
      return { ...state, isLoadCompanies:false, companies:[...state.companies, action.payload] }
    case DELETE_COMPANY:
      return { ...state,  companies: state.companies.filter( c => c.id !== action.payload ) }
    case VIEW_COMPANY:
      return Object.assign(
        { ...state, isLoadCompanies: false },
        { company: action.payload }
    )
    case FILTER_COMPANY:
      return Object.assign(
        {...state, isLoadCompanies: false},
        { companiesResult: state.companies.filter(h => h.name.toLowerCase().includes(action.payload.toLowerCase())) }
      )
    default:
      return state;
  }
}

export default reducer;
