"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface PlaygroundFullscreenProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function PlaygroundFullscreen({
  isOpen,
  onClose,
  children,
}: PlaygroundFullscreenProps) {
  // Close on Escape
  const handleKeyDown = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <div className="playground-fullscreen-overlay">
      <button
        className="playground-fullscreen-close"
        onClick={onClose}
        aria-label="Close fullscreen"
        title="Close fullscreen (Esc)"
      >
        ✕
      </button>
      {children}
    </div>,
    document.body
  );
}
