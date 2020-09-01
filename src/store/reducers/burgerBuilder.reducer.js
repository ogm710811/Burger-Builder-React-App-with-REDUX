import * as actionTypes from "../actions/index";
import INGREDIENT_PRICES from "../../globals/globals";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  ingredientsLoading: false,
  hasCatchError: false,
};

export const reducer = (
  state = initialState,
  action: actionTypes.BurgerBuilderAction
) => {
  switch (action.type) {
    case actionTypes.LOAD_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
        ingredientsLoading: true,
        hasCatchError: false,
      };
    case actionTypes.LOAD_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
        ingredientsLoading: false,
        hasCatchError: false,
      };
    case actionTypes.LOAD_INGREDIENTS_FAIL:
      return {
        ...state,
        ingredientsLoading: false,
        hasCatchError: true,
      };
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload],
        ingredientsLoading: false,
        hasCatchError: false,
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload],
        ingredientsLoading: false,
        hasCatchError: false,
      };
    default:
      return state;
  }
};

export default reducer;
