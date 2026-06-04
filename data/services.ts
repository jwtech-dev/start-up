import {
  Globe,
  Palette,
  Server,
  Layers,
  Smartphone,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  startingPrice: string;
  cardImage: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
}

export const services: Service[] = [
  {
    title: "Web App Development",
    description:
      "Full-stack web applications built with modern frameworks. From MVPs to enterprise solutions — fast, scalable, and beautiful.",
    icon: Globe,
    features: [
      "Custom React / Next.js applications",
      "Progressive Web Apps (PWA)",
      "Real-time dashboards & admin panels",
      "E-commerce platforms",
    ],
    startingPrice: "$2,500",
    cardImage: "/cards/webapp.jpg",
    rarity: "Epic",
  },
  {
    title: "UI/UX Design",
    description:
      "Research-driven design that converts. We craft interfaces that are intuitive, accessible, and visually stunning.",
    icon: Palette,
    features: [
      "User research & personas",
      "Wireframing & prototyping",
      "High-fidelity UI design",
      "Design system creation",
    ],
    startingPrice: "$1,500",
    cardImage: "/cards/uiux.jpg",
    rarity: "Rare",
  },
  {
    title: "API & Backend",
    description:
      "Robust server architecture that scales. RESTful APIs, GraphQL, real-time systems, and cloud infrastructure.",
    icon: Server,
    features: [
      "REST & GraphQL API design",
      "Database architecture & optimization",
      "Cloud deployment (AWS / GCP)",
      "Authentication & security",
    ],
    startingPrice: "$3,000",
    cardImage: "/cards/backend.jpg",
    rarity: "Epic",
  },
  {
    title: "Full-Stack Projects",
    description:
      "End-to-end development from concept to launch. We handle design, frontend, backend, and deployment as one team.",
    icon: Layers,
    features: [
      "Complete product development",
      "Technical architecture planning",
      "CI/CD pipeline setup",
      "Post-launch support & maintenance",
    ],
    startingPrice: "$5,000",
    cardImage: "/cards/fullstack.jpg",
    rarity: "Legendary",
  },
  {
    title: "Mobile-First Solutions",
    description:
      "Responsive experiences optimized for every device. From adaptive layouts to native-feel mobile web apps.",
    icon: Smartphone,
    features: [
      "Responsive web design",
      "Mobile-first development",
      "Touch-optimized interfaces",
      "Cross-browser compatibility",
    ],
    startingPrice: "$2,000",
    cardImage: "/cards/mobile.jpg",
    rarity: "Rare",
  },
  {
    title: "Security & Performance",
    description:
      "Bulletproof your application. We audit, optimize, and harden your codebase for speed and security.",
    icon: ShieldCheck,
    features: [
      "Performance auditing & optimization",
      "Security assessment & hardening",
      "Load testing & scalability",
      "Monitoring & alerting setup",
    ],
    startingPrice: "$1,800",
    cardImage: "/cards/security.jpg",
    rarity: "Epic",
  },
];

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Discovery",
    description:
      "We dive deep into your goals, audience, and requirements. Together we define scope, timeline, and deliverables.",
  },
  {
    step: 2,
    title: "Design",
    description:
      "Our designer creates wireframes, mockups, and prototypes. You review and approve before any code is written.",
  },
  {
    step: 3,
    title: "Development",
    description:
      "Our developers build your product with clean, tested code. Regular check-ins keep you in the loop throughout.",
  },
  {
    step: 4,
    title: "Delivery",
    description:
      "We deploy, test across devices, and hand off everything — code, docs, and assets. Post-launch support included.",
  },
];

export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "How does your commission-based pricing work?",
    answer:
      "We offer flexible pricing based on project scope. After an initial discovery call, we provide a detailed quote with milestones. Payment is split across milestones so you only pay for completed work.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines vary by project scope. A landing page typically takes 1-2 weeks. Full web applications range from 4-12 weeks. We'll provide a detailed timeline during the discovery phase.",
  },
  {
    question: "Can I hire just one team member?",
    answer:
      "Absolutely! Each team member is available for individual commission work. You can also hire our full team for comprehensive projects that need design, frontend, and backend expertise.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "Our core stack includes React, Next.js, TypeScript, Node.js, Python, PostgreSQL, and Figma. We're always expanding our toolkit to match project needs.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Yes! All projects include 2 weeks of post-launch support. We also offer monthly retainer packages for ongoing maintenance, feature development, and technical support.",
  },
  {
    question: "What's your revision policy?",
    answer:
      "Each milestone includes up to 2 rounds of revisions. Additional revisions are billed at our hourly rate. Major scope changes are handled through a change order process.",
  },
];
