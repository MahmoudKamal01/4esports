import { useEffect, useMemo, useRef, useState } from "react";
import logo from "./assets/logo.svg";
import heroImg from "./assets/hero.png";
import registerBtn from "./assets/register.png";
import vectorStar from "./assets/vector1.svg";
import vectorCircle from "./assets/vector2.svg";
import service1 from "./assets/service1.svg";
import service2 from "./assets/service2.svg";
import service3 from "./assets/service3.svg";
import triangles from "./assets/triangles.svg";
import tournamentIcon from "./assets/tournament_icon.svg";
import arrowsAsset from "./assets/arrows.svg";
import partner1 from "./assets/partner1.png";
import partner2 from "./assets/partner2.png";
import partner3 from "./assets/partner3.png";
import partner4 from "./assets/partner4.png";
import triangles2 from "./assets/triangles2.svg";
import quoteIcon from "./assets/quote.svg";
import testi1 from "./assets/testi1.png";
import testi2 from "./assets/testi2.png";
import underline from "./assets/underline.svg";
import footerLogo from "./assets/footer_logo.svg";
import arrows2 from "./assets/triangles2.svg";
import { CiLock } from "react-icons/ci";
import {
  FaRegUser,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaRegSmile,
  FaStar,
} from "react-icons/fa";
import "./App.css";

function useCountdown(targetDate) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Calculate calendar-accurate months, then remaining days/hours/minutes
  let start = now;
  let end = targetDate;
  if (end < start) end = start; // clamp

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  const tmp = new Date(start);
  tmp.setDate(1); // avoid month overflow
  tmp.setMonth(tmp.getMonth() + months);
  if (tmp > end) {
    months -= 1;
    tmp.setMonth(tmp.getMonth() - 1);
  }
  // Move tmp to same day-of-month baseline
  const anchor = new Date(tmp);
  anchor.setDate(start.getDate());
  // If adjusting date overflows month, clamp back
  while (anchor.getMonth() !== tmp.getMonth()) {
    anchor.setDate(anchor.getDate() - 1);
  }

  let remainderMs = Math.max(0, end.getTime() - anchor.getTime());
  const minutes = Math.floor(remainderMs / 60000);
  const days = Math.floor(minutes / (60 * 24));
  const hours = Math.floor((minutes % (60 * 24)) / 60);
  const mins = minutes % 60;
  return { months, days, hours, minutes: mins };
}

function DotNav({ total, index, onGo }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          aria-label={`Go to ${i + 1}`}
          onClick={() => onGo(i)}
          className={`h-2.5 w-2.5 rounded-full transition-colors ${
            i === index ? "bg-[--color-brand]" : "bg-white/30"
          }`}
        />
      ))}
    </div>
  );
}

