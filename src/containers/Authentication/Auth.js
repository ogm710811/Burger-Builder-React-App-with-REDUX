import React, { Component } from "react";

import authStyles from "./Auth.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as authActions from "../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    loginForm: {
      username: {
        elementType: "input",
        elementConfig: {
          type: "email",
          name: "email",
          placeholder: "Enter your email address",
        },
        value: "",
        validationRules: {
          required: true,
          isEmail: true,
        },
        isValid: false,
        isTouched: false,
        validationErrorMessage: "email address is required",
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          name: "password",
          placeholder: "Password",
        },
        value: "",
        validationRules: {
          required: true,
          minLength: 6,
        },
        isValid: false,
        isTouched: false,
        validationErrorMessage: "please, enter your password",
      },
    },
    isFormValid: false,
    isSignUp: false,
  };

  authHandler = (event) => {
    event.preventDefault();
    let formData = {};
    for (let formElement in this.state.loginForm) {
      formData[formElement] = this.state.loginForm[formElement].value;
    }
    formData = {
      ...formData,
      isSignUp: this.state.isSignUp,
    };
    this.props.onAuthLogin(formData);
  };

  checkValidationRules(formElementValue, validationRules) {
    if (!validationRules) return;
    let isValid = true;
    if (validationRules.required) {
      isValid = formElementValue.trim() !== "" && isValid;
    }
    if (validationRules.minLength) {
      isValid = formElementValue.length >= validationRules.minLength && isValid;
    }
    if (validationRules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(formElementValue) && isValid;
    }

    return isValid;
  }

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedLoginForm = {
      ...this.state.loginForm,
    };
    // making a deeper copy to avoid mutation on the inner object
    const updatedElementForm = {
      ...updatedLoginForm[inputIdentifier],
      value: event.target.value,
      isTouched: true,
      isValid: this.checkValidationRules(
        event.target.value,
        updatedLoginForm[inputIdentifier].validationRules
      ),
    };

    updatedLoginForm[inputIdentifier] = updatedElementForm;
    let isFormValid = true;
    for (let elementForm in updatedLoginForm) {
      isFormValid = updatedLoginForm[elementForm].isValid && isFormValid;
    }
    this.setState({ loginForm: updatedLoginForm, isFormValid: isFormValid });
  };

  switchToSignUpHandler = () => {
    this.setState((prevState) => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };

  render() {
    let formElementsArray = [];
    for (let keyElement in this.state.loginForm) {
      formElementsArray.push({
        id: keyElement,
        config: this.state.loginForm[keyElement],
      });
    }

    let errorMessage = this.props.hasCatchError ? (
      <p
        style={{
          whiteSpace: "pre",
          textAlign: "center",
          color: "red",
          fontWeight: "bold",
        }}
      >
        {this.props.errorMessage}
      </p>
    ) : null;

    let signUpMessage = !this.state.isSignUp ? (
      <p
        style={{
          whiteSpace: "pre",
          textAlign: "center",
          color: "green",
          fontWeight: "bold",
        }}
      >
        Not a Customer?{"\n"}Please, switch to Sign Up.
      </p>
    ) : null;

    let redirectAfterLogIn = null;
    if (
      this.props.isUserLoggedIn &&
      !this.props.hasBurgerBuilderOrderInProcess
    ) {
      redirectAfterLogIn = <Redirect to="/" />;
    } else if (
      this.props.isUserLoggedIn &&
      this.props.hasBurgerBuilderOrderInProcess
    ) {
      redirectAfterLogIn = <Redirect to="/checkout" />;
    }

    let form = this.props.loading ? (
      <div>
        <Spinner />
      </div>
    ) : (
      <Aux>
        <div className={authStyles.Auth}>
          {redirectAfterLogIn}
          {errorMessage}
          <form onSubmit={this.authHandler}>
            {formElementsArray.map((formElement) => (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.isValid}
                touched={formElement.config.isTouched}
                errorMessage={formElement.config.validationErrorMessage}
                shouldValidate={formElement.config.validationRules}
                onChange={(event) =>
                  this.inputChangeHandler(event, formElement.id)
                }
              />
            ))}
            <Button btnType="Success" disabled={!this.state.isFormValid}>
              {this.state.isSignUp ? "SIGN UP" : "LOG IN"}
            </Button>
          </form>
          {signUpMessage}
          <Button btnType="Danger" clicked={this.switchToSignUpHandler}>
            SWITCH TO {!this.state.isSignUp ? "SIGN UP" : "LOG IN"}
          </Button>
        </div>
      </Aux>
    );

    return form;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.authenticationReducer.loading,
    hasCatchError: state.authenticationReducer.hasCatchError,
    errorMessage: state.authenticationReducer.errorMessage,
    isUserLoggedIn: state.authenticationReducer.idToken !== null,
    hasBurgerBuilderOrderInProcess: state.burgerBuilderReducer.totalPrice > 4,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthLogin: (formData) => dispatch(authActions.authLogin$(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
