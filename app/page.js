"use client";

import { useEffect, useRef, useState } from "react";

export default function PortfolioWebsite() {
  const [activeImage, setActiveImage] = useState(null);
  const [activeSection, setActiveSection] = useState("about");

  const sectionsRef = useRef([]);

  const videos = [
    {
      title: "Cinematic Loop Showcase",
      file: "https://res.cloudinary.com/dsssozhyc/video/upload/v1778374553/env-showcase_etucvl.mp4",
      description:
        "A seamless infinite-loop neon corridor driven by a steady forward camera movement, emphasising atmospheric lighting, spatial depth, and cinematic rhythm.",
    },
    {
      title: "Hard Surface Robot Reel",
      file: "https://res.cloudinary.com/dsssozhyc/video/upload/v1778374542/hard-surface-reel_cvay5u.mp4",
      description:
        "A hard-surface robotic model presented in a neutral clay render, focusing on clean topology, mechanical structure, and form definition. The piece emphasises modelling precision, silhouette, and proportion without the use of materials or shadow-based lighting.",
    },
    {
      title: "Isometric Room Sequence",
      file: "https://res.cloudinary.com/dsssozhyc/video/upload/v1778374542/little-room_gxrgec.mp4",
      description:
        "An isometric motion sequence emphasising fluid animation, timing, and split visual attention as furniture assembles dynamically across the scene, concluding with BMO from Adventure Time waving to the camera.",
    },
  ];

  const workflowDocs = [
    {
      title: "Hard Surface Modelling Workflow",
      file: "/docs/environment1.pdf",
      description:
        "Breakdown of modelling stages, visualization, blockout process, and detailing workflow.",
    },
    {
      title: "Environment Production Workflow",
      file: "/docs/environment2.pdf",
      description:
        "Scene planning, modular workflow, composition process, lighting passes, and final rendering setup.",
    },
  ];

const images = [
  {src: "/images/test-bench-render.jpg", type: "image" },
  {src: "/images/cube.png", type: "image" },
  {src: "/images/backdrop.png", type: "image" },
  {src: "/images/wide-shot-1.png", type: "image" },
  {src: "/images/wide-shot-2.png", type: "image" },
  {src: "/images/close1.png", type: "image" },
  {src: "/images/close2.png", type: "image" },
  {src: "/images/kbfinal.png", type: "image" },

  // MP4 SUPPORT
  {
  src: "https://res.cloudinary.com/dsssozhyc/video/upload/v1778374567/line_vmluxn.mp4",
  type: "video",
},
{
  src: "https://res.cloudinary.com/dsssozhyc/video/upload/v1778374566/gif_ypujr8.mp4",
  type: "video",
},
{
  src: "https://res.cloudinary.com/dsssozhyc/video/upload/v1778374575/parallax_qcrmsq.mp4",
  type: "video",
},
{
  src: "https://res.cloudinary.com/dsssozhyc/video/upload/v1778374570/zombie_xm81j9.mp4",
  type: "video",
},
{
  src: "https://res.cloudinary.com/dsssozhyc/video/upload/v1778374569/walk_ipoejl.mp4",
  type: "video",
},
{
  src: "https://res.cloudinary.com/dsssozhyc/video/upload/v1778374572/180_yyejfh.mp4",
  type: "video",
},
];

  /* =========================
     DOCUMENT DATA
     ========================= */
  const cv = {
    file: "/docs/cv.pdf",
    zoom: 75,
  };

  const qualifications = [
    {
      name: "Bachelor of Arts - 3D Animation",
      file: "/docs/degree.pdf",
      zoom: 62,
    },
    {
      name: "HyperionDev Full Stack Certificate",
      file: "/docs/certificate.pdf",
      zoom: 49,
    },
  ];

  const [activeDoc, setActiveDoc] = useState(qualifications[0]);

  useEffect(() => {
  sectionsRef.current = [];
}, []);

useEffect(() => {
  const sections = document.querySelectorAll("section[id]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));

  return () => observer.disconnect();
}, []);

  const getPdfUrl = (file, zoom) => `${file}#zoom=${zoom}`;

  /* =========================
     SCROLL REVEAL
     ========================= */
  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.15 }
  );

  const observeAll = () => {
    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
  };

  observeAll();

  // 🔥 FIX: re-trigger when returning from PDF tab
  const handleVisibility = () => {
    if (document.visibilityState === "visible") {
      observeAll();
    }
  };

  document.addEventListener("visibilitychange", handleVisibility);

  return () => {
    observer.disconnect();
    document.removeEventListener("visibilitychange", handleVisibility);
  };
}, []);

