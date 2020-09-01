import React from "react";

import burgerControlsStyles from "./BurgerControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const burgerControls = (props) => (
  <div className={burgerControlsStyles.BuildControls}>
    <p>
      Current Price: <strong>${props.totalPrice.toFixed(2)}</strong>
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        ingredientLabel={ctrl.label}
        addIngredient={() => props.ingredientAdded(ctrl.type)}
        removeIngredient={() => props.ingredientRemoved(ctrl.type)}
        disabledLessButton={props.disabledLessButton[ctrl.type]}
      />
    ))}
    <button
      className={burgerControlsStyles.OrderButton}
      disabled={!props.canOrderNow}
      onClick={props.buttonClicked}
    >
      {props.isUserLoggedIn ? "ORDER NOW" : "LOG IN to ORDER"}
    </button>
  </div>
);

export default burgerControls;
