import { Action } from "redux";
import axiosAuthInstance from "../../axios/axios-authentication";
import { API_KEY } from "../../axios/web-api-key";

export const AUTH_LOGIN = "[Authentication] Auth Login";
export const AUTH_LOGIN_SUCCESS = "[Authentication] Auth Login Success";
export const AUTH_LOGIN_FAIL = "[Authentication] Auth Login Fail";

export const AUTH_LOGOUT = "[Authentication] Auth Logout";

export const authLogin: Action = () => {
  return {
    type: AUTH_LOGIN,
  };
};

export const authLoginSuccess: Action = (apiResponse) => {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: apiResponse,
  };
};

export const authLoginFail: Action = (errorMessage) => {
  return {
    type: AUTH_LOGIN_FAIL,
    payload: errorMessage,
  };
};

export const authLogout: Action = () => {
  clearSession();
  return {
    type: AUTH_LOGOUT,
  };
};

export const authLogout$: Action = (apiResponse) => {
  const tokenExpiresTime = apiResponse.expiresIn;
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, tokenExpiresTime * 1000);
  };
};

const savedSession = (apiResponse) => {
  const tokenExpiresTime = apiResponse.expiresIn;
  const expirationTime = new Date(
    new Date().getTime() + tokenExpiresTime * 1000
  );

  const sessionData = {
    idToken: apiResponse.idToken,
    expirationDate: new Date(expirationTime),
    userId: apiResponse.localId,
  };
  localStorage.setItem("idToken", sessionData.idToken);
  localStorage.setItem("expirationDate", sessionData.expirationDate);
  localStorage.setItem("userId", sessionData.userId);
};

const clearSession = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
};

export const authLogin$: Action = (formData) => {
  const authData = {
    email: formData.username,
    password: formData.password,
    returnSecureToken: true,
  };
  const url = formData.isSignUp
    ? "/accounts:signUp"
    : "accounts:signInWithPassword";

  return (dispatch) => {
    dispatch(authLogin());
    // setTimeout simulates a delay in the call
    setTimeout(() => {
      axiosAuthInstance
        .post(`${url}?key=${API_KEY}`, authData)
        .then((res) => {
          savedSession(res.data);
          dispatch(authLoginSuccess(res.data));
          dispatch(authLogout$(res.data));
        })
        .catch((err) => {
          const errorMessage = err.response.data.error.message;
          dispatch(authLoginFail(errorMessage));
        });
    }, 1000);
  };
};

export const authCheckSession: Action = () => {
  return (dispatch) => {
    const idToken = localStorage.getItem("idToken");
    if (!idToken) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        const sessionData = {
          idToken: idToken,
          localId: localStorage.getItem("userId"),
          expiresIn: (expirationDate.getTime() - new Date().getTime()) / 1000,
        };
        dispatch(authLoginSuccess(sessionData));
        dispatch(authLogout$(sessionData));
      }
    }
  };
};

export type AuthenticationAction =
  | authLoginSuccess
  | authLoginFail
  | authLogin
  | authLogout
  | authCheckSession;
