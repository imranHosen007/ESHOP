import React from "react";
import EventCard from "../Home/Event/EventCard";
import { useSelector } from "react-redux";

const EventPage = () => {
  const { allEvent } = useSelector((store) => store.event);

  return (
    <div>
      {allEvent && allEvent.length !== 0 ? (
        <div className="section">
          {allEvent.slice(0, 3).map((item, index) => {
            return <EventCard data={item} active={true} />;
          })}
        </div>
      ) : (
        <h4 className="flex justify-center py-10 font-bold text-2xl">
          {" "}
          No Events have!
        </h4>
      )}
    </div>
  );
};

export default EventPage;
