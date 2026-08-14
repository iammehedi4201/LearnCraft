"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface RoadmapStep {
  step: string;
  phase: string;
  title: string;
  badge: string;
  badgeColor: string;
  desc: string;
  keySkills: string[];
}

const roadmapSteps: RoadmapStep[] = [
  {
    step: "01",
    phase: "Phase 1",
    title: "Foundations & Architecture Mental Models",
    badge: "Core Basics",
    badgeColor: "bg-ds-feature-lighter text-ds-feature-dark",
    desc: "Understand the core mental models of modern full-stack web applications: Client vs Server execution environments, strict TypeScript type safety, and component lifecycle.",
    keySkills: ["TypeScript Strict Mode", "Server Component Boundaries", "Module Patterns"],
  },
  {
    step: "02",
    phase: "Phase 2",
    title: "Full-Stack Rendering & Edge Caching",
    badge: "Next.js Mastery",
    badgeColor: "bg-ds-info-lighter text-ds-info-dark",
    desc: "Master Server Actions, granular caching layers, streaming with Suspense, ISR revalidation, and deploying edge middleware.",
    keySkills: ["Server Actions", "Streaming & Suspense", "Granular ISR", "Edge Middleware"],
  },
  {
    step: "03",
    phase: "Phase 3",
    title: "Asynchronous State & Optimistic UI",
    badge: "TanStack Query",
    badgeColor: "bg-ds-success-lighter text-ds-success-dark",
    desc: "Eliminate race conditions and UI lag with deterministic query keys, mutation rollback handlers, infinite virtualization, and server state hydration.",
    keySkills: ["Optimistic UI Rollbacks", "Deterministic Invalidation", "Infinite Pagination"],
  },
  {
    step: "04",
    phase: "Phase 4",
    title: "Enterprise Backend & Microservices",
    badge: "NestJS Elite",
    badgeColor: "bg-ds-error-lighter text-ds-error-dark",
    desc: "Architect scalable backend services using Dependency Injection, Guards, Interceptors, WebSockets, Message Queues, and Microservice transports.",
    keySkills: ["Inversion of Control (DI)", "Guards & JWT", "Microservices & Message Brokers"],
  },
];

interface CardCoord {
  cardX: number;
  cardY: number;
  isEven: boolean;
}

