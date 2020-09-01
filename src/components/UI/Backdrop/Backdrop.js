import React from "react";

import backdropStyles from "./Backdrop.css";

const backdrop = (props) =>
  props.showBackdrop ? (
    <div className={backdropStyles.Backdrop} onClick={props.clicked}></div>
  ) : null;

export default backdrop;
