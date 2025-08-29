import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "GameVault",
    description: "Discover, search, and organize your favorite games.",
    image: "/projects/gamevault.JPG",
    tags: [
      "React",
      "Redux Toolkit",
      "React Router",
      "Bootstrap",
      "Context API",
    ],
    demoUrl: "https://vgamevault.netlify.app/",
    githubUrl: "https://github.com/RReis00/gamevault",
  },
  {
    id: 2,
    title: "Jammerge",
    description:
      "Discover music, build custom playlists, and export to Spotify.",
    image: "/projects/jammerge.JPG",
    tags: ["React", "Spotify Web API", "Authorization Code with PKCE"],
    demoUrl: "https://jammerge.netlify.app/",
    githubUrl: "https://github.com/RReis00/jammming",
  },
  {
    id: 3,
    title: "GsapProject",
    description: "Unfinished",
    image: "/projects/gsapproject.JPG",
    tags: ["React", "TailwindCSS", "GSAP"],
    demoUrl: "https://gsapprojectt.netlify.app/",
    githubUrl: "https://github.com/RReis00/gsap-project",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance and user experience
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden p-2">
                <a href={project.demoUrl} target="_blank">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </a>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, key) => (
                    <span
                      key={key}
                      className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/RReis00"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
