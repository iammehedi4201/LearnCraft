"use client";

import { useState } from "react";
import { Nav } from "@/components/nav";
import { useTheme } from "@/components/theme-provider";

// Color token definition structure for documentation rendering
interface ColorToken {
  name: string;
  variable: string;
  tailwindClass: string;
  lightHex: string;
  darkHex: string;
  opacity?: string;
  swatchClass: string;
}

const STATIC_TOKENS: ColorToken[] = [
  { name: "static-white", variable: "--static-white", tailwindClass: "bg-ds-static-white", lightHex: "#FFFFFF", darkHex: "#FFFFFF", swatchClass: "bg-ds-static-white border border-ds-stroke-soft" },
  { name: "static-black", variable: "--static-black", tailwindClass: "bg-ds-static-black", lightHex: "#0E121B", darkHex: "#0E121B", swatchClass: "bg-ds-static-black" },
];

const BG_TOKENS: ColorToken[] = [
  { name: "white-0", variable: "--bg-white-0", tailwindClass: "bg-ds-bg-white", lightHex: "#FFFFFF", darkHex: "#0E121B", swatchClass: "bg-ds-bg-white border border-ds-stroke-soft" },
  { name: "weak-50", variable: "--bg-weak-50", tailwindClass: "bg-ds-bg-weak", lightHex: "#F5F7FA", darkHex: "#181B25", swatchClass: "bg-ds-bg-weak border border-ds-stroke-soft" },
  { name: "strong-950", variable: "--bg-strong-950", tailwindClass: "bg-ds-bg-strong", lightHex: "#0E121B", darkHex: "#FFFFFF", swatchClass: "bg-ds-bg-strong border border-ds-stroke-soft" },
  { name: "surface-800", variable: "--bg-surface-800", tailwindClass: "bg-ds-bg-surface", lightHex: "#222530", darkHex: "#E1E4EA", swatchClass: "bg-ds-bg-surface" },
  { name: "soft-200", variable: "--bg-soft-200", tailwindClass: "bg-ds-bg-soft", lightHex: "#E1E4EA", darkHex: "#2B303B", swatchClass: "bg-ds-bg-soft" },
  { name: "sub-300", variable: "--bg-sub-300", tailwindClass: "bg-ds-bg-sub", lightHex: "#CACFD8", darkHex: "#525866", swatchClass: "bg-ds-bg-sub" },
];

const TEXT_TOKENS: ColorToken[] = [
  { name: "strong-950", variable: "--text-strong-950", tailwindClass: "text-ds-text-strong", lightHex: "#0E121B", darkHex: "#FFFFFF", swatchClass: "bg-ds-text-strong" },
  { name: "sub-600", variable: "--text-sub-600", tailwindClass: "text-ds-text-sub", lightHex: "#525866", darkHex: "#99A0AE", swatchClass: "bg-ds-text-sub" },
  { name: "disabled-300", variable: "--text-disabled-300", tailwindClass: "text-ds-text-disabled", lightHex: "#CACFD8", darkHex: "#525866", swatchClass: "bg-ds-text-disabled" },
  { name: "white-0", variable: "--text-white-0", tailwindClass: "text-ds-text-white", lightHex: "#FFFFFF", darkHex: "#0E121B", swatchClass: "bg-ds-text-white border border-ds-stroke-soft" },
  { name: "soft-400", variable: "--text-soft-400", tailwindClass: "text-ds-text-soft", lightHex: "#99A0AE", darkHex: "#717784", swatchClass: "bg-ds-text-soft" },
];

const STROKE_TOKENS: ColorToken[] = [
  { name: "soft-200", variable: "--stroke-soft-200", tailwindClass: "border-ds-stroke-soft", lightHex: "#E1E4EA", darkHex: "#2B303B", swatchClass: "bg-ds-stroke-soft border border-ds-stroke-soft" },
  { name: "strong-950", variable: "--stroke-strong-950", tailwindClass: "border-ds-stroke-strong", lightHex: "#0E121B", darkHex: "#FFFFFF", swatchClass: "bg-ds-stroke-strong" },
  { name: "white-0", variable: "--stroke-white-0", tailwindClass: "border-ds-stroke-white", lightHex: "#FFFFFF", darkHex: "#0E121B", swatchClass: "bg-ds-stroke-white border border-ds-stroke-soft" },
  { name: "sub-300", variable: "--stroke-sub-300", tailwindClass: "border-ds-stroke-sub", lightHex: "#CACFD8", darkHex: "#525866", swatchClass: "bg-ds-stroke-sub" },
];

const ICON_TOKENS: ColorToken[] = [
  { name: "sub-600", variable: "--icon-sub-600", tailwindClass: "text-ds-icon-sub", lightHex: "#525866", darkHex: "#99A0AE", swatchClass: "bg-ds-icon-sub" },
  { name: "strong-950", variable: "--icon-strong-950", tailwindClass: "text-ds-icon-strong", lightHex: "#0E121B", darkHex: "#FFFFFF", swatchClass: "bg-ds-icon-strong border border-ds-stroke-soft" },
  { name: "soft-400", variable: "--icon-soft-400", tailwindClass: "text-ds-icon-soft", lightHex: "#99A0AE", darkHex: "#717784", swatchClass: "bg-ds-icon-soft" },
  { name: "disabled-300", variable: "--icon-disabled-300", tailwindClass: "text-ds-icon-disabled", lightHex: "#CACFD8", darkHex: "#525866", swatchClass: "bg-ds-icon-disabled" },
  { name: "white-0", variable: "--icon-white-0", tailwindClass: "text-ds-icon-white", lightHex: "#FFFFFF", darkHex: "#0E121B", swatchClass: "bg-ds-icon-white border border-ds-stroke-soft" },
];

