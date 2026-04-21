"use client";

import { Nav } from "@/components/nav";
import { useState } from "react";
import { HeroSection } from "./components/hero-section";
import { StatsSection } from "./components/stats-section";
import { CoursePaths } from "./components/course-paths";
import { RoadmapSection } from "./components/roadmap-section";
import { TestimonialsSection } from "./components/testimonials-section";
import { CommunitySection } from "./components/community-section";
import { FAQSection } from "./components/faq-section";
import { Footer } from "./components/footer";

export default function LearnHub(): JSX.Element {
  const [email, setEmail] = useState("");

  const stats = [
    { label: "Active Lessons", value: "48+" },
    { label: "Platform Students", value: "12,400+" },
    { label: "Production Guides", value: "150+" },
    { label: "Daily Updates", value: "Live" },
  ];

  const roadmap = [
    { title: "Foundations", desc: "Master the core concepts of React and Next.js Architecture.", status: "completed" },
    { title: "Advanced Patterns", desc: "Deep dive into Server Components, ISR, and Caching.", status: "current" },
    { title: "State Mastery", desc: "Unlock the power of TanStack Query for complex data flows.", status: "upcoming" },
    { title: "Production Deployment", desc: "Deploy at scale with Vercel and Edge Runtime.", status: "upcoming" },
  ];

  const faqs = [
    { q: "Is this course kept current?", a: "Yes, we update our lessons with every major Next.js and TanStack Query release." },
    { q: "Can I use these patterns in enterprise apps?", a: "Absolutely. These are the exact patterns used in high-scale production apps." },
    { q: "Is there a certificate of completion?", a: "Yes, upon finishing each path, you receive a verifiable digital certificate." },
    { q: "How long does it take to complete?", a: "Most developers complete a full path in 4-6 weeks of dedicated study." }
  ];

  return (
    <>
      <Nav />
      <HeroSection />
      <StatsSection stats={stats} />
      <CoursePaths />
      <RoadmapSection roadmap={roadmap} />
      <TestimonialsSection />
      <CommunitySection />
      <FAQSection faqs={faqs} />
      <Footer email={email} setEmail={setEmail} />
    </>
  );
}
