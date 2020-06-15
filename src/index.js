import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import store from "./store/store";
import * as serviceWorker from "./serviceWorker";
import initFirebase from "./firebase";

initFirebase();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
