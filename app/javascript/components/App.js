import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./Tabs/homePage";
import BlogPage from "./Tabs/blogPage";
import EventsPage from "./Tabs/eventsPage";
import AboutPage from "./Tabs/aboutPage";
import ProfilePage from "./Tabs/profilePage";
import Footer from "./Tabs/footer";
import ShowUsers from "./Tabs/showUserPage";
import HelpPage from "./Tabs/helpPage";
import HeadImage from "../../assets/images/apamsa2.png";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, setAdmin, setPrizesWon, setUserId } from "./objects/user/userSlice";
import { 
  Card, 
  CardHeader, 
  Avatar, 
  Button,
  Dialog,
  DialogActions,
  Alert,
  DialogTitle,
  IconButton 
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"

const App = () => {
  const [profile, setProfile] = useState({});
  const [openGoogleFailure, setOpenGoogleFailure] = useState(false);

  const { name, email, img_url, is_admin } = {
    name: useSelector((state) => state.user.name),
    email: useSelector((state) => state.user.email),
    img_url: useSelector((state) => state.user.imgURL),
    google_id: useSelector((state) => state.user.googleID),
    is_admin: useSelector((state) => state.user.admin),
  };
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(logout());
  }

  const failureResponse = (response) => {
    setOpenGoogleFailure(true);
  }

  const responseGoogle = (response) => {
    dispatch(
      login({
        name: response.profileObj.name,
        googleID: response.profileObj.googleId,
        email: response.profileObj.email,
        imgURL: response.profileObj.imageUrl,
        admin: (response.profileObj.email === "charmi@tamu.edu" ? true : false),
      })
    );

    setProfile(
      Object.assign(profile, profile, {
        ["google_id"]: response.profileObj.googleId,
        ["name"]: response.profileObj.name,
        ["img_url"]: response.profileObj.imageUrl,
        ["email"]: response.profileObj.email,
        ["is_admin"]: (response.profileObj.email === "charmi@tamu.edu" ? true : false)
      })
    );

    axios
      .post("/api/v1/users", profile);

    axios
      .get(`/api/v1/users/${response.profileObj.googleId}`)
      .then((resp) => {
        dispatch(setAdmin(resp.data.data.attributes.is_admin));
        dispatch(setUserId(resp.data.data.id));
        dispatch(setPrizesWon(resp.data.data.attributes.prizes_won));
      })
  };

  return (
    <div>
      <div style={{ width: "100%", display: "flex", margin: "0 !important" }}>
        <img src={HeadImage} style={{ width: "100%", display: "flex" }} />
      </div>
        <Fragment>
          {name === "" ? (
            <GoogleLogin
              clientId="134632541809-skppjomtgttr7vkb08lmoki4p15nv9d5.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={failureResponse}
              cookiePolicy={"single_host_origin"}
            />
          ) : (
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
        </Fragment>
        <Fragment>
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
              {name !== "" && (
                <Route path="/profile">
                  <ProfilePage />
                </Route>
              )}
              <Route exact path="/help">
                <HelpPage />
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
        </Fragment>
        <Dialog
          open={openGoogleFailure}
          onClose={() => {
            setOpenGoogleFailure(false);
          }}
        >
          <DialogTitle id="alert-dialog-title">
            <Alert severity="error">Uh oh something went wrong with signing in!</Alert>
          </DialogTitle>
          <DialogActions>
            <IconButton
              onClick={() => {
                setOpenGoogleFailure(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </Dialog>
    </div>
  );
};

export default App;
