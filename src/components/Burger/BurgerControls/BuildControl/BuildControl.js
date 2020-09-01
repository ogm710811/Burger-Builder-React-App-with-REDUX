import React from "react";

import burgerControlStyles from "./BuildControl.css";

const burgerControl = (props) => (
  <div className={burgerControlStyles.BuildControl}>
    <div className={burgerControlStyles.Label}>{props.ingredientLabel}</div>
    <button
      className={burgerControlStyles.Less}
      onClick={props.removeIngredient}
      disabled={props.disabledLessButton}
    >
      Less
    </button>
    <button className={burgerControlStyles.More} onClick={props.addIngredient}>
      More
    </button>
  </div>
);

export default burgerControl;
