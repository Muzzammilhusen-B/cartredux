import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { store } from "./store";
import { product } from "./localStorage";
import { saveToLocalStorage } from "./localStorage";
import ErrorBoundary from "./ErrorBoundary";

store.subscribe(() => {
  saveToLocalStorage({
    items: store.getState().items,
    addedItmes: store.getState().addedItmes,
    count: store.getState().count,
    total: store.getState().total,
  });
});

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App product={product} />
    </ErrorBoundary>{" "}
  </Provider>,
  document.querySelector("#root")
);
