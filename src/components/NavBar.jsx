import { cn } from "@/lib/utils";
import { Menu, Pause, Play, Volume2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const AudioControls = ({
  isPlaying,
  onToggle,
  volume,
  onVolumeChange,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-full border border-border/60 bg-background/50 px-3 py-2 backdrop-blur-sm",
        className,
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="cursor-pointer rounded-full p-1.5 text-foreground/80 transition-colors duration-300 hover:text-primary focus:outline-none"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>

      <Volume2 size={17} className="text-foreground/60" aria-hidden="true" />

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(event) => onVolumeChange(Number(event.target.value))}
        className="h-1.5 w-24 cursor-pointer accent-primary md:w-20 lg:w-24"
        aria-label="Music volume"
      />
    </div>
  );
};

export const NavBar = () => {
  const audioRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [autoplayFailed, setAutoplayFailed] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", isMenuOpen);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setAutoplayFailed(false);
        })
        .catch(() => {
          setIsPlaying(false);
          setAutoplayFailed(true);
        });
    }
  }, []);

  const toggleAudio = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
      setAutoplayFailed(false);
    } catch {
      setIsPlaying(false);
      setAutoplayFailed(true);
    }
  };

  const handleVolumeChange = (nextVolume) => {
    setVolume(nextVolume);

    if (audioRef.current) {
      audioRef.current.volume = nextVolume;
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/theme.wav"
        loop
        preload="auto"
        onPlay={() => {
          setIsPlaying(true);
          setAutoplayFailed(false);
        }}
        onPause={() => setIsPlaying(false)}
      />

      <nav
        className={cn(
          "fixed w-full z-50 transition-all duration-300",
          isScrolled
            ? "py-3 bg-background/80 backdrop-blur-md shadow-sm"
            : "py-5",
        )}
      >
        <div className="container relative flex items-center justify-between">
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex items-center gap-10">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative text-sm font-medium tracking-wide",
                    "text-foreground/80 hover:text-foreground transition-colors duration-300",
                  )}
                >
                  <span className="relative inline-block px-1 py-1">
                    {item.name}
                    <span
                      className={cn(
                        "pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-1",
                        "h-[3px] w-full rounded-full bg-primary",
                        "origin-center scale-x-0 opacity-0",
                        "transition-all duration-300 ease-out",
                        "group-hover:scale-x-100 group-hover:opacity-100",
                      )}
                    />
                  </span>
                </a>
              ))}

              <AudioControls
                isPlaying={isPlaying}
                onToggle={toggleAudio}
                volume={volume}
                onVolumeChange={handleVolumeChange}
                className={cn(
                  "ml-1",
                  autoplayFailed && "border-primary/60 shadow-sm",
                )}
              />

              <div className="ml-2">
                <ThemeToggle />
              </div>
            </div>
          </div>

          <a
            className="md:hidden text-xl font-bold text-primary flex items-center"
            href="#hero"
          >
            <span className="relative z-10">
              <span className="text-glow text-foreground">Rodrigo</span>{" "}
              Portfolio
            </span>
          </a>

          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-foreground z-[60]"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          className={cn(
            "fixed inset-0 md:hidden",
            "z-[100] bg-background/95 backdrop-blur-md",
          )}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 p-2 text-foreground"
            aria-label="Close Menu"
          >
            <X size={24} />
          </button>

          <div className="min-h-screen flex flex-col items-center justify-center gap-8 text-xl">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-2">
              <ThemeToggle />
            </div>
            <AudioControls
              isPlaying={isPlaying}
              onToggle={toggleAudio}
              volume={volume}
              onVolumeChange={handleVolumeChange}
              className={cn(
                "mt-1",
                autoplayFailed && "border-primary/60 shadow-sm",
              )}
            />
          </div>
        </div>
      )}
    </>
  );
};
