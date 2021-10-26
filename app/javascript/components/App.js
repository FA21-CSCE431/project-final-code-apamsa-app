import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./Pages/homePage";
import BlogPage from "./Pages/blogPage";
import EventsPage from "./Pages/eventsPage";
import AboutPage from "./Pages/aboutPage";
import ProfilePage from "./Pages/profilePage";
import Footer from "./Pages/footer";


const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}/>
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

export default App;
