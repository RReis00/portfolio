import { useLayoutEffect, useMemo, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Senvu",
    description: "Something funny",
    image: "/projects/senvu.PNG",
    demoUrl: "https://senvu-app.vercel.app/",
    githubUrl: "https://github.com/RReis00",
  },
  {
    id: 2,
    title: "GameVault",
    description: "Discover, search, and organize your favorite games.",
    image: "/projects/gamevault.JPG",
    demoUrl: "https://vgamevault.netlify.app/",
    githubUrl: "https://github.com/RReis00/gamevault",
  },
  {
    id: 3,
    title: "Jammerge",
    description:
      "Discover music, build custom playlists, and export to Spotify.",
    image: "/projects/jammerge.JPG",
    demoUrl: "https://jammerge.netlify.app/",
    githubUrl: "https://github.com/RReis00/jammming",
  },
  {
    id: 4,
    title: "Photography Portfolio",
    description: "Personal photography and videography portfolio",
    image: "/projects/portfolio-david.JPG",
    demoUrl: "https://dbfestudio.netlify.app/",
    githubUrl: "https://github.com/RReis00/portfolioDavid",
  },
  {
    id: 5,
    title: "Orbit",
    description: "Real-time event & location sharing app",
    image: "/projects/orbit-icone.JPG",
    demoUrl: "https://orbit-wheat-phi.vercel.app/",
    githubUrl: "https://github.com/RReis00/orbit",
  },
];

export const ProjectsSection = () => {
  const count = projects.length;
  const step = useMemo(() => 360 / count, [count]);

  const wrapRef = useRef(null);
  const cardRefs = useRef([]);
  const rot = useRef({ value: 0 });
  const radiusRef = useRef(320);

  const [activeIndex, setActiveIndex] = useState(0);

  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startRotRef = useRef(0);

  const clampIndex = (i) => ((i % count) + count) % count;

  const getCurrentIndexFromRotation = useCallback(() => {
    return clampIndex(Math.round(-rot.current.value / step));
  }, [step, count]);

  const render = useCallback(() => {
    const r = radiusRef.current;
    const baseRot = rot.current.value;

    cardRefs.current.forEach((el, i) => {
      if (!el) return;

      const aDeg = i * step + baseRot;
      const a = (aDeg * Math.PI) / 180;

      const x = Math.sin(a) * r;
      const z = Math.cos(a) * r;

      const depth = (z + r) / (2 * r);
      const scale = 0.55 + depth * 0.45;
      const opacity = 0.15 + depth * 0.85;

      const tilt = 120;
      const yOffset = (z / r) * tilt;

      const isFront = depth > 0.85;

      const isBehind = z < 0;

      gsap.set(el, {
        xPercent: -50,
        yPercent: -50,

        x,
        z,
        y: yOffset,
        rotationY: -aDeg + (isBehind ? 180 : 0),
        scale,
        autoAlpha: opacity,
        zIndex: Math.round(depth * 1000),
        pointerEvents: isFront ? "auto" : "none",
        filter:
          depth < 0.5
            ? `blur(${Math.max(0, (0.5 - depth) * 10)}px)`
            : "blur(0px)",
        webkitFontSmoothing: "antialiased",
        backfaceVisibility: "visible",
        transformStyle: "preserve-3d",
      });
    });
  }, [step]);

  const animateToRotation = useCallback(
    (targetRot) => {
      gsap.killTweensOf(rot.current);

      gsap.to(rot.current, {
        value: targetRot,
        duration: 1.2,
        ease: "power3.out",
        onUpdate: render,
        onComplete: () => {
          const idx = getCurrentIndexFromRotation();
          setActiveIndex(idx);
        },
      });
    },
    [render, getCurrentIndexFromRotation],
  );

  const goToIndex = useCallback(
    (idx) => {
      const currentRot = rot.current.value;
      const targetRot = -idx * step;

      const diff = ((((targetRot - currentRot + 180) % 360) + 360) % 360) - 180;

      animateToRotation(currentRot + diff);
    },
    [step, animateToRotation],
  );

  const go = useCallback(
    (dir) => {
      const currentIdx = getCurrentIndexFromRotation();
      const nextIdx = clampIndex(currentIdx + dir);
      goToIndex(nextIdx);
    },
    [getCurrentIndexFromRotation, goToIndex, count],
  );

  useLayoutEffect(() => {
    const computeRadius = () => {
      if (!wrapRef.current) return;
      const w = wrapRef.current.getBoundingClientRect().width;
      radiusRef.current = Math.max(240, Math.min(350, w * 0.35));
      render();
    };

    window.addEventListener("resize", computeRadius);
    computeRadius();

    const el = wrapRef.current;
    if (!el) return;

    const onDown = (e) => {
      draggingRef.current = true;
      startXRef.current = e.clientX;
      startRotRef.current = rot.current.value;
      gsap.killTweensOf(rot.current);
      el.style.cursor = "grabbing";
    };

    const onMove = (e) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - startXRef.current;
      rot.current.value = startRotRef.current + dx * 0.18;
      render();
    };

    const onUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      el.style.cursor = "grab";
      const nearestIdx = Math.round(-rot.current.value / step);
      animateToRotation(-nearestIdx * step);
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("resize", computeRadius);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [step, render, animateToRotation]);

  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Here you can see some of my work.
        </p>

        <div
          ref={wrapRef}
          className="relative mx-auto h-[520px] md:h-[560px] select-none touch-none cursor-grab"
        >
          <div className="absolute inset-0 flex items-center justify-center [perspective:2000px]">
            <div className="relative w-full h-full [transform-style:preserve-3d]">
              {/* Central star */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
                <div className="w-10 h-10 rounded-full bg-primary/40 blur-2xl" />
                <div className="absolute inset-0 w-10 h-10 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.8)_0%,transparent_70%)]" />
              </div>

              {projects.map((project, i) => (
                <div
                  key={project.id}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="absolute left-1/2 top-1/2 will-change-transform"
                >
                  <div className="group bg-card/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 w-[230px] md:w-[250px]">
                    <div className="h-36 overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        draggable={false}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-bold mb-1 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-[11px] mb-4 line-clamp-2 leading-snug">
                        {project.description}
                      </p>
                      <div className="flex gap-2">
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-white py-1.5 rounded-lg text-[10px] font-bold"
                        >
                          <ExternalLink size={12} /> LIVE
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-secondary/50 hover:bg-secondary text-foreground transition-all"
                        >
                          <Github size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-6 mt-15 relative z-[5000]">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              className="cursor-pointer h-10 w-10 rounded-full border border-white/10 bg-background/60 backdrop-blur-md flex items-center justify-center hover:bg-primary transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-background/30 backdrop-blur-md">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => goToIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === activeIndex ? "w-8 bg-primary" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              className="cursor-pointer h-10 w-10 rounded-full border border-white/10 bg-background/60 backdrop-blur-md flex items-center justify-center hover:bg-primary transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <a
            className="cosmic-button w-fit flex items-center gap-2 group"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/RReis00"
          >
            Check My Github
            <ArrowRight
              size={17}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </div>
    </section>
  );
};
