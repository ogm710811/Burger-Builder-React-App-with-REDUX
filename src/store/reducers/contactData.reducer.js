import * as actionTypes from "../actions/index";

const initialState = {
  orderSubmitting: false,
  orderSubmitted: false,
  hasCatchError: false,
};

export const reducer = (
  state = initialState,
  action: actionTypes.ContactDataAction
) => {
  switch (action.type) {
    case actionTypes.CREATE_NEW_ORDER:
      return {
        ...state,
        orderSubmitting: true,
        orderSubmitted: false,
        hasCatchError: false,
      };
    case actionTypes.CREATE_NEW_ORDER_SUCCESS:
      const resStatus = action.payload;
      return {
        ...state,
        orderSubmitting: false,
        orderSubmitted: resStatus === 200,
        hasCatchError: false,
      };
    case actionTypes.CREATE_NEW_ORDER_FAIL:
      return {
        ...state,
        orderSubmitting: false,
        orderSubmitted: false,
        hasCatchError: true,
      };
    default:
      return state;
  }
};
