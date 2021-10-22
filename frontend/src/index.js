import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import LoginPage from "./components/loginPage";
import Page from "./components/page";

import store from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/home">
          <Page />
        </Route>
        <Route path="/">
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
