import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./Tabs/homePage";
import BlogPage from "./Tabs/blogPage";
import EventsPage from "./Tabs/eventsPage";
import AboutPage from "./Tabs/aboutPage";
import ProfilePage from "./Tabs/profilePage";
import Footer from "./Tabs/footer";
import ShowUsers from "./Tabs/showUserPage";
import HeadImage from "../../assets/images/apamsa2.png";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, setAdmin } from "./objects/user/userSlice";
import { Card, CardHeader, Avatar, Button } from "@mui/material";

const App = () => {
  const [profile, setProfile] = useState({});
  const [get_admin, setGetAdmin] = useState(false);

  const { name, email, img_url, is_admin } = {
    name: useSelector((state) => state.user.name),
    email: useSelector((state) => state.user.email),
    img_url: useSelector((state) => state.user.imgURL),
    user_id: useSelector((state) => state.user.userID),
    is_admin: useSelector((state) => state.user.admin),
  };
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(logout());
  }

  const responseGoogle = (response) => {
    console.log(response.profileObj);

    dispatch(
      login({
        name: response.profileObj.name,
        userID: response.profileObj.googleId,
        email: response.profileObj.email,
        imgURL: response.profileObj.imageUrl,
        admin: (response.profileObj.email === "aggie_deer_slayer@tamu.edu" ? true : false),
      })
    );

    setProfile(
      Object.assign(profile, profile, {
        ["user_id"]: response.profileObj.googleId,
        ["name"]: response.profileObj.name,
        ["img_url"]: response.profileObj.imageUrl,
        ["email"]: response.profileObj.email,
        ["is_admin"]: (response.profileObj.email === "aggie_deer_slayer@tamu.edu" ? true : false)
      })
    );

    console.log(profile);

    axios
      .post("/api/v1/users", profile)
      .then((resp) => console.log(resp))
      .catch((resp) => console.log(resp));


    // axios
    //   .post("/api/v1/users", {
    //     ["user_id"]: response.profileObj.googleId,
    //     ["name"]: response.profileObj.name,
    //     ["img_url"]: response.profileObj.imageUrl,
    //     ["email"]: response.profileObj.email,
    //     ["is_admin"]: (response.profileObj.email === "aggie_deer_slayer@tamu.edu" ? true : false),
    //   })
    //   .then((resp) => console.log(resp))
    //   .catch((resp) => console.log(resp));

    const url = `/api/v1/users/${response.profileObj.googleId}`

    axios
      .get(url)
      .then((resp) => {
        console.log("Get admin data: ", resp.data.data.attributes.is_admin);
        dispatch(setAdmin(resp.data.data.attributes.is_admin));
      })
      .catch((resp) => console.log(resp));
  
  };

  console.log("App:", is_admin);

  return (
    <div>
      <div style={{ width: "100%", display: "flex", margin: "0 !important" }}>
        <img src={HeadImage} style={{ width: "100%", display: "flex" }} />
      </div>
      {name == "" && (
        <GoogleLogin
          clientId="134632541809-skppjomtgttr7vkb08lmoki4p15nv9d5.apps.googleusercontent.com"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      )}
      {name !== ""  && (
        <Card>
          <CardHeader 
            avatar={<Avatar src={img_url} />} 
            title={name} 
            subtitle={email} 
            action={
              <Button variant="contained" onClick={signOut}>
                Sign Out
              </Button>
            }
          />
        </Card>
      )}
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
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
            <ProfilePage profile={profile} />
          </Route>
          {is_admin && (
            <Route path="/users">
              <ShowUsers />
            </Route>
          )}
        </Switch>
      </Router>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
