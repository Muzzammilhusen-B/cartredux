import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { store } from "./store";
import { product } from "./localStorage";
// import { saveToLocalStorage } from "./localStorage";
import ErrorBoundary from "./ErrorBoundary";

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App product={product} />
    </ErrorBoundary>{" "}
  </Provider>,
  document.querySelector("#root")
);
