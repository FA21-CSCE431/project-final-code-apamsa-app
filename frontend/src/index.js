import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import LoginPage from "./components/loginPage";
import HomePage from "./components/homePage";
import BlogPage from "./components/blogPage";
import EventsPage from "./components/eventsPage";
import AboutPage from "./components/aboutPage";
import ProfilePage from "./components/profilePage";

import store from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/blog">
          <BlogPage />
        </Route>
        <Route path="/events">
          <EventsPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/profile">
          <ProfilePage />
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
