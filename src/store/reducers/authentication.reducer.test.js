/*
  How do you test redux, do you test it at all?
  The answer is yes we test it but we have to be careful about what we test.
  We probably don't want to test very complex chains of actions and reducers and state, in the end the
  reducers are the meat we want to test especially if we follow the pattern of not putting too much
  logic in the action creators. Then testing reducers is super simple,
  there are synchronous so we don't have to deal with async code and there are just functions.
  We pass something in, we get something out like for example for authentication component
  We don't need to render anything, we just test normal javascript code, we test functions, the reducer function.
*/
import { reducers } from "../reducers/index";
import * as actionTypes from "../actions/index";

const rootReducer = {
  authenticationReducer: reducers.authenticationReducer,
};

describe("Authentication Reducer", () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      userId: null,
      idToken: null,
      loading: false,
      hasCatchError: false,
      errorMessage: null,
    };
  });
  it("should return initial state", function () {
    expect(rootReducer.authenticationReducer(undefined, {})).toEqual(
      initialState
    );
  });
  it("should store token and user Id after login", function () {
    const loginSuccessAction = {
      type: actionTypes.AUTH_LOGIN_SUCCESS,
      payload: {
        idToken: "idToken",
        localId: "userId",
      },
    };
    const updatedState = {
      userId: "userId",
      idToken: "idToken",
      loading: false,
      hasCatchError: false,
      errorMessage: null,
    };
    expect(
      rootReducer.authenticationReducer(initialState, loginSuccessAction)
    ).toEqual(updatedState);
  });
});
