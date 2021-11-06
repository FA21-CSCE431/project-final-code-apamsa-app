import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./Tabs/homePage";
import BlogPage from "./Tabs/blogPage";
import EventsPage from "./Tabs/eventsPage";
import AboutPage from "./Tabs/aboutPage";
import ProfilePage from "./Tabs/profilePage";
import Footer from "./Tabs/footer";
import HeadImage from '../../assets/images/apamsa2.png'


const App = () => {
  return (
    <div>
      <div style={{width: '100%', display: 'flex', margin: '0 !important'}}>
        <img src={HeadImage} style={{width: '100%', display: 'flex'}} />
      </div>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}/>
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
