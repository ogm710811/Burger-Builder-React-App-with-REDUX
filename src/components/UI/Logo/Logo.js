import React from "react";

import logoStyles from "./Logo.css";
import logoImage from "../../../assets/images/logo.png";

const logo = (props) => (
  <div className={logoStyles.Logo} style={{ height: props.height }}>
    <img src={logoImage} alt="Burger Builder Logo" />
  </div>
);

export default logo;
