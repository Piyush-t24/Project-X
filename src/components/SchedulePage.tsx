import React, { useState } from "react";
import { motion } from "framer-motion";

interface Event {
  time: string;
  location: string;
  title: string;
  img?: string;
}

const day1Events: Event[] = [
  {
    time: "9:00 AM - 10:30 AM",
    location: "Vivekanand Sabhagar",
    title: "Solo Dance (Round 1)",
    img: "/Images/energia1.png",
  },
  {
    time: "11:00 AM - 12:30 PM",
    location: "Vivekanand Sabhagar",
    title: "Mono Act",
  },
  {
    time: "12:30 PM - 2:00 PM",
    location: "AB1 LR1",
    title: "Debate",
    img: "/Images/e2.png",
  },
  {
    time: "1:00 PM - 3:00 PM",
    location: "Vivekanand Sabhagar",
    title: "Solo Singing (Round 1)",
    img: "/Images/Kal.png",
  },
  {
    time: "1:00 PM - 2:30 PM",
    location: "Pronight Ground",
    title: "Group Dance (Round 1)",
    img: "/Images/Arpan.png",
  },
  {
    time: "3:00 PM - 4:30 PM",
    location: "RG Plaza",
    title: "Street Dance",
    img: "/Images/cul.png",
  },
  {
    time: "3:30 PM - 5:00 PM",
    location: "Vivekanand Sabhagar",
    title: "Mime Act",
    img: "/Images/ener.png",
  },
  {
    time: "5:00 PM - 6:00 PM",
    location: "Pronite Ground",
    title: "OPENING CEREMONY",
  },
  {
    time: "6:00 PM - 8:00 PM",
    location: "Pronite Ground",
    title: "Battle of Bands",
    img: "/Images/e2.png",
  },
  {
    time: "9:00 PM - 12:00 AM",
    location: "Pronite Ground",
    title: "Pronight 1",
  },
];

export const SchedulePage: React.FC = () => {
  const [activeDay, setActiveDay] = useState<number>(1);

  const renderEvent = (event: Event, index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="mb-12 relative w-full"
    >
      {/* Desktop Timeline */}
      <div className="hidden md:flex justify-between items-center">
        <div
          className={`w-[40%] flex flex-col ${
            index % 2 === 0
              ? "items-end pr-4 text-right"
              : "items-start pl-4 text-left"
          }`}
        >
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10 shadow-xl">
            <p className="text-sm md:text-base font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {event.time}
            </p>
            <p className="text-xs md:text-base text-gray-200 mb-2">
              {event.location}
            </p>
            {event.img && (
              <img
                className="max-w-[280px] rounded-lg border border-white/20 shadow-lg"
                src={event.img}
                alt={event.title}
              />
            )}
          </div>
        </div>
        <div className="w-[20%] relative flex flex-col items-center text-center">
          <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-xl z-10 border-2 border-white/20"></div>
          <div className="backdrop-blur-sm bg-white/5 rounded-xl px-4 py-2 border border-white/10 shadow-xl">
            <p
              className={`absolute top-1/2 -translate-y-1/2 ${
                index % 2 === 0 ? "left-full ml-4" : "right-full mr-4"
              } text-base md:text-xl font-semibold whitespace-nowrap z-20 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent`}
            >
              {event.title}
            </p>
          </div>
        </div>
        <div className="w-[40%]"></div>
      </div>

      {/* Mobile Timeline */}
      <div className="flex md:hidden items-start mb-10">
        <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-xl mr-4 mt-1 border-2 border-white/20"></div>
        <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10 shadow-xl flex-1">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {event.title}
            </p>
            <p className="text-sm text-yellow-400 font-bold">{event.time}</p>
            <p className="text-xs text-gray-200">{event.location}</p>
            {event.img && (
              <img
                className="w-full max-w-[300px] rounded-lg border border-white/20 shadow-lg"
                src={event.img}
                alt={event.title}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full text-white min-h-screen">
      {/* Hero Section */}
      <div
        className="h-[50vh] md:h-[70vh] w-full flex flex-col items-center justify-center text-center relative bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/bgImg2-BYuyjSYd.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-8xl font-bold drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] px-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Schedule
          </h1>
        </div>
        <div className="absolute hidden md:flex bottom-10 flex-col items-center animate-bounce">
          <p className="text-lg md:text-xl text-white">Scroll down</p>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            className="text-3xl text-white mt-2"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
          </svg>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      </div>

      {/* Day Buttons */}
      <div className="w-full pt-8 flex flex-wrap justify-center gap-4 px-4 py-6">
        <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-white/10 shadow-xl">
          {[1, 2, 3].map((day) => (
            <button
              key={day}
              className={`px-6 py-3 mx-2 rounded-full font-semibold text-sm sm:text-base border transition-all duration-300 ${
                activeDay === day
                  ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black border-none shadow-lg"
                  : "bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
              }`}
              onClick={() => setActiveDay(day)}
            >
              Day {day}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Events */}
      <div className="w-full px-4 py-10 pb-32 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Day {activeDay} Schedule
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-yellow-400 to-orange-400 hidden md:block rounded-full shadow-lg"></div>
            {activeDay === 1 && day1Events.map(renderEvent)}
          </div>
        </div>
      </div>
    </div>
  );
};
