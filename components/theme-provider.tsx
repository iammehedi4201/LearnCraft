"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "sepia";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const READING_SETTINGS_KEY = "learncraft-reading-settings";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("dark");

    useEffect(() => {
        // Sync with the reading control panel's persisted settings
        try {
            const readingSettings = localStorage.getItem(READING_SETTINGS_KEY);
            if (readingSettings) {
                const parsed = JSON.parse(readingSettings);
                if (parsed.theme && ["light", "dark", "sepia"].includes(parsed.theme)) {
                    setThemeState(parsed.theme);
                    document.documentElement.classList.remove("light", "dark", "sepia");
                    document.documentElement.classList.add(parsed.theme);
                    return;
                }
            }
        } catch { /* ignore */ }

        // Fallback: check legacy "theme" key
        const savedTheme = localStorage.getItem("theme") as Theme;
        if (savedTheme && ["light", "dark", "sepia"].includes(savedTheme)) {
            setThemeState(savedTheme);
            document.documentElement.classList.add(savedTheme);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setThemeState("dark");
            document.documentElement.classList.add("dark");
        }
    }, []);

    // Listen for changes made by the ReadingControlPanel
    useEffect(() => {
        const observer = new MutationObserver(() => {
            const root = document.documentElement;
            if (root.classList.contains("sepia")) setThemeState("sepia");
            else if (root.classList.contains("dark")) setThemeState("dark");
            else setThemeState("light");
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        return () => observer.disconnect();
    }, []);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.remove("light", "dark", "sepia");
        document.documentElement.classList.add(newTheme);
    };

    const toggleTheme = () => {
        const order: Theme[] = ["light", "dark", "sepia"];
        const next = order[(order.indexOf(theme) + 1) % order.length];
        setTheme(next);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
