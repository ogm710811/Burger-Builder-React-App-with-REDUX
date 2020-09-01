import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Authentication/Logout";
import * as authActions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});
const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});
const asyncAuth = asyncComponent(() => {
  return import("./containers/Authentication/Auth");
});

class App extends Component {
  // this comment block is to test that the axios interceptor
  // are cancelled if the BurgerBuilder component is removed from the DOM.
  /* state = {
    showBurgerBuilderComponent: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showBurgerBuilderComponent: false,
      });
    }, 2000);
  }*/

  componentDidMount() {
    this.props.onAuthCheckSession();
  }

  render() {
    const routes = !this.props.isUserLoggedIn ? (
      <Switch>
        <Route path="/login" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    ) : (
      <Switch>
        <Route path="/login" component={asyncAuth} />
        <Route path="/logout" component={Logout} />
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <div>
        <Layout>
          {/*{this.state.showBurgerBuilderComponent ? <BurgerBuilder /> : null}*/}
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.authenticationReducer.idToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheckSession: () => dispatch(authActions.authCheckSession()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
