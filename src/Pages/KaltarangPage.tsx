import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Tilt from "react-parallax-tilt";
import React from "react";

// Three.js imports for the background
import { Canvas } from "@react-three/fiber";
// import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { PerspectiveCamera } from "@react-three/drei";
import { CosmicBackground } from "../components/CosmicBackground";

// Video path for the hero section
const stoneVideo = "/Kaltarang/KaltarangStone.mp4";

// Image path for the 'About' section
const kaltarangPhoto = "/Images/Kal.png";

// Swiper.js imports for the carousel
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";

// Image paths for event images
const danceCompetitionImage = "/Images/Kal.png";
const musicFestivalImage = "/Images/Kal.png";
const dramaShowImage = "/Images/Kal.png";
const artExhibitionImage = "/Images/Kal.png";
const grungeTexture = "/Images/Kal.png";

// ==============================================================================
// TYPE DEFINITIONS
// ==============================================================================
interface AnimatedHeadingProps {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}

interface AccordionItemProps {
  question: string;
  answer: string;
}

interface PastEvent {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface FAQ {
  question: string;
  answer: string;
}

// ==============================================================================
// HEADING ANIMATION COMPONENT
// ==============================================================================
const sentence: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      staggerChildren: 0.04,
    },
  },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  as: Tag = "h2",
  ...props
}) => {
  const MotionTag = motion[Tag as keyof typeof motion] as any;
  return (
    <MotionTag
      {...props}
      variants={sentence}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {text.split("").map((char, index) => (
        <motion.span key={char + "-" + index} variants={letter}>
          {char}
        </motion.span>
      ))}
    </MotionTag>
  );
};

// ==============================================================================
// ACCORDION COMPONENT FOR FAQs
// ==============================================================================
const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/20 last:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-5 pointer-events-auto"
      >
        <span
          className="text-lg font-semibold text-white"
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-red-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p
              className="pb-5 text-white/80"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==============================================================================

const pastEvents: PastEvent[] = [
  {
    id: 1,
    title: "Dance Competition",
    description:
      "Rhythmic expressions and cultural performances that captivate audiences.",
    image: danceCompetitionImage,
  },
  {
    id: 2,
    title: "Music Festival",
    description:
      "Melodious performances showcasing diverse musical talents and genres.",
    image: musicFestivalImage,
  },
  {
    id: 3,
    title: "Drama Show",
    description: "Theatrical performances that bring stories to life on stage.",
    image: dramaShowImage,
  },
  {
    id: 4,
    title: "Art Exhibition",
    description: "Visual arts and creative expressions from talented artists.",
    image: artExhibitionImage,
  },
];

const faqs: FAQ[] = [
  {
    question: "What is Kaltarang?",
    answer:
      "Kaltarang is RGIPT's annual cultural festival that celebrates art, music, dance, drama, and creative expressions from students across the nation.",
  },
  {
    question: "When and where will Kaltarang'25 take place?",
    answer:
      "The event will be held at RGIPT Jais Campus. Stay tuned for more details!",
  },
  {
    question: "How can I participate?",
    answer:
      "You can register online through our website. Follow us on social media for updates on registration dates.",
  },
  {
    question: "Are there any entry fees?",
    answer:
      "Entry fees vary for different events. Check our website for specific pricing details.",
  },
];

