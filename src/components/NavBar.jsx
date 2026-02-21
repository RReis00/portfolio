import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <>
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
          </div>
        </div>
      )}
    </>
  );
};
