import React, { Component } from "react";

import modalStyles from "./Modal.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // !!! only if displayModal changes the modal and his children will update
    // this way the app doesn't renderer the modal and its children unnecessary !!!
    // Because we don't need to check all modal properties we don't use pure component
    return (
      nextProps.displayModal !== this.props.displayModal ||
      nextProps.children !== this.props.children
    );
  }

  componentDidUpdate(nextProps, nextState) {}

  render() {
    const styleClasses = !this.props.hasSpinner
      ? modalStyles.Modal
      : modalStyles.Spinner;

    return (
      <Aux>
        <Backdrop
          showBackdrop={this.props.displayModal}
          clicked={this.props.closeModal}
        />
        <div
          className={styleClasses}
          style={{
            transform: this.props.displayModal
              ? "translateY(0)"
              : "translateY(-100vh)",
            opacity: this.props.displayModal ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
