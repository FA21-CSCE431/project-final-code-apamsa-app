import React, {Fragment, useState} from "react";
import TabBar from "./tabBar";
import { Button, Card, CardHeader, CardMedia, Avatar, CardActions, CardContent, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../objects/user/userSlice";

const ProfilePage = () => {
  const { name, email, img_url, is_admin } = {
    name: useSelector((state) => state.user.name),
    email: useSelector((state) => state.user.email),
    img_url: useSelector((state) => state.user.imgURL),
    is_admin: useSelector((state) => state.user.admin)
  };

  var admin_status = (is_admin ? "Y" : "N");

  const [cnt, setCnt] = useState(0);

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
        </Card>
      )}

      {/* {is_admin && (
        <Card>
          <CardActions>
            <Button variant="contained" onClick={() => setCnt(cnt + 1)}>
              + Number of times won
            </Button>      
            <Button variant="contained" onClick={() => setCnt(cnt - 1)}>
              - Number of times won
            </Button>   
          </CardActions>
        </Card>   
      )} */}
    </div>
  );
};

export default ProfilePage;
