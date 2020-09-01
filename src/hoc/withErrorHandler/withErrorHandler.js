import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axiosInstance) => {
  return class extends Component {
    state = {
      errorMessage: null,
    };
    requestInterceptor = null;
    responseInterceptor = null;

    componentDidMount() {
      this.requestInterceptor = axiosInstance.interceptors.request.use(
        (req) => {
          this.setState({
            errorMessage: null,
          });
          return req;
        }
      );
      this.responseInterceptor = axiosInstance.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({
            errorMessage: error.message,
          });
        }
      );
    }

    componentWillUnmount() {
      axiosInstance.interceptors.request.eject(this.requestInterceptor);
      axiosInstance.interceptors.response.eject(this.responseInterceptor);
    }

    errorModalHandler = () => {
      this.setState({
        errorMessage: null,
      });
    };

    render() {
      return (
        <Aux>
          <Modal
            displayModal={this.state.errorMessage}
            closeModal={this.errorModalHandler}
          >
            {this.state.errorMessage}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
