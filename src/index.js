import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {Provider}from "react-redux"
import {createStore,applyMiddleware}from "redux"
import root from './store/rootReduser'
import thunk from "redux-thunk";

const store = createStore(root,applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
