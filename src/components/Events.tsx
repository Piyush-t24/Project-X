import React from "react";

const Events: React.FC = () => {
  const events = [
    { title: "Tech Showdown", image: "/Images/urjotsav.jpeg" },
    { title: "Hackathon", image: "/Images/urjotsav.jpeg" },
    { title: "Robo Race", image: "/Images/urjotsav.jpeg" },
    { title: "Tech Quiz", image: "/Images/urjotsav.jpeg" },
    { title: "AI Challenge", image: "/Images/urjotsav.jpeg" },
    { title: "Code Combat", image: "/Images/urjotsav.jpeg" },
    { title: "InnovateX", image: "/Images/urjotsav.jpeg" },
    { title: "Drone Battle", image: "/Images/urjotsav.jpeg" },
    { title: "Circuit Mania", image: "/Images/urjotsav.jpeg" },
    { title: "Design Sprint", image: "/Images/urjotsav.jpeg" },
    { title: "Game Dev Jam", image: "/Images/urjotsav.jpeg" },
    { title: "Bot Maze", image: "/Images/urjotsav.jpeg" },
    { title: "Line Follower", image: "/Images/urjotsav.jpeg" },
    { title: "Idea Pitch", image: "/Images/urjotsav.jpeg" },
    { title: "Tech Debate", image: "/Images/urjotsav.jpeg" },
    { title: "Gaming Arena", image: "/Images/urjotsav.jpeg" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8 py-8">
      {events.map((event, index) => (
        <div
          key={`${event.title}-${index}`} // Using a better key
          className="relative group rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
        >
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-auto object-cover rounded-2xl  group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
};

export default Events;
