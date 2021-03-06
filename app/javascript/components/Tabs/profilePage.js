import React, {Fragment, useState, useEffect} from "react";
import TabBar from "./tabBar";
import { Button, Card, CardHeader, CardMedia, Avatar, CardActions, CardContent, Typography, Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../objects/user/userSlice";
import axios from 'axios'

const ProfilePage = () => {
  const { name, email, img_url, is_admin, google_id, prizes_won } = {
    name: useSelector((state) => state.user.name),
    email: useSelector((state) => state.user.email),
    img_url: useSelector((state) => state.user.imgURL),
    is_admin: useSelector((state) => state.user.admin),
    google_id: useSelector((state) => state.user.googleID),
    prizes_won: useSelector((state) => state.user.prizesWon),
  };

  var admin_status = (is_admin ? "Y" : "N");
  var num_prizes = ((prizes_won == null) ? 0 : parseInt(prizes_won));

  const [rsvps, setRsvps] = useState([]);

  useEffect(() => {
    axios
      .get(`api/v1/users/${google_id}`)
      .then(resp => {
        setRsvps(resp.data.included);
      })
      .catch(resp => console.log(resp))
  }, [rsvps.length])

  const list = rsvps.map((item, index) => {
    const { event_name, event_date } = item.attributes;
    return (
      <li key={index}>{event_name} @ {event_date}</li>
    )
  })

  return (
    <div>
      <header>
        <TabBar tabValue={4} />
      </header>
      {name !== ""  && (
        <Card>
          <CardHeader 
            avatar={<Avatar src={img_url} />} 
            title={name} 
          />
          <CardContent>
            <Typography>
              Email: {email}
              <br/>
              Admin Staus: {admin_status}
            </Typography>
          </CardContent>
          <CardContent>
              Number of Prizes Won: <Chip label={num_prizes} variant="outlined" />
          </CardContent>
          <CardContent>
            My Rsvps:
            <ul>
              {list}
            </ul>
          </CardContent>
        </Card>
      )}
      {name === "" && (
        <Card>
          <CardHeader
            title="Please sign in to see your profile information"
          />
        </Card>
      )}
    </div>
  );
};

export default ProfilePage;
