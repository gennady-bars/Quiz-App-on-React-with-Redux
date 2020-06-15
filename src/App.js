import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import { autoLogin } from "./store/actions/auth";
import createRoutes from "./routes";

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    const { isAuthenticated, isAdmin } = this.props;
    const routes = createRoutes(isAuthenticated, isAdmin);

    return <Layout>{routes}</Layout>;
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
    isAdmin: state.auth.admin,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
