import React from "react";

import menuStyles from "./SideDrawerToggle.css";

const sideDrawerToggle = (props) => (
  <div className={menuStyles.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default sideDrawerToggle;