const addRef = (el) => {
  if (el) sectionsRef.current.push(el);
};

  /* =========================
     GALLERY CARD
     ========================= */
  function GalleryCard({ img }) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div
      className="h-[220px] w-full max-w-[260px] cursor-pointer sm:h-[260px]"
      onClick={() => setActiveImage(img)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        setPos({ x, y });
      }}
    >
      <div
        className="relative w-full h-full overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/40 shadow-[0_0_40px_rgba(0,0,0,0.45)] transition-all duration-500"
        style={{
          transform: hovered
            ? `
              perspective(1200px)
              rotateX(${pos.y * -8}deg)
              rotateY(${pos.x * 8}deg)
              scale(1.04)
              translateY(-6px)
            `
            : "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-orange-500/5 to-transparent opacity-0 hover:opacity-100 transition duration-500 z-10" />

        {/* IMAGE OR VIDEO */}
        {img.type === "video" ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition duration-700 hover:scale-110"
          >
            <source src={img.src} type="video/mp4" />
          </video>
        ) : (
          <img
            src={img.src}
            alt={img.title}
            className="w-full h-full object-cover transition duration-700 hover:scale-110"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <div className="absolute bottom-0 p-4 z-20">
          <p className="text-zinc-100 font-medium tracking-wide">
            {img.title}
          </p>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="relative overflow-hidden bg-zinc-950 pt-20 md:pt-24 text-white font-sans">

  {/* NAVIGATION */}
{/* NAVIGATION */}
<nav className="fixed top-0 left-0 right-0 z-[999] border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.35)]">

  <div className="mx-auto max-w-7xl px-3 py-3 md:px-6">

    {/* MOBILE + DESKTOP NAV */}
    <div className="flex gap-2 overflow-x-auto scrollbar-hide md:justify-center">

      {[
        { name: "About", id: "about" },
        { name: "Showcase", id: "videos" },
        { name: "Workflow", id: "workflow" },
        { name: "Gallery", id: "gallery" },
        { name: "CV", id: "cv" },
        { name: "Qualifications & Contact", id: "qualifications" },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => {
            const el = document.getElementById(item.id);

            if (el) {
              el.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }}
          className={`shrink-0 rounded-full border px-3 py-2 text-[11px] uppercase tracking-[0.16em] transition-all duration-300 md:px-4 md:text-sm ${
            activeSection === item.id
              ? "border-cyan-500/40 bg-cyan-500/15 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.18)]"
              : "border-transparent text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/70 hover:text-white"
          }`}
        >
          {item.name}
        </button>
      ))}

    </div>

  </div>
</nav>

      {/* BACKGROUND GRADIENTS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-200px] left-[-100px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute top-[700px] right-[-150px] h-[450px] w-[450px] rounded-full bg-orange-500/10 blur-3xl" />

        <div className="absolute bottom-[300px] left-[20%] h-[350px] w-[350px] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      {/* HERO */}
      <section
        id="hero"
        ref={addRef}
        className="relative opacity-0 translate-y-6 transition-all duration-1000 border-b border-zinc-800/80"
      >
        <div className="mx-auto max-w-6xl px-6 py-36 text-center">

          <p className="mb-5 text-sm uppercase tracking-[0.35em] text-cyan-400">
            Wian Coetsee Portfolio 2026
          </p>

          <h1 className="bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl md:text-7xl lg:text-8xl">
            3D Environment Artist
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Cinematic environments, hard-surface modelling, and visually-driven
            game-ready assets focused on atmosphere, structure, and presentation quality.
          </p>

          {/* glow line */}
          <div className="mx-auto mt-12 h-px w-48 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60" />
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        ref={addRef}
        className="relative scroll-mt-28 opacity-0 translate-y-6 transition-all duration-1000"
      >
        <div className="mx-auto max-w-6xl px-6 py-28">

          <div className="grid gap-14 md:grid-cols-2">

            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-orange-400">
                About
              </p>

              <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                Detail-driven environment and hard-surface focused 3D artist.
              </h2>
            </div>

            <div className="space-y-6 text-zinc-400 leading-relaxed text-lg">
              <p>
                I primarily focus on environment art, hard-surface modelling,
                cinematic lighting, and structured asset creation with an emphasis
                on presentation quality and visual clarity.
              </p>

              <p>
                While character and organic work are not my primary specialization,
                I continuously expand my pipeline knowledge and remain adaptable
                and highly motivated to improve in any required production area.
              </p>

              <p>
                My workflow prioritises clean topology, efficient iteration,
                composition, and atmospheric scene building to create polished,
                production-ready visuals.
              </p>

              {/* skills */}
              <div className="flex flex-wrap gap-3 pt-6">
                {[
                  "Blender",
                  "Environment Art",
                  "Hard Surface",
                  "Lighting",
                  "Rendering",
                  "Game Assets",
                  "UV Workflow",
                  "Composition",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-zinc-700/80 bg-zinc-900/60 px-4 py-2 text-sm text-zinc-300 backdrop-blur-sm transition hover:border-cyan-500/50 hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VIDEOS */}
      <section
        id="videos"
        ref={addRef}
        className="relative scroll-mt-28 opacity-0 translate-y-6 transition-all duration-1000"
      >
        <div className="mx-auto max-w-7xl px-6 py-28">

          <div className="mb-14">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-400">
              Showcase
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Video Projects</h2>
          </div>

          <div className="grid gap-12">
            {videos.map((v) => (
              <div
                key={v.file}
                className="group overflow-hidden rounded-[32px] border border-zinc-800/80 bg-zinc-900/30 shadow-[0_0_50px_rgba(0,0,0,0.45)] backdrop-blur-sm transition duration-500 hover:border-cyan-500/30"
              >
                <div className="grid lg:grid-cols-[1.4fr_0.6fr]">

                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 z-10 bg-gradient-to-tr from-cyan-500/10 via-transparent to-orange-500/10 opacity-0 transition duration-700 group-hover:opacity-100" />

                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="aspect-video w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                    >
                      <source src={v.file} type="video/mp4" />
                    </video>
                  </div>

                  <div className="flex flex-col justify-center p-6 md:p-10">
                    <h3 className="text-3xl font-bold">{v.title}</h3>

                    <div className="mt-5 h-px w-20 bg-gradient-to-r from-cyan-500 to-transparent" />

                    <p className="mt-6 leading-relaxed text-zinc-400">
                      {v.description}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* WORKFLOW PDFs */}
      <section
        id="workflow"
        ref={addRef}
        className="relative opacity-0 translate-y-6 transition-all duration-1000 border-t border-zinc-800/50"
      >
        <div className="mx-auto max-w-7xl px-6 py-28">

          <div className="mb-14">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-orange-400">
              Process
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Modelling Workflow
            </h2>

            <p className="mt-5 max-w-2xl text-zinc-400 leading-relaxed">
              Workflow documentation showcasing modelling structure,
              production methodology, scene planning, and technical breakdowns.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {workflowDocs.map((doc) => (
              <div
                key={doc.file}
                className="group overflow-hidden rounded-[32px] border border-zinc-800/80 bg-zinc-900/30 shadow-[0_0_50px_rgba(0,0,0,0.45)] backdrop-blur-sm transition duration-500 hover:border-orange-500/30"
              >

                {/* PDF VIEWER */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 z-10 bg-gradient-to-tr from-orange-500/10 via-transparent to-cyan-500/10 opacity-0 transition duration-700 group-hover:opacity-100 pointer-events-none" />

                  <iframe
                    src={`${doc.file}#zoom=70`}
                    className="h-[420px] w-full bg-zinc-950 sm:h-[550px] md:h-[650px]"
                  />
                </div>

                {/* TEXT */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold">
                    {doc.title}
                  </h3>

                  <div className="mt-4 h-px w-20 bg-gradient-to-r from-orange-500 to-transparent" />

                  <p className="mt-5 leading-relaxed text-zinc-400">
                    {doc.description}
                  </p>

                  <a
                    href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex rounded-xl border border-zinc-700 bg-zinc-900/60 px-5 py-3 text-sm text-zinc-300 transition hover:border-orange-500/40 hover:text-white"
                  >
                    Open PDF
                  </a>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* GALLERY */}
      <section
        id="gallery"
        ref={addRef}
        className="relative scroll-mt-28 opacity-0 translate-y-6 transition-all duration-1000"
      >
        <div className="mx-auto max-w-7xl px-6 py-28">

          <div className="mb-14">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-violet-400">
              Visuals
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Image Gallery</h2>
            <p>
              Additional works. Certain assets provided through Open Window Institute coursework.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {images.map((img) => (
              <GalleryCard key={img.src} img={img} />
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
{activeImage && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
    onClick={() => setActiveImage(null)}
  >
    {activeImage.type === "video" ? (
      <video
        autoPlay
        loop
        muted
        controls
        playsInline
        className="max-h-[90vh] max-w-[90vw] rounded-2xl border border-zinc-700 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
      >
        <source src={activeImage.src} type="video/mp4" />
      </video>
    ) : (
      <img
        src={activeImage.src}
        className="max-h-[90vh] max-w-[90vw] rounded-2xl border border-zinc-700 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
      />
    )}
  </div>
)}

      {/* CV */}
      <section
        id="cv"
        ref={addRef}
        className="relative opacity-0 translate-y-6 transition-all duration-1000 border-t border-zinc-800/80 bg-zinc-900/10"
      >
        <div className="mx-auto max-w-6xl px-6 py-28">

          <div className="mb-10">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-orange-400">
              Documents
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">CV / Resume</h2>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-zinc-800/80 bg-zinc-900/30 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
            <iframe
              src={getPdfUrl(cv.file, cv.zoom)}
              className="h-[500px] w-full sm:h-[650px] md:h-[850px]"
            />
          </div>
        </div>
      </section>

      {/* QUALIFICATIONS */}
      <section
        id="qualifications"
        ref={addRef}
        className="relative opacity-0 translate-y-6 transition-all duration-1000 border-t border-zinc-800/80"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">

          <div className="mb-12">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-400">
              Education
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Qualifications</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-[1fr_1.6fr]">

            {/* buttons */}
            <div className="space-y-3">
              {qualifications.map((q) => (
                <button
                  key={q.name}
                  onClick={() => setActiveDoc(q)}
                  className={`w-full rounded-2xl border px-5 py-4 text-left transition duration-300 ${
                    activeDoc.name === q.name
                      ? "border-cyan-500/40 bg-cyan-500/10 text-white"
                      : "border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                  }`}
                >
                  {q.name}
                </button>
              ))}
            </div>

            {/* viewer */}
            <div className="overflow-hidden rounded-[28px] border border-zinc-800/80 bg-zinc-900/30 shadow-[0_0_50px_rgba(0,0,0,0.45)]">
              <iframe
                src={getPdfUrl(activeDoc.file, activeDoc.zoom)}
                className="h-[450px] w-full sm:h-[600px] md:h-[760px]"
              />
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
<footer
  className="relative scroll-mt-32 border-t border-zinc-800/80 py-20"
>
  <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row md:justify-between">

    {/* LEFT SIDE */}
    <div>
      <h3 className="bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-3xl font-bold text-transparent">
        Wian Maarten Coetsee
      </h3>

      <p className="mt-4 text-zinc-400">
        3D Artist • Environment Artist • Hard Surface Modelling
      </p>
    </div>

    {/* RIGHT SIDE */}
<div className="flex flex-col items-start gap-4">

  <a
    href="mailto:wiancoetsee@gmail.com"
    className="group flex items-center gap-3 rounded-2xl border border-cyan-500/20 bg-zinc-900/50 px-5 py-3 text-cyan-300 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-200 hover:shadow-[0_0_25px_rgba(34,211,238,0.18)]"
  >
    <span className="text-lg transition group-hover:translate-x-1">
      →
    </span>

    <span className="tracking-wide">
      wiancoetsee@gmail.com
    </span>
  </a>

  <a
    href="https://www.linkedin.com/in/wian-coetsee-01796b34a/"
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-3 rounded-2xl border border-cyan-500/20 bg-zinc-900/50 px-5 py-3 text-cyan-300 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-200 hover:shadow-[0_0_25px_rgba(34,211,238,0.18)]"
  >
    <span className="text-lg transition group-hover:translate-x-1">
      →
    </span>

    <span className="tracking-wide">
      LinkedIn Profile
    </span>
  </a>

</div>

  </div>
</footer>

      {/* GLOBAL FADE */}
<style jsx global>{`
  .show {
    opacity: 1 !important;
    transform: translateY(0px) !important;
  }

  section {
    opacity: 1;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: #09090b;
  }

  /* Hide scrollbar for mobile nav */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}</style>

    </div>
    
  );
}