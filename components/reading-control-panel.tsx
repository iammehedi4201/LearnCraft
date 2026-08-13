"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────
type ReadingTheme = "light" | "dark";
type LineSpacing = "compact" | "normal" | "relaxed";
type FontFamily = "default" | "dyslexia";

interface ReadingSettings {
  fontSize: number;
  theme: ReadingTheme;
  lineSpacing: LineSpacing;
  focusMode: boolean;
  fontFamily: FontFamily;
  highContrast: boolean;
}

const DEFAULT_SETTINGS: ReadingSettings = {
  fontSize: 16,
  theme: "dark",
  lineSpacing: "normal",
  focusMode: false,
  fontFamily: "default",
  highContrast: false,
};

const FONT_SIZE_MIN = 14;
const FONT_SIZE_MAX = 24;
const FONT_SIZE_STEP = 2;

const LINE_SPACING_VALUES: Record<LineSpacing, string> = {
  compact: "1.4",
  normal: "1.7",
  relaxed: "2.0",
};

const STORAGE_KEY = "learncraft-reading-settings";

// ─── Helper: Apply settings to DOM ──────────────────────────────────
function applySettings(settings: ReadingSettings) {
  const root = document.documentElement;

  // Font size
  root.style.setProperty("--reading-font-size", `${settings.fontSize}px`);

  // Line spacing
  root.style.setProperty(
    "--reading-line-height",
    LINE_SPACING_VALUES[settings.lineSpacing],
  );

  // Theme
  root.classList.remove("light", "dark", "sepia");
  root.classList.add(settings.theme);

  // Font family
  if (settings.fontFamily === "dyslexia") {
    root.classList.add("font-dyslexia");
  } else {
    root.classList.remove("font-dyslexia");
  }

  // High contrast
  if (settings.highContrast) {
    root.classList.add("high-contrast");
  } else {
    root.classList.remove("high-contrast");
  }

  // Focus mode
  if (settings.focusMode) {
    root.classList.add("focus-mode");
  } else {
    root.classList.remove("focus-mode");
  }
}

// ─── Icons (inline SVGs) ────────────────────────────────────────────
function GearIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

// Keeping basic sizing and strokes clean for icons
function MinusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

