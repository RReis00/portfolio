import { ArrowDown } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export const HeroSection = () => {
  const heroRef = useRef(null);
  const floatRef = useRef(null);
  const tiltRef = useRef(null);
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let lastX = 0;
    let lastY = 0;

    const ctx = gsap.context(() => {
      if (!floatRef.current || !tiltRef.current || !imgRef.current) return;

      // Entrada
      gsap.fromTo(
        floatRef.current,
        { autoAlpha: 0, y: 40, scale: 0.92, rotate: -2 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.6,
        },
      );

      if (prefersReduced) return;

      // Float contínuo (no espaço)
      gsap.to(floatRef.current, {
        y: -12,
        rotate: 1.2,
        duration: 3.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.6,
      });

      // QUICK-TO para “arrasto” (segue o cursor e demora + ~0.5s)
      const xTo = gsap.quickTo(tiltRef.current, "x", {
        duration: 0.85,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(tiltRef.current, "y", {
        duration: 0.85,
        ease: "power3.out",
      });
      const ryTo = gsap.quickTo(tiltRef.current, "rotateY", {
        duration: 0.85,
        ease: "power3.out",
      });
      const rxTo = gsap.quickTo(tiltRef.current, "rotateX", {
        duration: 0.85,
        ease: "power3.out",
      });

      // Stretch (alongado) no próprio PNG
      const sxTo = gsap.quickTo(imgRef.current, "scaleX", {
        duration: 0.65,
        ease: "power3.out",
      });
      const syTo = gsap.quickTo(imgRef.current, "scaleY", {
        duration: 0.65,
        ease: "power3.out",
      });
      const skTo = gsap.quickTo(imgRef.current, "skewX", {
        duration: 0.65,
        ease: "power3.out",
      });

      const el = heroRef.current;

      const onMove = (e) => {
        const r = el.getBoundingClientRect();

        // normalizados -0.5..0.5
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;

        // MAIS follow (antes tinhas 18/12 e rotação 6)
        xTo(nx * 34);
        yTo(ny * 22);
        ryTo(nx * 10);
        rxTo(-ny * 10);

        // velocidade do cursor -> stretch
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;

        const v = Math.min(Math.sqrt(dx * dx + dy * dy), 50); // clamp
        const stretch = (v / 50) * 0.1; // 0..0.10

        // alonga no eixo do movimento (um toque “smear”)
        sxTo(1 + stretch);
        syTo(1 - stretch);

        // skew subtil para “sensação de arrasto”
        skTo(nx * 6);
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
        ryTo(0);
        rxTo(0);

        sxTo(1);
        syTo(1);
        skTo(0);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);

      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 [perspective:1100px]"
    >
      <div className="container max-w-6xl mx-auto z-10">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Texto */}
          <div className="text-center md:text-left">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <span className="opacity-0 animate-fade-in"> Hi, I'm </span>
                <span className="text-primary opacity-0 animate-fade-in-delay-1">
                  Rodrigo
                </span>
                <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
                  Reis
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0 opacity-0 animate-fade-in-delay-3">
                I build modern digital experiences with a strong focus on
                front-end development. My work centers on creating interfaces
                that are intuitive, visually refined, and optimized for
                performance.
              </p>

              <div className="pt-4 opacity-0 animate-fade-in-delay-4">
                <a href="#projects" className="cosmic-button">
                  View My Work
                </a>
              </div>
            </div>
          </div>

          {/* Imagem */}
          <div className="flex justify-center md:justify-end">
            <div
              ref={floatRef}
              className="
                relative opacity-0 will-change-transform
                w-[300px] sm:w-[380px] md:w-[520px] lg:w-[620px]
                before:content-[''] before:absolute before:inset-[-14%] before:rounded-full
                before:bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.35),transparent_60%)]
                before:blur-2xl
              "
            >
              <div
                ref={tiltRef}
                className="relative will-change-transform [transform-style:preserve-3d]"
              >
                <img
                  ref={imgRef}
                  src="/caricatura-astronauta.png"
                  alt="Caricatura astronauta"
                  draggable="false"
                  className="w-full h-auto select-none drop-shadow-[0_25px_35px_rgba(0,0,0,0.55)] [transform:translateZ(30px)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-10">
        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
