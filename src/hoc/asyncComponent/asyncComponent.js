import React, { Component } from "react";

const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      loadedComponent: null,
    };

    componentDidMount() {
      importComponent().then((component) => {
        this.setState({
          loadedComponent: component.default,
        });
      });
    }

    render() {
      const C = this.state.loadedComponent;
      return C ? <C {...this.props}></C> : null;
    }
  };
};

export default asyncComponent;
