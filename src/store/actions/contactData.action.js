import { Action } from "redux";
import axiosOrdersInstance from "../../axios/axios-orders";

export const CREATE_NEW_ORDER = "[Checkout - ContactData] Create New Order";
export const CREATE_NEW_ORDER_SUCCESS =
  "[Checkout - ContactData] Create New Order Success";
export const CREATE_NEW_ORDER_FAIL =
  "[Checkout - ContactData] Create New Order Fail";

export const createNewOrder: Action = () => {
  return {
    type: CREATE_NEW_ORDER,
  };
};

export const createNewOrderSuccess: Action = (resStatus) => {
  return {
    type: CREATE_NEW_ORDER_SUCCESS,
    payload: resStatus,
  };
};

export const createNewOrderFail: Action = () => {
  return {
    type: CREATE_NEW_ORDER_FAIL,
  };
};

export const createNewOrder$: Action = (orderData) => {
  return (dispatch) => {
    dispatch(createNewOrder());
    // timeout to simulate a slow network
    setTimeout(() => {
      axiosOrdersInstance
        .post(`/orders.json?auth=${orderData.authToken}`, orderData.order)
        .then((res) => {
          dispatch(createNewOrderSuccess(res.status));
        })
        .catch((error) => {
          dispatch(createNewOrderFail());
        });
    }, 1000);
  };
};

export type ContactDataAction =
  | createNewOrder
  | createNewOrderSuccess
  | createNewOrderFail;