export function Roadmap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement | null>(null);
  const trailPathRef = useRef<SVGPathElement | null>(null);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [pathData, setPathData] = useState<string>("");
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [cardCoords, setCardCoords] = useState<CardCoord[]>([]);
  const [rocketState, setRocketState] = useState<{
    x: number;
    y: number;
    angle: number;
    visible: boolean;
  }>({
    x: 0,
    y: 0,
    angle: 90,
    visible: false,
  });

  const currentProgressRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);
  const currentAngleRef = useRef<number>(90);
  const rafIdRef = useRef<number | null>(null);

  // Recalculate dynamic SVG path starting under Card 1 and ending under Card 4
  const recalculatePath = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;
    if (width === 0 || height === 0) return;

    const mobile = window.innerWidth < 640;
    setContainerSize({ width, height });

    const coords: CardCoord[] = [];

    stepRefs.current.forEach((stepEl, idx) => {
      if (!stepEl) return;
      const cardEl = cardRefs.current[idx];

      let cardX = idx % 2 === 0 ? width * 0.25 : width * 0.75;
      let cardY = (height / roadmapSteps.length) * (idx + 0.5);

      if (cardEl) {
        const cr = cardEl.getBoundingClientRect();
        cardX = cr.left - containerRect.left + cr.width / 2;
        cardY = cr.top - containerRect.top + cr.height / 2;
      }

      coords.push({
        cardX,
        cardY,
        isEven: idx % 2 === 0,
      });
    });

    setCardCoords(coords);

    if (coords.length < 2) return;

    if (mobile) {
      // Mobile: Straight vertical path along the cards
      const startX = coords[0].cardX;
      const startY = coords[0].cardY;
      const endY = coords[coords.length - 1].cardY;
      setPathData(`M ${startX} ${startY} L ${startX} ${endY}`);
      return;
    }

    // Desktop: Path starts under First Card (Card 0) and finishes under Last Card (Card 3)
    const R = 24; // Corner curve radius
    const centerX = width / 2;

    const x0 = coords[0].cardX;
    const y0 = coords[0].cardY;

    const x1 = coords[1].cardX;
    const y1 = coords[1].cardY;

    const x2 = coords[2].cardX;
    const y2 = coords[2].cardY;

    const x3 = coords[3].cardX;
    const y3 = coords[3].cardY;

    const yMid01 = (y0 + y1) / 2;
    const yMid12 = (y1 + y2) / 2;
    const yMid23 = (y2 + y3) / 2;

    // Start under Card 0 -> exit to center -> go down along center spine -> cross to Card 1
    // -> through Card 1 -> cross to Card 2 -> through Card 2 -> cross to Card 3 -> finish under Card 3
    let d = `M ${x0} ${y0}`;

    // Segment 1: From under Card 0, head Right towards center, turn Down at center spine
    d += ` L ${centerX - R} ${y0}`;
    d += ` Q ${centerX} ${y0} ${centerX} ${y0 + R}`;
    d += ` L ${centerX} ${yMid01 - R}`;

    // Segment 2: Turn Right at yMid01 towards Card 1, turn Down into Card 1
    d += ` Q ${centerX} ${yMid01} ${centerX + R} ${yMid01}`;
    d += ` L ${x1 - R} ${yMid01}`;
    d += ` Q ${x1} ${yMid01} ${x1} ${yMid01 + R}`;

    // Segment 3: Travel through Card 1, turn Left at yMid12 towards Card 2
    d += ` L ${x1} ${yMid12 - R}`;
    d += ` Q ${x1} ${yMid12} ${x1 - R} ${yMid12}`;
    d += ` L ${x2 + R} ${yMid12}`;
    d += ` Q ${x2} ${yMid12} ${x2} ${yMid12 + R}`;

    // Segment 4: Travel through Card 2, turn Right at yMid23 towards Card 3
    d += ` L ${x2} ${yMid23 - R}`;
    d += ` Q ${x2} ${yMid23} ${x2 + R} ${yMid23}`;
    d += ` L ${x3 - R} ${yMid23}`;
    d += ` Q ${x3} ${yMid23} ${x3} ${yMid23 + R}`;

    // Segment 5: Finish directly under Card 3
    d += ` L ${x3} ${y3}`;

    setPathData(d);
  }, []);

  // Set up resize observer and window resize listener
  useEffect(() => {
    recalculatePath();

    const resizeObserver = new ResizeObserver(() => {
      recalculatePath();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", recalculatePath);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", recalculatePath);
    };
  }, [recalculatePath]);

  // Scroll tracking and animation loop
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress across timeline section
      const enterOffset = windowHeight * 0.7;
      const exitOffset = windowHeight * 0.3;
      const totalScrollDistance = rect.height + enterOffset - exitOffset;
      const currentScroll = enterOffset - rect.top;

      let progress = currentScroll / totalScrollDistance;
      progress = Math.max(0, Math.min(1, progress));
      targetProgressRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Smooth animation tick loop
    const animate = () => {
      const pathEl = pathRef.current;
      if (!pathEl || pathEl.getTotalLength() === 0) {
        rafIdRef.current = requestAnimationFrame(animate);
        return;
      }

      const totalLength = pathEl.getTotalLength();

      // Exponential decay smoothing (lerp)
      const lerpFactor = 0.12;
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * lerpFactor;

      const currentDist = currentProgressRef.current * totalLength;
      const pt = pathEl.getPointAtLength(currentDist);

      // Tangent angle calculation for smooth turns
      const delta = 2;
      const ptBefore = pathEl.getPointAtLength(Math.max(0, currentDist - delta));
      const ptAfter = pathEl.getPointAtLength(Math.min(totalLength, currentDist + delta));
      const dx = ptAfter.x - ptBefore.x;
      const dy = ptAfter.y - ptBefore.y;

      let targetAngle = 90;
      if (Math.hypot(dx, dy) > 0.001) {
        // Rocket icon naturally points UP in 0 deg; calculate angle relative to travel vector
        targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      }

      // Smooth angle interpolation without 360-degree flip
      const angleDiff = ((((targetAngle - currentAngleRef.current) % 360) + 540) % 360) - 180;
      currentAngleRef.current += angleDiff * 0.22;

      setRocketState({
        x: pt.x,
        y: pt.y,
        angle: currentAngleRef.current,
        visible: true,
      });

      // Update trail stroke-dashoffset to highlight traversed path
      if (trailPathRef.current) {
        trailPathRef.current.style.strokeDasharray = `${currentDist} ${totalLength}`;
      }

      // Synchronize active card based on rocket Y position relative to step cards
      if (cardCoords.length > 0) {
        let currentStepIndex = 0;
        for (let i = 0; i < cardCoords.length; i++) {
          const prevMid = i === 0 ? 0 : (cardCoords[i - 1].cardY + cardCoords[i].cardY) / 2;
          const nextMid =
            i === cardCoords.length - 1 ? Infinity : (cardCoords[i].cardY + cardCoords[i + 1].cardY) / 2;

          if (pt.y >= prevMid && pt.y < nextMid) {
            currentStepIndex = i;
            break;
          }
        }
        setActiveStep(currentStepIndex);
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [cardCoords]);

  return (
    <section className="py-16 relative">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ds-feature-lighter mb-4">
          <span className="text-xs font-bold tracking-wider text-ds-feature-dark uppercase">
            Architect Roadmap
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-ds-text-strong font-display">
          The Proven Path to Senior Web Engineering
        </h2>
        <p className="text-sm sm:text-base text-ds-text-sub mt-3 leading-relaxed max-w-xl mx-auto">
          A structured sequence designed to take you from foundational understanding to full-stack architectural mastery.
        </p>
      </div>

      {/* Timeline Grid Container */}
      <div ref={containerRef} className="relative max-w-4xl mx-auto px-4 sm:px-0">
        {/* Dynamic SVG Motion Path & Dashed Timeline (z-0 behind cards) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
          width={containerSize.width || "100%"}
          height={containerSize.height || "100%"}
        >
          <defs>
            {/* Traversed glow gradient */}
            <linearGradient id="rocketTrailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--state-feature-base)" stopOpacity="0.3" />
              <stop offset="70%" stopColor="var(--state-feature-base)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--state-verified-base)" stopOpacity="1" />
            </linearGradient>

            {/* Subtle glow filter */}
            <filter id="rocketGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {pathData && (
            <>
              {/* Base Dashed Timeline Path */}
              <path
                ref={pathRef}
                d={pathData}
                fill="none"
                stroke="var(--stroke-soft-200)"
                strokeWidth={2.5}
                strokeDasharray="6 6"
                strokeLinecap="round"
                className="transition-colors duration-300"
              />

              {/* Traversed Active Path Highlight */}
              <path
                ref={trailPathRef}
                d={pathData}
                fill="none"
                stroke="url(#rocketTrailGradient)"
                strokeWidth={2.5}
                strokeDasharray="0 10000"
                strokeLinecap="round"
                filter="url(#rocketGlow)"
              />
            </>
          )}
        </svg>

        {/* Scroll-Driven Flying Vector Rocket (z-0 under cards, emerges in open track between cards) */}
        {rocketState.visible && pathData && (
          <div
            className="absolute top-0 left-0 pointer-events-none z-0 transition-opacity duration-300 will-change-transform"
            style={{
              transform: `translate3d(${rocketState.x}px, ${rocketState.y}px, 0) translate(-50%, -50%) rotate(${rocketState.angle}deg)`,
            }}
          >
            {/* Booster Aura Glow */}
            <div className="absolute -inset-2 rounded-full bg-ds-feature-base/25 blur-md -z-10 animate-pulse" />

            {/* Vector Rocket Graphic */}
            <div className="relative w-8 h-8 flex items-center justify-center filter drop-shadow-md">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full overflow-visible"
              >
                {/* Engine Thruster Flame (Trailing at bottom) */}
                <g className="animate-pulse origin-top">
                  <path
                    d="M13 24 L16 31 L19 24 Z"
                    fill="var(--state-warning-base)"
                    opacity="0.9"
                  />
                  <path
                    d="M14 24 L16 29 L18 24 Z"
                    fill="var(--state-feature-lighter)"
                  />
                </g>

                {/* Left Fin */}
                <path
                  d="M10 18 L5 23 C5 23 6 25 9 24 L11 20 Z"
                  fill="var(--state-feature-dark)"
                  stroke="var(--state-feature-base)"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />

                {/* Right Fin */}
                <path
                  d="M22 18 L27 23 C27 23 26 25 23 24 L21 20 Z"
                  fill="var(--state-feature-dark)"
                  stroke="var(--state-feature-base)"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />

                {/* Rocket Fuselage */}
                <path
                  d="M16 2 C12 7 11 16 11 23 C11 24 12 24.5 13 24.5 L19 24.5 C20 24.5 21 24 21 23 C21 16 20 7 16 2 Z"
                  fill="var(--bg-white-0)"
                  stroke="var(--state-feature-base)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                {/* Rocket Nose Cone Cap */}
                <path
                  d="M16 2 C14.5 5 13.8 8.5 13.5 11 L18.5 11 C18.2 8.5 17.5 5 16 2 Z"
                  fill="var(--state-feature-base)"
                />

                {/* Cockpit Glass Porthole */}
                <circle
                  cx="16"
                  cy="15"
                  r="2.8"
                  fill="var(--state-verified-base)"
                  stroke="var(--state-feature-base)"
                  strokeWidth="1"
                />
                <circle
                  cx="15.2"
                  cy="14.2"
                  r="0.9"
                  fill="var(--static-white)"
                  opacity="0.9"
                />

                {/* Exhaust Nozzle */}
                <rect
                  x="13.5"
                  y="24"
                  width="5"
                  height="1.5"
                  rx="0.5"
                  fill="var(--stroke-strong-950)"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Timeline Steps & Cards (z-10 above dashed path & rocket) */}
        <div className="space-y-8 sm:space-y-14 relative z-10">
          {roadmapSteps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            const isActive = activeStep === idx;

            return (
              <div
                key={step.step}
                ref={(el) => {
                  stepRefs.current[idx] = el;
                }}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                  isEven ? "sm:justify-start" : "sm:justify-end"
                }`}
              >
                {/* Content Card with Smooth Active Transition (z-10 opaque card body covers rocket when inside) */}
                <div
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className="w-full sm:w-[calc(50%-1.5rem)] relative z-10"
                >
                  <div
                    className={`p-6 lg:p-7 rounded-2xl bg-ds-bg-white border transition-all duration-500 group relative ${
                      isActive
                        ? "border-ds-feature-base shadow-xl shadow-ds-feature-base/15 ring-1 ring-ds-feature-base/30 scale-[1.02] -translate-y-1"
                        : "border-ds-stroke-soft shadow-sm opacity-90 hover:opacity-100 hover:border-ds-feature-base/40"
                    }`}
                  >
                    {/* Header: Phase & Badges */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                            isActive
                              ? "text-ds-feature-base font-extrabold"
                              : "text-ds-text-soft"
                          }`}
                        >
                          {step.phase}
                        </span>

                        {/* Active Phase Live Indicator */}
                        {isActive && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-ds-feature-lighter text-ds-feature-dark text-[10px] font-bold animate-fadeIn">
                            <span className="w-1.5 h-1.5 rounded-full bg-ds-feature-base animate-ping" />
                            Active Focus
                          </span>
                        )}
                      </div>

                      <span
                        className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${step.badgeColor}`}
                      >
                        {step.badge}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3
                      className={`text-lg font-bold transition-colors duration-300 mb-2 ${
                        isActive
                          ? "text-ds-feature-base"
                          : "text-ds-text-strong group-hover:text-ds-feature-base"
                      }`}
                    >
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-4">
                      {step.desc}
                    </p>

                    {/* Skill Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-ds-stroke-soft">
                      {step.keySkills.map((skill) => (
                        <span
                          key={skill}
                          className={`px-2 py-0.5 text-[10px] font-medium rounded-md transition-colors duration-300 ${
                            isActive
                              ? "bg-ds-feature-lighter text-ds-feature-dark font-semibold"
                              : "bg-ds-bg-weak text-ds-text-sub"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
