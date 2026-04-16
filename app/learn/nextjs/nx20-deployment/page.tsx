"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function NX20Deployment(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/learn/nextjs" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
          ← Back to Next.js
        </Link>

        <CodeNote
          featureCode="NX-20"
          featureName="Deployment & Production"
          tanstackConcept="N/A"
          howItWorks="Build your Next.js app with npm run build. This optimizes code, pre-renders pages, and generates a production-ready bundle. Deploy to Vercel (recommended), AWS, Docker, or any Node.js host."
          nextjsConcept="Next.js deployments are straightforward. Vercel (built by Next.js team) is easiest. Or self-host with Docker. Build process handles optimization, SSR, SSG, and bundling."
          whenToUse="Every project needs a deployment strategy. Vercel is simplest, self-hosting offers more control."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white dark:text-white">Deployment</h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Build Process</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`npm run build

# Output includes:
# • Pre-rendered pages (SSG)
# • API routes
# • Optimized assets
# • .next directory with production bundle

# Check build output for:
# • Page route types (Static, Dynamic, Streaming)
# • API routes ✓
# • Preload information
# • Build warnings

# Testing locally:
npm run build
npm run start  # Runs on http://localhost:3000`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Vercel Deployment (Recommended)</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// Simplest option - built by Next.js team

1. Push to GitHub/GitLab/Bitbucket
2. Go to vercel.com and connect your repo
3. Vercel auto-deploys on every push
4. Set environment variables in dashboard
5. Done!

Features:
• Zero-config deployment
• Automatic HTTPS
• Global CDN
• Serverless functions
• Preview deployments per PR
• ISR support built-in`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Docker Self-Hosting</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source
COPY . .

# Build for production
RUN npm run build

# Start production server
EXPOSE 3000
CMD ["npm", "start"]

# Build and run:
# docker build -t my-next-app .
# docker run -p 3000:3000 my-next-app`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">AWS Deployment</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// Option 1: AWS Amplify
// Similar to Vercel - connect your repo, auto-deploy

// Option 2: EC2 (Virtual machine)
1. Create EC2 instance (t3.small or larger)
2. SSH in and install Node.js
3. PullGit repo: git clone ...
4. npm install && npm run build
5. npm start (or use PM2 for process management)

// Option 3: AWS Lambda (Serverless)
// Use @vendia/serverless-express or similar wrapper`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Environment Setup</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`# .env.production.local (for production)
DATABASE_URL=postgresql://...
API_SECRET_KEY=sk_live_...
NEXT_PUBLIC_API_URL=https://api.example.com

# In Vercel dashboard:
# 1. Settings > Environment Variables
# 2. Add DATABASE_URL, API_SECRET_KEY, etc.
# 3. Select which environments they apply to
# 4. Re-deploy to apply changes

# For monitoring:
# Use Vercel Analytics / Web Vitals
# Set up error logging (Sentry, LogRocket)
# Monitor API performance`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Production Checklist</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`✅ Pre-Deployment Checklist:
  □ npm run build passes without errors
  □ npm run start works locally
  □ Environment variables configured
  □ Database migrations run
  □ External APIs accessible
  □ All secrets in .env (never in code)
  □ Error logging configured
  □ Analytics/monitoring setup

✅ Post-Deployment:
  □ Test critical user flows
  □ Monitor server errors
  □ Check Web Vitals
  □ Verify API endpoints
  □ Test form submissions
  □ Check image optimization working
  □ Verify cache headers
  □ Test mobile responsiveness`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 dark:bg-green-950/20 border-l-4 border-green-500 p-4 rounded mt-6">
            <h4 className="font-semibold text-green-900 dark:text-green-400 dark:text-green-400 mb-2">✅ Key Takeaways</h4>
            <ul className="space-y-2 text-gray-700 dark:text-slate-300 dark:text-slate-300">
              <li>• npm run build creates production-optimized bundle</li>
              <li>• Vercel is easiest (recommended for teams)</li>
              <li>• Docker works for any platform (AWS, GCP, DigitalOcean)</li>
              <li>• Environment variables separate config from code</li>
              <li>• Monitor production with analytics and error logging</li>
              <li>• ISR greatly reduces rebuild needs</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
