import React, { useState, useEffect } from "react";
import "../styles/explore.css";

const Explore = () => {
  const [events, setEvents] = useState([]); // State to hold the events
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(""); // State to handle errors

  useEffect(() => {
    const fetchLatestEvents = async () => {
      try {
        // Fetch latest events from the public API endpoint
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
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        setError(error.message);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchLatestEvents();
  }, []); // Empty dependency array means this effect runs only once, on component mount

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  return (
    <div className="explore">
      <h2 className="explore-title">Events</h2>
      <div className="explore-grid">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <img
              src={event.eventImage} // Assuming eventImage holds the URL to the event image
              alt={event.name}
              className="event-img"
            />
            <div className="event-info">
              <h3>{event.name}</h3>
              <p>{new Date(event.date).toLocaleDateString()}</p> {/* Display formatted date */}
              <p>{event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
