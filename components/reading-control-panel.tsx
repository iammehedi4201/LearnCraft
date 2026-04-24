"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────
type ReadingTheme = "light" | "dark" | "sepia";
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
    LINE_SPACING_VALUES[settings.lineSpacing]
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function BookOpenIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function FocusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    []
  );

  const changeFontSize = useCallback(
    (delta: number) => {
      setSettings((prev) => ({
        ...prev,
        fontSize: Math.min(
          FONT_SIZE_MAX,
          Math.max(FONT_SIZE_MIN, prev.fontSize + delta)
        ),
      }));
    },
    []
  );

  if (!mounted) return null;

  return (
    <div ref={panelRef} className="rcp-root" id="reading-control-panel">
      {/* ── Floating Trigger Button ── */}
      <button
        id="rcp-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className={`rcp-trigger ${isOpen ? "rcp-trigger--active" : ""}`}
        aria-label="Reading preferences"
        aria-expanded={isOpen}
        title="Reading preferences"
      >
        <span className="rcp-trigger__icon">
          {isOpen ? <CloseIcon /> : <GearIcon />}
        </span>
      </button>

      {/* ── Panel ── */}
      <div className={`rcp-panel ${isOpen ? "rcp-panel--open" : ""}`}>
        {/* Header */}
        <div className="rcp-header">
          <h3 className="rcp-header__title">Reading Preferences</h3>
          <span className="rcp-header__badge">Aa</span>
        </div>

        <div className="rcp-body">
          {/* ─── 🥇 Font Size ─── */}
          <div className="rcp-section">
            <label className="rcp-label">
              <span className="rcp-label__icon">🔤</span>
              Font Size
              <span className="rcp-label__value">{settings.fontSize}px</span>
            </label>
            <div className="rcp-font-size">
              <button
                id="rcp-font-decrease"
                className="rcp-btn rcp-btn--icon"
                onClick={() => changeFontSize(-FONT_SIZE_STEP)}
                disabled={settings.fontSize <= FONT_SIZE_MIN}
                aria-label="Decrease font size"
              >
                <MinusIcon />
              </button>
              <div className="rcp-font-size__track">
                <div
                  className="rcp-font-size__fill"
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
                className="rcp-btn rcp-btn--icon"
                onClick={() => changeFontSize(FONT_SIZE_STEP)}
                disabled={settings.fontSize >= FONT_SIZE_MAX}
                aria-label="Increase font size"
              >
                <PlusIcon />
              </button>
            </div>
          </div>

          {/* ─── 🥇 Theme Switcher ─── */}
          <div className="rcp-section">
            <label className="rcp-label">
              <span className="rcp-label__icon">🎨</span>
              Theme
            </label>
            <div className="rcp-theme-switcher">
              {(["light", "dark", "sepia"] as ReadingTheme[]).map((t) => (
                <button
                  key={t}
                  id={`rcp-theme-${t}`}
                  className={`rcp-theme-btn rcp-theme-btn--${t} ${
                    settings.theme === t ? "rcp-theme-btn--active" : ""
                  }`}
                  onClick={() => update("theme", t)}
                  aria-label={`${t} theme`}
                  aria-pressed={settings.theme === t}
                >
                  <span className="rcp-theme-btn__icon">
                    {t === "light" ? (
                      <SunIcon />
                    ) : t === "dark" ? (
                      <MoonIcon />
                    ) : (
                      <BookOpenIcon />
                    )}
                  </span>
                  <span className="rcp-theme-btn__label">
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="rcp-divider" />

          {/* ─── 🥈 Line Spacing ─── */}
          <div className="rcp-section">
            <label className="rcp-label">
              <span className="rcp-label__icon">↕️</span>
              Line Spacing
            </label>
            <div className="rcp-segmented">
              {(["compact", "normal", "relaxed"] as LineSpacing[]).map((ls) => (
                <button
                  key={ls}
                  id={`rcp-spacing-${ls}`}
                  className={`rcp-segmented__btn ${
                    settings.lineSpacing === ls
                      ? "rcp-segmented__btn--active"
                      : ""
                  }`}
                  onClick={() => update("lineSpacing", ls)}
                  aria-pressed={settings.lineSpacing === ls}
                >
                  {ls.charAt(0).toUpperCase() + ls.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* ─── 🥈 Focus Mode ─── */}
          <div className="rcp-section">
            <div className="rcp-toggle-row">
              <label className="rcp-label" htmlFor="rcp-focus-toggle">
                <span className="rcp-label__icon"><FocusIcon /></span>
                Focus Mode
              </label>
              <button
                id="rcp-focus-toggle"
                role="switch"
                aria-checked={settings.focusMode}
                className={`rcp-switch ${
                  settings.focusMode ? "rcp-switch--on" : ""
                }`}
                onClick={() => update("focusMode", !settings.focusMode)}
              >
                <span className="rcp-switch__thumb" />
              </button>
            </div>
            {settings.focusMode && (
              <p className="rcp-hint">Sidebars hidden · Content centered</p>
            )}
          </div>

          <div className="rcp-divider" />

          {/* ─── 🥉 Font Family ─── */}
          <div className="rcp-section">
            <label className="rcp-label">
              <span className="rcp-label__icon">🅰️</span>
              Font Family
            </label>
            <div className="rcp-segmented">
              <button
                id="rcp-font-default"
                className={`rcp-segmented__btn ${
                  settings.fontFamily === "default"
                    ? "rcp-segmented__btn--active"
                    : ""
                }`}
                onClick={() => update("fontFamily", "default")}
                aria-pressed={settings.fontFamily === "default"}
              >
                Default
              </button>
              <button
                id="rcp-font-dyslexia"
                className={`rcp-segmented__btn rcp-segmented__btn--lexend ${
                  settings.fontFamily === "dyslexia"
                    ? "rcp-segmented__btn--active"
                    : ""
                }`}
                onClick={() => update("fontFamily", "dyslexia")}
                aria-pressed={settings.fontFamily === "dyslexia"}
              >
                Dyslexia-friendly
              </button>
            </div>
          </div>

          {/* ─── 🥉 High Contrast ─── */}
          <div className="rcp-section">
            <div className="rcp-toggle-row">
              <label className="rcp-label" htmlFor="rcp-contrast-toggle">
                <span className="rcp-label__icon">◐</span>
                High Contrast
              </label>
              <button
                id="rcp-contrast-toggle"
                role="switch"
                aria-checked={settings.highContrast}
                className={`rcp-switch ${
                  settings.highContrast ? "rcp-switch--on" : ""
                }`}
                onClick={() => update("highContrast", !settings.highContrast)}
              >
                <span className="rcp-switch__thumb" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="rcp-footer">
          <button
            id="rcp-reset"
            className="rcp-btn rcp-btn--reset"
            onClick={() => setSettings(DEFAULT_SETTINGS)}
          >
            Reset to defaults
          </button>
        </div>
      </div>
    </div>
  );
}
