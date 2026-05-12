import {
  Award,
  Binary,
  Blocks,
  Bot,
  BrainCircuit,
  Cloud,
  Code2,
  Cpu,
  Database,
  Github,
  Globe2,
  GraduationCap,
  Linkedin,
  Mail,
  Network,
  Rocket,
  Sparkles,
  Terminal,
  Trophy,
  Wrench
} from "lucide-react";
import type {
  Achievement,
  Profile,
  Project,
  ProjectCategory,
  SkillCategory,
  SocialLink,
  TimelineItem
} from "./types";

const repoImage = (repo: string) =>
  `https://opengraph.githubassets.com/vansh-portfolio-${repo}/vansh7266/${repo}`;

// Set to false to revert back to the GitHub OpenGraph images
const USE_DYNAMIC_IMAGES = true;

const getProjectImage = (repo: string, customImage: string) => 
  USE_DYNAMIC_IMAGES ? customImage : repoImage(repo);

export const profile: Profile = {
  name: "Vansh Gupta",
  role: "AI/ML & Agentic AI Engineer",
  tagline:
    "Building intelligent systems with LLMs, VLMs, reinforcement-learning environments, and production-minded AI applications.",
  email: "vanshgupta7266@gmail.com",
  phone: "+91 9289011325",
  location: "Bhopal, Madhya Pradesh",
  github: "https://github.com/vansh7266",
  linkedin: "https://www.linkedin.com/in/vansh-2977g/",
  huggingFace: "https://huggingface.co/vansh7266",
  resume: "/resume.pdf",
  education: {
    degree: "B.Tech in Information Technology",
    institution: "IIIT Bhopal",
    period: "2024 - 2028",
    cgpa: "8.62/10"
  }
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: profile.github, icon: Github },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  { label: "Hugging Face", href: profile.huggingFace, icon: Sparkles }
];

export const rolePhrases = [
  "Agentic AI Systems",
  "Video LLMs & VLMs",
  "ML Pipelines",
  "FastAPI + Docker",
  "Research-Driven Products"
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    description: "Core implementation languages for systems, ML, and algorithms.",
    icon: Code2,
    skills: [
      { name: "Python", level: 94 },
      { name: "C++", level: 84 },
      { name: "C", level: 76 },
      { name: "SQL", level: 72 }
    ]
  },
  {
    title: "AI / ML",
    description: "Modeling, training, evaluation, vision, and explainability.",
    icon: BrainCircuit,
    skills: [
      { name: "Machine Learning", level: 92 },
      { name: "Deep Learning", level: 86 },
      { name: "PyTorch", level: 84 },
      { name: "TensorFlow", level: 78 },
      { name: "Scikit-learn", level: 88 },
      { name: "OpenCV", level: 80 }
    ]
  },
  {
    title: "GenAI & Agents",
    description: "LLM/VLM orchestration, agent loops, grounding, and RAG-style systems.",
    icon: Bot,
    skills: [
      { name: "LLMs", level: 92 },
      { name: "VLMs", level: 88 },
      { name: "RAG", level: 82 },
      { name: "LangChain", level: 82 },
      { name: "LangGraph", level: 84 },
      { name: "Gemini API", level: 90 },
      { name: "OpenAI API", level: 82 },
      { name: "Hugging Face", level: 84 },
      { name: "Ollama", level: 76 }
    ]
  },
  {
    title: "Backend & Data",
    description: "APIs, validation, real-time data, and production interfaces.",
    icon: Database,
    skills: [
      { name: "FastAPI", level: 88 },
      { name: "Pydantic", level: 82 },
      { name: "Firebase", level: 76 },
      { name: "REST APIs", level: 86 },
      { name: "Chart.js", level: 74 }
    ]
  },
  {
    title: "Cloud / DevOps",
    description: "Deployment, containers, cloud services, and release workflows.",
    icon: Cloud,
    skills: [
      { name: "Docker", level: 84 },
      { name: "AWS", level: 70 },
      { name: "Google Cloud Run", level: 78 },
      { name: "Render", level: 80 },
      { name: "HuggingFace Spaces", level: 78 }
    ]
  },
  {
    title: "Tools & Platforms",
    description: "Developer workflow, automation, and AI-assisted engineering tools.",
    icon: Wrench,
    skills: [
      { name: "Git", level: 88 },
      { name: "GitHub", level: 88 },
      { name: "n8n", level: 70 },
      { name: "Prompt Engineering", level: 92 },
      { name: "AI System Design", level: 88 }
    ]
  }
];

