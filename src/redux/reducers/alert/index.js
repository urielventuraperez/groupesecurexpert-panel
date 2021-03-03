import { SHOW_ALERT, ALERT_STATUS } from 'src/redux/actionTypes/alert';

const initialState = {
  isShow: false,
  status: false,
}

export default function reducer(state=initialState, action) {

  switch(action.type) {
    case SHOW_ALERT:
      return { ...state, isShow: !state.isShow }
    case ALERT_STATUS:
      return { ...state, status: action.payload }
    default:
      return { ...state }
  }

}