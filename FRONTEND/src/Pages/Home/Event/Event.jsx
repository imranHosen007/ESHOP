import React from "react";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";

const Event = () => {
  const { allEvent } = useSelector(store => store.event);

  return (
    <div>
      <div className="section">
        <h1 className="heading">Popular Event</h1>
        <div className="grid w-full">
          {allEvent && allEvent.length !== 0 ? (
            <div>
              <EventCard data={allEvent && allEvent[0]} active={true} />
            </div>
          ) : (
            <h4 className="flex justify-center py-10 font-bold text-2xl">
              {" "}
              No Events have!
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Event;
