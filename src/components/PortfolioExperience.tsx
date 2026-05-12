"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  ChevronRight,
  Command,
  Download,
  ExternalLink,
  FileText,
  Github,
  Mail,
  Menu,
  Search,
  Send,
  X
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  achievements,
  capabilityCards,
  commandItems,
  profile,
  projectCategories,
  projects,
  rolePhrases,
  skillCategories,
  socialLinks,
  stats,
  timeline
} from "@/lib/data";
import type { Project, ProjectCategory } from "@/lib/types";
import { cn, smoothScrollTo } from "@/lib/utils";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Timeline", href: "#timeline" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" }
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export default function PortfolioExperience() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [query, setQuery] = useState("");
  const [resumeOpen, setResumeOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }

      if (event.key === "Escape") {
        setPaletteOpen(false);
        setResumeOpen(false);
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return projects.filter((project) => {
      const categoryMatch =
        activeCategory === "All" ? true : activeCategory === "Featured" ? project.featured : project.category === activeCategory;

      if (!normalized) return categoryMatch;

      const haystack = [
        project.title,
        project.repo,
        project.summary,
        project.impact,
        ...project.stack,
        ...project.features
      ]
        .join(" ")
        .toLowerCase();

      return categoryMatch && haystack.includes(normalized);
    });
  }, [activeCategory, query]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-zinc-100">
      <BackgroundAtmosphere />
      <ScrollProgress />
      <Navbar
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onNavigate={() => setMenuOpen(false)}
        onResume={() => setResumeOpen(true)}
      />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onResume={() => setResumeOpen(true)}
      />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />

      <Hero onResume={() => setResumeOpen(true)} onPalette={() => setPaletteOpen(true)} />
      <About />
      <Skills />
      <Projects
        activeCategory={activeCategory}
        filteredProjects={filteredProjects}
        query={query}
        setActiveCategory={setActiveCategory}
        setQuery={setQuery}
      />
      <Timeline />
      <GithubAnalytics />
      <ResumeSection onResume={() => setResumeOpen(true)} />
      <Contact />
      <Footer />
    </main>
  );
}

function BackgroundAtmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-hero-radial" />
      <div className="grid-mask absolute inset-0 opacity-[0.22]">
        <div className="absolute inset-[-80px] animate-gridShift bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>
      <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-electric/10 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[440px] w-[440px] rounded-full bg-cyan/10 blur-[130px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(10,10,10,0.82)_74%)]" />
    </div>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? window.scrollY / height : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[70] h-1 w-full bg-white/5">
      <motion.div
        className="h-full bg-premium-gradient shadow-[0_0_24px_rgba(59,130,246,0.55)]"
        style={{ scaleX: progress, transformOrigin: "0% 50%" }}
      />
    </div>
  );
}

