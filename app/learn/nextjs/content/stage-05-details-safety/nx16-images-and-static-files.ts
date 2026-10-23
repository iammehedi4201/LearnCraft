import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const nx16ImagesAndStaticFilesContent: StandardLessonContent = {
  slug: "nx16-images-and-static-files",
  code: "NX-16",
  title: "Images and Static Files",
  subtitle: "Serve static assets from the public folder and optimize visuals using the next/image component.",
  difficulty: "Easy",
  scenario: {
    question: "You saved a file as public/logo.png. What path can you use to show it on the website?",
    answer: "Use /logo.png as the path. For image display and optimization, you can use next/image.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Images and Static Files",
    bigPicture: "Use the public folder for static files that should be accessible by URL. Next.js also provides the Image component to help display, optimize, and resize images automatically, preventing Cumulative Layout Shift (CLS).",
    codeSnippet: `// app/components/CourseCard.tsx
import Image from "next/image";

export default function CourseCard() {
  return (
    <article>
      <Image
        src="/course-cover.png" // Stored at public/course-cover.png
        alt="Course cover"
        width={600}
        height={340}
      />
      <h2>Next.js Masterclass</h2>
    </article>
  );
}`,
    breakdownTitle: "Image Optimization Highlights",
    breakdownItems: [
      {
        title: "public Directory Routing",
        desc: "Files in public/ (like public/favicon.ico or public/logo.png) are served directly from the root base URL /.",
      },
      {
        title: "Next.js <Image> Component",
        desc: "Extends standard HTML <img> with automatic modern WebP/AVIF compression and lazy loading.",
      },
      {
        title: "Zero Layout Shift",
        desc: "Enforcing width and height props reserves correct aspect ratio space before the image downloads.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Static Asset Rule",
      content: "Store uncompiled media in the public/ folder, and always prefer <Image> over standard <img> to optimize performance.",
    },
    cards: [
      {
        number: "01",
        tag: "COMPRESSION",
        title: "Modern Formats",
        description: "Automatically serves lightweight WebP and AVIF formats when supported by the user's browser.",
        color: "purple",
      },
      {
        number: "02",
        tag: "PERFORMANCE",
        title: "Lazy Loading",
        description: "Images outside the viewport are only fetched as the user scrolls toward them, saving bandwidth.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "STABILITY",
        title: "No Layout Shift",
        description: "Mandatory dimensions ensure the page layout does not jump around while assets download.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how static files and images are managed:",
    points: [
      {
        title: "1. The public directory structure",
        content: "A file located at public/images/avatar.jpg is served to browsers at the path /images/avatar.jpg (do NOT include 'public' in the URL).",
      },
      {
        title: "2. The Image component props",
        content: "Always specify src, alt, and either explicit width/height dimensions or fill={true} with a positioned parent container.",
      },
      {
        title: "3. Remote images configuration",
        content: "When loading images from external CDNs (like AWS S3 or Unsplash), configure remotePatterns in next.config.ts.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Including 'public' in the Image URL Path",
      code: `// ❌ Broken image path:
<Image src="/public/logo.png" alt="Logo" width={100} height={40} />
// Results in a 404 because Next.js maps public/ directly to root /`,
      explanation: "Next.js serves the contents of the public folder at the root domain path. Do not prefix paths with /public.",
    },
    good: {
      title: "Referencing Directly from the Root URL",
      code: `// ✅ Correct path:
<Image src="/logo.png" alt="Logo" width={100} height={40} />`,
      explanation: "Points correctly to public/logo.png via the root /logo.png URL.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Explore a Next.js Image component usage example:",
    starterCode: `import Image from "next/image";

export default function Banner() {
  return (
    <div style={{ maxWidth: "500px", padding: "1rem", border: "1px solid #333" }}>
      {/* File located at public/banner.png */}
      <Image
        src="/banner.png"
        alt="Platform banner"
        width={480}
        height={240}
        priority={true} // Preloads hero images above the fold
      />
      <p style={{ marginTop: "0.5rem" }}>Image optimized automatically by Next.js</p>
    </div>
  );
}`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "If an image is stored in your project at public/icons/star.svg, what is the correct src path to use?",
      options: [
        "/icons/star.svg",
        "/public/icons/star.svg",
        "../public/icons/star.svg",
        "https://public.com/icons/star.svg",
      ],
      correctIndex: 0,
      explanation: "Next.js mounts the public folder directly at the root URL, so public/icons/star.svg is accessed as /icons/star.svg.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "public = Root URL",
        desc: "Files inside public/ are mapped directly to the root path / without the word 'public'.",
      },
      {
        title: "next/image for Optimization",
        desc: "Provides automatic WebP compression, lazy loading, and layout shift prevention.",
      },
      {
        title: "Required Dimensions",
        desc: "Must specify width and height or use fill={true} on a relative container.",
      },
    ],
    nextLessonPreview: {
      title: "Environment Variables and Secrets",
      desc: "Learn how to protect server secrets and understand the NEXT_PUBLIC_ client exposure prefix.",
    },
  },
};