export const projectCategories: ProjectCategory[] = [
  "All",
  "Featured",
  "Agentic AI",
  "ML Systems",
  "Product",
  "Algorithms"
];

export const projects: Project[] = [
  {
    title: "Moleculyst Studio",
    repo: "agent-crop",
    category: "Agentic AI",
    status: "Case Study",
    featured: true,
    summary:
      "Agentic image editing pipeline for localized, high-fidelity edits using grounding, Gemini reasoning, local patch editing, and Laplacian pyramid blending.",
    impact:
      "Built a transparent edit loop with target planning, VLM critique, bounding-box refinement, and iterative recomposition.",
    stack: ["Python", "Gemini API", "VLMs", "OpenCV", "Docker", "Florence-2"],
    features: [
      "Ground-first local inpainting",
      "LLM grounding advisor",
      "Interactive bounding-box editor",
      "Agentic timeline with quality scores"
    ],
    githubUrl: "https://github.com/vansh7266/agent-crop",
    liveUrl: "https://huggingface.co/spaces/vansh7266/Agent_Crop_M",
    image: getProjectImage("agent-crop", "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200")
  },
  {
    title: "Equitas AI",
    repo: "google-solution-challenge-2026",
    category: "Agentic AI",
    status: "Repository",
    featured: true,
    summary:
      "Autonomous fairness auditing platform that detects, explains, remediates, and reports hidden bias in datasets and models.",
    impact:
      "5-agent Gemini + LangGraph pipeline with fairness metrics, SHAP explainability, remediation loop, model cards, and PDF reports.",
    stack: ["Gemini", "LangGraph", "FastAPI", "AIF360", "Fairlearn", "SHAP"],
    features: [
      "Profiler, detector, remediator, explainer, reporter agents",
      "5 fairness metrics and intersectional heatmaps",
      "Regulatory compliance badges",
      "FairBot contextual audit assistant"
    ],
    githubUrl: "https://github.com/vansh7266/google-solution-challenge-2026",
    liveUrl: "https://equitas-ai-684691465342.us-central1.run.app/",
    image: getProjectImage("google-solution-challenge-2026", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200")
  },
  {
    title: "TriageAI",
    repo: "email_triage_env",
    category: "Agentic AI",
    status: "Repository",
    featured: true,
    summary:
      "OpenEnv reinforcement-learning environment for automated email categorization, prioritization, routing, and escalation.",
    impact:
      "Meta x PyTorch OpenEnv Hackathon finalist project with structured action/observation spaces and multi-level reward scoring.",
    stack: ["Python", "FastAPI", "Pydantic", "OpenEnv", "Docker", "LLaMA 3.1"],
    features: [
      "Reset/step/state environment loop",
      "Weighted reward functions",
      "Synthetic support triage tasks",
      "Baseline LLM agent evaluation"
    ],
    githubUrl: "https://github.com/vansh7266/email_triage_env",
    liveUrl: "https://huggingface.co/spaces/vansh7266/email_triage_env",
    image: getProjectImage("email_triage_env", "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80&w=1200")
  },
  {
    title: "PharmAI",
    repo: "pharmai",
    category: "ML Systems",
    status: "Live",
    featured: true,
    summary:
      "End-to-end intelligent manufacturing platform built with 4 AI models predicting batch quality, detecting anomalies, forecasting energy consumption, and generating corrective action alerts.",
    impact:
      "Catches failures before they happen. Uses XGBoost, RF, LSTM (64 units), Autoencoder (6→2→6), and an Agentic AI alert system reading SHAP importance.",
    stack: ["FastAPI", "XGBoost", "TensorFlow", "LSTM", "Autoencoder", "Agentic AI"],
    features: [
      "Ensemble predictor (>90% accuracy)",
      "LSTM energy forecasting",
      "Autoencoder anomaly flags",
      "Plain English critical/warning alerts"
    ],
    githubUrl: "https://github.com/vansh7266/pharmai",
    liveUrl: "https://pharmai-0k9k.onrender.com",
    image: getProjectImage("pharmai", "/images/pharmai.png")
  },

  {
    title: "ToxPredict",
    repo: "toxpredict",
    category: "ML Systems",
    status: "Repository",
    featured: true,
    summary:
      "Drug toxicity predictor that evaluates SMILES strings across Tox21 biological assay targets with model explainability.",
    impact:
      "Uses XGBoost baselines, AttentiveFP GNN, SHAP TreeExplainer, and atom-level importance for molecular risk interpretation.",
    stack: ["PyTorch Geometric", "XGBoost", "RDKit", "SHAP", "FastAPI"],
    features: [
      "12 assay target predictions",
      "Morgan fingerprints and RDKit descriptors",
      "Batch prediction endpoint",
      "Molecular feature attribution"
    ],
    githubUrl: "https://github.com/vansh7266/toxpredict",
    image: getProjectImage("toxpredict", "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1200")
  },
  {
    title: "AuctionX",
    repo: "auctionx",
    category: "Product",
    status: "Repository",
    featured: false,
    summary:
      "Real-time auction system with admin and bidder dashboards, credit locking, proxy auto-bidding, and Firebase synchronization.",
    impact: "Hackathon-winning CodeBidz project with sub-100ms real-time sync goal.",
    stack: ["Firebase", "JavaScript", "Firestore", "Auth", "Chart.js"],
    features: ["Credit-lock bidding", "Proxy auto-bids", "Admin analytics"],
    githubUrl: "https://github.com/vansh7266/auctionx",
    liveUrl: "https://auctionx-tlgg.onrender.com",
    image: getProjectImage("auctionx", "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200")
  },

  {
    title: "VoteIndiaSmart",
    repo: "Google-PromptWar-2",
    category: "Product",
    status: "Live",
    featured: false,
    summary:
      "AI election education assistant for Indian citizens with neutral Gemini answers, quizzes, timeline learning, and official resources.",
    impact: "Cloud Run app with strong security headers, input validation, rate limiting, and 52 tests.",
    stack: ["FastAPI", "Vertex AI", "Gemini", "Cloud Run", "Pydantic"],
    features: ["AI chat", "Generated quizzes", "Google Translate", "Request tracing"],
    githubUrl: "https://github.com/vansh7266/Google-PromptWar-2",
    liveUrl: "https://election-assistant-684691465342.us-central1.run.app",
    image: getProjectImage("Google-PromptWar-2", "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=1200")
  },
  {
    title: "CardioAI",
    repo: "CardioAI",
    category: "ML Systems",
    status: "Live",
    featured: false,
    summary:
      "Heart disease risk predictor using a KNN classifier trained on 918 clinical records with FastAPI serving.",
    impact: "Educational medical ML app with 86.96% reported test accuracy and validated API inputs.",
    stack: ["FastAPI", "Scikit-learn", "KNN", "Pydantic", "Render"],
    features: ["11 clinical inputs", "Swagger docs", "Risk probability output"],
    githubUrl: "https://github.com/vansh7266/CardioAI",
    liveUrl: "https://cardioai-o6ug.onrender.com",
    image: getProjectImage("CardioAI", "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200")
  },
  {
    title: "Panoptic Studio",
    repo: "panoptic_studio",
    category: "ML Systems",
    status: "Repository",
    featured: false,
    summary:
      "Instance-segmentation training flow that converts panoptic exports into Mask R-CNN-ready COCO datasets.",
    impact: "Bridges annotation exports, segmentation masks, train/val splits, training checkpoints, and inference overlays.",
    stack: ["C++", "Python", "CMake", "Mask R-CNN", "COCO"],
    features: ["COCO RLE export", "Dataset prep", "Mask R-CNN training scripts"],
    githubUrl: "https://github.com/vansh7266/panoptic_studio",
    image: getProjectImage("panoptic_studio", "/images/panoptic_studio.png")
  },
  {
    title: "Codeforces Solutions",
    repo: "My-Codeforces-Solutions",
    category: "Algorithms",
    status: "Repository",
    featured: false,
    summary:
      "Competitive programming archive with C++ solutions across Codeforces problems.",
    impact: "Supports the CodeChef 2-star / algorithmic problem-solving signal.",
    stack: ["C++", "Algorithms", "Data Structures"],
    features: ["Contest solutions", "C++ implementation practice", "Problem-solving archive"],
    githubUrl: "https://github.com/vansh7266/My-Codeforces-Solutions",
    image: getProjectImage("My-Codeforces-Solutions", "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200")
  },
  {
    title: "LeetCode Solutions",
    repo: "My-Leetcode-Solutions",
    category: "Algorithms",
    status: "Repository",
    featured: false,
    summary: "C++ LeetCode practice repository for interview-style algorithms and data structures.",
    impact: "Adds visible consistency around fundamentals beyond applied AI projects.",
    stack: ["C++", "Algorithms", "Data Structures"],
    features: ["LeetCode solutions", "Interview prep", "Core CS practice"],
    githubUrl: "https://github.com/vansh7266/My-Leetcode-Solutions",
    image: getProjectImage("My-Leetcode-Solutions", "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200")
  },
];

export const timeline: TimelineItem[] = [
  {
    title: "ML Intern",
    organization: "Moleculyst",
    period: "Feb 2026 - Present",
    kind: "Experience",
    summary: "Working on Video LLMs and multimodal AI systems.",
    details: [
      "Exploring Video Large Language Models for multimodal understanding.",
      "Experimenting with LLM architectures, VLMs, and generative AI pipelines.",
      "Performing preprocessing, model training, evaluation, and research iteration."
    ]
  },
  {
    title: "B.Tech in Information Technology",
    organization: "IIIT Bhopal",
    period: "2024 - 2028",
    kind: "Education",
    summary: "Current undergraduate program with CGPA 8.62/10.",
    details: [
      "Focused on AI/ML, systems, software engineering, and competitive programming.",
      "Building applied projects across healthcare, manufacturing, fairness, and automation."
    ]
  },
  {
    title: "Grand Finalist",
    organization: "Meta x PyTorch OpenEnv Hackathon",
    period: "2026",
    kind: "Hackathon",
    summary: "Advanced to the Grand Finale in Bangalore among 52,000+ participants.",
    details: [
      "Led TriageAI, an RL environment for customer-support email automation.",
      "Designed action/observation contracts and task-based reward functions."
    ]
  },
  {
    title: "Hackathon Winner",
    organization: "CodeBidz",
    period: "2026",
    kind: "Achievement",
    summary: "Won 1st position with AuctionX, a real-time bidding platform.",
    details: [
      "Built a Firebase-powered auction system with credit locking and proxy auto-bidding.",
      "Delivered admin analytics and separate bidder/admin experiences."
    ]
  },
  {
    title: "AIR 27 Finals",
    organization: "SRMC - IIT Bombay & IIT Madras",
    period: "2024",
    kind: "Achievement",
    summary: "Achieved All India Rank 27 in the finals.",
    details: ["Competitive problem-solving signal alongside CodeChef 2-star rating."]
  }
];

export const achievements: Achievement[] = [
  {
    label: "JEE Main 2024",
    value: "98.16%",
    detail: "Top 1% percentile and qualified JEE Advanced."
  },
  {
    label: "OpenEnv Hackathon",
    value: "Finalist",
    detail: "Grand Finale among 52,000+ Meta x PyTorch participants."
  },
  {
    label: "SRMC Finals",
    value: "AIR 27",
    detail: "IIT Bombay & IIT Madras competitive event."
  },
  {
    label: "CodeBidz",
    value: "1st",
    detail: "Hackathon winner with AuctionX."
  },
  {
    label: "IIT Bhubaneswar",
    value: "Top 30",
    detail: "Top 30 among 350+ teams."
  },
  {
    label: "MITS Gwalior",
    value: "Top 100",
    detail: "Top 100 among 400+ teams."
  }
];

export const stats = [
  { label: "Public repos", value: "25", icon: Github },
  { label: "Featured systems", value: "6", icon: Rocket },
  { label: "Hackathon wins/finals", value: "5+", icon: Trophy },
  { label: "Current CGPA", value: "8.62", icon: GraduationCap }
];

export const commandItems = [
  { label: "View projects", href: "#projects", icon: Blocks },
  { label: "Open resume", href: "#resume", icon: Award },
  { label: "GitHub analytics", href: "#github", icon: Network },
  { label: "Contact Vansh", href: "#contact", icon: Mail },
  { label: "Read timeline", href: "#timeline", icon: Terminal }
];

export const capabilityCards = [
  {
    title: "Agentic Workflows",
    copy: "Planner, tool loop, verifier, and visible reasoning traces for applied AI products.",
    icon: Bot
  },
  {
    title: "ML Systems",
    copy: "Model training, explainability, serving layers, and deployment pathways.",
    icon: Cpu
  },
  {
    title: "Product Engineering",
    copy: "Fast interfaces, validated APIs, real-time flows, and recruiter-readable demos.",
    icon: Globe2
  },
  {
    title: "Algorithms",
    copy: "C++ problem-solving foundations through Codeforces, LeetCode, and CodeChef.",
    icon: Binary
  }
];