function Navbar({
  menuOpen,
  onMenuToggle,
  onNavigate,
  onResume
}: {
  menuOpen: boolean;
  onMenuToggle: () => void;
  onNavigate: () => void;
  onResume: () => void;
}) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-2xl">
      <nav className="section-shell flex h-16 items-center justify-between">
        <button
          className="focus-ring flex items-center gap-3 rounded-full"
          onClick={() => smoothScrollTo("#top")}
          type="button"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] font-manrope text-sm font-extrabold text-white shadow-glow">
            VG
          </span>
          <span className="hidden text-sm font-semibold text-white sm:block">Vansh Gupta</span>
        </button>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.035] p-1 lg:flex">
          {navItems.map((item) => (
            <button
              className="focus-ring rounded-full px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
              key={item.href}
              onClick={() => smoothScrollTo(item.href)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-200 transition hover:border-electric/50 hover:text-white"
            onClick={onResume}
            type="button"
          >
            <FileText className="h-4 w-4" />
            Resume
          </button>
          <button
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200"
            onClick={() => smoothScrollTo("#contact")}
            type="button"
          >
            <Mail className="h-4 w-4" />
            Contact
          </button>
        </div>

        <button
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] lg:hidden"
          onClick={onMenuToggle}
          type="button"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="section-shell pb-4 lg:hidden"
            exit={{ opacity: 0, y: -8 }}
            initial={{ opacity: 0, y: -8 }}
          >
            <div className="glass-panel grid gap-1 rounded-2xl p-2">
              {navItems.map((item) => (
                <button
                  className="focus-ring rounded-xl px-4 py-3 text-left text-sm text-zinc-200 hover:bg-white/10"
                  key={item.href}
                  onClick={() => {
                    smoothScrollTo(item.href);
                    onNavigate();
                  }}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
              <button
                className="focus-ring rounded-xl px-4 py-3 text-left text-sm text-zinc-200 hover:bg-white/10"
                onClick={() => {
                  onResume();
                  onNavigate();
                }}
                type="button"
              >
                Resume preview
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ onResume, onPalette }: { onResume: () => void; onPalette: () => void }) {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPhraseIndex((index) => (index + 1) % rolePhrases.length);
    }, 1900);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative z-10 flex min-h-screen items-center pb-20 pt-28" id="top">
      <div className="section-shell">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            animate="visible"
            className="max-w-4xl"
            initial="hidden"
            transition={{ staggerChildren: 0.12 }}
          >
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 backdrop-blur"
              variants={fadeUp}
            >
              <span className="h-2 w-2 rounded-full bg-emerald shadow-[0_0_18px_rgba(16,185,129,0.85)]" />
              Open to AI/ML internships, research, and ambitious product teams
            </motion.div>

            <motion.h1
              className="font-manrope text-5xl font-extrabold leading-[1.02] text-white sm:text-7xl lg:text-8xl"
              variants={fadeUp}
            >
              <span className="gradient-text block bg-[length:220%_100%] animate-shimmer pb-2">
                Vansh Gupta
              </span>
            </motion.h1>

            <motion.div
              className="mt-7 flex min-h-10 flex-wrap items-center gap-3 text-lg text-zinc-300 sm:text-xl"
              variants={fadeUp}
            >
              <span>{profile.role}</span>
              <span className="hidden h-1 w-1 rounded-full bg-zinc-500 sm:block" />
              <AnimatePresence mode="wait">
                <motion.span
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-full border border-electric/25 bg-electric/10 px-4 py-1.5 text-base font-semibold text-blue-200"
                  exit={{ opacity: 0, y: -10 }}
                  initial={{ opacity: 0, y: 10 }}
                  key={rolePhrases[phraseIndex]}
                >
                  {rolePhrases[phraseIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.p
              className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl"
              variants={fadeUp}
            >
              {profile.tagline} Current ML intern at Moleculyst, focused on Video LLMs,
              VLMs, and generative AI pipelines.
            </motion.p>

            <motion.div className="mt-9 flex flex-wrap gap-3" variants={fadeUp}>
              <button
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-zinc-200"
                onClick={() => smoothScrollTo("#projects")}
                type="button"
              >
                Explore work
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-electric/60"
                onClick={onResume}
                type="button"
              >
                <FileText className="h-4 w-4" />
                Preview resume
              </button>
              <a
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-cyan/60"
                href={profile.github}
                rel="noreferrer"
                target="_blank"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </motion.div>

            <motion.div className="mt-8 flex flex-wrap items-center gap-3" variants={fadeUp}>
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    aria-label={link.label}
                    className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-zinc-300 transition hover:-translate-y-0.5 hover:border-electric/60 hover:text-white"
                    href={link.href}
                    key={link.label}
                    rel="noreferrer"
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
              <button
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-zinc-300 transition hover:border-violet/60 hover:text-white"
                onClick={onPalette}
                type="button"
              >
                <Command className="h-4 w-4" />
                <span>Command</span>
                <kbd className="rounded-md border border-white/10 bg-black/40 px-2 py-0.5 text-[11px] text-zinc-400">
                  Cmd K
                </kbd>
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
            initial={{ opacity: 0, scale: 0.96 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="glass-panel relative overflow-hidden rounded-[2rem] p-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.16),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.14),transparent_34%)]" />
              <div className="relative rounded-[1.5rem] border border-white/10 bg-black/45 p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-sm text-zinc-500">system.identity</p>
                    <p className="font-manrope text-xl font-bold text-white">VanshGupta()</p>
                  </div>
                  <span className="rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                    active
                  </span>
                </div>
                <div className="mt-5 space-y-3 font-mono text-sm text-zinc-300">
                  <CodeLine label="role" value="AI/ML & Agentic AI Engineer" />
                  <CodeLine label="college" value="IIIT Bhopal - CGPA 8.62" />
                  <CodeLine label="current" value="ML Intern @ Moleculyst" />
                  <CodeLine label="focus" value="LLMs - VLMs - GenAI - RL" />
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                        key={stat.label}
                      >
                        <Icon className="mb-4 h-5 w-5 text-cyan" />
                        <p className="font-manrope text-2xl font-extrabold text-white">
                          {stat.value}
                        </p>
                        <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CodeLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="text-violet">self.{label}</span>
      <span className="text-zinc-600">=</span>
      <span className="text-cyan">&quot;{value}&quot;</span>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  copy
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <motion.div
      className="mb-10 max-w-3xl"
      initial="hidden"
      transition={{ duration: 0.6 }}
      variants={fadeUp}
      viewport={{ once: true, margin: "-80px" }}
      whileInView="visible"
    >
      <p className="mb-3 text-sm font-semibold uppercase text-cyan">{eyebrow}</p>
      <h2 className="font-manrope text-3xl font-extrabold text-white sm:text-5xl">{title}</h2>
      {copy && <p className="mt-4 text-base leading-7 text-zinc-400 sm:text-lg">{copy}</p>}
    </motion.div>
  );
}

function About() {
  return (
    <section className="relative z-10 py-24" id="about">
      <div className="section-shell">
        <SectionHeader
          copy=""
          eyebrow="About"
          title="A builder with a research spine and product instincts."
        />
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            className="glass-panel rounded-3xl p-6 sm:p-8"
            initial="hidden"
            variants={fadeUp}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <p className="text-lg leading-8 text-zinc-300">
              I&apos;m an Information Technology student at IIIT Bhopal building across
              LLMs, VLMs, reinforcement-learning environments, and applied ML systems.
              My current work at Moleculyst focuses on Video LLMs and multimodal AI,
              while my side projects turn that research energy into practical systems:
              fairness auditors, manufacturing intelligence dashboards, chemical toxicity
              predictors, and agentic image editing.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <InfoPill label="Education" value={`${profile.education.institution} - ${profile.education.cgpa}`} />
              <InfoPill label="Current focus" value="Video LLMs, VLMs, GenAI pipelines" />
              <InfoPill label="Location" value={profile.location} />
              <InfoPill label="Goal" value="AI/ML internships, research, startup teams" />
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {capabilityCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  className="glass-panel rounded-3xl p-6 transition hover:-translate-y-1 hover:border-electric/40"
                  initial="hidden"
                  key={card.title}
                  transition={{ delay: index * 0.08 }}
                  variants={fadeUp}
                  viewport={{ once: true }}
                  whileInView="visible"
                >
                  <div className="mb-8 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-cyan">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-manrope text-xl font-bold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{card.copy}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="text-xs uppercase text-zinc-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-zinc-100">{value}</p>
    </div>
  );
}

function Skills() {
  return (
    <section className="relative z-10 py-24" id="skills">
      <div className="section-shell">
        <SectionHeader
          copy=""
          eyebrow="Skills"
          title="A technical stack shaped around intelligent systems."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                className="glass-panel rounded-3xl p-6"
                initial="hidden"
                key={category.title}
                transition={{ delay: index * 0.04 }}
                variants={fadeUp}
                viewport={{ once: true }}
                whileInView="visible"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-manrope text-xl font-bold text-white">{category.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">{category.description}</p>
                  </div>
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-electric">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-medium text-zinc-200">{skill.name}</span>
                        <span className="text-zinc-500">{skill.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-premium-gradient"
                          initial={{ width: 0 }}
                          transition={{ duration: 0.9, ease: "easeOut" }}
                          viewport={{ once: true }}
                          whileInView={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects({
  activeCategory,
  filteredProjects,
  query,
  setActiveCategory,
  setQuery
}: {
  activeCategory: ProjectCategory;
  filteredProjects: Project[];
  query: string;
  setActiveCategory: (category: ProjectCategory) => void;
  setQuery: (query: string) => void;
}) {
  return (
    <section className="relative z-10 py-24" id="projects">
      <div className="section-shell">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader
            copy=""
            eyebrow="Projects"
            title="A portfolio of systems, not isolated demos."
          />
          <div className="glass-panel flex w-full max-w-md items-center gap-3 rounded-2xl px-4 py-3">
            <Search className="h-5 w-5 text-zinc-500" />
            <input
              aria-label="Search projects"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search stack, repo, feature..."
              value={query}
            />
          </div>
        </div>

        <div className="scrollbar-none mb-8 flex gap-2 overflow-x-auto pb-2">
          {projectCategories.map((category) => (
            <button
              className={cn(
                "focus-ring shrink-0 rounded-full border px-4 py-2 text-sm transition",
                activeCategory === category
                  ? "border-electric/60 bg-electric/15 text-white"
                  : "border-white/10 bg-white/[0.035] text-zinc-400 hover:text-white"
              )}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div className="grid gap-5 lg:grid-cols-2" layout>
            {filteredProjects.map((project, index) => (
              <ProjectCard index={index} key={project.repo} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="glass-panel rounded-3xl p-8 text-center text-zinc-400">
            No project matches that filter yet.
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "glass-panel group overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1 hover:border-electric/45",
        project.featured ? "lg:min-h-[620px]" : "lg:min-h-[520px]"
      )}
      exit={{ opacity: 0, scale: 0.97 }}
      initial={{ opacity: 0, y: 18 }}
      layout
      transition={{ delay: index * 0.03 }}
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-night">
        <img
          alt={`${project.title} GitHub preview`}
          className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
          loading="lazy"
          src={project.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/15 bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {project.category}
          </span>
          <span className="rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan-100 backdrop-blur">
            {project.status}
          </span>
        </div>
      </div>
      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-500">{project.repo}</p>
            <h3 className="mt-2 font-manrope text-2xl font-extrabold text-white">
              {project.title}
            </h3>
          </div>
          <div className="flex gap-2">
            <a
              aria-label={`${project.title} GitHub repository`}
              className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:border-electric/60 hover:text-white"
              href={project.githubUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Github className="h-4 w-4" />
            </a>
            {project.liveUrl && (
              <a
                aria-label={`${project.title} live demo`}
                className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:border-cyan/60 hover:text-white"
                href={project.liveUrl}
                rel="noreferrer"
                target="_blank"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        <p className="mt-5 text-sm leading-7 text-zinc-400">{project.summary}</p>
        <p className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-6 text-zinc-300">
          {project.impact}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300"
              key={tech}
            >
              {tech}
            </span>
          ))}
        </div>
        <ul className="mt-6 grid gap-3 text-sm text-zinc-400">
          {project.features.map((feature) => (
            <li className="flex gap-3" key={feature}>
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

function Timeline() {
  return (
    <section className="relative z-10 py-24" id="timeline">
      <div className="section-shell">
        <SectionHeader
          copy=""
          eyebrow="Experience & Achievements"
          title="Momentum across research, code, and competition."
        />
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <motion.div
                className="glass-panel rounded-3xl p-5"
                initial="hidden"
                key={achievement.label}
                transition={{ delay: index * 0.05 }}
                variants={fadeUp}
                viewport={{ once: true }}
                whileInView="visible"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-zinc-500">{achievement.label}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">{achievement.detail}</p>
                  </div>
                  <p className="font-manrope text-2xl font-extrabold gradient-text">
                    {achievement.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative space-y-5 before:absolute before:left-5 before:top-3 before:h-[calc(100%-24px)] before:w-px before:bg-white/10">
            {timeline.map((item, index) => (
              <motion.article
                className="relative pl-14"
                initial="hidden"
                key={`${item.title}-${item.organization}`}
                transition={{ delay: index * 0.08 }}
                variants={fadeUp}
                viewport={{ once: true }}
                whileInView="visible"
              >
                <div className="absolute left-0 top-2 grid h-10 w-10 place-items-center rounded-full border border-electric/40 bg-electric/15 text-electric">
                  <ChevronRight className="h-5 w-5" />
                </div>
                <div className="glass-panel rounded-3xl p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-zinc-300">
                      {item.kind}
                    </span>
                    <span className="text-zinc-600">{item.period}</span>
                  </div>
                  <h3 className="mt-4 font-manrope text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-cyan">{item.organization}</p>
                  <p className="mt-4 text-sm leading-6 text-zinc-400">{item.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm text-zinc-500">
                    {item.details.map((detail) => (
                      <li className="flex gap-2" key={detail}>
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GithubAnalytics() {
  const analytics = [
    {
      label: "Stats",
      src: "https://github-readme-stats-eight-theta.vercel.app/api?username=vansh7266&show_icons=true&theme=github_dark&hide_border=true&bg_color=0A0A0A&title_color=3B82F6&icon_color=06B6D4&text_color=F5F5F5"
    },
    {
      label: "Languages",
      src: "https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=vansh7266&layout=compact&theme=github_dark&hide_border=true&bg_color=0A0A0A&title_color=8B5CF6&text_color=F5F5F5&hide=html,css,javascript"
    },
    {
      label: "Streak",
      src: "https://github-readme-streak-stats.herokuapp.com?user=vansh7266&theme=github-dark-blue&hide_border=true&background=0A0A0A&stroke=3B82F6&ring=06B6D4&fire=8B5CF6&currStreakLabel=06B6D4"
    }
  ];

  return (
    <section className="relative z-10 py-24" id="github">
      <div className="section-shell">
        <SectionHeader
          copy=""
          eyebrow="GitHub Analytics"
          title="Visible activity, languages, and consistency."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {analytics.map((card) => (
            <div className="glass-panel overflow-hidden rounded-3xl p-4" key={card.label}>
              <img
                alt={`${card.label} for ${profile.name}`}
                className="min-h-44 w-full rounded-2xl object-contain"
                loading="lazy"
                src={card.src}
              />
            </div>
          ))}
        </div>
        <div className="glass-panel mt-5 overflow-hidden rounded-3xl p-4">
          <img
            alt="GitHub contribution activity graph for Vansh Gupta"
            className="min-h-64 w-full rounded-2xl object-contain"
            loading="lazy"
            src="https://github-readme-activity-graph.vercel.app/graph?username=vansh7266&theme=github-compact&hide_border=true&bg_color=0A0A0A&color=F5F5F5&line=3B82F6&point=06B6D4&area=true&area_color=3B82F6"
          />
        </div>
      </div>
    </section>
  );
}

function ResumeSection({ onResume }: { onResume: () => void }) {
  return (
    <section className="relative z-10 py-24" id="resume">
      <div className="section-shell">
        <div className="glass-panel grid gap-8 overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-cyan">Resume</p>
            <h2 className="font-manrope text-3xl font-extrabold text-white sm:text-5xl">
              One-page signal for recruiters and research teams.
            </h2>
            <p className="mt-5 text-base leading-7 text-zinc-400">
              Preview the resume inline or download the PDF.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
                onClick={onResume}
                type="button"
              >
                <FileText className="h-4 w-4" />
                Preview PDF
              </button>
              <a
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-electric/60"
                download
                href={profile.resume}
              >
                <Download className="h-4 w-4" />
                Download
              </a>
            </div>
          </div>
          <button
            className="focus-ring group relative min-h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-black/40 text-left"
            onClick={onResume}
            type="button"
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(59,130,246,0.24),transparent_42%),linear-gradient(315deg,rgba(6,182,212,0.18),transparent_44%)]" />
            <div className="absolute inset-x-8 top-8 rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-glow">
              <p className="font-manrope text-2xl font-extrabold text-white">Vansh Gupta</p>
              <p className="mt-2 text-sm text-zinc-400">AI/ML, GenAI, Agentic AI Developer</p>
              <div className="mt-5 space-y-3">
                <div className="h-2 w-4/5 rounded-full bg-white/20" />
                <div className="h-2 w-3/5 rounded-full bg-white/10" />
                <div className="h-2 w-5/6 rounded-full bg-white/10" />
              </div>
            </div>
            <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur">
              <span className="text-sm font-semibold text-white">Open resume preview</span>
              <ArrowUpRight className="h-5 w-5 text-cyan transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

    if (form.name.trim().length < 2) {
      setStatus("Please add your name.");
      return;
    }

    if (!emailOk) {
      setStatus("Please add a valid email address.");
      return;
    }

    if (form.message.trim().length < 12) {
      setStatus("Please write a little more context.");
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Hi Vansh,\n\n${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("Opening your email client...");
  };

  return (
    <section className="relative z-10 py-24" id="contact">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeader
              copy="For internships, research opportunities, hackathon teams, startup roles, or ambitious AI product ideas."
              eyebrow="Contact"
              title="Let's build something intelligent."
            />
            <div className="space-y-3">
              <a
                className="focus-ring flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-zinc-200 transition hover:border-electric/50"
                href={`mailto:${profile.email}`}
              >
                <span>{profile.email}</span>
                <Mail className="h-5 w-5 text-cyan" />
              </a>
              <a
                className="focus-ring flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-zinc-200 transition hover:border-electric/50"
                href={profile.linkedin}
                rel="noreferrer"
                target="_blank"
              >
                <span>LinkedIn profile</span>
                <ArrowUpRight className="h-5 w-5 text-cyan" />
              </a>
            </div>
          </div>
          <form className="glass-panel rounded-3xl p-6 sm:p-8" onSubmit={onSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Name"
                onChange={(value) => setForm((current) => ({ ...current, name: value }))}
                placeholder="Your name"
                value={form.name}
              />
              <FormField
                label="Email"
                onChange={(value) => setForm((current) => ({ ...current, email: value }))}
                placeholder="you@example.com"
                type="email"
                value={form.email}
              />
            </div>
            <label className="mt-4 block">
              <span className="text-sm font-medium text-zinc-300">Message</span>
              <textarea
                className="focus-ring mt-2 min-h-40 w-full resize-none rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-electric/60"
                onChange={(event) =>
                  setForm((current) => ({ ...current, message: event.target.value }))
                }
                placeholder="Tell me what you are building, hiring for, or exploring..."
                value={form.message}
              />
            </label>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <p className="min-h-5 text-sm text-zinc-500">{status}</p>
              <button
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
                type="submit"
              >
                <Send className="h-4 w-4" />
                Send email
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  onChange,
  placeholder,
  type = "text",
  value
}: {
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  value: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-300">{label}</span>
      <input
        className="focus-ring mt-2 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-electric/60"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </label>
  );
}

function CommandPalette({
  open,
  onClose,
  onResume
}: {
  open: boolean;
  onClose: () => void;
  onResume: () => void;
}) {
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const base = commandItems.map((item) => ({ ...item, type: "Navigate" }));
    const projectItems = projects.slice(0, 10).map((project) => ({
      label: project.title,
      href: project.githubUrl,
      icon: Github,
      type: "Project"
    }));

    return [...base, ...projectItems].filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[90] bg-black/70 p-4 backdrop-blur-xl"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          role="dialog"
        >
          <button
            aria-label="Close command palette"
            className="absolute inset-0 h-full w-full"
            onClick={onClose}
            type="button"
          />
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass-panel relative mx-auto mt-24 max-w-2xl overflow-hidden rounded-3xl"
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Command className="h-5 w-5 text-cyan" />
              <input
                autoFocus
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Jump to a section or open a project..."
                value={query}
              />
              <button
                aria-label="Close command palette"
                className="focus-ring grid h-8 w-8 place-items-center rounded-full hover:bg-white/10"
                onClick={onClose}
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[55vh] overflow-y-auto p-2">
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    className="focus-ring flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition hover:bg-white/[0.07]"
                    key={`${item.type}-${item.label}`}
                    onClick={() => {
                      if (item.href === "#resume") {
                        onResume();
                      } else {
                        smoothScrollTo(item.href);
                      }
                      onClose();
                    }}
                    type="button"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-cyan">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-white">
                        {item.label}
                      </span>
                      <span className="text-xs text-zinc-500">{item.type}</span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-zinc-600" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[95] bg-black/75 p-4 backdrop-blur-xl"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          role="dialog"
        >
          <button
            aria-label="Close resume modal"
            className="absolute inset-0 h-full w-full"
            onClick={onClose}
            type="button"
          />
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass-panel relative mx-auto flex h-[88vh] max-w-5xl flex-col overflow-hidden rounded-3xl"
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
              <div>
                <p className="font-manrope text-lg font-bold text-white">Vansh Gupta Resume</p>
                <p className="text-sm text-zinc-500">PDF preview and download</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-200 hover:border-electric/60"
                  download
                  href={profile.resume}
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
                <button
                  aria-label="Close resume modal"
                  className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] hover:border-white/30"
                  onClick={onClose}
                  type="button"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <iframe className="h-full w-full bg-zinc-950" src={profile.resume} title="Resume PDF" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-10">
      <div className="section-shell flex flex-col justify-between gap-4 text-sm text-zinc-500 sm:flex-row sm:items-center">
        <p>Vansh Gupta Portfolio</p>
        <div className="flex gap-4">
          <a className="hover:text-white" href={profile.github} rel="noreferrer" target="_blank">
            GitHub
          </a>
          <a className="hover:text-white" href={profile.linkedin} rel="noreferrer" target="_blank">
            LinkedIn
          </a>
          <a className="hover:text-white" href={`mailto:${profile.email}`}>
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
