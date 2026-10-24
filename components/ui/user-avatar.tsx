"use client";

import { useState, useEffect } from "react";

export interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  fallbackClassName?: string;
}

/**
 * Robust User Avatar component for NextAuth / Google OAuth profile images.
 * - Enforces `referrerPolicy="no-referrer"` so Google's CDN does not return 403 Forbidden.
 * - Gracefully falls back to an initial badge on image load error (never shows broken image icon).
 */
export function UserAvatar({
  src,
  name,
  size = "sm",
  className = "",
  fallbackClassName = "",
}: UserAvatarProps) {
  const [hasError, setHasError] = useState(false);

  // Reset error state if image source changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  const sizeClasses = {
    xs: "w-5 h-5 rounded-md text-[9px]",
    sm: "w-6 h-6 rounded-lg text-[10px]",
    md: "w-8 h-8 rounded-xl text-xs",
    lg: "w-9 h-9 rounded-xl text-xs",
  }[size];

  const getInitials = (userName?: string | null) => {
    if (!userName || !userName.trim()) return "U";
    const parts = userName.trim().split(/\s+/);
    if (parts.length >= 2 && (size === "md" || size === "lg")) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const initials = getInitials(name);

  if (!src || hasError) {
    return (
      <div
        className={`${sizeClasses} bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold flex items-center justify-center select-none ring-1 ring-white/10 shrink-0 shadow-sm ${fallbackClassName} ${className}`}
        aria-label={name || "User avatar"}
        role="img"
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name || "User avatar"}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      onError={() => setHasError(true)}
      className={`${sizeClasses} object-cover ring-1 ring-white/10 shrink-0 ${className}`}
    />
  );
}
