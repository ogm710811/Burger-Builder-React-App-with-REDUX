import React from "react";
import { NavLink } from "react-router-dom";

import navigationItemStyles from "./NavigationItem.css";

const navigationItem = (props) => {
  return (
    <li className={navigationItemStyles.NavigationItem}>
      <NavLink
        to={props.link}
        exact={props.exact}
        activeClassName={navigationItemStyles.active}
        // className={props.active ? navigationItemStyles.active : null}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