function App() {
  const target = useMemo(() => new Date("2025-12-01T00:00:00Z"), []);
  const { months, days, hours, minutes } = useCountdown(target);
  const servicesRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const progressWords = ["Events", "Esports", "Community"];
  const progressStep = Math.min(2, Math.floor(progress * 3));

  useEffect(() => {
    const onScroll = () => {
      const el = servicesRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight || document.documentElement.clientHeight;
      const visible = Math.min(viewH, Math.max(0, viewH - rect.top));
      const ratio = Math.max(0, Math.min(1, visible / (rect.height || 1)));
      setProgress(ratio);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const tournaments = [
    { name: "Second Dubai Police Esports Tournament" },
    { name: "Dubai Police Esports Tournament SWAT Edition" },
    { name: "Dubai Police Esports Tournament Ramadan Edition" },
    { name: "Que Club 1v1 League of Legends Showdown" },
    { name: "EMIRATES ESPORTS FESTIVAL 22" },
    { name: "Manchester City FIFA Cup powered by MIDEA" },
    { name: "Dubai Police Game Safe Tournament" },
    { name: "First Dubai Police Esports Tournament" },
    { name: "DOTA 2 MENA TOURNAMENT" },
  ];

  const partners = [
    {
      name: "Dubai Police",
      img: "https://images.unsplash.com/photo-1542751371-ddb62f0676f7?q=80&w=1400&auto=format&fit=crop",
    },
    {
      name: "Que Club",
      img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1400&auto=format&fit=crop",
    },
    {
      name: "Emirates Esports Festival",
      img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1400&auto=format&fit=crop",
    },
    {
      name: "DOTA 2 MENA Tournament",
      img: "https://images.unsplash.com/photo-1542751371-7c5b97a48e9f?q=80&w=1400&auto=format&fit=crop",
    },
  ];

  const testimonials = [
    {
      name: "Mickdad Abbas",
      role: "Founder",
      quote:
        "The tournament was organized with such professionalism and excitement. From the stage setup to the smooth coordination of matches, everything felt world-class. I truly enjoyed being part of it and can’t wait to join their next esports event!",
      avatar: testi1,
    },
    {
      name: "Wysten  Night",
      role: "CEO",
      quote:
        "We knows how to bring the esports community together! The energy, the atmosphere, and the attention to detail made the event unforgettable. It was more than just a competition — it was an experience I’ll always remember.",
      avatar: testi2,
    },
  ];

  const [tIndex, setTIndex] = useState(0);
  const [pIndex, setPIndex] = useState(0);
  const [cIndex, setCIndex] = useState(0);

  return (
    <div className="min-h-screen gradient-red overflow-x-hidden">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-black/60 border-b border-white">
        <div className="container-responsive h-20 flex items-center justify-between">
          <a
            href="#home"
            className="flex items-center gap-3 font-bold text-white"
          >
            <img src={logo} alt="FOUR04 ESPORTS" className="h-14 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-10 text-base lg:text-lg text-white">
            <a href="#home" className="hover:text-white/90 font-bold">
              Home
            </a>
            <a href="#about" className="hover:text-white/90">
              About Us
            </a>
            <a href="#services" className="hover:text-white/90">
              Our Services
            </a>
            <a href="#esports" className="hover:text-white/90">
              E-sports
            </a>
            <a href="#events" className="hover:text-white/90">
              Events Management
            </a>
            <a href="#team" className="hover:text-white/90">
              Our Team
            </a>
          </nav>
          <div className="flex items-center gap-4 text-white">
            <a
              href="#login"
              className="hidden sm:inline-flex items-center gap-2 text-sm hover:text-white/90"
            >
              <CiLock className="text-lg" aria-hidden />
              <span>Login</span>
            </a>
            <a href="#register" className="btn-primary">
              Sign Up for free
            </a>
            <a
              href="#profile"
              className="hidden sm:inline-flex items-center gap-2 text-sm hover:text-white/90"
            >
              <FaRegUser className="text-lg" aria-hidden />
              <span>My profile</span>
            </a>
            <button
              className="inline-flex items-center gap-1 text-sm hover:text-white/90"
              aria-label="Change language"
            >
              <span>EN</span>
              <span aria-hidden>▾</span>
            </button>
          </div>
        </div>
      </header>

      <main id="home" className="pt-20">
        <section className="hero-gradient">
          <div className="container-responsive grid lg:grid-cols-2 gap-10 items-start pt-0 pb-12">
            <div className="relative z-10 px-3 py-4 sm:p-6  mt-16 sm:mt-24 text-white font-sans">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-3 leading-tight !font-sans">
                Tournament Community 2025
              </h1>
              <div className="h-1 w-24 bg-white/80 mb-6"></div>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-prose font-light font-sans">
                We are excited to announce that Tournament Community 2025 will
                take place this December 2025. Get ready for a month full of
                thrilling matches, friendly competition, and unforgettable
                moments.
              </p>
              <div className="text-white/90 uppercase tracking-wider text-sm mb-3">
                COUNTDOWN CALENDAR
              </div>
              <div className="flex items-center gap-4 sm:gap-6 mb-8">
                {[
                  {
                    label: "Months",
                    value: String(Math.max(0, months)).padStart(2, "0"),
                  },
                  { label: "Days", value: String(days).padStart(2, "0") },
                  { label: "Hours", value: String(hours).padStart(2, "0") },
                ].map((t, idx) => (
                  <>
                    <div key={t.label} className="flex flex-col items-center">
                      <div
                        className="px-4 py-4 sm:px-6 sm:py-6 border border-white/10 text-black"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 35%), #C0C0C0",
                        }}
                      >
                        <div className="text-3xl sm:text-4xl font-extrabold text-black">
                          {t.value}
                        </div>
                      </div>
                      <div className="mt-2 text-white text-xs">{t.label}</div>
                    </div>
                    {idx < 2 && (
                      <FaStar
                        key={`star-${idx}`}
                        className="text-cyan-400 text-lg sm:text-xl"
                      />
                    )}
                  </>
                ))}
              </div>
              <a href="#register" className="inline-block">
                <img
                  src={registerBtn}
                  alt="Register Now"
                  className="h-12 w-auto transition-transform duration-300 hover:scale-105"
                />
              </a>
              <div className="mt-4 flex items-center gap-4">
                <img
                  src={vectorStar}
                  alt="decorative star"
                  className="h-6 w-6 rotate-12 opacity-90"
                />
                <img
                  src={vectorCircle}
                  alt="decorative circle"
                  className="h-5 w-5 -rotate-12 opacity-80"
                />
              </div>
            </div>
            <div className="relative justify-self-end self-start mt-0 lg:-translate-x-8 xl:-translate-x-16 w-full mx-auto lg:mx-0 max-w-[520px] sm:max-w-[700px] lg:max-w-[900px] xl:max-w-[1100px]">
              <img
                className="w-full h-auto object-cover"
                src={heroImg}
                alt="Action gaming"
              />
              <div className="sm:absolute sm:inset-x-0 sm:bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-3 sm:p-6">
                <div className="text-xl sm:text-4xl lg:text-5xl font-extrabold break-words text-left">
                  <span className="text-white">Ready For The Suspension </span>
                  <span className="word-fade-container align-baseline">
                    <span className="text-redblack">Esports</span>
                    <span className="text-redblack">Events</span>
                    <span className="text-redblack">Tournaments</span>
                  </span>
                </div>
                <div className="mt-3 h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-[--color-brand]"></div>
                </div>
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 text-white">
                <a
                  href="#"
                  className="h-9 w-9 rounded-full bg-black/70 border border-white/10 grid place-items-center transition-all duration-300 hover:-translate-y-1 hover:text-cyan-400"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="h-9 w-9 rounded-full bg-black/70 border border-white/10 grid place-items-center transition-all duration-300 hover:-translate-y-1 hover:text-cyan-400"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="h-9 w-9 rounded-full bg-black/70 border border-white/10 grid place-items-center transition-all duration-300 hover:-translate-y-1 hover:text-cyan-400"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="#"
                  className="h-9 w-9 rounded-full bg-black/70 border border-white/10 grid place-items-center transition-all duration-300 hover:-translate-y-1 hover:text-cyan-400"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
                <a
                  href="#"
                  className="h-9 w-9 rounded-full bg-black/70 border border-white/10 grid place-items-center transition-all duration-300 hover:-translate-y-1 hover:text-cyan-400"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp />
                </a>
                <a
                  href="#"
                  className="h-9 w-9 rounded-full bg-black/70 border border-white/10 grid place-items-center transition-all duration-300 hover:-translate-y-1 hover:text-cyan-400"
                  aria-label="Smile"
                >
                  <FaRegSmile />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services progress */}
        <div className="container-responsive bg-black ">
          <div className="flex items-center gap-4 bg-black">
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.max(0, Math.min(1, progress)) * 100}%`,
                }}
              />
            </div>
            <div className="text-white font-semibold text-xl">
              {progressWords[progressStep]}
            </div>
          </div>
        </div>

        {/* Services Section */}
        <section id="services" ref={servicesRef} className="hero-gradient">
          <div className="container-responsive relative min-h-[808px] py-12 flex flex-col reveal">
            {/* Decorative vectors in top-left corner */}
            <img
              src={vectorStar}
              alt="decor star"
              className="absolute left-2 top-6 h-6 w-6 rotate-12 opacity-90"
            />
            <img
              src={vectorCircle}
              alt="decor circle"
              className="absolute left-8 top-12 h-5 w-5 -rotate-12 opacity-80"
            />

            <h2 className="section-title text-center mt-10">
              Our Services and Speciality
            </h2>
            <div className="mt-4 flex justify-center">
              <svg
                width="220"
                height="24"
                viewBox="0 0 220 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="block"
              >
                <path
                  d="M2 20 C 60 30, 160 -6, 218 20"
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-10 flex-1 items-start">
              <img
                src={service1}
                alt="Experienced Trainers"
                className="mx-auto w-full max-w-md h-[420px] sm:h-[520px] object-contain transition-transform duration-300 hover:scale-105"
              />
              <img
                src={service2}
                alt="Every Console"
                className="mx-auto w-full max-w-md h-[420px] sm:h-[520px] object-contain transition-transform duration-300 hover:scale-105"
              />
              <img
                src={service3}
                alt="Live Streaming"
                className="mx-auto w-full max-w-md h-[420px] sm:h-[520px] object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </section>

        {/* Popular Tournaments */}
        <section
          id="tournaments"
          className="relative bg-black py-16 sm:py-20 overflow-hidden"
        >
          {/* Decorative triangles */}
          <img
            src={triangles}
            alt="triangles"
            className="pointer-events-none select-none absolute -left-8 bottom-0 w-40 opacity-90"
          />
          <img
            src={triangles}
            alt="triangles"
            className="pointer-events-none select-none absolute -right-8 -top-6 w-44 rotate-180 opacity-90"
          />
          <div className="container-responsive relative">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="section-title">Most Popular Tournaments</h2>
                <div className="mt-2">
                  <svg
                    width="220"
                    height="24"
                    viewBox="0 0 220 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 20 C 60 30, 160 -6, 218 20"
                      stroke="#ffffff"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p className="text-white/70 mt-2">Community Organizing Team</p>
              </div>
            </div>

            <img
              src={arrowsAsset}
              alt="carousel indicators"
              className="mx-auto mt-4 mb-6 max-w-full opacity-90"
            />

            <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {tournaments.slice(0, 9).map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <div className="shrink-0 h-16 w-16 rounded-xl overflow-hidden shadow-lg shadow-black/30">
                    <img
                      src={tournamentIcon}
                      alt="icon"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-white">
                    <div className="font-semibold leading-snug">
                      {item.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section id="partners" className="hero-gradient">
          <div className="container-responsive min-h-[808px] py-12">
            <h2 className="section-title ">Our Partners</h2>
            <div className="mx-auto mt-4">
              <svg
                width="220"
                height="24"
                viewBox="0 0 220 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 20 C 60 30, 160 -6, 218 20"
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "Dubai Police", img: partner1 },
                { name: "Que Club", img: partner2 },
                { name: "EMIRATES ESPORTS FESTIVAL", img: partner3 },
                { name: "DOTA 2 MENA TOURNAMENT", img: partner4 },
              ].map((p) => (
                <div key={p.name} className="card">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-60 w-full object-cover"
                  />
                  <div className="p-5 text-center text-white text-lg font-semibold">
                    {p.name}
                  </div>
                </div>
              ))}
            </div>

            <img
              src={arrowsAsset}
              alt="indicators"
              className="mx-auto mt-6 opacity-90"
            />
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="testimonials"
          className="relative bg-black py-16 sm:py-20 overflow-hidden"
        >
          {/* Decorative corners */}
          <img
            src={triangles2}
            alt="triangles"
            className="pointer-events-none select-none absolute -left-6 bottom-0 w-40 opacity-90"
          />
          <img
            src={triangles2}
            alt="triangles"
            className="pointer-events-none select-none absolute -right-6 -top-4 w-44 rotate-180 opacity-90"
          />
          <div className="container-responsive">
            <h2 className="text-4xl text-white font-bold">
              Client <span className="!text-red-600">Testimonial</span>
            </h2>
            <div className="mt-2">
              <svg
                width="220"
                height="24"
                viewBox="0 0 220 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 20 C 60 30, 160 -6, 218 20"
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-white/90 mt-2">
              Our Client feedback is overseas and Locally
            </p>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {testimonials.slice(0, 2).map((t) => (
                <div
                  key={t.name}
                  className="relative bg-white rounded-xl p-8 shadow-xl mx-auto w-full md:max-w-xl min-h-[260px]"
                >
                  {/* Avatar half-in/half-out */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-20 w-20 rounded-full ring-4 ring-white overflow-hidden bg-black">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-full w-full object-cover rounded-full object-center scale-110"
                    />
                  </div>
                  <div className="pt-10 text-center">
                    <div className="font-semibold text-black">{t.name}</div>
                    <div className="text-gray-500 text-sm">{t.role}</div>
                  </div>
                  <div className="mt-4 text-gray-800 relative">
                    <img
                      src={quoteIcon}
                      alt="quote"
                      className="absolute -left-3 -top-1 h-5 w-5 opacity-60"
                    />
                    <p className="px-4 text-gray-500 text-justify">{t.quote}</p>
                    <img
                      src={quoteIcon}
                      alt="quote end"
                      className="absolute -right-3 -bottom-2 h-5 w-5 opacity-60 rotate-180"
                    />
                  </div>
                </div>
              ))}
            </div>

            <img
              src={arrowsAsset}
              alt="arrows"
              className="mx-auto mt-8 opacity-90"
            />
          </div>
        </section>

        {/* About / Newsletter */}
        <section id="about" className="hero-gradient">
          <div className="container-responsive min-h-[808px] py-12 text-white">
            <h2 className="section-title text-center">WHO WE ARE ?</h2>
            <div className="mt-2 flex justify-center">
              <img src={underline} alt="underline" />
            </div>
            <div className="mt-10 grid gap-12 md:grid-cols-3">
              <div>
                <h3 className="font-bold text-2xl mb-3 uppercase">Our Story</h3>
                <p className="text-white/90 text-base leading-relaxed">
                  In early winter 2020, amidst a raging pandemic, FOUR04 ESPORTS
                  was born. Our goal is to reinvent the region’s droopy eSports
                  atmosphere. By bringing together a diverse group of experts in
                  managing offline and online tournaments, we aim to execute
                  events that are tenfold better. We want to encourage and
                  inspire the gaming youth in our region to explore their
                  passions and consider building a career in eSports—a prospect
                  that once seemed far-fetched.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-2xl mb-3 uppercase">
                  Our Mission
                </h3>
                <p className="text-white/90 text-base leading-relaxed">
                  Establish a self-sustaining and progressively scalable eSports
                  platform in the Middle East while also aiming to build a local
                  and international eSports community that brings together
                  solutions and vocations for players and for brands to get
                  involved with eSports in the region.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-2xl mb-3 uppercase">
                  Our Vision
                </h3>
                <p className="text-white/90 text-base leading-relaxed">
                  The Healing is fresh!!! can not wait to take my next session,
                  really i feel so Energetic and i know care of the quality for
                  my mental health and Happiness no matter what i face.
                </p>
              </div>
            </div>
            {/* Email subscribe pill */}
            <div className="mt-16 flex justify-center">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex w-full max-w-3xl rounded-full overflow-hidden shadow-lg"
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 bg-white text-gray-700 placeholder-gray-400 outline-none"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-black to-gray-700 text-white font-semibold">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative bg-black">
          <div className="container-responsive py-16 grid gap-10 md:grid-cols-4 relative">
            {/* Decorative arrows on the right */}
            <img
              src={arrows2}
              alt="decor"
              className="hidden lg:block absolute right-0 top-6 w-48 opacity-90 pointer-events-none select-none"
            />

            <div className="flex items-center">
              <img
                src={footerLogo}
                alt="FOUR04 Esports"
                className="h-28 w-auto"
              />
            </div>
            <div>
              <div className="font-semibold mb-3 text-white">Our Contact</div>
              <ul className="space-y-2 text-white/80 text-base">
                <li>
                  <a href="#about" className="hover:text-white font-semibold">
                    Who we are ?
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white font-semibold">
                    Terms and Condations
                  </a>
                </li>
                <li>POBOX:12356</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3 text-white">Address</div>
              <ul className="space-y-3 text-white/80 text-base">
                <li className="flex items-start gap-2">
                  <FaMapMarkerAlt className="mt-1 text-white" />
                  <div>
                    <div>aaa Events Management LLC</div>
                    <div>111-17, Block A</div>
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <FaEnvelope className="text-white" />
                  <span>info@abc.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaPhone className="text-white" />
                  <span>+971 5123456</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3 text-white">Careers</div>
              <ul className="space-y-2 text-white/80 text-base">
                <li>
                  <a href="#" className="hover:text-white font-semibold">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white font-semibold">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white font-semibold">
                    Partners
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-gradient-to-b from-[#DC1F2E] to-black py-4 text-center text-white text-sm">
            ©Copyright 2025 - Designed & Developed by Four04
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const valid = /.+@.+\..+/.test(email);
    if (!valid) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 max-w-xl mx-auto flex gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="flex-1 rounded-md bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[--color-brand]"
      />
      <button className="btn-primary" type="submit">
        {submitted ? "Subscribed" : "Subscribe"}
      </button>
      {error && <div className="text-red-400 text-sm mt-3">{error}</div>}
    </form>
  );
}
