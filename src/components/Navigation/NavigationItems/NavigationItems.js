import React from "react";

import navigationItemsStyles from "./NavigationItems.css";
import NavigationItem from "../NavigationItem/NavigationItem";

const navigationItems = (props) => {
  return (
    <ul className={navigationItemsStyles.NavigationItems}>
      <NavigationItem active link="/" exact>
        Burger Builder
      </NavigationItem>

      {props.isUserLoggedIn ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}

      {props.isUserLoggedIn ? (
        <NavigationItem link="/logout">Log Out</NavigationItem>
      ) : (
        <NavigationItem link="/login">Log In</NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
