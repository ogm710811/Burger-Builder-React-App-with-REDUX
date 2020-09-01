import { Action } from "redux";
import axiosOrdersInstance from "../../axios/axios-orders";

export const LOAD_INGREDIENTS = "[Burger-Builder] Load Ingredients";
export const LOAD_INGREDIENTS_SUCCESS =
  "[Burger-Builder] Load Ingredients Success";
export const LOAD_INGREDIENTS_FAIL = "[Burger-Builder] Load Ingredients Fail";
export const ADD_INGREDIENT = "[Burger-Builder] Add Ingredient";
export const REMOVE_INGREDIENT = "[Burger-Builder] Remove Ingredient";

export const loadIngredients: Action = () => {
  return {
    type: LOAD_INGREDIENTS,
  };
};

export const loadIngredientsSuccess: Action = (ingredients) => {
  return {
    type: LOAD_INGREDIENTS_SUCCESS,
    payload: ingredients,
  };
};

export const loadIngredientsFail: Action = () => {
  return {
    type: LOAD_INGREDIENTS_FAIL,
  };
};

export const loadIngredients$: Action = () => {
  return (dispatch) => {
    dispatch(loadIngredients());
    // setTimeout simulates a delay in the call
    setTimeout(() => {
      axiosOrdersInstance
        .get("/ingredients.json")
        .then((res) => {
          dispatch(loadIngredientsSuccess(res.data));
        })
        .catch((error) => {
          dispatch(loadIngredientsFail());
        });
    }, 1000);
  };
};

export const addIngredient: Action = (ingredientName) => {
  return {
    type: ADD_INGREDIENT,
    payload: ingredientName,
  };
};

export const removeIngredient: Action = (ingredientName) => {
  return {
    type: REMOVE_INGREDIENT,
    payload: ingredientName,
  };
};

export type BurgerBuilderAction =
  | loadIngredientsSuccess
  | loadIngredientsFail
  | loadIngredients
  | addIngredient
  | removeIngredient;
