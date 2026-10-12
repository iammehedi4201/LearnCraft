"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { signIn } from "next-auth/react";

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AuthModal({ isOpen: controlledIsOpen, onClose: controlledOnClose }: AuthModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleClose = () => {
    if (isControlled && controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    const handleOpenEvent = () => setInternalIsOpen(true);
    window.addEventListener("learncraft:open-auth-modal", handleOpenEvent);
    return () => {
      window.removeEventListener("learncraft:open-auth-modal", handleOpenEvent);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleSignIn = async () => {
    try {
      setIsSubmitting(true);
      await signIn("github");
    } catch (err) {
      console.error("Sign in failed:", err);
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-y-auto">
      {/* Dark blur backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-200"
        onClick={handleClose}
      />

      {/* Clean Minimalist Modal Box */}
      <div className="relative w-full max-w-[380px] bg-[#0E121C] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl shadow-purple-500/10 z-10 animate-in zoom-in-95 duration-200 text-center">
        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50 cursor-pointer"
          aria-label="Close dialog"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* LearnCraft Brand Logo */}
        <div className="relative w-12 h-12 mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-purple-500/20 mb-4">
          <img
            src="/logo.png"
            alt="LearnCraft Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Header */}
        <h3 className="text-lg font-bold text-white tracking-tight mb-1.5">
          Sign In to LearnCraft
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-6">
          Sign in with GitHub to track and save your module progress across all your devices.
        </p>

        {/* Continue with GitHub Action Button */}
        <button
          onClick={handleSignIn}
          disabled={isSubmitting}
          className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all duration-200 shadow-md shadow-purple-600/25 disabled:opacity-75 disabled:cursor-wait cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Connecting to GitHub...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>Continue with GitHub</span>
            </>
          )}
        </button>

        {isSubmitting && (
          <p className="mt-2.5 text-center text-[11px] text-purple-400 animate-pulse font-medium">
            Redirecting to GitHub authorization...
          </p>
        )}
      </div>
    </div>,
    document.body
  );
}

export function openAuthModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("learncraft:open-auth-modal"));
  }
}
