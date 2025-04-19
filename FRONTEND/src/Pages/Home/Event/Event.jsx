import React from "react";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";

const Event = () => {
  const { allEvent, isLoading } = useSelector((store) => store.event);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }
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
