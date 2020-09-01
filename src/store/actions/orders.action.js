import { Action } from "redux";
import axiosOrdersInstance from "../../axios/axios-orders";

export const LOAD_ORDERS = "[Orders] Load Orders";
export const LOAD_ORDERS_SUCCESS = "[Orders] Load Orders Success";
export const LOAD_ORDERS_FAIL = "[Orders] Load Orders Fail";

export const loadOrders: Action = () => {
  return {
    type: LOAD_ORDERS,
  };
};

export const loadOrdersSuccess: Action = (orders) => {
  return {
    type: LOAD_ORDERS_SUCCESS,
    payload: orders,
  };
};

export const loadOrdersFail: Action = () => {
  return {
    type: LOAD_ORDERS_FAIL,
  };
};

export const loadOrders$: Action = (authToken, userId) => {
  return (dispatch) => {
    dispatch(loadOrders());
    const queryParams = `?auth=${authToken}&orderBy="userId"&equalTo="${userId}"`;

    // setTimeout simulates a delay in the call
    setTimeout(() => {
      axiosOrdersInstance
        .get(`/orders.json${queryParams}`)
        .then((res) => {
          dispatch(loadOrdersSuccess(res.data));
        })
        .catch((error) => {
          dispatch(loadOrdersFail());
        });
    }, 1000);
  };
};

export type OrdersAction = loadOrdersSuccess | loadOrdersFail | loadOrders;
