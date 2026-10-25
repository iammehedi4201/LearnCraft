import type { Metadata } from "next";
import { Inter, Rajdhani, Manrope } from "next/font/google";
import "./globals.css";
import "@/components/reading-mode/reading-control-panel.css";
import "@/components/playground/playground.css";
import { ThemeProvider, QueryProvider, WebVitals } from "@/components/providers";
import { RevisionProvider } from "@/context/revision-context";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import { GlobalOverlays } from "@/components/global-overlays";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
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
    <html lang="en" suppressHydrationWarning className="dark scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var readingKey = "learncraft-reading-settings";
    var themeKey = "theme";
    var theme = "dark";
    var savedReading = localStorage.getItem(readingKey);
    if (savedReading) {
      try {
        var parsed = JSON.parse(savedReading);
        if (parsed && parsed.theme && (parsed.theme === "light" || parsed.theme === "dark" || parsed.theme === "sepia")) {
          theme = parsed.theme;
        }
      } catch (e) {}
    } else {
      var savedTheme = localStorage.getItem(themeKey);
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark" || savedTheme === "sepia")) {
        theme = savedTheme;
      }
    }
    var root = document.documentElement;
    root.classList.remove("light", "dark", "sepia");
    root.classList.add(theme);
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();
`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${manrope.variable} ${inter.variable} ${rajdhani.variable} min-h-screen`}
      >
        <SessionProvider>
          <QueryProvider>
            <ThemeProvider>
              <RevisionProvider>
                <Suspense fallback={null}>
                  {children}
                </Suspense>
                <GlobalOverlays />
                <WebVitals />
              </RevisionProvider>
            </ThemeProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
