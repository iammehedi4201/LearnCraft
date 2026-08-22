"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Code,
  Layers,
} from "./icons";
import { getAllLessons, LessonMeta } from "../data/nestjs-curriculum";
import { ContentTagBadge } from "./content-tag-badge";

const CLI_CHEATSHEET = [
  { cmd: "nest new project-name", desc: "Scaffold a new NestJS application" },
  {
    cmd: "nest g module <name>",
    desc: "Generate a feature module (e.g. users)",
  },
  {
    cmd: "nest g controller <name>",
    desc: "Generate a REST controller with routing",
  },
  {
    cmd: "nest g service <name>",
    desc: "Generate an injectable provider service",
  },
  {
    cmd: "nest g resource <name>",
    desc: "Generate a full CRUD resource (Module, Controller, Service, DTOs)",
  },
  {
    cmd: "nest g guard <name>",
    desc: "Generate a CanActivate authentication/authorization guard",
  },
  {
    cmd: "nest g interceptor <name>",
    desc: "Generate an execution interceptor with RxJS",
  },
  {
    cmd: "nest g pipe <name>",
    desc: "Generate a transformation & validation pipe",
  },
  {
    cmd: "nest g filter <name>",
    desc: "Generate an exception filter for structured errors",
  },
];

const DECORATOR_CHEATSHEET = [
  {
    name: "@Module({ ... })",
    desc: "Declares a cohesive application unit (imports, controllers, providers, exports)",
  },
  {
    name: "@Controller('path')",
    desc: "Defines an HTTP endpoint route handler prefix",
  },
  {
    name: "@Injectable()",
    desc: "Marks a class as a dependency injection provider",
  },
  {
    name: "@Get(), @Post(), @Put(), @Delete()",
    desc: "Defines HTTP verb method handlers",
  },
  {
    name: "@Param('id'), @Body(), @Query('q')",
    desc: "Extracts path params, request payload, or query string",
  },
  {
    name: "@UseGuards(JwtAuthGuard)",
    desc: "Protects routes with authentication or permission guards",
  },
  {
    name: "@UseInterceptors(ClassSerializer)",
    desc: "Binds response transformation & metric interceptors",
  },
  {
    name: "@UsePipes(new ValidationPipe())",
    desc: "Applies input validation & schema parsing",
  },
];

export function ReferenceView() {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("ALL");
  const allLessons = getAllLessons();

  const filteredLessons = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allLessons.filter((l) => {
      const matchText =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q) ||
        l.desc.toLowerCase().includes(q);
      const matchTag = selectedTag === "ALL" || l.tag === selectedTag;
      return matchText && matchTag;
    });
  }, [query, selectedTag, allLessons]);

  return (
    <div className="space-y-8">
      {/* Search & Tag Filter Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-ds-text-strong">
          <BookOpen className="w-4 h-4 text-ds-feature-base" />
          <span>Search All 32 Modules & Cheatsheets</span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-ds-icon-sub absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic, code, or keyword (e.g. JWT, DTO, Prisma, Pino, Docker)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-ds-bg-weak border border-ds-stroke-soft rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-ds-text-strong placeholder-ds-text-soft focus:outline-none focus:border-ds-feature-base transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ds-text-soft hover:text-ds-text-strong font-medium"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none shrink-0">
            {(
              ["ALL", "CORE", "BUILD", "PROFESSIONAL", "REFERENCE"] as const
            ).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  selectedTag === tag
                    ? "bg-ds-bg-strong text-ds-text-white shadow-sm"
                    : "bg-ds-bg-weak text-ds-text-sub hover:text-ds-text-strong hover:bg-ds-bg-soft"
                }`}
              >
                {tag === "ALL"
                  ? "All"
                  : tag === "PROFESSIONAL"
                    ? "Pro"
                    : tag === "REFERENCE"
                      ? "Ref"
                      : tag.charAt(0) + tag.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {query && (
          <div className="text-xs text-ds-text-sub pt-2 border-t border-ds-stroke-soft flex items-center justify-between">
            <span>
              Found <strong>{filteredLessons.length}</strong> matching lessons
            </span>
            <button
              onClick={() => {
                setQuery("");
                setSelectedTag("ALL");
              }}
              className="text-xs text-ds-feature-base hover:text-ds-feature-dark font-semibold"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Matching Search Results Grid */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-ds-text-soft">
          {query
            ? `Search Results (${filteredLessons.length})`
            : "All 32 Curriculum Modules"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLessons.map((lesson) => (
            <Link
              key={lesson.slug}
              href={lesson.path}
              className="p-5 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft hover:border-ds-feature-base transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="font-mono text-xs font-black text-ds-text-strong bg-ds-bg-weak px-2 py-0.5 rounded group-hover:text-ds-feature-base transition-colors">
                    {lesson.code}
                  </span>
                  <ContentTagBadge tag={lesson.tag} size="sm" />
                </div>

                <h4 className="text-sm font-bold text-ds-text-strong group-hover:text-ds-feature-base transition-colors">
                  {lesson.name}
                </h4>

                <p className="text-xs text-ds-text-sub mt-1 line-clamp-2 leading-relaxed">
                  {lesson.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-ds-stroke-soft flex items-center justify-between text-xs text-ds-text-soft">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{lesson.estimatedMinutes}m</span>
                </span>
                <span className="font-bold text-ds-feature-base group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  <span>Open</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Cheatsheets Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        {/* CLI Reference */}
        <div className="p-6 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-ds-text-strong">
            <Code className="w-4 h-4 text-ds-feature-base" />
            <span>NestJS CLI Command Cheatsheet</span>
          </div>

          <div className="space-y-2.5">
            {CLI_CHEATSHEET.map((item) => (
              <div
                key={item.cmd}
                className="p-3 rounded-xl bg-ds-bg-weak text-xs flex flex-col gap-1"
              >
                <code className="font-mono font-bold text-ds-feature-dark">
                  {item.cmd}
                </code>
                <span className="text-ds-text-sub text-[11px]">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Common Decorators */}
        <div className="p-6 rounded-2xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-ds-text-strong">
            <Sparkles className="w-4 h-4 text-ds-feature-base" />
            <span>Essential Decorators Cheatsheet</span>
          </div>

          <div className="space-y-2.5">
            {DECORATOR_CHEATSHEET.map((item) => (
              <div
                key={item.name}
                className="p-3 rounded-xl bg-ds-bg-weak text-xs flex flex-col gap-1"
              >
                <code className="font-mono font-bold text-ds-text-strong">
                  {item.name}
                </code>
                <span className="text-ds-text-sub text-[11px]">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