const SOCIAL_TOKENS: ColorToken[] = [
  { name: "apple", variable: "--social-apple", tailwindClass: "bg-ds-social-apple", lightHex: "#000000", darkHex: "#FFFFFF", swatchClass: "bg-ds-social-apple" },
  { name: "twitter", variable: "--social-twitter", tailwindClass: "bg-ds-social-twitter", lightHex: "#010101", darkHex: "#FFFFFF", swatchClass: "bg-ds-social-twitter" },
  { name: "github", variable: "--social-github", tailwindClass: "bg-ds-social-github", lightHex: "#24292F", darkHex: "#FFFFFF", swatchClass: "bg-ds-social-github" },
  { name: "notion", variable: "--social-notion", tailwindClass: "bg-ds-social-notion", lightHex: "#1E2226", darkHex: "#FFFFFF", swatchClass: "bg-ds-social-notion" },
  { name: "tidal", variable: "--social-tidal", tailwindClass: "bg-ds-social-tidal", lightHex: "#000000", darkHex: "#FFFFFF", swatchClass: "bg-ds-social-tidal" },
  { name: "amazon", variable: "--social-amazon", tailwindClass: "bg-ds-social-amazon", lightHex: "#353E47", darkHex: "#FFFFFF", swatchClass: "bg-ds-social-amazon" },
  { name: "zendesk", variable: "--social-zendesk", tailwindClass: "bg-ds-social-zendesk", lightHex: "#16140D", darkHex: "#FFFFFF", swatchClass: "bg-ds-social-zendesk" },
];

const ILLUSTRATION_TOKENS: ColorToken[] = [
  { name: "strong-400", variable: "--illustration-strong-400", tailwindClass: "bg-ds-illustration-strong", lightHex: "#99A0AE", darkHex: "#525866", swatchClass: "bg-ds-illustration-strong" },
  { name: "sub-300", variable: "--illustration-sub-300", tailwindClass: "bg-ds-illustration-sub", lightHex: "#CACFD8", darkHex: "#2B303B", swatchClass: "bg-ds-illustration-sub" },
  { name: "soft-200", variable: "--illustration-soft-200", tailwindClass: "bg-ds-illustration-soft", lightHex: "#E1E4EA", darkHex: "#222530", swatchClass: "bg-ds-illustration-soft" },
  { name: "weak-100", variable: "--illustration-weak-100", tailwindClass: "bg-ds-illustration-weak", lightHex: "#F2F5F8", darkHex: "#181B25", swatchClass: "bg-ds-illustration-weak" },
  { name: "white-0", variable: "--illustration-white-0", tailwindClass: "bg-ds-illustration-white", lightHex: "#FFFFFF", darkHex: "#0E121B", swatchClass: "bg-ds-illustration-white border border-ds-stroke-soft" },
];

const OVERLAY_TOKENS: ColorToken[] = [
  { name: "overlay", variable: "--overlay", tailwindClass: "bg-ds-overlay", lightHex: "#020D17", darkHex: "#525866", opacity: "L: 24% | D: 32%", swatchClass: "bg-ds-overlay" },
];

interface StateTokenGroup {
  state: string;
  tokens: {
    modifier: "base" | "light" | "dark" | "lighter";
    tailwindClass: string;
    lightHex: string;
    darkHex: string;
    opacity?: string;
  }[];
}

