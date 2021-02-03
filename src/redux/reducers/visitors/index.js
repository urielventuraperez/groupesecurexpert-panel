import { VIEW_VISITORS, IS_LOAD_VISITORS } from '../../actionTypes/visitors';

const initialState = {
    visitors: [{}],
    isLoad: false
}

function reducer(state = initialState, action) {

  switch(action.type) {
    case IS_LOAD_VISITORS:
      return { ...state, isLoad: !state.isLoad };
    case VIEW_VISITORS:
      return Object.assign({ ...state, isLoad: false }, { visitors: action.payload });
    default:
      return state;
  }

}

export default reducer;