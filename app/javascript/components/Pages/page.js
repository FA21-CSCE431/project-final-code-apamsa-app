import React from "react";
import TabBar from "./tabBar";
import Footer from "./footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./homePage";
import BlogPage from "./blogPage";
import EventsPage from "./eventsPage";
import AboutPage from "./aboutPage";
import ProfilePage from "./profilePage";

const Page = () => {
  return (
    <div>
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
        </Switch>
      </Router>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Page;
