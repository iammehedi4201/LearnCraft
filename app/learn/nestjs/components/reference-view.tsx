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
} from "./icons";
import {
  getAllLessons,
} from "../data/nestjs-curriculum";

const CLI_CHEATSHEET = [
  { cmd: "nest new project-name", desc: "Scaffold a new NestJS application" },
  { cmd: "nest g module <name>", desc: "Generate a feature module (e.g. users)" },
  { cmd: "nest g controller <name>", desc: "Generate a REST controller with routing" },
  { cmd: "nest g service <name>", desc: "Generate an injectable provider service" },
  { cmd: "nest g resource <name>", desc: "Generate a full CRUD resource (Module, Controller, Service, DTOs)" },
  { cmd: "nest g guard <name>", desc: "Generate a CanActivate authentication/authorization guard" },
  { cmd: "nest g interceptor <name>", desc: "Generate an execution interceptor with RxJS" },
  { cmd: "nest g pipe <name>", desc: "Generate a transformation & validation pipe" },
  { cmd: "nest g filter <name>", desc: "Generate an exception filter for structured errors" },
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
  const allLessons = getAllLessons();

  const filteredLessons = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allLessons;
    return allLessons.filter((l) => {
      return (
        l.name.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q) ||
        l.desc.toLowerCase().includes(q)
      );
    });
  }, [query, allLessons]);

  return (
    <div className="space-y-6">
      {/* Search Bar Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-200">
          <BookOpen className="w-4 h-4 text-purple-400" />
          <span>Search All 32 Modules & Cheatsheets</span>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by topic, code, or keyword (e.g. Modules, DTO, Guards, Injectable, Testing)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#090C14] border border-white/[0.08] rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white font-medium cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {query && (
          <div className="text-xs text-slate-300 pt-2 border-t border-white/[0.06] flex items-center justify-between">
            <span>
              Found <strong>{filteredLessons.length}</strong> matching lessons
            </span>
            <button
              onClick={() => setQuery("")}
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold cursor-pointer"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Cheatsheets Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CLI Reference */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Code className="w-4 h-4 text-purple-400" />
            <span>NestJS CLI Command Cheatsheet</span>
          </div>

          <div className="space-y-2">
            {CLI_CHEATSHEET.map((item) => (
              <div
                key={item.cmd}
                className="p-3 rounded-xl bg-[#090C14] border border-white/[0.04] text-xs flex flex-col gap-1"
              >
                <code className="font-mono font-bold text-purple-300 text-xs">
                  {item.cmd}
                </code>
                <span className="text-slate-400 text-[11px]">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Common Decorators */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Essential Decorators Cheatsheet</span>
          </div>

          <div className="space-y-2">
            {DECORATOR_CHEATSHEET.map((item) => (
              <div
                key={item.name}
                className="p-3 rounded-xl bg-[#090C14] border border-white/[0.04] text-xs flex flex-col gap-1"
              >
                <code className="font-mono font-bold text-emerald-300 text-xs">
                  {item.name}
                </code>
                <span className="text-slate-400 text-[11px]">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Matching Search Results Grid (if searching or looking up lessons) */}
      {query && (
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Search Results ({filteredLessons.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLessons.map((lesson) => (
              <Link
                key={lesson.slug}
                href={lesson.path}
                className="p-5 rounded-2xl bg-[#0E121B] border border-white/[0.08] hover:border-purple-500/40 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="font-mono text-xs font-black text-white bg-white/[0.04] px-2 py-0.5 rounded group-hover:text-purple-300 transition-colors">
                      {lesson.code}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    {lesson.name}
                  </h4>

                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {lesson.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{lesson.estimatedMinutes}m</span>
                  </span>
                  <span className="font-bold text-purple-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Open Lesson</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
