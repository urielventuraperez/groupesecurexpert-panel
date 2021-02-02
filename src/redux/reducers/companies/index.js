import { VIEW_BUSINESS, IS_LOAD_BUSINESS, PREMIUM_BUSINESS } from "../../actionTypes/companies";

const initialState = {
  isLoadBusiness: false,
  business: {},
  premiumBusiness: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case IS_LOAD_BUSINESS:
      return { ...state, isLoadBusiness: !state.isLoadBusiness };
    case VIEW_BUSINESS:
      return Object.assign(
        { ...state, isLoadBusiness: false },
        { business: action.payload }
      );
    case PREMIUM_BUSINESS:
        return Object.assign(
          {...state, isLoadBusiness: false},
          { premiumBusiness: action.payload  }
        );
    default:
      return state;
  }
}

export default reducer;
