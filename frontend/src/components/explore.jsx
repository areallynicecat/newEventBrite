import React, { useState, useEffect } from "react";
import "../styles/explore.css";

const Explore = () => {
  // states
  const [events, setEvents] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 

  useEffect(() => {
    const fetchLatestEvents = async () => {
      try {
        // fetching latest events to show on explore (public)
        const response = await fetch("http://localhost:3005/latest-events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }

        const data = await response.json();
        setEvents(data.events);
        setLoading(false); 
      } catch (error) {
        setError(error.message);
        setLoading(false); 
      }
    };

    fetchLatestEvents();
  }, []); // loading on moutn only

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className="explore">
      <h2 className="explore-title">Events</h2>
      <div className="explore-grid">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <img
              src={event.eventImage} 
              alt={event.name}
              className="event-img"
            />
            <div className="event-info">
              <h3>{event.name}</h3>
              <p>{new Date(event.date).toLocaleDateString()}</p> 
              <p>{event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