export function KaltarangPage(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);

  useEffect(() => {
    const handleCanPlay = () => setVideoLoaded(true);
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("canplay", handleCanPlay);
      if (videoElement.readyState >= 3) {
        handleCanPlay();
      }
    }
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("canplay", handleCanPlay);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-black">
      {/* Navbar remains clickable */}
      <div className="relative z-20 pointer-events-auto">
        <Navbar />
      </div>

      {/* ===== BACKGROUND ===== */}
      <div className="fixed inset-0 w-full h-full bg-black overflow-hidden">
        <Canvas className="w-full h-full">
          <PerspectiveCamera makeDefault position={[0, 0, 1.5]} fov={75} />
          <CosmicBackground />
        </Canvas>
      </div>
      {/* <div className="fixed inset-0 w-full h-full bg-black overflow-hidden">
        <Canvas className="w-full h-full pointer-events-none">
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate
            autoRotate
            autoRotateSpeed={0.4}
          />
          <ambientLight intensity={0.1} />
          <directionalLight position={[10, 10, 5]} intensity={0.2} />
          <CosmicBackground />
        </Canvas>
      </div> */}

      {/* ===== SCROLLING CONTENT WRAPPER ===== */}
      <div className="relative z-10 flex-1 pointer-events-none">
        {/* === HERO SECTION === */}
        <section
          className="relative h-screen w-full flex items-center justify-center px-6 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 75%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 75%, transparent 100%)",
          }}
        >
          <video
            ref={videoRef}
            src={stoneVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-contain"
            style={{
              mixBlendMode: "screen",
              filter: "contrast(110%) blur(2px)",
              opacity: videoLoaded ? 0.3 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          />
          {/* Gradient overlay to blend video edges */}
          {/* <div
            className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"
            style={{
              background: `
                radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.5) 100%),
                linear-gradient(45deg, rgba(0,0,0,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)
              `,
            }}
          /> */}
          <div className="relative z-20 text-center max-w-4xl">
            <AnimatedHeading
              as="h1"
              text="KALTARANG'25"
              className="text-7xl sm:text-8xl lg:text-9xl font-extrabold tracking-wider text-white mb-4"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                textShadow:
                  "0 0 5px rgba(239, 68, 68, 0.9), 0 0 10px rgba(239, 68, 68, 0.7), 1px 1px 2px rgba(0,0,0,0.5)",
              }}
            />
            <div className="w-20 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full mx-auto mb-4" />
            <p
              className="text-white/80 text-lg sm:text-xl"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
              RGIPT's Annual Cultural Festival
            </p>
          </div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
            <div className="flex flex-col items-center text-white/50 hover:text-white transition-colors cursor-pointer">
              <div className="animate-bounce-slow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* === ABOUT SECTION === */}
        <section className="h-screen w-full flex items-center justify-center px-6 overflow-hidden">
          <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-stretch justify-center gap-8">
            <Tilt
              className="w-full md:w-1/2 animate-float pointer-events-auto"
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              glareEnable={true}
              glareMaxOpacity={0.1}
              glarePosition="all"
            >
              <motion.div
                className="relative h-full p-2 rounded-3xl overflow-hidden bg-[rgba(239,68,68,0.1)] border-[3px] border-red-500 shadow-red-500/50 shadow-glow"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <div
                  className="absolute inset-0 z-0 bg-repeat opacity-10"
                  style={{ backgroundImage: `url(${grungeTexture})` }}
                ></div>
                <div className="relative h-full flex items-center justify-center p-4 border-2 border-white/50 rounded-2xl z-10">
                  <img
                    src={kaltarangPhoto}
                    alt="A glimpse from a previous Kaltarang event"
                    className="w-full h-auto rounded-xl object-cover shadow-lg"
                    style={{ filter: "brightness(0.7)" }}
                  />
                </div>
              </motion.div>
            </Tilt>
            <Tilt
              className="w-full md:w-1/2 animate-float [animation-delay:-3s] pointer-events-auto"
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              glareEnable={true}
              glareMaxOpacity={0.1}
              glarePosition="all"
            >
              <motion.div
                className="relative h-full p-2 rounded-3xl overflow-hidden bg-[rgba(239,68,68,0.1)] border-[3px] border-red-500 shadow-red-500/50 shadow-glow"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
              >
                <div
                  className="absolute inset-0 z-0 bg-repeat opacity-10"
                  style={{ backgroundImage: `url(${grungeTexture})` }}
                ></div>
                <div className="relative h-full flex flex-col justify-center p-6 sm:p-8 border-2 border-white/50 rounded-2xl z-10">
                  <AnimatedHeading
                    text="About KALTARANG'25"
                    className="mb-4 text-4xl font-bold tracking-wide text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-red-400 to-red-600"
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      filter: "drop-shadow(0 0 6px rgba(239, 68, 68, 0.7))",
                    }}
                  />
                  <p
                    className="text-white/85 leading-relaxed text-lg sm:text-xl mb-4"
                    style={{ fontFamily: "'Times New Roman', Times, serif" }}
                  >
                    Kaltarang is RGIPT's annual cultural festival that
                    celebrates the vibrant tapestry of art, music, dance, drama,
                    and creative expressions. This prestigious event brings
                    together talented performers and artists from across the
                    nation to showcase their cultural heritage and artistic
                    prowess. Kaltarang serves as a platform where tradition
                    meets innovation, creating a magical atmosphere where
                    creativity flourishes and cultural diversity is celebrated
                    with passion and enthusiasm.
                  </p>
                </div>
              </motion.div>
            </Tilt>
          </div>
        </section>

        {/* === EVENTS SECTION === */}
        <section className="h-screen w-full flex flex-col items-center justify-center py-16">
          <div className="text-center mb-12">
            <AnimatedHeading
              text="OUR CULTURAL EVENTS"
              className="text-4xl sm:text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                filter: "drop-shadow(0 0 6px rgba(239, 68, 68, 0.7))",
              }}
            />
            <div className="w-20 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full mx-auto mt-4" />
          </div>
          <div className="w-full pointer-events-auto">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              loop={true}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
              modules={[Autoplay, Pagination, EffectCoverflow]}
              className="!pb-12"
            >
              {pastEvents.map((event) => (
                <SwiperSlide
                  key={event.id}
                  className="!w-[300px] md:!w-[400px] !h-[380px]"
                >
                  <div className="relative h-full p-2 rounded-3xl overflow-hidden bg-[rgba(239,68,68,0.1)] border-[3px] border-red-500 shadow-red-500/50 shadow-glow">
                    <div
                      className="absolute inset-0 z-0 bg-repeat opacity-10"
                      style={{ backgroundImage: `url(${grungeTexture})` }}
                    ></div>
                    <div className="relative h-full flex flex-col p-4 border-2 border-white/50 rounded-2xl z-10">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-60 object-cover object-top rounded-lg mb-4 flex-shrink-0"
                      />
                      <div className="flex flex-col">
                        <h3
                          className="text-white text-xl font-bold mb-2"
                          style={{
                            fontFamily: "'Times New Roman', Times, serif",
                          }}
                        >
                          {event.title}
                        </h3>
                        <p
                          className="text-white/70 text-sm"
                          style={{
                            fontFamily: "'Times New Roman', Times, serif",
                          }}
                        >
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* ===== FAQs SECTION ===== */}
        <section className="w-full py-20 px-6">
          <div className="relative max-w-4xl mx-auto p-2 rounded-3xl overflow-hidden bg-[rgba(239,68,68,0.1)] border-[3px] border-red-500 shadow-red-500/50 shadow-glow">
            <div
              className="absolute inset-0 z-0 bg-repeat opacity-10"
              style={{ backgroundImage: `url(${grungeTexture})` }}
            ></div>
            <div className="relative text-center p-8 sm:p-12 border-2 border-white/50 rounded-2xl z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 mb-4"
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                  filter: "drop-shadow(0 0 6px rgba(239, 68, 68, 0.7))",
                }}
              >
                FREQUENTLY ASKED QUESTIONS
              </motion.h2>

              <div className="w-20 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full mx-auto" />
              <div className="mt-8 text-left">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== JOIN THE COMMUNITY SECTION ===== */}
        <section className="w-full pt-0 pb-20 px-6">
          <div className="relative max-w-4xl mx-auto p-2 rounded-3xl overflow-hidden bg-[rgba(239,68,68,0.1)] border-[3px] border-red-500 shadow-red-500/50 shadow-glow">
            <div
              className="absolute inset-0 z-0 bg-repeat opacity-10"
              style={{ backgroundImage: `url(${grungeTexture})` }}
            ></div>
            <div className="relative text-center p-8 sm:p-12 border-2 border-white/50 rounded-2xl z-10">
              <AnimatedHeading
                text="JOIN THE COMMUNITY"
                className="text-4xl sm:text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600"
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                  filter: "drop-shadow(0 0 6px rgba(239, 68, 68, 0.7))",
                }}
              />
              <div className="w-20 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full mx-auto mt-4" />
              <p
                className="text-white/80 text-lg sm:text-xl mt-6 max-w-2xl mx-auto"
                style={{ fontFamily: "'Times New Roman', Times, serif" }}
              >
                Be a part of the innovation, collaboration, and excitement. Stay
                updated with the latest news, announcements, and
                behind-the-scenes content.
              </p>
              <div className="mt-8">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg shadow-red-500/30 transform hover:scale-105 transition-transform duration-300 ease-in-out pointer-events-auto"
                >
                  Join WhatsApp Channel
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer remains clickable */}
      <div className="relative z-20 pointer-events-auto">
        <Footer brand="Kaltarang" />
      </div>
    </div>
  );
}
