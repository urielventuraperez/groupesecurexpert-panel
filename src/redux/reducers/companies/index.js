import { 
  VIEW_COMPANIES, 
  IS_LOAD_COMPANIES, 
  VIEW_COMPANY, 
  FILTER_COMPANY, 
  ADD_COMPANY, 
  DELETE_COMPANY,
  UPDATE_COMPANY,
  ADD_INSURANCE,
  IS_LOAD_INSURANCES
} from "../../actionTypes/companies";

const initialState = {
  isLoadCompanies: false,
  isLoadInsurances: false,
  companies: [],
  company: {},
  companiesResult: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case IS_LOAD_COMPANIES:
      return { ...state, isLoadCompanies: !state.isLoadBusiness };
    case IS_LOAD_INSURANCES:
      return { ...state, isLoadInsurances: !state.isLoadInsurances }
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
        { ...state, isLoadCompanies: false, isLoadInsurances: false },
        { company: action.payload }
    )
    case FILTER_COMPANY:
      return Object.assign(
        {...state, isLoadCompanies: false},
        { companiesResult: state.companies.filter(h => h.name.toLowerCase().includes(action.payload.toLowerCase())) }
      )
    case UPDATE_COMPANY:
        return Object.assign(
          { ...state, companies: [...state.companies, action.payload] }
        )
    // Insurances by Company
    case ADD_INSURANCE:
          state.company.insurances.splice(0, state.company.insurances.length)
          return Object.assign( 
            {...state, isLoadInsurances: false}, 
            state.company["insurances"] = state.company.insurances.concat(action.payload));
    default:
      return state;
  }
}

export default reducer;
