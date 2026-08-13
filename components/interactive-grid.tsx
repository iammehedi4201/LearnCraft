"use client";

import React, { useEffect, useRef } from "react";

interface InteractiveGridProps {
  children: React.ReactNode;
  className?: string;
}

export function InteractiveGrid({ children, className = "" }: InteractiveGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty("--mouse-x", `${x}px`);
      container.style.setProperty("--mouse-y", `${y}px`);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative bg-dot-grid ${className}`}>
      {children}
    </div>
  );
}