const STATE_TOKENS: StateTokenGroup[] = [
  {
    state: "faded",
    tokens: [
      { modifier: "base", tailwindClass: "ds-faded-base", lightHex: "#717784", darkHex: "#717784" },
      { modifier: "light", tailwindClass: "ds-faded-light", lightHex: "#E1E4EA", darkHex: "#99A0AE", opacity: "24%" },
      { modifier: "dark", tailwindClass: "ds-faded-dark", lightHex: "#222530", darkHex: "#CACFD8" },
      { modifier: "lighter", tailwindClass: "ds-faded-lighter", lightHex: "#F2F5F8", darkHex: "#99A0AE", opacity: "16%" },
    ]
  },
  {
    state: "error",
    tokens: [
      { modifier: "base", tailwindClass: "ds-error-base", lightHex: "#FB3748", darkHex: "#E93544" },
      { modifier: "light", tailwindClass: "ds-error-light", lightHex: "#FFC0C5", darkHex: "#FB3748", opacity: "24%" },
      { modifier: "dark", tailwindClass: "ds-error-dark", lightHex: "#681219", darkHex: "#FF6875" },
      { modifier: "lighter", tailwindClass: "ds-error-lighter", lightHex: "#FFEBEC", darkHex: "#FB3748", opacity: "16%" },
    ]
  },
  {
    state: "warning",
    tokens: [
      { modifier: "base", tailwindClass: "ds-warning-base", lightHex: "#FF8447", darkHex: "#E97135" },
      { modifier: "light", tailwindClass: "ds-warning-light", lightHex: "#FFD5C0", darkHex: "#FF9147", opacity: "24%" },
      { modifier: "dark", tailwindClass: "ds-warning-dark", lightHex: "#682F12", darkHex: "#FF9A68" },
      { modifier: "lighter", tailwindClass: "ds-warning-lighter", lightHex: "#FFF1EB", darkHex: "#FF9147", opacity: "16%" },
    ]
  },
  {
    state: "information",
    tokens: [
      { modifier: "base", tailwindClass: "ds-info-base", lightHex: "#335CFF", darkHex: "#335CFF" },
      { modifier: "light", tailwindClass: "ds-info-light", lightHex: "#C0D5FF", darkHex: "#476CFF", opacity: "24%" },
      { modifier: "dark", tailwindClass: "ds-info-dark", lightHex: "#122368", darkHex: "#6895FF" },
      { modifier: "lighter", tailwindClass: "ds-info-lighter", lightHex: "#EBF1FF", darkHex: "#476CFF", opacity: "16%" },
    ]
  },
  {
    state: "success",
    tokens: [
      { modifier: "base", tailwindClass: "ds-success-base", lightHex: "#1FC16B", darkHex: "#1DAF61" },
      { modifier: "light", tailwindClass: "ds-success-light", lightHex: "#C2F5DA", darkHex: "#1FC16B", opacity: "16%" },
      { modifier: "dark", tailwindClass: "ds-success-dark", lightHex: "#0B4627", darkHex: "#3EE089" },
      { modifier: "lighter", tailwindClass: "ds-success-lighter", lightHex: "#E0FAEC", darkHex: "#1FC16B", opacity: "10%" },
    ]
  },
  {
    state: "away",
    tokens: [
      { modifier: "base", tailwindClass: "ds-away-base", lightHex: "#F6B51E", darkHex: "#E6A819" },
      { modifier: "light", tailwindClass: "ds-away-light", lightHex: "#FFECC0", darkHex: "#FBC64B", opacity: "24%" },
      { modifier: "dark", tailwindClass: "ds-away-dark", lightHex: "#624C18", darkHex: "#FFD268" },
      { modifier: "lighter", tailwindClass: "ds-away-lighter", lightHex: "#FFFAEB", darkHex: "#FBC64B", opacity: "16%" },
    ]
  },
  {
    state: "feature",
    tokens: [
      { modifier: "base", tailwindClass: "ds-feature-base", lightHex: "#7D52F4", darkHex: "#7D52F4" },
      { modifier: "light", tailwindClass: "ds-feature-light", lightHex: "#CAC0FF", darkHex: "#784DEF", opacity: "24%" },
      { modifier: "dark", tailwindClass: "ds-feature-dark", lightHex: "#351A75", darkHex: "#8C71F6" },
      { modifier: "lighter", tailwindClass: "ds-feature-lighter", lightHex: "#EFEBFF", darkHex: "#784DEF", opacity: "16%" },
    ]
  },
  {
    state: "verified",
    tokens: [
      { modifier: "base", tailwindClass: "ds-verified-base", lightHex: "#47C2FF", darkHex: "#35ADE9" },
      { modifier: "light", tailwindClass: "ds-verified-light", lightHex: "#C0EAFF", darkHex: "#47C2FF", opacity: "24%" },
      { modifier: "dark", tailwindClass: "ds-verified-dark", lightHex: "#124B68", darkHex: "#68CDFF" },
      { modifier: "lighter", tailwindClass: "ds-verified-lighter", lightHex: "#EBF8FF", darkHex: "#47C2FF", opacity: "16%" },
    ]
  },
  {
    state: "highlighted",
    tokens: [
      { modifier: "base", tailwindClass: "ds-highlighted-base", lightHex: "#FB4BA3", darkHex: "#E9358F" },
      { modifier: "light", tailwindClass: "ds-highlighted-light", lightHex: "#FFC0DF", darkHex: "#FB4BA3", opacity: "24%" },
      { modifier: "dark", tailwindClass: "ds-highlighted-dark", lightHex: "#68123D", darkHex: "#FF68B3" },
      { modifier: "lighter", tailwindClass: "ds-highlighted-lighter", lightHex: "#FFEBF4", darkHex: "#FB4BA3", opacity: "16%" },
    ]
  },
  {
    state: "stable",
    tokens: [
      { modifier: "base", tailwindClass: "ds-stable-base", lightHex: "#22D3BB", darkHex: "#1DAF9C" },
      { modifier: "light", tailwindClass: "ds-stable-light", lightHex: "#C2F5EE", darkHex: "#22D3BB", opacity: "24%" },
      { modifier: "dark", tailwindClass: "ds-stable-dark", lightHex: "#0B463E", darkHex: "#3FDEC9" },
      { modifier: "lighter", tailwindClass: "ds-stable-lighter", lightHex: "#E4FBF8", darkHex: "#22D3BB", opacity: "16%" },
    ]
  }
];

