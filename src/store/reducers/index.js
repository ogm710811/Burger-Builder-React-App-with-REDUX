import * as fromBurgerBuilderReducer from "./burgerBuilder.reducer";
import * as fromOrdersReducer from "./orders.reducer";
import * as fromContactDataReducer from "./contactData.reducer";
import * as fromAuthenticationReducer from "./authentication.reducer";

export const reducers = {
  burgerBuilderReducer: fromBurgerBuilderReducer.reducer,
  orderReducer: fromOrdersReducer.reducer,
  contactDataReducer: fromContactDataReducer.reducer,
  authenticationReducer: fromAuthenticationReducer.reducer,
};
