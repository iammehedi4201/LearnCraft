import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";
import "@/components/reading-control-panel.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { ReadingControlPanel } from "@/components/reading-control-panel";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const rajdhani = Rajdhani({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-rajdhani",
});

export const metadata: Metadata = {
    title: "LearnCraft — Master Modern Web Tech",
    description: "High-impact engineering education for modern developers.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning className="scroll-smooth">
            <body className={`${inter.variable} ${rajdhani.variable} min-h-screen`}>
                <QueryProvider>
                    <ThemeProvider>
                        {children}
                        <ReadingControlPanel />
                    </ThemeProvider>
                </QueryProvider>
            </body>
        </html>
    );
}

