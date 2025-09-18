import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // Frontend
  { name: "HTML/CSS", level: 90, category: "frontend" },
  { name: "JavaScript / TypeScript", level: 90, category: "frontend" },
  {
    name: "React / Redux Toolkit / React Router",
    level: 90,
    category: "frontend",
  },
  { name: "Next.js", level: 50, category: "frontend" },
  { name: "Tailwind CSS / Bootstrap / GSAP", level: 80, category: "frontend" },

  // Backend
  { name: "Node.js", level: 80, category: "backend" },
  { name: "REST APIs", level: 80, category: "backend" },

  {
    name: "MongoDB / Supabase / IndexedDB / MySQL",
    level: 40,
    category: "backend",
  },

  // Tools
  { name: "Git/GitHub", level: 90, category: "tools" },
  { name: "Netlify / Vercel", level: 80, category: "tools" },
  { name: "Jest / Cypress / Mocha", level: 60, category: "tools" },
  { name: "Vite / Webpack", level: 70, category: "tools" },

  // Extra
  { name: "Responsive Design", level: 90, category: "extra" },
  { name: "Agile / Scrum basics", level: 60, category: "extra" },
  { name: "OAuth / PKCE", level: 70, category: "extra" },
];

const categories = ["all", "frontend", "backend", "tools", "extra"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto mx-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
