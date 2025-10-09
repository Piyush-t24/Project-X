import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function SauhardyaPage() {
  const quote = "Together, we rise — one act of kindness at a time.";
  const letters = quote.split("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const handleCanPlay = () => setVideoLoaded(true);
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("canplay", handleCanPlay);
      if (videoElement.readyState >= 3) handleCanPlay();
    }
    return () => {
      if (videoElement) videoElement.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  return (
    <div className="relative min-h-[250vh] sm:min-h-[280vh] lg:min-h-[300vh]">
      <Navbar />

      {/* ===== LAYER 1: PERSISTENT BACKGROUND ===== */}
      <div className="fixed inset-0 w-full h-full bg-black overflow-hidden">
        <video
          src="/assets/urja.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* ===== LAYER 2: CONTENT + OVERLAY VIDEO ===== */}
      <div className="relative z-10">
        <section
          className="relative h-screen w-full flex items-center justify-center px-6 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
          }}
        >
          {/* Stone overlay video */}
          <video
            ref={videoRef}
            src="/assets/souhardhyastone.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{
              mixBlendMode: "screen",
              filter: "contrast(120%) brightness(105%)",
              opacity: videoLoaded ? 0.55 : 0,
              transition: "opacity 1.5s ease-in-out",
            }}
          />

          {/* Main Title Section */}
          <div className="relative z-10 text-center max-w-5xl">
            <motion.h1
              className="text-7xl sm:text-8xl lg:text-9xl font-extrabold tracking-wider text-white mb-6 drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              SAUHARDYA'25
            </motion.h1>

            <motion.p
              className="text-white/85 text-lg sm:text-xl mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              A Social Initiative Festival by RGIPT
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              {["Events", "Schedule", "Gallery"].map((text, i) => (
                <Link
                  key={i}
                  to={`/sauhardya/${text.toLowerCase()}`}
                  className="relative overflow-hidden px-8 py-3 rounded-full font-semibold text-white text-lg border border-white/30 bg-white/10 shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
                >
                  {text}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Scroll Down Arrow */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <div className="animate-bounce-slow text-white/50 hover:text-white transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-14 h-14"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </section>

        {/* ===== ABOUT SECTION ===== */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6 space-y-10">
          <motion.div
            className="max-w-5xl bg-white/10 border border-white/20 backdrop-blur-lg rounded-3xl p-10 shadow-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all duration-500"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">About Sauhardhya</h2>
            <p className="text-white/85 leading-relaxed text-lg sm:text-xl">
              <span className="font-semibold text-white">Sauhardhya</span> is a two-day social fest
              organized by the{" "}
              <span className="text-white font-semibold">
                Social Services Council, Arpan, RGIPT
              </span>
              . It celebrates empathy, inclusivity, and collective well-being through impactful
              social initiatives and community engagement.
            </p>
          </motion.div>

          <motion.div
            className="max-w-5xl bg-gradient-to-br from-green-500/30 via-emerald-400/20 to-green-700/25 border border-white/20 backdrop-blur-xl rounded-3xl p-10 shadow-[0_0_50px_rgba(0,255,150,0.2)] hover:shadow-[0_0_60px_rgba(0,255,150,0.5)] transition-all duration-500"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 drop-shadow-[0_0_10px_rgba(0,255,150,0.7)]">
              About Arpan
            </h2>
            <p className="text-white/85 text-lg sm:text-xl leading-relaxed">
              <span className="font-semibold text-green-300">Arpan</span> drives various initiatives —
              from educational outreach to environmental care and community welfare — embodying the
              spirit of service, unity, and compassion.
            </p>
          </motion.div>
        </section>

        {/* ===== ANIMATED QUOTE SECTION ===== */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6 space-y-8">
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-white"
            initial="hidden"
            animate="visible"
          >
            {letters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.2 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            className="text-white/70 text-lg max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            Sauhardhya is more than a fest — it’s a movement to connect hearts, empower change, and
            celebrate humanity.
          </motion.p>
        </section>
      </div>

      <Footer brand="Sauhardya" />
    </div>
  );
}
