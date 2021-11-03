import React from "react";
import TabBar from "./tabBar";
import UpcomingEvents from "../HomePage/upcomingEvents";
import NewCalendar from "./testCalendar";



const HomePage = () => {

  return (
    <div>
      <header>
        <TabBar tabValue={0} />
      </header>
      
      <UpcomingEvents />
    </div>
  );
};

export default HomePage;
