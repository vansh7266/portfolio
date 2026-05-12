import type { LucideIcon } from "lucide-react";

export type ProjectCategory =
  | "All"
  | "Featured"
  | "Agentic AI"
  | "ML Systems"
  | "Product"
  | "Algorithms";

export type ProjectStatus = "Live" | "Case Study" | "Prototype" | "Repository" | "Early";

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  huggingFace: string;
  resume: string;
  education: {
    degree: string;
    institution: string;
    period: string;
    cgpa: string;
  };
};

export type Skill = {
  name: string;
  level: number;
};

export type SkillCategory = {
  title: string;
  description: string;
  icon: LucideIcon;
  skills: Skill[];
};

export type Project = {
  title: string;
  repo: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  summary: string;
  impact: string;
  stack: string[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
};

export type TimelineItem = {
  title: string;
  organization: string;
  period: string;
  kind: string;
  summary: string;
  details: string[];
};

export type Achievement = {
  label: string;
  value: string;
  detail: string;
};
