import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Что-то пошло не так. Перезагрузите страницу</h1>
        </div>
      );
    }

    return this.props.children;
  }
}
