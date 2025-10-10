import React, { useEffect } from "react";

const Gallery: React.FC = () => {
  useEffect(() => {
    // Clone images for seamless scroll animation
    const rows = document.querySelectorAll<HTMLDivElement>(".row");
    rows.forEach((row) => {
      const images = Array.from(row.querySelectorAll<HTMLImageElement>("img"));
      images.forEach((img) => {
        const clone = img.cloneNode(true) as HTMLImageElement;
        row.appendChild(clone);
      });
    });

    // Video controls
    const video = document.getElementById(
      "aftermovie-video"
    ) as HTMLVideoElement | null;
    const soundToggle = document.getElementById(
      "sound-toggle"
    ) as HTMLButtonElement | null;
    const iconMuted = document.getElementById("icon-muted");
    const iconUnmuted = document.getElementById("icon-unmuted");
    const videoContainer = document.querySelector(".video-container");

    let soundLocked = false;

    const updateIcons = (isMuted: boolean) => {
      if (iconMuted && iconUnmuted) {
        if (isMuted) {
          iconMuted.classList.remove("hidden");
          iconUnmuted.classList.add("hidden");
        } else {
          iconMuted.classList.add("hidden");
          iconUnmuted.classList.remove("hidden");
        }
      }
    };

    const handleClick = () => {
      if (!video) return;
      const isMuted = video.muted;
      video.muted = !isMuted;
      soundLocked = true;
      updateIcons(video.muted);
    };

    const handleEnter = () => {
      if (!video) return;
      video.play();
      if (!soundLocked) {
        video.muted = true;
        updateIcons(false);
      }
    };

    const handleLeave = () => {
      if (!video) return;
      video.pause();
      if (!soundLocked) {
        video.muted = true;
        updateIcons(true);
      }
    };

    soundToggle?.addEventListener("click", handleClick);
    videoContainer?.addEventListener("mouseenter", handleEnter);
    videoContainer?.addEventListener("mouseleave", handleLeave);

    return () => {
      soundToggle?.removeEventListener("click", handleClick);
      videoContainer?.removeEventListener("mouseenter", handleEnter);
      videoContainer?.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div className="relative w-screen min-h-screen overflow-hidden font-inter bg-[#0a0a0a]">
      {/* Background Gallery */}
      <div className="background-gallery absolute inset-0 flex flex-col gap-[1vh] z-[1]">
        {/* Row 1 */}
        <div className="row flex flex-nowrap h-[33vh] sm:h-[30vh] md:h-[33vh] animate-moveLeft">
          <img
            src="/Images/urja.jpeg"
            alt="Fest photo 1"
            className="gallery-img"
          />
          <img
            src="/Images/urjotsav.jpeg"
            alt="Fest photo 2"
            className="gallery-img"
          />
          <img
            src="/Images/urja.jpeg"
            alt="Fest photo 3"
            className="gallery-img"
          />
          <img
            src="/Images/energia1.png"
            alt="Fest photo 4"
            className="gallery-img"
          />
          <img
            src="/Images/e4.png"
            alt="Fest photo 5"
            className="gallery-img"
          />
        </div>

        {/* Row 2 */}
        <div className="row flex flex-nowrap h-[33vh] sm:h-[30vh] md:h-[33vh] animate-moveRight">
          <img
            src="/Images/urjotsav.jpeg"
            alt="Fest photo 6"
            className="gallery-img"
          />
          <img
            src="/Images/Screenshot 2025-10-07 at 23.23.50.png"
            alt="Fest photo 7"
            className="gallery-img"
          />
          <img
            src="/Images/Screenshot 2025-10-07 at 23.26.02.png"
            alt="Fest photo 8"
            className="gallery-img"
          />
          <img
            src="/Images/Screenshot 2025-10-07 at 23.28.07.png"
            alt="Fest photo 9"
            className="gallery-img"
          />
          <img
            src="/Images/energia1.png"
            alt="Fest photo 10"
            className="gallery-img"
          />
        </div>

        {/* Row 3 */}
        <div className="row flex flex-nowrap h-[33vh] sm:h-[30vh] md:h-[33vh] animate-moveLeft">
          <img
            src="/Images/urjotsav.jpeg"
            alt="Fest photo 11"
            className="gallery-img"
          />
          <img
            src="/Images/e3.png"
            alt="Fest photo 12"
            className="gallery-img"
          />
          <img
            src="/Images/Arpan.png"
            alt="Fest photo 13"
            className="gallery-img"
          />
          <img
            src="/Images/cul.png"
            alt="Fest photo 14"
            className="gallery-img"
          />
          <img
            src="/Images/ener.png"
            alt="Fest photo 15"
            className="gallery-img"
          />
        </div>
      </div>

      {/* Video Container */}
      <div className="video-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[85%] md:w-[70%] lg:w-[60%] max-w-[750px] aspect-video z-10 rounded-xl overflow-hidden border border-white/20 bg-black shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
        <video
          id="aftermovie-video"
          src="/Images/Kaltarang.mp4"
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-full object-cover"
        ></video>

        {/* Sound Toggle */}
        <button
          id="sound-toggle"
          aria-label="Toggle sound"
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-black/50 border border-white/30 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white transition-colors duration-200 hover:bg-black/70 z-20"
        >
          {/* Muted Icon */}
          <svg
            id="icon-muted"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>

          {/* Unmuted Icon */}
          <svg
            id="icon-unmuted"
            className="hidden"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Gallery;
