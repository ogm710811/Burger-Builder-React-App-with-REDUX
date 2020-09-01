import React from "react";

import sideDrawerStyles from "./SideDrawer.css";
import Logo from "../../UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
  let conditionClasses = props.showBackdrop
    ? [sideDrawerStyles.SideDrawer, sideDrawerStyles.Open]
    : [sideDrawerStyles.SideDrawer, sideDrawerStyles.Close];

  return (
    <Aux>
      <Backdrop showBackdrop={props.showBackdrop} clicked={props.clicked} />
      <div className={conditionClasses.join(" ")}>
        <div className={sideDrawerStyles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
