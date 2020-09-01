import React from "react";

import toolbarStyles from "./Toolbar.css";
import Logo from "../../UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import SideDrawerToggle from "../SideDrawerToggle/SideDrawerToggle";

const toolbar = (props) => (
  <header className={toolbarStyles.Toolbar}>
    <SideDrawerToggle clicked={props.sideDrawerToggleClicked} />
    <Logo height="80%" />
    <nav className={toolbarStyles.DesktopOnly}>
      <NavigationItems isUserLoggedIn={props.isUserLoggedIn} />
    </nav>
  </header>
);

export default toolbar;
