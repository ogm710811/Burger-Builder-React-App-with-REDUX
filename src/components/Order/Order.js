import React from "react";

import orderStyles from "./Order.css";

const order = (props) => {
  const ingredients = [];
  for (let ingredientsName in props.ingredients) {
    ingredients.push({
      ingredient: ingredientsName,
      amount: props.ingredients[ingredientsName],
    });
  }
  const ingredientsOutput = ingredients.map((i) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
        key={i.ingredient}
      >
        {i.ingredient} ({i.amount})
      </span>
    );
  });
  return (
    <div className={orderStyles.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
