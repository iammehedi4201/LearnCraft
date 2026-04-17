"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { useState } from "react";

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

  return (
    <>
      <Nav />

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8 overflow-hidden">
        <div className="mx-auto max-w-4xl pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="text-center">
            <h1 className="text-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-7xl mb-6">
              Master the <span className="text-gradient">Modern Web</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Skip the surface-level tutorials. Learn the architectural patterns and
              production-ready practices used by elite engineering teams.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-full bg-slate-900 dark:bg-white dark:bg-slate-900/50 dark:text-slate-900 px-8 py-4 text-sm font-bold text-white shadow-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-all hover:-translate-y-1">
                Start Learning Now
              </button>
              <button className="text-sm font-bold leading-6 text-slate-900 dark:text-slate-300 flex items-center gap-2 group">
                View Curriculum <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </div >

      {/* Stats - Social Proof */}
      < div className="mx-auto max-w-7xl px-6 lg:px-8 mb-32" >
        <div className="grid grid-cols-2 gap-y-12 gap-x-8 text-center sm:grid-cols-4 glass-card rounded-[2rem] p-12 border border-white/20 dark:border-slate-800/50 shadow-2xl">
          {stats.map((stat) => (
            <div key={stat.label} className="mx-auto flex max-w-xs flex-col gap-y-2">
              <dt className="text-xs leading-7 text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] font-extrabold">
                {stat.label}
              </dt>
              <dd className="order-first text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </div>
      </div >

      {/* Course Paths */}
      < div className="mx-auto max-w-7xl px-6 lg:px-8 pb-32" >
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-display text-3xl font-bold text-slate-900 dark:text-white">Choose Your Path</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent" />
        </div>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* TanStack Query Path */}
          <div className="group relative flex flex-col gap-8 rounded-[2.5rem] glass-card p-12 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" /><path d="m16 16 2 2 4-4" /></svg>
            </div>
            <div>
              <h3 className="text-display text-3xl font-bold text-slate-900 dark:text-white mb-4">
                TanStack Query v5
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10">
                Master asynchronous state management. Learn caching, synchronization,
                and background refetching patterns for robust UIs.
              </p>
              <Link
                href="/learn/tanstack"
                className="inline-flex items-center gap-3 text-lg font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Deep Dive <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
            <div className="absolute top-0 right-0 h-32 w-32 bg-blue-50/50 dark:bg-blue-500/10 rounded-bl-full -mr-10 -mt-10 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/20 transition-colors" />
          </div>

          {/* NestJS Elite Path */}
          <div className="group relative flex flex-col gap-8 rounded-[2.5rem] glass-card p-12 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </div>
            <div>
              <h3 className="text-display text-3xl font-bold text-slate-900 dark:text-white mb-4">
                NestJS Elite
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10">
                Architectural mastery for the backend. Build scalable, testable,
                and production-grade APIs using modern patterns.
              </p>
              <Link
                href="/learn/nestjs"
                className="inline-flex items-center gap-3 text-lg font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
              >
                Deep Dive <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
            <div className="absolute top-0 right-0 h-32 w-32 bg-red-50/50 dark:bg-red-500/10 rounded-bl-full -mr-10 -mt-10 group-hover:bg-red-50 dark:group-hover:bg-red-500/20 transition-colors" />
          </div>

          {/* Next.js Path */}
          <div className="group relative flex flex-col gap-8 rounded-[2.5rem] glass-card p-12 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/40 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2" /><path d="M12 21v-4" /><path d="m16 16 2 2 4-4" /></svg>
            </div>
            <div>
              <h3 className="text-display text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Next.js 14+
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10">
                Build the future of full-stack. Explore App Router, Server Components,
                Streaming, and Edge Optimization.
              </p>
              <Link
                href="/learn/nextjs"
                className="inline-flex items-center gap-3 text-lg font-bold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Deep Dive <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
            <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-50/50 dark:bg-indigo-500/10 rounded-bl-full -mr-10 -mt-10 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/20 transition-colors" />
          </div>
        </div>
      </div >

      {/* Roadmap Section */}
      <section className="relative py-32 overflow-hidden border-y border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/20 transition-colors">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-24">
            <h2 className="text-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl text-glow">
              The Roadmap to <span className="text-gradient">Mastery</span>
            </h2>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
              A step-by-step curriculum designed to take you from a junior developer to a senior architect.
            </p>
          </div>

          <div className="relative">
            {/* Premium Connector Line */}
            <div className="absolute left-[31px] sm:left-8 top-0 h-full w-[2px] bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-blue-600 via-indigo-500 to-transparent animate-flow" 
              />
              <div className="absolute top-0 left-0 w-full h-[60%] blur-[4px] bg-blue-400 opacity-40 animate-pulse" />
            </div>

            <div className="space-y-16 relative z-10">
              {roadmap.map((item, i) => (
                <div key={i} className="flex gap-8 sm:gap-12 group perspective-1000">
                  <div className={`flex-shrink-0 h-16 w-16 rounded-full border-4 shadow-2xl flex items-center justify-center font-black text-xl transition-all duration-500 scale-100 group-hover:scale-110
                        ${item.status === 'completed' ? 'bg-blue-600 text-white border-white dark:border-slate-900 shadow-blue-500/20' :
                      item.status === 'current' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border-blue-500 animate-float shadow-blue-500/20 ring-4 ring-blue-500/10' :
                        'bg-white dark:bg-slate-900 text-slate-300 dark:text-slate-700 border-slate-100 dark:border-slate-800'}`}>
                    {i + 1}
                  </div>
                  <div className={`flex-1 rounded-[2.5rem] p-8 sm:p-10 transition-all duration-500 transform-gpu
                ${item.status === 'current' 
                  ? 'glass-card border-blue-100 dark:border-blue-900/30 shadow-2xl shadow-blue-500/5 -translate-y-1' 
                  : 'hover:bg-white dark:hover:bg-slate-800/40 hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-slate-100 dark:hover:border-slate-800'}`}>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3">
                      {item.title}
                      {item.status === 'completed' && <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div >
        {/* Fixed Background Glows */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 h-[600px] w-[600px] rounded-full bg-blue-400/10 dark:bg-indigo-600/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 h-[600px] w-[600px] rounded-full bg-indigo-400/10 dark:bg-blue-600/5 blur-[120px] pointer-events-none" />
      </section >


      {/* Testimonials */}
      < div className="py-32 relative group" >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-display text-3xl font-bold mb-20 text-slate-900 dark:text-white">Loved by Architects & Leads</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alex Rivers", role: "Sr. Architect @ Meta", text: "This is the curriculum I wish I had when I started. The Next.js patterns alone saved us weeks of refactoring." },
              { name: "Elena Chen", role: "Eng. Manager @ Stripe", text: "Transformed how our team handles server state. TanStack Query Mastery is an essential guide." },
              { name: "Marcus Thorne", role: "Principal @ Vercel", text: "Clean, consistent, and highly professional. A true masterpiece for modern web developers." }
            ].map((t, i) => (
              <div key={i} className="p-10 rounded-[2rem] glass-card border border-slate-100 dark:border-slate-800/50 flex flex-col justify-between hover:shadow-2xl hover:shadow-primary/5 transition-all">
                <p className="text-slate-700 dark:text-slate-300 italic mb-10 text-lg leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-br from-indigo-500 to-purple-500" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{t.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-widest">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div >

      {/* Community Section */}
      < div className="mx-auto max-w-7xl px-6 lg:px-8 pb-32" >
        <div className="bg-slate-900 rounded-[3rem] p-12 sm:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl">
            <span className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4 block">Community Hub</span>
            <h2 className="text-display text-4xl font-bold mb-6">Learn faster with a <br />global network of experts.</h2>
            <p className="text-slate-400 text-lg mb-10">Join our Discord to get help, share your progress, and collaborate on real-world open source projects.</p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold shadow-lg hover:bg-slate-100 transition-all flex items-center gap-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" /></svg>
                Join Discord
              </button>
              <button className="bg-slate-800 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-700 transition-all border border-slate-700">
                View GitHub
              </button>
            </div>
          </div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-10 pointer-events-none">
            <svg className="w-[400px] h-[400px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
          </div>
        </div >
      </div >

      {/* FAQ */}
      < div className="py-32 bg-white dark:bg-slate-900/50 dark:bg-transparent" >
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-display text-4xl font-bold text-center mb-16 text-slate-900 dark:text-white">Curriculum FAQ</h2>
          <div className="space-y-6">
            {[
              { q: "Is this course kept current?", a: "Yes, we update our lessons with every major Next.js and TanStack Query release." },
              { q: "Can I use these patterns in enterprise apps?", a: "Absolutely. These are the exact patterns used in high-scale production apps." },
              { q: "Is there a certificate of completion?", a: "Yes, upon finishing each path, you receive a verifiable digital certificate." },
              { q: "How long does it take to complete?", a: "Most developers complete a full path in 4-6 weeks of dedicated study." }
            ].map((faq, i) => (
              <div key={i} className="rounded-3xl bg-slate-50 dark:bg-slate-900/50 p-8 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900/50 transition-colors">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{faq.q}</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div >

      {/* Footer */}
      < footer className="bg-slate-50 dark:bg-slate-950/50 py-24 border-t border-slate-200 dark:border-slate-800 transition-colors" >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">L</div>
                <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">LearnCraft</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                Elevating the developer community through high-impact, production-focused engineering education.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Learning</h5>
              <ul className="space-y-4 text-slate-500 font-medium">
                <li><Link href="/learn/nextjs" className="hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-400 transition-colors">Next.js 14</Link></li>
                <li><Link href="/learn/tanstack" className="hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-400 transition-colors">TanStack Query</Link></li>
                <li><Link href="#" className="hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-400 transition-colors">Roadmap</Link></li>
                <li><Link href="#" className="hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-400 transition-colors">Exercises</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Stay Updated</h5>
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(`Subscribed: ${email}`);
                  setEmail("");
                }}
              >
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-white dark:bg-slate-900/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-full text-sm w-full focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-slate-900 dark:bg-white dark:bg-slate-900/50 text-white dark:text-slate-900 p-2 rounded-full hover:bg-slate-800 dark:hover:bg-slate-100 transition-all active:scale-90"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </form>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-slate-400 font-medium tracking-wide">© 2026 LearnCraft Engineering. All rights reserved.</p>
            <div className="flex gap-8 text-sm font-bold text-slate-400">
              <a href="#" className="hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-400 transition-colors">Github</a>
              <a href="#" className="hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-400 transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer >
    </>
  );
}


