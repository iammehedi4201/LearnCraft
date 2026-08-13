import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                ds: {
                    // Static Colors
                    "static-white": "var(--static-white)",
                    "static-black": "var(--static-black)",

                    // Background (bg) tokens
                    "bg-white": "var(--bg-white-0)",
                    "bg-weak": "var(--bg-weak-50)",
                    "bg-strong": "var(--bg-strong-950)",
                    "bg-surface": "var(--bg-surface-800)",
                    "bg-soft": "var(--bg-soft-200)",
                    "bg-sub": "var(--bg-sub-300)",

                    // Text tokens
                    "text-strong": "var(--text-strong-950)",
                    "text-sub": "var(--text-sub-600)",
                    "text-disabled": "var(--text-disabled-300)",
                    "text-white": "var(--text-white-0)",
                    "text-soft": "var(--text-soft-400)",

                    // Stroke / border tokens
                    "stroke-soft": "var(--stroke-soft-200)",
                    "stroke-strong": "var(--stroke-strong-950)",
                    "stroke-white": "var(--stroke-white-0)",
                    "stroke-sub": "var(--stroke-sub-300)",

                    // Faded state tokens
                    "faded-light": "var(--state-faded-light)",
                    "faded-base": "var(--state-faded-base)",
                    "faded-dark": "var(--state-faded-dark)",
                    "faded-lighter": "var(--state-faded-lighter)",

                    // State color tokens
                    "error-base": "var(--state-error-base)",
                    "error-light": "var(--state-error-light)",
                    "error-dark": "var(--state-error-dark)",
                    "error-lighter": "var(--state-error-lighter)",

                    "warning-base": "var(--state-warning-base)",
                    "warning-light": "var(--state-warning-light)",
                    "warning-dark": "var(--state-warning-dark)",
                    "warning-lighter": "var(--state-warning-lighter)",

                    "info-base": "var(--state-information-base)",
                    "info-light": "var(--state-information-light)",
                    "info-dark": "var(--state-information-dark)",
                    "info-lighter": "var(--state-information-lighter)",

                    "success-base": "var(--state-success-base)",
                    "success-light": "var(--state-success-light)",
                    "success-dark": "var(--state-success-dark)",
                    "success-lighter": "var(--state-success-lighter)",

                    "away-base": "var(--state-away-base)",
                    "away-light": "var(--state-away-light)",
                    "away-dark": "var(--state-away-dark)",
                    "away-lighter": "var(--state-away-lighter)",

                    "feature-base": "var(--state-feature-base)",
                    "feature-light": "var(--state-feature-light)",
                    "feature-dark": "var(--state-feature-dark)",
                    "feature-lighter": "var(--state-feature-lighter)",

                    "verified-base": "var(--state-verified-base)",
                    "verified-light": "var(--state-verified-light)",
                    "verified-dark": "var(--state-verified-dark)",
                    "verified-lighter": "var(--state-verified-lighter)",

                    "highlighted-base": "var(--state-highlighted-base)",
                    "highlighted-light": "var(--state-highlighted-light)",
                    "highlighted-dark": "var(--state-highlighted-dark)",
                    "highlighted-lighter": "var(--state-highlighted-lighter)",

                    "stable-base": "var(--state-stable-base)",
                    "stable-light": "var(--state-stable-light)",
                    "stable-dark": "var(--state-stable-dark)",
                    "stable-lighter": "var(--state-stable-lighter)",

                    // Icon tokens
                    "icon-sub": "var(--icon-sub-600)",
                    "icon-strong": "var(--icon-strong-950)",
                    "icon-soft": "var(--icon-soft-400)",
                    "icon-disabled": "var(--icon-disabled-300)",
                    "icon-white": "var(--icon-white-0)",

                    // Social tokens
                    "social-apple": "var(--social-apple)",
                    "social-twitter": "var(--social-twitter)",
                    "social-github": "var(--social-github)",
                    "social-notion": "var(--social-notion)",
                    "social-tidal": "var(--social-tidal)",
                    "social-amazon": "var(--social-amazon)",
                    "social-zendesk": "var(--social-zendesk)",

                    // Illustration tokens
                    "illustration-strong": "var(--illustration-strong-400)",
                    "illustration-sub": "var(--illustration-sub-300)",
                    "illustration-soft": "var(--illustration-soft-200)",
                    "illustration-weak": "var(--illustration-weak-100)",
                    "illustration-white": "var(--illustration-white-0)",

                    // Overlay tokens
                    "overlay": "var(--overlay)",
                },
            },
            fontFamily: {
                sans: ["var(--font-rajdhani)", "system-ui"],
                display: ["var(--font-rajdhani)", "system-ui"],
                inter: ["var(--font-inter)", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
