import React from "react";

import inputStyles from "./Input.css";

const input = (props) => {
  let inputElement = null;
  let errorMessage = null;

  const inputStyleClasses = [inputStyles.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputStyleClasses.push(inputStyles.Invalid);
    errorMessage = (
      <p className={inputStyles.ValidationError}>* {props.errorMessage}</p>
    );
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <div>
          <input
            onChange={props.onChange}
            className={inputStyleClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
          />
          {errorMessage}
        </div>
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.onChange}
          className={inputStyleClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputStyleClasses.join(" ")}
          value={props.value}
          onChange={props.onChange}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
          >
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          onChange={props.onChange}
          className={inputStyleClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={inputStyles.Input}>
      <label className={inputStyles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
