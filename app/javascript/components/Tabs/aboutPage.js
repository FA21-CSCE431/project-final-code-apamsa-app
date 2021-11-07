import React from "react";
import TabBar from "./tabBar";
import Calendar from "./calendar";
import { Card } from "@mui/material";

const AboutPage = () => {
  return (
    <div>
      <header>
        <TabBar tabValue={3} />
      </header>
      <Card>
        <Calendar />
      </Card>
    </div>
  );
};

export default AboutPage;
