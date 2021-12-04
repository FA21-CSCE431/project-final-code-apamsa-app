import { Button, CardActions, CardContent, CardHeader, IconButton, Paper, Typography } from "@mui/material";
import React, { Fragment } from "react";
import HomePage from "./homePage";
import TabBar from "./tabBar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";

const HelpPage = () => {
  const title1 = "Welcome to the APAMSA help page";
  const subtitle1 = "Here you will find information about the pages and the user heirarchy.";
 
  const userHome = "Home page: Users can see a calendar and a list of upcoming events. \nAccessed by clicking the “HOME” tab";
  const userBlog = "Blog: Users can view posts created by admins and can leave comments if enabled by admins. \nAccessed by clicking the “BLOG” tab";
  const userEvent = "Event: Users can RSVP for events. \nAccessed by clicking the “EVENTS” tab";
  const userAbout = "About Us: Users can view a page with information about the club. \nAccessed by clicking the “ABOUT US” tab";
  const userProf = "My Profile: Users can view their profile that displays their information. \nAccessed by clicking the “MY PROFILE” tab";
  const userPrivs = [userHome, userBlog, userEvent, userAbout, userProf];

  const adminHome = "Home:  Admins can see a calendar and a list of upcoming events. \nAccessed by clicking the “HOME” tab";
  const adminBlog = "Blog: Admins can view posts and can leave comments if enabled. They can also create blog posts by filling out a title, link, and description. They can choose to enable or disable comments on these posts. \nAccessed by clicking the “BLOG” tab \nSyntax for creating an Event:\n\tTitle: Text input that is a description of the event\n\tLink: a full link (with https:// included)\n\tDescription: Text input that is a description of the event\n\tDisable comments: a check box to click. Checked means comments are disabled";
  const adminEvent = "Event: Admins can RSVP for events. They can also create events for users by inputting a title, date, description, and start and end time. They can also view a list of users that have RSVP’d for each event. Accessed by clicking the “EVENTS” tab\nSyntax for creating Blog:\n\tTitle: Text input that is a description of the Blog\n\tDate: Date of the Event input by clicking on a pop up calendar or text input of “mm/dd/yyyy”\n\tDescription: Text input that is a description of the event\n\tStart Time: Text input of start time “hh mm (am/pm)”\n\tEnd Time: Text input of end time “hh mm (am/pm)”\n\t";
  const adminAbout = "About Us: Admins can view a page with information about the club. \nAccessed by clicking the “ABOUT US” tab";
  const adminProf = "My Profile: Admins can view their profile that displays their information. \nAccessed by clicking the “MY PROFILE” tab";
  const adminUser = "User List: Admins can view a users list page that displays all users that login to the application. They can then choose whether they want to grant or revoke admin privileges to that user.\nList of users is accessed by clicking the “USERS LIST” tab\nTo make a user an administrator, an admin can click the “MAKE [name] ADMIN” button under the user’s name on the “USERS LIST” tab\nTo make an administrator a user, an admin can click the “REMOVE ADMIN” button under the admin’s name on the “USERS LIST” tab \n";
  const adminPrivs = [adminHome, adminBlog, adminEvent, adminAbout, adminProf, adminUser];

  const sysOne = "1. Drop the database, this will clear all information from current database:";
  const sysOnel = "heroku pg:reset -a apamsa-app";
  const sysTwo = "2. Recreate the database with nothing in it:";
  const sysTwol = "heroku run rake db:migrate -a apamsa-app";
  const note = "Note: Heroku doesn't allow users to use the rake db:reset, rake db:drop or rake db:create command. They only allow heroku pg:reset and rake db:migrate commands.";
  const sysPrivs = [sysOne, sysOnel, sysTwo, sysTwol, note];

  const user_list = userPrivs.map( item => {
    return (<li key={item}>{item}</li>)
  })

  const admin_list = adminPrivs.map( item => {
    return (<li key={item}>{item}</li>)
  })

  const sys_list = sysPrivs.map( item => {
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
        <CardHeader 
          title="System" 
          subheader="Database commands to run using the Heroku Command Line:" 
          action={<a href="https://devcenter.heroku.com/categories/command-line">Heroku Command Line</a>}
        />
        <CardContent>
          <Typography paragraph>
            {sys_list}
          </Typography>
        </CardContent>
        
      </Paper>
    </Fragment>
  );
}

export default HelpPage