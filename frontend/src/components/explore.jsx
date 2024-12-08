import React from "react";
import "../styles/explore.css";

const Explore = () => {
  const events = [
    {
      id: 1,
      title: "Comedy Night",
      img: "https://res.cloudinary.com/democratsabroad/image/upload/v1724916974/Comedy_Night_Banner_pr9qab.png", // Replace with actual image URLs
      date: "Every Wednesday",
      location: "Pechs, Karachi",
    },
    {
      id: 2,
      title: "Karachi Mix Plate Tour",
      img: "https://via.placeholder.com/400x200",
      date: "Every Sunday 2024",
      location: "Karachi",
    },
    {
      id: 3,
      title: "Global AI Summit",
      img: "https://via.placeholder.com/400x200",
      date: "Dec 18th",
      location: "Karachi",
    },
    // Add more events as needed
  ];

  return (
    <div className="explore">
      <h2 className="explore-title">Events</h2>
      <div className="explore-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <img src={event.img} alt={event.title} className="event-img" />
            <div className="event-info">
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
