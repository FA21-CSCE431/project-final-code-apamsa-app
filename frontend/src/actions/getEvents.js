import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../objects/events/eventsSlice";

const getEvents = () => {
  const url = "api/v1/events/index";
  fetch(url)
    .then((data) => {
      if (data.ok) {
        return data.json();
      }
      throw new Error("Network error.");
    })
    .then((data) => {
      data.forEach((event) => {
        useDispatch(addEvent(event));
      });
    });
};

export default getEvents;
