import { Button, CardContent, CardHeader, Paper, Typography } from "@mui/material";
import React, { Fragment } from "react";
import TabBar from "./tabBar";

const HelpPage = () => {
  const title1 = "Welcome to the APAMSA help page";
  const subtitle1 = "Here you will find information about the pages and the user heirarchy.";
 
  const userHome = "Home page: Users can see a calendar and a list of upcoming events.";
  const userBlog = "Blog: Users can view posts created by admins and can leave comments if enabled by admins.";
  const userEvent = "Event: Users can RSVP for events.";
  const userAbout = "About Us: Users can view a page with information about the club.";
  const userProf = "My Profile: Users can view their profile that displays their information.";
  const userPrivs = [userHome, userBlog, userEvent, userAbout, userProf];

  const adminHome = "Home:  Admins can see a calendar and a list of upcoming events.";
  const adminBlog = "Blog: Admins can view posts and can leave comments if enabled. They can also create blog posts by filling out a title, link, and description. They can choose to enable or disable comments on these posts.";
  const adminEvent = "Event: Admins can RSVP for events. They can also create events for users by inputting a title, date, description, and start and end time. They can also view a list of users that have RSVP’d for each event.";
  const adminAbout = "About Us: Admins can view a page with information about the club.";
  const adminProf = "My Profile: Admins can view their profile that displays their information.";
  const adminUser = "User List: Admins can view a users list page that displays all users that login to the application. They can then choose whether they want to grant or revoke admin privileges to that user.";
  const adminPrivs = [adminHome, adminBlog, adminEvent, adminAbout, adminProf, adminUser];

  const user_list = userPrivs.map( item => {
    return (<li key={item}>{item}</li>)
  })

  const admin_list = adminPrivs.map( item => {
    return (<li key={item}>{item}</li>)
  })

  return (
    <Fragment>
      <header>
        <TabBar tabValue={5} />
      </header>
      <Paper>
        <CardHeader title={title1} subheader={subtitle1} />
        <CardHeader title="Admin" subheader="An 'Admin' is defined as those using the app who have create, update, and delete access to the data with many other privileges" />
        <CardContent>
          <Typography paragraph>
            {admin_list}
          </Typography>
        </CardContent>
        <CardHeader title="User" subheader="A 'User' is defined as those using the app who have viewing access to the data with few other privileges" />
        <CardContent>
          <Typography paragraph>
            {user_list}
          </Typography>
        </CardContent>
        
      </Paper>
    </Fragment>
  );
}

export default HelpPage