import React, { Component } from "react";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

// This can be a functional component doesn't have to be a class.
class BurgerOrderSummary extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (ingredientKey) => {
        return this.props.ingredients[ingredientKey] > 0 ? (
          <li key={ingredientKey}>
            <span style={{ textTransform: "capitalize" }}>{ingredientKey}</span>
            : {this.props.ingredients[ingredientKey]}
          </li>
        ) : null;
      }
    );
    return (
      <Aux>
        <h3>Your Order Details</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: ${this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.clickedCancel}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.clickedContinue}>
          Checkout
        </Button>
      </Aux>
    );
  }
}

export default BurgerOrderSummary;