export default function DesignSystemPlayground(): JSX.Element {
  const { theme, setTheme } = useTheme();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string>("button-primary");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const getActiveComponentCode = () => {
    switch (selectedComponent) {
      case "button-primary":
        return `<button className="px-5 py-2.5 bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white font-bold rounded-xl transition-all duration-300 active:scale-95 shadow-md shadow-ds-feature-base/10 hover:shadow-lg">
  Primary Action
</button>`;
      case "button-secondary":
        return `<button className="px-5 py-2.5 bg-ds-bg-soft hover:bg-ds-bg-sub text-ds-text-strong font-bold rounded-xl transition-all duration-300 border border-ds-stroke-soft">
  Secondary Action
</button>`;
      case "button-error":
        return `<button className="px-5 py-2.5 bg-ds-error-base hover:bg-ds-error-dark text-ds-static-white font-bold rounded-xl transition-all duration-300 shadow-sm">
  Danger Action
</button>`;
      case "badge-success":
        return `<span className="px-3 py-1 text-xs font-bold rounded-full bg-ds-success-lighter text-ds-success-dark border border-ds-success-base">
  🟢 Stable Status
</span>`;
      case "badge-feature":
        return `<span className="px-3 py-1 text-xs font-bold rounded-full bg-ds-feature-lighter text-ds-feature-dark border border-ds-feature-base">
  🚀 New Feature
</span>`;
      case "badge-warning":
        return `<span className="px-3 py-1 text-xs font-bold rounded-full bg-ds-warning-lighter text-ds-warning-dark border border-ds-warning-base">
  ⚠️ Attention Needed
</span>`;
      case "alert-info":
        return `<div className="flex items-start gap-3 p-4 rounded-xl border border-ds-info-base bg-ds-info-lighter text-ds-text-strong">
  <span className="text-lg">💡</span>
  <div>
    <h5 className="font-bold text-sm text-ds-info-dark">Did you know?</h5>
    <p className="text-xs text-ds-text-sub mt-0.5">This component adapts color tokens automatically to light/dark themes.</p>
  </div>
</div>`;
      case "alert-error":
        return `<div className="flex items-start gap-3 p-4 rounded-xl border border-ds-error-base bg-ds-error-lighter text-ds-text-strong">
  <span className="text-lg">❌</span>
  <div>
    <h5 className="font-bold text-sm text-ds-error-dark">Execution Error</h5>
    <p className="text-xs text-ds-text-sub mt-0.5">Please check your configuration variables and try compiles again.</p>
  </div>
</div>`;
      case "card-interactive":
        return `<div className="p-6 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft hover:border-ds-feature-base/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
  <h4 className="font-black text-lg text-ds-text-strong group-hover:text-ds-feature-base transition-colors">
    Interactive Feature Card
  </h4>
  <p className="text-sm text-ds-text-sub mt-2 leading-relaxed">
    Leveraging Figma design tokens allows for cleaner visual hierarchy and pixel-perfect design-to-code translations.
  </p>
</div>`;
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-ds-bg-weak text-ds-text-strong font-sans selection:bg-ds-feature-light/20 pb-20">
      <Nav />

      <main className="max-w-7xl mx-auto px-6 pt-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 p-8 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 text-[10px] font-black tracking-widest uppercase bg-ds-feature-lighter text-ds-feature-dark rounded-full">
                Design System
              </span>
              <span className="text-xs text-ds-text-soft">v1.0.0</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-ds-text-strong font-display">
              LearnCraft Token Palette
            </h1>
            <p className="text-ds-text-sub text-base mt-2 max-w-xl">
              Clean, high-contrast semantic design tokens generated directly from Figma mode exports. Includes custom components and dark mode transitions.
            </p>
          </div>

          {/* Theme Quick Switcher */}
          <div className="flex flex-col gap-2 bg-ds-bg-weak p-4 rounded-2xl border border-ds-stroke-soft shrink-0">
            <span className="text-[10px] font-black text-ds-text-soft uppercase tracking-wider">
              Active Environment Theme
            </span>
            <div className="flex gap-2">
              {(["light", "dark"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all duration-200 ${
                    theme === t
                      ? "bg-ds-feature-base text-ds-static-white shadow-sm"
                      : "bg-ds-bg-white text-ds-text-sub hover:text-ds-text-strong border border-ds-stroke-soft"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 1: PALETTES */}
        <section className="mb-16">
          <div className="border-b border-ds-stroke-soft pb-4 mb-8">
            <h2 className="text-2xl font-black tracking-tight text-ds-text-strong font-display">
              1. Color Token Palettes
            </h2>
            <p className="text-xs text-ds-text-soft mt-1">
              Colors will adjust automatically when switching themes above. Click any swatch name to copy its Tailwind CSS class.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Static, Background, Text, Stroke */}
            <div className="space-y-8">
              {/* Static */}
              <div className="p-6 bg-ds-bg-white border border-ds-stroke-soft rounded-2xl shadow-sm">
                <h3 className="text-sm font-black text-ds-text-soft uppercase tracking-wider mb-4">
                  Static Tokens (Constant in all themes)
                </h3>
                <div className="space-y-3">
                  {STATIC_TOKENS.map((token) => (
                    <div
                      key={token.name}
                      onClick={() => copyToClipboard(token.tailwindClass, token.name)}
                      className="flex items-center justify-between p-3 bg-ds-bg-weak border border-ds-stroke-soft rounded-xl hover:border-ds-feature-base transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-16 rounded-lg shadow-inner ${token.swatchClass}`} />
                        <div>
                          <p className="text-sm font-bold text-ds-text-strong group-hover:text-ds-feature-base transition-colors">
                            {token.name}
                          </p>
                          <p className="text-[10px] font-mono text-ds-text-soft mt-0.5">{token.tailwindClass}</p>
                        </div>
                      </div>
                      <div className="text-right font-mono text-xs text-ds-text-sub">
                        <span className="block">Light/Dark: {token.lightHex}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Background */}
              <div className="p-6 bg-ds-bg-white border border-ds-stroke-soft rounded-2xl shadow-sm">
                <h3 className="text-sm font-black text-ds-text-soft uppercase tracking-wider mb-4">
                  Background (bg) Tokens
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {BG_TOKENS.map((token) => (
                    <div
                      key={token.name}
                      onClick={() => copyToClipboard(token.tailwindClass, token.name)}
                      className="flex flex-col justify-between p-3 bg-ds-bg-weak border border-ds-stroke-soft rounded-xl hover:border-ds-feature-base transition-colors cursor-pointer group"
                    >
                      <div className={`h-12 w-full rounded-lg shadow-inner mb-3 ${token.swatchClass}`} />
                      <div>
                        <p className="text-sm font-bold text-ds-text-strong group-hover:text-ds-feature-base transition-colors">
                          {token.name}
                        </p>
                        <p className="text-[9px] font-mono text-ds-text-soft mt-0.5">{token.tailwindClass}</p>
                        <div className="mt-2 pt-2 border-t border-ds-stroke-soft/60 flex items-center justify-between font-mono text-[9px] text-ds-text-sub">
                          <span>L: {token.lightHex}</span>
                          <span>D: {token.darkHex}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Text Tokens */}
              <div className="p-6 bg-ds-bg-white border border-ds-stroke-soft rounded-2xl shadow-sm">
                <h3 className="text-sm font-black text-ds-text-soft uppercase tracking-wider mb-4">
                  Text Tokens
                </h3>
                <div className="space-y-3">
                  {TEXT_TOKENS.map((token) => (
                    <div
                      key={token.name}
                      onClick={() => copyToClipboard(token.tailwindClass, token.name)}
                      className="flex items-center justify-between p-3 bg-ds-bg-weak border border-ds-stroke-soft rounded-xl hover:border-ds-feature-base transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-lg ${token.swatchClass}`}>
                          <span className={token.tailwindClass}>Aa</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-ds-text-strong group-hover:text-ds-feature-base transition-colors">
                            {token.name}
                          </p>
                          <p className="text-[10px] font-mono text-ds-text-soft mt-0.5">{token.tailwindClass}</p>
                        </div>
                      </div>
                      <div className="text-right font-mono text-[10px] text-ds-text-sub">
                        <span>L: {token.lightHex}</span>
                        <span className="mx-1.5">|</span>
                        <span>D: {token.darkHex}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stroke Tokens */}
              <div className="p-6 bg-ds-bg-white border border-ds-stroke-soft rounded-2xl shadow-sm">
                <h3 className="text-sm font-black text-ds-text-soft uppercase tracking-wider mb-4">
                  Stroke / Border Tokens
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {STROKE_TOKENS.map((token) => (
                    <div
                      key={token.name}
                      onClick={() => copyToClipboard(token.tailwindClass, token.name)}
                      className="flex items-center gap-3 p-3 bg-ds-bg-weak border border-ds-stroke-soft rounded-xl hover:border-ds-feature-base transition-colors cursor-pointer group"
                    >
                      <div className={`h-8 w-12 rounded-lg border-2 ${token.tailwindClass} bg-ds-bg-white shadow-inner flex-shrink-0`} />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-ds-text-strong group-hover:text-ds-feature-base transition-colors truncate">
                          {token.name}
                        </p>
                        <p className="text-[9px] font-mono text-ds-text-soft truncate mt-0.5">{token.tailwindClass}</p>
                        <p className="text-[8px] font-mono text-ds-text-sub mt-1">L: {token.lightHex} | D: {token.darkHex}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Icon Tokens */}
              <div className="p-6 bg-ds-bg-white border border-ds-stroke-soft rounded-2xl shadow-sm">
                <h3 className="text-sm font-black text-ds-text-soft uppercase tracking-wider mb-4">
                  Icon Tokens
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ICON_TOKENS.map((token) => (
                    <div
                      key={token.name}
                      onClick={() => copyToClipboard(token.tailwindClass, token.name)}
                      className="flex items-center gap-3 p-3 bg-ds-bg-weak border border-ds-stroke-soft rounded-xl hover:border-ds-feature-base transition-colors cursor-pointer group"
                    >
                      <div className="h-8 w-8 rounded-lg flex items-center justify-center font-bold text-lg bg-ds-bg-white border border-ds-stroke-soft shadow-inner">
                        <span className={token.swatchClass}>⚙️</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-ds-text-strong group-hover:text-ds-feature-base transition-colors truncate">
                          {token.name}
                        </p>
                        <p className="text-[9px] font-mono text-ds-text-soft truncate mt-0.5">{token.tailwindClass}</p>
                        <p className="text-[8px] font-mono text-ds-text-sub mt-1">L: {token.lightHex} | D: {token.darkHex}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Tokens */}
              <div className="p-6 bg-ds-bg-white border border-ds-stroke-soft rounded-2xl shadow-sm">
                <h3 className="text-sm font-black text-ds-text-soft uppercase tracking-wider mb-4">
                  Social Brands Tokens
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {SOCIAL_TOKENS.map((token) => (
                    <div
                      key={token.name}
                      onClick={() => copyToClipboard(token.tailwindClass, token.name)}
                      className="flex flex-col p-3 bg-ds-bg-weak border border-ds-stroke-soft rounded-xl hover:border-ds-feature-base transition-colors cursor-pointer group"
                    >
                      <div className={`h-8 w-full rounded-lg shadow-inner mb-2 ${token.swatchClass}`} />
                      <p className="text-xs font-bold text-ds-text-strong group-hover:text-ds-feature-base transition-colors truncate">
                        {token.name}
                      </p>
                      <p className="text-[8px] font-mono text-ds-text-soft truncate mt-0.5">{token.tailwindClass}</p>
                      <p className="text-[8px] font-mono text-ds-text-sub mt-1">L: {token.lightHex} | D: {token.darkHex}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Illustration Tokens */}
              <div className="p-6 bg-ds-bg-white border border-ds-stroke-soft rounded-2xl shadow-sm">
                <h3 className="text-sm font-black text-ds-text-soft uppercase tracking-wider mb-4">
                  Illustration Tokens
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {ILLUSTRATION_TOKENS.map((token) => (
                    <div
                      key={token.name}
                      onClick={() => copyToClipboard(token.tailwindClass, token.name)}
                      className="flex flex-col p-3 bg-ds-bg-weak border border-ds-stroke-soft rounded-xl hover:border-ds-feature-base transition-colors cursor-pointer group"
                    >
                      <div className={`h-10 w-full rounded-lg shadow-inner mb-2 ${token.swatchClass}`} />
                      <p className="text-xs font-bold text-ds-text-strong group-hover:text-ds-feature-base transition-colors truncate">
                        {token.name}
                      </p>
                      <p className="text-[8px] font-mono text-ds-text-soft truncate mt-0.5">{token.tailwindClass}</p>
                      <p className="text-[8px] font-mono text-ds-text-sub mt-1">L: {token.lightHex} | D: {token.darkHex}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overlay Tokens */}
              <div className="p-6 bg-ds-bg-white border border-ds-stroke-soft rounded-2xl shadow-sm">
                <h3 className="text-sm font-black text-ds-text-soft uppercase tracking-wider mb-4">
                  Overlay Tokens
                </h3>
                <div className="space-y-3">
                  {OVERLAY_TOKENS.map((token) => (
                    <div
                      key={token.name}
                      onClick={() => copyToClipboard(token.tailwindClass, token.name)}
                      className="flex items-center justify-between p-3 bg-ds-bg-weak border border-ds-stroke-soft rounded-xl hover:border-ds-feature-base transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-16 rounded-lg border border-ds-stroke-soft shadow-inner relative overflow-hidden bg-ds-bg-white flex-shrink-0">
                          <div className={`absolute inset-0 ${token.tailwindClass}`} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-ds-text-strong group-hover:text-ds-feature-base transition-colors">
                            {token.name}
                          </p>
                          <p className="text-[10px] font-mono text-ds-text-soft mt-0.5">{token.tailwindClass}</p>
                        </div>
                      </div>
                      <div className="text-right font-mono text-[10px] text-ds-text-sub">
                        <span className="block">L: {token.lightHex} (24%)</span>
                        <span className="block">D: {token.darkHex} (32%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: State Tokens */}
            <div className="p-6 bg-ds-bg-white border border-ds-stroke-soft rounded-2xl shadow-sm">
              <h3 className="text-sm font-black text-ds-text-soft uppercase tracking-wider mb-4">
                State Tokens (Adaptive Modes)
              </h3>
              <div className="space-y-6">
                {STATE_TOKENS.map((stateGroup) => (
                  <div key={stateGroup.state} className="p-4 bg-ds-bg-weak border border-ds-stroke-soft rounded-xl">
                    <h4 className="text-xs font-black text-ds-text-strong uppercase tracking-wider mb-3">
                      {stateGroup.state}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {stateGroup.tokens.map((token) => {
                        // Dynamically build class to render style correctly in sandbox
                        const modifierName = token.modifier;

                        // Create variable class for demonstration
                        let displayBg = "";
                        let displayText = "text-ds-text-strong";

                        if (modifierName === "base") {
                          displayBg = `bg-ds-${stateGroup.state}-base`;
                          displayText = "text-ds-static-white";
                        } else if (modifierName === "light") {
                          displayBg = `bg-ds-${stateGroup.state}-light`;
                          displayText = `text-ds-${stateGroup.state}-dark`;
                        } else if (modifierName === "dark") {
                          displayBg = `bg-ds-${stateGroup.state}-dark`;
                          displayText = "text-ds-static-white";
                        } else if (modifierName === "lighter") {
                          displayBg = `bg-ds-${stateGroup.state}-lighter`;
                          displayText = `text-ds-${stateGroup.state}-dark`;
                        }

                        // Adjust mapping for special state cases
                        if (stateGroup.state === "information") {
                          if (modifierName === "base") displayBg = "bg-ds-info-base";
                          if (modifierName === "light") { displayBg = "bg-ds-info-light"; displayText = "text-ds-info-dark"; }
                          if (modifierName === "dark") displayBg = "bg-ds-info-dark";
                          if (modifierName === "lighter") { displayBg = "bg-ds-info-lighter"; displayText = "text-ds-info-dark"; }
                        }

                        return (
                          <div
                            key={token.modifier}
                            onClick={() => copyToClipboard(`bg-ds-${stateGroup.state === "information" ? "info" : stateGroup.state}-${token.modifier}`, `${stateGroup.state}/${token.modifier}`)}
                            className="flex flex-col p-2.5 bg-ds-bg-white border border-ds-stroke-soft rounded-lg hover:border-ds-feature-base transition-colors cursor-pointer group"
                          >
                            <div className={`h-12 w-full rounded-md shadow-inner mb-2 flex items-center justify-center text-[10px] font-bold ${displayBg} ${displayText}`}>
                              {token.modifier}
                            </div>
                            <span className="text-[10px] font-bold text-ds-text-strong group-hover:text-ds-feature-base transition-colors">
                              {token.modifier}
                            </span>
                            <span className="text-[8px] font-mono text-ds-text-soft mt-0.5">
                              L: {token.lightHex}
                            </span>
                            <span className="text-[8px] font-mono text-ds-text-soft">
                              D: {token.darkHex} {token.opacity && `(${token.opacity})`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1.5: TYPOGRAPHY SYSTEM */}
        <section className="mb-16">
          <div className="border-b border-ds-stroke-soft pb-4 mb-8">
            <h2 className="text-2xl font-black tracking-tight text-ds-text-strong font-display">
              1.2 Typography & Font Hierarchy
            </h2>
            <p className="text-xs text-ds-text-soft mt-1">
              The type system uses <span className="font-bold text-ds-feature-base">Manrope</span> as the primary font family.
            </p>
          </div>

          <div className="p-6 bg-ds-bg-white border border-ds-stroke-soft rounded-2xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Left Column: Font Family Info */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-ds-text-soft uppercase tracking-wider">
                  Primary Font Family
                </h3>
                <div className="p-4 bg-ds-bg-weak border border-ds-stroke-soft rounded-xl">
                  <p className="text-3xl font-black tracking-tight text-ds-text-strong">
                    Aa
                  </p>
                  <p className="text-lg font-bold text-ds-text-strong mt-2">
                    Manrope
                  </p>
                  <p className="text-xs text-ds-text-sub mt-1 leading-relaxed">
                    A versatile, modern sans-serif font family with a warm, geometric aesthetic and high readability on digital screens.
                  </p>
                </div>
              </div>

              {/* Middle & Right Columns: Hierarchy Table */}
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-xs font-black text-ds-text-soft uppercase tracking-wider">
                  Font Hierarchy & Weights
                </h3>
                <div className="overflow-x-auto border border-ds-stroke-soft rounded-xl bg-ds-bg-weak">
                  <table className="w-full border-collapse text-left text-sm text-ds-text-strong">
                    <thead>
                      <tr className="border-b border-ds-stroke-soft bg-ds-bg-soft/50 font-bold text-xs uppercase tracking-wider text-ds-text-soft">
                        <th className="p-3">Element</th>
                        <th className="p-3">Target Weight</th>
                        <th className="p-3">Tailwind Utility Class</th>
                        <th className="p-3">Live Visual Sample</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ds-stroke-soft">
                      {[
                        { element: "Hero heading", weight: "700", utility: "font-bold text-4xl", text: "Master Modern Web Tech" },
                        { element: "Page heading", weight: "700", utility: "font-bold text-2xl", text: "1. Understanding OOP" },
                        { element: "Section heading", weight: "600", utility: "font-semibold text-lg", text: "Side by side comparison" },
                        { element: "Card title", weight: "600", utility: "font-semibold text-sm", text: "Interactive Feature Card" },
                        { element: "Navigation", weight: "500", utility: "font-medium text-sm", text: "NestJS / Next.js / TanStack" },
                        { element: "Button", weight: "600", utility: "font-semibold text-sm", text: "Primary Action" },
                        { element: "Body text", weight: "400", utility: "font-normal text-sm", text: "Programming means giving instructions to a computer." },
                        { element: "Secondary text", weight: "400", utility: "font-normal text-xs text-ds-text-sub", text: "Click on any swatch card above to copy the class." },
                        { element: "Labels", weight: "500", utility: "font-medium text-[10px] tracking-widest uppercase text-ds-text-soft", text: "MODULES / STATUS" },
                      ].map((row) => (
                        <tr key={row.element} className="hover:bg-ds-bg-white/50 transition-colors">
                          <td className="p-3 font-bold">{row.element}</td>
                          <td className="p-3 font-mono text-xs">{row.weight}</td>
                          <td className="p-3 font-mono text-xs text-ds-feature-base">{row.utility}</td>
                          <td className={`p-3 ${row.utility}`}>{row.text}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: COMPONENTS SANDBOX & CODE INSPECTOR */}
        <section>
          <div className="border-b border-ds-stroke-soft pb-4 mb-8">
            <h2 className="text-2xl font-black tracking-tight text-ds-text-strong font-display">
              2. Interactive Component Catalog & JSX Inspector
            </h2>
            <p className="text-xs text-ds-text-soft mt-1">
              Select any component to inspect its implementation code.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Components Selection & Preview List */}
            <div className="lg:col-span-2 space-y-6">
              {/* Buttons Category */}
              <div className="p-6 bg-ds-bg-white border border-ds-stroke-soft rounded-2xl shadow-sm">
                <h3 className="text-xs font-black text-ds-text-soft uppercase tracking-wider mb-4">
                  Interactive Buttons
                </h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex flex-col gap-1 items-start">
                    <button
                      onClick={() => setSelectedComponent("button-primary")}
                      className={`px-5 py-2.5 bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white font-bold rounded-xl transition-all duration-300 active:scale-95 shadow-md shadow-ds-feature-base/10 hover:shadow-lg border ${
                        selectedComponent === "button-primary" ? "ring-2 ring-ds-feature-base border-transparent" : "border-transparent"
                      }`}
                    >
                      Primary Feature
                    </button>
                    <span className="text-[9px] text-ds-text-soft mx-auto">Click to Inspect</span>
                  </div>

                  <div className="flex flex-col gap-1 items-start">
                    <button
                      onClick={() => setSelectedComponent("button-secondary")}
                      className={`px-5 py-2.5 bg-ds-bg-soft hover:bg-ds-bg-sub text-ds-text-strong font-bold rounded-xl transition-all duration-300 border ${
                        selectedComponent === "button-secondary"
                          ? "ring-2 ring-ds-feature-base border-transparent"
                          : "border-ds-stroke-soft"
                      }`}
                    >
                      Secondary Soft
                    </button>
                    <span className="text-[9px] text-ds-text-soft mx-auto">Click to Inspect</span>
                  </div>

                  <div className="flex flex-col gap-1 items-start">
                    <button
                      onClick={() => setSelectedComponent("button-error")}
                      className={`px-5 py-2.5 bg-ds-error-base hover:bg-ds-error-dark text-ds-static-white font-bold rounded-xl transition-all duration-300 active:scale-95 shadow-sm ${
                        selectedComponent === "button-error" ? "ring-2 ring-ds-feature-base border-transparent" : "border-transparent"
                      }`}
                    >
                      Danger Action
                    </button>
                    <span className="text-[9px] text-ds-text-soft mx-auto">Click to Inspect</span>
                  </div>
                </div>
              </div>

              {/* Status Badges */}
              <div className="p-6 bg-ds-bg-white border border-ds-stroke-soft rounded-2xl shadow-sm">
                <h3 className="text-xs font-black text-ds-text-soft uppercase tracking-wider mb-4">
                  Status Badges
                </h3>
                <div className="flex flex-wrap gap-4">
                  <div
                    onClick={() => setSelectedComponent("badge-success")}
                    className={`cursor-pointer px-4 py-2 rounded-xl transition-all border ${
                      selectedComponent === "badge-success" ? "bg-ds-bg-weak border-ds-feature-base" : "bg-transparent border-transparent"
                    }`}
                  >
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-ds-success-lighter text-ds-success-dark border border-ds-success-base">
                      🟢 Stable Status
                    </span>
                  </div>

                  <div
                    onClick={() => setSelectedComponent("badge-feature")}
                    className={`cursor-pointer px-4 py-2 rounded-xl transition-all border ${
                      selectedComponent === "badge-feature" ? "bg-ds-bg-weak border-ds-feature-base" : "bg-transparent border-transparent"
                    }`}
                  >
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-ds-feature-lighter text-ds-feature-dark border border-ds-feature-base">
                      🚀 New Feature
                    </span>
                  </div>

                  <div
                    onClick={() => setSelectedComponent("badge-warning")}
                    className={`cursor-pointer px-4 py-2 rounded-xl transition-all border ${
                      selectedComponent === "badge-warning" ? "bg-ds-bg-weak border-ds-feature-base" : "bg-transparent border-transparent"
                    }`}
                  >
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-ds-warning-lighter text-ds-warning-dark border border-ds-warning-base">
                      ⚠️ Attention Needed
                    </span>
                  </div>
                </div>
              </div>

              {/* Alerts Banners */}
              <div className="p-6 bg-ds-bg-white border border-ds-stroke-soft rounded-2xl shadow-sm">
                <h3 className="text-xs font-black text-ds-text-soft uppercase tracking-wider mb-4">
                  Alert & Callout Cards
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setSelectedComponent("alert-info")}
                    className={`cursor-pointer p-1 rounded-2xl border transition-all ${
                      selectedComponent === "alert-info" ? "border-ds-feature-base shadow-sm" : "border-transparent"
                    }`}
                  >
                    <div className="flex items-start gap-3 p-4 rounded-xl border border-ds-info-base bg-ds-info-lighter text-ds-text-strong">
                      <span className="text-lg flex-shrink-0">💡</span>
                      <div>
                        <h5 className="font-bold text-sm text-ds-info-dark">Did you know?</h5>
                        <p className="text-xs text-ds-text-sub mt-0.5">This component adapts color tokens automatically to light/dark themes.</p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedComponent("alert-error")}
                    className={`cursor-pointer p-1 rounded-2xl border transition-all ${
                      selectedComponent === "alert-error" ? "border-ds-feature-base shadow-sm" : "border-transparent"
                    }`}
                  >
                    <div className="flex items-start gap-3 p-4 rounded-xl border border-ds-error-base bg-ds-error-lighter text-ds-text-strong">
                      <span className="text-lg flex-shrink-0">❌</span>
                      <div>
                        <h5 className="font-bold text-sm text-ds-error-dark">Execution Error</h5>
                        <p className="text-xs text-ds-text-sub mt-0.5">Please check your configuration variables and try compiles again.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Layout Cards */}
              <div className="p-6 bg-ds-bg-white border border-ds-stroke-soft rounded-2xl shadow-sm">
                <h3 className="text-xs font-black text-ds-text-soft uppercase tracking-wider mb-4">
                  Layout Containers
                </h3>
                <div
                  onClick={() => setSelectedComponent("card-interactive")}
                  className={`cursor-pointer p-2 rounded-3xl border transition-all max-w-md ${
                    selectedComponent === "card-interactive" ? "border-ds-feature-base" : "border-transparent"
                  }`}
                >
                  <div className="p-6 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft hover:border-ds-feature-base/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <h4 className="font-black text-lg text-ds-text-strong group-hover:text-ds-feature-base transition-colors">
                      Interactive Feature Card
                    </h4>
                    <p className="text-sm text-ds-text-sub mt-2 leading-relaxed">
                      Leveraging Figma design tokens allows for cleaner visual hierarchy and pixel-perfect design-to-code translations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Code Inspector Panel */}
            <div className="flex flex-col p-6 bg-ds-bg-white border border-ds-stroke-soft rounded-2xl shadow-sm max-h-[600px]">
              <div className="flex items-center justify-between pb-3 border-b border-ds-stroke-soft mb-4">
                <h3 className="text-xs font-black text-ds-text-soft uppercase tracking-wider">
                  JSX Code Inspector
                </h3>
                <button
                  onClick={() => copyToClipboard(getActiveComponentCode(), "jsx-code")}
                  className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-ds-bg-weak hover:bg-ds-bg-soft text-ds-text-strong border border-ds-stroke-soft rounded-md transition-colors"
                >
                  Copy Snippet
                </button>
              </div>

              <div className="flex-1 bg-ds-bg-strong p-4 rounded-xl overflow-auto border border-ds-stroke-soft">
                <pre className="text-xs font-mono text-ds-text-white whitespace-pre-wrap leading-relaxed">
                  {getActiveComponentCode()}
                </pre>
              </div>

              <div className="mt-4 p-3 bg-ds-bg-weak border border-ds-stroke-soft rounded-xl text-[10px] text-ds-text-soft leading-normal">
                📍 Classes beginning with <code className="font-bold text-ds-feature-base">ds-</code> represent custom Figma-derived design system utility tokens configured in your Tailwind variables file.
              </div>
            </div>
          </div>
        </section>

        {/* Global Feedback Banner */}
        {copiedText && (
          <div className="fixed bottom-6 right-6 px-4 py-3 rounded-xl bg-ds-static-black text-ds-static-white text-xs font-bold border border-ds-stroke-soft shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-300 z-50">
            <span>📋</span> Copied <span className="text-ds-feature-light">"{copiedText}"</span> to clipboard!
          </div>
        )}
      </main>
    </div>
  );
}
