import * as actionTypes from "../actions/index";

const initialState = {
  orders: [],
  orderLoading: false,
  hasCatchError: false,
};

export const reducer = (
  state = initialState,
  action: actionTypes.OrdersAction
) => {
  switch (action.type) {
    case actionTypes.LOAD_ORDERS:
      return {
        ...state,
        orderLoading: true,
        hasCatchError: false,
      };
    case actionTypes.LOAD_ORDERS_SUCCESS:
      const fetchedOrders = [];
      const orders = action.payload;
      for (let key in orders) {
        fetchedOrders.push({
          ...orders[key],
          id: key,
        });
      }
      return {
        ...state,
        orders: fetchedOrders,
        orderLoading: false,
        hasCatchError: false,
      };
    case actionTypes.LOAD_ORDERS_FAIL:
      return {
        ...state,
        orderLoading: false,
        hasCatchError: true,
      };
    default:
      return state;
  }
};

export default reducer;
