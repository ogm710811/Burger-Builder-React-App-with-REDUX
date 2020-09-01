import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";
import BurgerView from "../../components/Burger/BurgerView/BurgerView";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";
import BurgerOrderSummary from "../../components/Burger/BurgerOrderSummary/BurgerOrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

import axiosOrdersInstance from "../../axios/axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from "../../store/actions/index";
import { connect } from "react-redux";

export class BurgerBuilder extends Component {
  // what state properties will be part of the store state?
  // ingredients, totalPrice, ingredientsLoading, hasCatchError are the properties that will be in the store state.
  // tisOrderNowButtonClicked property is considered UI states, so is not necessary they being at the store state
  state = {
    isOrderNowButtonClicked: false,
  };

  componentDidMount() {
    this.props.onLoadIngredients();
  }

  orderNowHandler = () => {
    if (this.props.isUserLoggedIn) {
      this.setState({
        isOrderNowButtonClicked: true,
      });
    } else {
      this.props.history.push("/login");
    }
  };

  orderCancelHandler = () => {
    this.setState({
      isOrderNowButtonClicked: false,
    });
  };

  orderContinueCheckout = () => {
    this.props.history.push({
      pathname: "/checkout",
    });
  };

  buttonOrderNowHandler = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingredientKey) => {
        return ingredients[ingredientKey];
      })
      .reduce((sum, ingredientValue) => {
        return sum + ingredientValue;
      }, 0);
    // this.setState({
    //   canOrderNow: sum > 0,
    // });
    return sum > 0;
  };

  render() {
    const disabledIngredientsInfo = {
      ...this.props.ingredients,
    };
    for (let key in disabledIngredientsInfo) {
      disabledIngredientsInfo[key] = disabledIngredientsInfo[key] <= 0;
    }

    let burgerOrderSummary = null;
    let burgerBuilder = this.props.hasCatchError ? (
      <Aux>
        <p
          style={{
            whiteSpace: "pre",
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
          }}
        >
          There was an error loading ingredients ... {"\n"}Please, try again !!
        </p>
      </Aux>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burgerBuilder = (
        <Aux>
          <BurgerView ingredients={this.props.ingredients} />
          <BurgerControls
            ingredientAdded={this.props.onIngredientsAdded}
            ingredientRemoved={this.props.onIngredientsRemoved}
            disabledLessButton={disabledIngredientsInfo}
            totalPrice={this.props.totalPrice}
            canOrderNow={this.buttonOrderNowHandler(this.props.ingredients)}
            buttonClicked={this.orderNowHandler}
            isUserLoggedIn={this.props.isUserLoggedIn}
          />
        </Aux>
      );

      burgerOrderSummary = (
        <BurgerOrderSummary
          ingredients={this.props.ingredients}
          totalPrice={this.props.totalPrice}
          clickedCancel={this.orderCancelHandler}
          clickedContinue={this.orderContinueCheckout}
        />
      );
    }

    if (this.props.ingredientsLoading) {
      burgerOrderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          displayModal={this.state.isOrderNowButtonClicked}
          closeModal={this.orderCancelHandler}
          hasSpinner={this.props.ingredientsLoading}
        >
          {burgerOrderSummary}
        </Modal>
        {burgerBuilder}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilderReducer.ingredients,
    totalPrice: state.burgerBuilderReducer.totalPrice,
    ingredientsLoading: state.burgerBuilderReducer.ingredientsLoading,
    hasCatchError: state.burgerBuilderReducer.hasCatchError,
    isUserLoggedIn: state.authenticationReducer.idToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientsAdded: (ingredientName) =>
      dispatch(burgerBuilderActions.addIngredient(ingredientName)),
    onIngredientsRemoved: (ingredientName) =>
      dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
    onLoadIngredients: () => dispatch(burgerBuilderActions.loadIngredients$()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosOrdersInstance));
