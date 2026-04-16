"use client";

import { useTheme } from "./theme-provider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={toggleTheme}
            className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:ring-2 hover:ring-blue-500 transition-all duration-300 active:scale-90 overflow-hidden group"
            aria-label="Toggle theme"
        >
            <div className="relative h-6 w-6 transform transition-transform duration-500 overflow-hidden">
                {/* Sun Icon */}
                <div
                    className={`absolute inset-0 transform transition-all duration-500 ${theme === 'dark' ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M3 12h2.25m.386-6.364l1.591 1.591M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                </div>
                {/* Moon Icon */}
                <div
                    className={`absolute inset-0 transform transition-all duration-500 ${theme === 'light' ? '-translate-y-10 opacity-0' : 'translate-y-0 opacity-100'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                </div>
            </div>
        </button>
    );
}
