export interface HeroSlide { verb: string; sub: string; desc: string; }
export const heroSlides: HeroSlide[] = [
  { verb: "Apply", sub: "Smarter", desc: "Let AI craft tailored applications for every job you want." },
  { verb: "Stand", sub: "Out", desc: "Your resume, optimized for ATS and human eyes alike." },
  { verb: "Land", sub: "Faster", desc: "Track every application and never miss a follow-up again." },
];

export interface Feature { title: string; desc: string; }
export const features: Feature[] = [
  { title: "AI Resume Builder", desc: "Tailor your resume to any job description with a single click." },
  { title: "Smart Cover Letters", desc: "Generate compelling cover letters matched to the role in seconds." },
  { title: "Application Tracker", desc: "One dashboard for every job — status, notes, and next steps." },
  { title: "Interview Prep", desc: "AI-powered mock interviews tuned to your target company and role." },
];

export interface Stat { number: string; label: string; }
export const stats: Stat[] = [
  { number: "50K+", label: "Jobs Applied" },
  { number: "3.2×", label: "Interview Rate" },
  { number: "94%", label: "User Satisfaction" },
  { number: "120+", label: "Companies Hired" },
];