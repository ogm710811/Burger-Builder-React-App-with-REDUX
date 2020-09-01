import React, { Component } from "react";
import { connect } from "react-redux";

import axiosOrdersInstance from "../../axios/axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Order from "../../components/Order/Order";
import * as orderActions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    const authToken = this.props.authToken;
    const userId = this.props.userId;
    this.props.onLoadOrders(authToken, userId);
  }

  render() {
    let orders = this.props.orderLoading ? (
      <Spinner />
    ) : (
      this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.totalPrice}
        />
      ))
    );

    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.orders,
    orderLoading: state.orderReducer.orderLoading,
    authToken: state.authenticationReducer.idToken,
    userId: state.authenticationReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadOrders: (authToken, userId) =>
      dispatch(orderActions.loadOrders$(authToken, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axiosOrdersInstance));
