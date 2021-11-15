import React from "react";
import TabBar from "./tabBar";
import Calendar from "./calendar";
import { Card } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const AboutPage = () => {
  return (
    <div>
      <header>
        <TabBar tabValue={3} />
      </header>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            WHO WE ARE
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We are the Asian Pacific American Medical Student Association (APAMSA) a national organization of medical and pre-medical students committed to addressing the unique health challenges of Asian and Pacific Islander American (APIA) communities. 
            APAMSA serves as a forum for student leaders to engage these health issues and develop initiatives and projects addressing those needs. 
            The local, regional, and national activities of APAMSA aim to promote the health of the APIA community and help healthcare workers understand how to care for APIA patients in a culturally sensitive manner. 
            Finally, APAMSA provides an important venue for medical students to meet, exchange experiences, and develop personally and professionally through leadership and service.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