// Single-purpose icon components
function MoonIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function FocusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ─── Component ──────────────────────────────────────────────────────
export function ReadingControlPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<ReadingSettings>(DEFAULT_SETTINGS);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<ReadingSettings>;
        const merged = { ...DEFAULT_SETTINGS, ...parsed };
        setSettings(merged);
        applySettings(merged);
      } else {
        applySettings(DEFAULT_SETTINGS);
      }
    } catch {
      applySettings(DEFAULT_SETTINGS);
    }
    setMounted(true);
  }, []);

  // Persist and apply whenever settings change (after mount)
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    applySettings(settings);
  }, [settings, mounted]);

  // Close panel when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const update = useCallback(
    <K extends keyof ReadingSettings>(key: K, value: ReadingSettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const changeFontSize = useCallback((delta: number) => {
    setSettings((prev) => ({
      ...prev,
      fontSize: Math.min(
        FONT_SIZE_MAX,
        Math.max(FONT_SIZE_MIN, prev.fontSize + delta),
      ),
    }));
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={panelRef}
      className="rcp-root font-sans text-ds-text-strong selection:bg-ds-feature-light/20"
      id="reading-control-panel"
    >
      {/* ── Floating Trigger Button ── */}
      <button
        id="rcp-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-12 h-12 rounded-xl border-none cursor-pointer flex items-center justify-center transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg hover:scale-105 group rcp-pulse-animation ${
          isOpen
            ? "bg-ds-error-base hover:bg-ds-error-dark text-ds-static-white shadow-ds-error-base/20"
            : "bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white shadow-ds-feature-base/20"
        }`}
        aria-label="Reading preferences"
        aria-expanded={isOpen}
        title="Reading preferences"
      >
        <span className={`flex items-center justify-center transition-transform duration-350 ${isOpen ? "rotate-0" : "group-hover:rotate-45"}`}>
          {isOpen ? <CloseIcon /> : <GearIcon />}
        </span>
      </button>

      {/* ── Panel ── */}
      <div
        className={`rcp-panel flex flex-col rounded-2xl bg-ds-bg-white border border-ds-stroke-soft shadow-xl transition-all duration-300 ${
          isOpen ? "rcp-panel--open" : ""
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-ds-stroke-soft bg-ds-bg-weak/30">
          <h3 className="text-sm font-bold tracking-tight text-ds-text-strong">Reading Preferences</h3>
          <span className="px-2.5 py-0.5 text-[10px] font-black tracking-widest uppercase bg-ds-feature-lighter text-ds-feature-dark border border-ds-feature-base rounded-full">
            Aa
          </span>
        </div>

        {/* Scrollable Body */}
        <div className="rcp-scrollbar p-5 space-y-5 max-h-[400px] overflow-y-auto">
          {/* ─── Font Size ─── */}
          <div className="space-y-3">
            <label className="flex items-center justify-between text-xs font-bold text-ds-text-strong">
              <span className="flex items-center gap-2 text-ds-text-sub">
                <span className="text-sm">🔤</span> Font Size
              </span>
              <span className="px-2 py-0.5 text-xs font-bold bg-ds-feature-lighter text-ds-feature-dark rounded-md">
                {settings.fontSize}px
              </span>
            </label>
            <div className="flex items-center gap-3">
              <button
                id="rcp-font-decrease"
                className="w-9 h-9 flex items-center justify-center bg-ds-bg-soft hover:bg-ds-bg-sub border border-ds-stroke-soft text-ds-text-strong hover:text-ds-feature-base rounded-xl transition-all duration-200 disabled:opacity-40 disabled:hover:bg-ds-bg-soft disabled:hover:text-ds-text-strong disabled:cursor-not-allowed active:scale-95"
                onClick={() => changeFontSize(-FONT_SIZE_STEP)}
                disabled={settings.fontSize <= FONT_SIZE_MIN}
                aria-label="Decrease font size"
              >
                <MinusIcon />
              </button>
              <div className="flex-1 h-2 bg-ds-bg-soft border border-ds-stroke-soft rounded-full overflow-hidden">
                <div
                  className="h-full bg-ds-feature-base rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((settings.fontSize - FONT_SIZE_MIN) /
                        (FONT_SIZE_MAX - FONT_SIZE_MIN)) *
                      100
                    }%`,
                  }}
                />
              </div>
              <button
                id="rcp-font-increase"
                className="w-9 h-9 flex items-center justify-center bg-ds-bg-soft hover:bg-ds-bg-sub border border-ds-stroke-soft text-ds-text-strong hover:text-ds-feature-base rounded-xl transition-all duration-200 disabled:opacity-40 disabled:hover:bg-ds-bg-soft disabled:hover:text-ds-text-strong disabled:cursor-not-allowed active:scale-95"
                onClick={() => changeFontSize(FONT_SIZE_STEP)}
                disabled={settings.fontSize >= FONT_SIZE_MAX}
                aria-label="Increase font size"
              >
                <PlusIcon />
              </button>
            </div>
          </div>

          {/* ─── Theme Switcher ─── */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold text-ds-text-sub">
              <span className="text-sm">🎨</span> Theme
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["light", "dark"] as ReadingTheme[]).map((t) => (
                <button
                  key={t}
                  id={`rcp-theme-${t}`}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-bold uppercase transition-all duration-300 active:scale-95 ${
                    settings.theme === t
                      ? "bg-ds-feature-lighter border-ds-feature-base text-ds-feature-dark shadow-sm"
                      : "bg-ds-bg-soft hover:bg-ds-bg-sub border-ds-stroke-soft text-ds-text-strong"
                  }`}
                  onClick={() => update("theme", t)}
                  aria-label={`${t} theme`}
                  aria-pressed={settings.theme === t}
                >
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded-lg transition-colors ${
                      settings.theme === t
                        ? "bg-ds-feature-base text-ds-static-white"
                        : "bg-ds-bg-weak text-ds-text-sub"
                    }`}
                  >
                    {t === "light" ? <SunIcon /> : <MoonIcon />}
                  </span>
                  <span>{t}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-ds-stroke-soft my-1" />

          {/* ─── Line Spacing ─── */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold text-ds-text-sub">
              <span className="text-sm">↕️</span> Line Spacing
            </label>
            <div className="flex bg-ds-bg-soft border border-ds-stroke-soft rounded-xl p-1 gap-1">
              {(["compact", "normal", "relaxed"] as LineSpacing[]).map((ls) => (
                <button
                  key={ls}
                  id={`rcp-spacing-${ls}`}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                    settings.lineSpacing === ls
                      ? "bg-ds-bg-white border border-ds-stroke-soft text-ds-text-strong shadow-sm font-extrabold"
                      : "text-ds-text-sub hover:text-ds-text-strong"
                  }`}
                  onClick={() => update("lineSpacing", ls)}
                  aria-pressed={settings.lineSpacing === ls}
                >
                  {ls}
                </button>
              ))}
            </div>
          </div>

          {/* ─── Focus Mode ─── */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-bold text-ds-text-strong cursor-pointer" htmlFor="rcp-focus-toggle">
                <span className="text-ds-text-sub"><FocusIcon /></span> Focus Mode
              </label>
              <button
                id="rcp-focus-toggle"
                role="switch"
                aria-checked={settings.focusMode}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 border-none outline-none cursor-pointer ${
                  settings.focusMode ? "bg-ds-feature-base" : "bg-ds-bg-soft border border-ds-stroke-soft"
                }`}
                onClick={() => update("focusMode", !settings.focusMode)}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-ds-static-white shadow-sm transition-transform duration-300 ${
                    settings.focusMode ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            {settings.focusMode && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl border border-ds-info-base bg-ds-info-lighter text-ds-text-strong transition-all duration-300 animate-fadeIn">
                <span className="text-sm">💡</span>
                <div>
                  <h5 className="font-bold text-xs text-ds-info-dark">Focus mode enabled</h5>
                  <p className="text-[10px] text-ds-text-sub mt-0.5">Sidebars hidden · Content centered</p>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-ds-stroke-soft my-1" />

          {/* ─── Font Family ─── */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold text-ds-text-sub">
              <span className="text-sm">🅰️</span> Font Family
            </label>
            <div className="flex bg-ds-bg-soft border border-ds-stroke-soft rounded-xl p-1 gap-1">
              <button
                id="rcp-font-default"
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  settings.fontFamily === "default"
                    ? "bg-ds-bg-white border border-ds-stroke-soft text-ds-text-strong shadow-sm font-extrabold"
                    : "text-ds-text-sub hover:text-ds-text-strong"
                }`}
                onClick={() => update("fontFamily", "default")}
                aria-pressed={settings.fontFamily === "default"}
              >
                Default
              </button>
              <button
                id="rcp-font-dyslexia"
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold font-dyslexia transition-all duration-200 ${
                  settings.fontFamily === "dyslexia"
                    ? "bg-ds-bg-white border border-ds-stroke-soft text-ds-text-strong shadow-sm font-extrabold"
                    : "text-ds-text-sub hover:text-ds-text-strong"
                }`}
                onClick={() => update("fontFamily", "dyslexia")}
                aria-pressed={settings.fontFamily === "dyslexia"}
              >
                Dyslexic Font
              </button>
            </div>
          </div>

          {/* ─── High Contrast ─── */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs font-bold text-ds-text-strong cursor-pointer" htmlFor="rcp-contrast-toggle">
              <span className="text-ds-text-sub text-sm">◐</span> High Contrast
            </label>
            <button
              id="rcp-contrast-toggle"
              role="switch"
              aria-checked={settings.highContrast}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 border-none outline-none cursor-pointer ${
                settings.highContrast ? "bg-ds-feature-base" : "bg-ds-bg-soft border border-ds-stroke-soft"
              }`}
              onClick={() => update("highContrast", !settings.highContrast)}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-ds-static-white shadow-sm transition-transform duration-300 ${
                  settings.highContrast ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-ds-stroke-soft bg-ds-bg-weak/30">
          <button
            id="rcp-reset"
            className="w-full py-2 bg-ds-bg-soft hover:bg-ds-error-base hover:text-ds-static-white text-ds-text-strong border border-ds-stroke-soft hover:border-transparent font-bold rounded-xl transition-all duration-350 shadow-sm text-xs active:scale-95 hover:shadow-md"
            onClick={() => setSettings(DEFAULT_SETTINGS)}
          >
            Reset to defaults
          </button>
        </div>
      </div>
    </div>
  );
}
