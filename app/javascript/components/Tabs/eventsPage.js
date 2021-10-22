import React from "react";
import TabBar from "./tabBar";
import Events from "../Events/Events"

const EventsPage = () => {
  return (
    <div>
      <header>
        <TabBar tabValue={2} />
      </header>
      <Events/>
    </div>
  );
};

export default EventsPage;
