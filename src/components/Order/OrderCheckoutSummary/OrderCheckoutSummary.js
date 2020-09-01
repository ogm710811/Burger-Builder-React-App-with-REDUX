import React from "react";

import orderCheckoutSummaryStyles from "./OrderCheckoutSummary.css";
import BurgerView from "../../Burger/BurgerView/BurgerView";
import Button from "../../UI/Button/Button";

const orderCheckoutSummary = (props) => (
  <div className={orderCheckoutSummaryStyles.OrderCheckoutSummary}>
    <h1>We hope it tastes well !!</h1>
    <div style={{ width: "100%", margin: "auto" }}>
      <BurgerView ingredients={props.ingredients} />
    </div>
    <Button btnType="Danger" clicked={props.checkoutCancelled}>
      Cancel
    </Button>
    <Button btnType="Success" clicked={props.checkoutContinue}>
      Continue
    </Button>
  </div>
);

export default orderCheckoutSummary;
