import * as actionTypes from "../actions/index";

const initialState = {
  userId: null,
  idToken: null,
  loading: false,
  hasCatchError: false,
  errorMessage: null,
};

export const reducer = (
  state = initialState,
  action: actionTypes.AuthenticationAction
) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN:
      return {
        ...state,
        loading: true,
        hasCatchError: false,
      };
    case actionTypes.AUTH_LOGIN_SUCCESS:
      const idToken = action.payload.idToken;
      const userId = action.payload.localId;
      return {
        ...state,
        userId: userId,
        idToken: idToken,
        loading: false,
        hasCatchError: false,
      };
    case actionTypes.AUTH_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        hasCatchError: true,
        errorMessage: action.payload,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        userId: null,
        idToken: null,
        loading: false,
        hasCatchError: false,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export default reducer;
