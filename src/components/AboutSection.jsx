import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { Leaf, Brain, Rocket, X } from "lucide-react";

export const AboutSection = () => {
  const cards = useMemo(
    () => [
      {
        Icon: Leaf,
        title: "Roots & work ethic",
        preview:
          "I started working at 14 — discipline, responsibility, and consistency shaped me early.",
        full: (
          <>
            <p className="text-muted-foreground leading-relaxed">
              I began my professional life at 14, working as a farmer in my
              uncle’s agricultural business. Every summer and school break until
              2022, I was there — learning discipline, consistency, and
              responsibility through real work.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              That early exposure shaped my mindset: show up, stay reliable, pay
              attention to detail, and improve whatever process you are part of.
            </p>
          </>
        ),
      },
      {
        Icon: Brain,
        title: "Curiosity & systems thinking",
        preview:
          "Deep curiosity across fields, with a strong focus on engineering and system design.",
        full: (
          <>
            <p className="text-muted-foreground leading-relaxed">
              I am deeply curious about multiple disciplines — geopolitics,
              politics, history, theology, economics, finance, and nutrition —
              but above all, engineering, architecture, and systems development.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              In 2022, I started working in retail at Bershka (Inditex).
              Although unrelated to programming, the experience was eye-opening.
              I observed how strong organizational structure, internal software,
              and well- designed processes elevate performance.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              It became clear to me: great people matter, but well-designed
              systems make everyone better at what they do.
            </p>
          </>
        ),
      },
      {
        Icon: Rocket,
        title: "Building to solve real problems",
        preview:
          "I design and build software to solve real problems — mine and others’.",
        full: (
          <>
            <p className="text-muted-foreground leading-relaxed">
              I studied programming in a technical professional course during
              secondary school, where my final project was the development of a
              library management system. The goal was to replace a fully
              paper-based book rental process I found outdated and inefficient.
            </p>

            <p className="text-muted-foreground leading-relaxed mt-3">
              Later, I pursued Computer Engineering at university and uring that
              period, I worked on projects such as a smart home simulation
              involving sensor monitoring and actuator control, which
              strengthened my understanding of systems design and architecture.
            </p>

            <p className="text-muted-foreground leading-relaxed mt-3">
              After university, I focused intensely on personal projects aimed
              at solving practical, real-world problems:
            </p>

            <ul className="my-5 space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
              <li>
                A real-time geolocation sharing platform for events, with a
                configurable safety radius and alerts if someone leaves the
                defined area.
              </li>
              <li>
                An internal task and workflow management platform tailored to
                the retail environment where I work.
              </li>
              <li>
                A budgets and services management platform with PDF export,
                designed to be simple, flexible, and accessible even for
                non-technical users — currently my first product being finalized
                for public release.
              </li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-3">
              My objective remains consistent: to design systems that solve
              meaningful problems and improve how people work.
            </p>
          </>
        ),
      },
    ],
    [],
  );

  const cardButtonRefs = useRef([]);
  const originRectRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(null);

  const overlayCardRef = useRef(null);
  const overlayInnerRef = useRef(null);
  const backdropRef = useRef(null);

  const openCard = (index) => {
    const el = cardButtonRefs.current[index];
    if (!el) return;

    originRectRef.current = el.getBoundingClientRect();
    setActiveIndex(index);
  };

  const closeCard = () => {
    if (activeIndex === null) return;

    const originEl = cardButtonRefs.current[activeIndex];
    const rect = originEl?.getBoundingClientRect() ?? originRectRef.current;

    if (!rect || !overlayCardRef.current || !overlayInnerRef.current) {
      setActiveIndex(null);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => setActiveIndex(null),
    });

    tl.to(
      backdropRef.current,
      { opacity: 0, duration: 0.18, ease: "power1.out" },
      0,
    )
      .to(
        overlayInnerRef.current,
        { rotateY: 0, duration: 0.45, ease: "power3.out" },
        0,
      )
      .to(
        overlayCardRef.current,
        {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          duration: 0.5,
          ease: "power3.inOut",
        },
        0,
      );
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeCard();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  useLayoutEffect(() => {
    if (activeIndex === null) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const from = originRectRef.current;
    if (!from || !overlayCardRef.current || !overlayInnerRef.current) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const targetW = Math.min(vw - 48, 860);
    const targetH = Math.min(vh - 140, 580);
    const targetL = Math.round((vw - targetW) / 2);
    const targetT = Math.round((vh - targetH) / 2);

    const ctx = gsap.context(() => {
      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.set(overlayCardRef.current, {
        top: from.top,
        left: from.left,
        width: from.width,
        height: from.height,
      });

      gsap.set(overlayInnerRef.current, {
        rotateY: 0,
        transformStyle: "preserve-3d",
      });

      const tl = gsap.timeline();
      tl.to(
        backdropRef.current,
        { opacity: 1, duration: 0.2, ease: "power1.out" },
        0,
      )
        .to(
          overlayCardRef.current,
          {
            top: targetT,
            left: targetL,
            width: targetW,
            height: targetH,
            duration: 0.55,
            ease: "power3.out",
          },
          0,
        )
        .to(
          overlayInnerRef.current,
          { rotateY: 180, duration: 0.55, ease: "power3.out" },
          0.05,
        );
    });

    return () => ctx.revert();
  }, [activeIndex]);

  const activeCard = activeIndex !== null ? cards[activeIndex] : null;

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div className="space-y-6">
            <h3 className="text-4xl font-semibold">Web Developer</h3>

            <p className="text-muted-foreground leading-relaxed">
              I am a young knowledge-driven individual with a strong passion for
              engineering, architecture, and systems development. My goal is to
              build practical software that solves real-world problems through
              clarity, structure, and thoughtful design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center">
              <a href="#contact" className="cosmic-button">
                Get in touch
              </a>

              <a
                target="_blank"
                rel="noreferrer"
                href="/Rodrigo_Reis_CV.pdf"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-1 gap-6">
            {cards.map((item, i) => (
              <button
                key={item.title}
                ref={(el) => (cardButtonRefs.current[i] = el)}
                type="button"
                onClick={() => openCard(i)}
                className={`
                  gradient-border p-6 card-hover rounded-2xl text-left cursor-pointer
                  transition-opacity duration-200
                  ${activeIndex === i ? "opacity-0 pointer-events-none" : "opacity-100"}
                `}
                aria-haspopup="dialog"
                aria-expanded={activeIndex === i}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <item.Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{item.title}</h4>
                    <p className="text-muted-foreground mt-1">{item.preview}</p>
                    <div className="mt-4 text-sm text-primary/70">
                      Click to open
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* OVERLAY */}
      {activeCard && (
        <div className="fixed inset-0 z-50">
          <div
            ref={backdropRef}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeCard}
          />

          {/* Container */}
          <div
            ref={overlayCardRef}
            className="fixed rounded-2xl"
            style={{ willChange: "top,left,width,height" }}
            role="dialog"
            aria-modal="true"
          >
            <div className="[perspective:1200px] h-full w-full">
              <div
                ref={overlayInnerRef}
                className="relative h-full w-full [transform-style:preserve-3d] will-change-transform"
              >
                {/* FRONT */}
                <div className="absolute inset-0 [backface-visibility:hidden]">
                  <div className="gradient-border rounded-2xl overflow-hidden h-full w-full">
                    <div className="h-full w-full p-6 bg-background/50 backdrop-blur-md">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-primary/10">
                          <activeCard.Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">
                            {activeCard.title}
                          </h4>
                          <p className="text-muted-foreground mt-1">
                            {activeCard.preview}
                          </p>
                          <div className="mt-4 text-sm text-primary/70">
                            Opening…
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="gradient-border rounded-2xl overflow-hidden h-full w-full">
                    <div className="h-full w-full p-6 bg-background/70 backdrop-blur-xl overflow-auto">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-full bg-primary/10">
                            <activeCard.Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-xl">
                              {activeCard.title}
                            </h4>
                            <div className="mt-4">{activeCard.full}</div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={closeCard}
                          className="shrink-0 p-2 rounded-full hover:bg-primary/10 transition cursor-pointer"
                          aria-label="Close"
                        >
                          <X className="h-5 w-5 text-primary/80" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
