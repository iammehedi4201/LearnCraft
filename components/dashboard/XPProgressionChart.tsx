"use client";

import { useState, useMemo } from "react";
import { XPLogEntry, DailyActivityRecord } from "@/types/gamification";

interface XPProgressionChartProps {
  xpHistory?: XPLogEntry[];
  totalXP: number;
  dailyActivity?: Record<string, DailyActivityRecord>;
  className?: string;
}

type TimeRange = "7d" | "30d" | "all";

export function XPProgressionChart({
  xpHistory = [],
  totalXP = 0,
  dailyActivity = {},
  className = "",
}: XPProgressionChartProps) {
  const [range, setRange] = useState<TimeRange>("30d");
  const [hoveredPoint, setHoveredPoint] = useState<{
    date: string;
    xp: number;
    cumulative: number;
    x: number;
    y: number;
  } | null>(null);

  // Generate date points based on selected range
  const chartData = useMemo(() => {
    const days = range === "7d" ? 7 : range === "30d" ? 30 : 60;
    const now = new Date();

    // Map daily earned XP from dailyActivity and xpHistory
    const xpByDay: Record<string, number> = {};
    if (dailyActivity) {
      for (const [dateStr, rec] of Object.entries(dailyActivity)) {
        if (rec && typeof rec.xpEarned === "number" && rec.xpEarned > 0) {
          xpByDay[dateStr] = (xpByDay[dateStr] || 0) + rec.xpEarned;
        }
      }
    }
    if (xpHistory && Array.isArray(xpHistory)) {
      for (const entry of xpHistory) {
        if (!entry || !entry.timestamp) continue;
        const d = entry.timestamp.split("T")[0];
        if (!dailyActivity?.[d]) {
          xpByDay[d] = (xpByDay[d] || 0) + (entry.amount || 0);
        }
      }
    }

    // Build chronological date list
    const dates: Date[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      dates.push(d);
    }

    const result: { date: string; label: string; xp: number; cumulative: number }[] = new Array(days);

    // Compute cumulative backwards from totalXP so it is strictly monotonic and never plummets
    let currentCumulative = Math.max(0, totalXP);
    for (let i = days - 1; i >= 0; i--) {
      const targetDate = dates[i];
      const dateStr = targetDate.toISOString().split("T")[0];
      const earned = xpByDay[dateStr] || 0;

      result[i] = {
        date: dateStr,
        label: targetDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        xp: earned,
        cumulative: currentCumulative,
      };

      currentCumulative = Math.max(0, currentCumulative - earned);
    }

    // If totalXP > 0 but NO individual daily activity records exist in storage yet,
    // show a clean, realistic ramp across recent active streak days up to totalXP
    const hasAnyLoggedXP = Object.values(xpByDay).some((v) => v > 0);
    if (!hasAnyLoggedXP && totalXP > 0) {
      const activeWindow = Math.min(days, 5);
      const startIdx = days - activeWindow;
      const step = totalXP / activeWindow;

      for (let i = 0; i < days; i++) {
        if (i < startIdx) {
          result[i].cumulative = 0;
          result[i].xp = 0;
        } else {
          const stepCount = i - startIdx + 1;
          const cumVal = i === days - 1 ? totalXP : Math.round(stepCount * step);
          const prevVal = i === startIdx ? 0 : result[i - 1].cumulative;
          result[i].cumulative = cumVal;
          result[i].xp = Math.max(0, cumVal - prevVal);
        }
      }
    }

    return result;
  }, [range, xpHistory, dailyActivity, totalXP]);

  // Chart dimensions
  const width = 640;
  const height = 220;
  const padding = { top: 20, right: 20, bottom: 35, left: 45 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const maxVal = Math.max(...chartData.map((d) => d.cumulative), 100);
  const minVal = Math.min(...chartData.map((d) => d.cumulative), 0);

  // Scale functions
  const getX = (index: number) => {
    if (chartData.length <= 1) return padding.left + innerWidth / 2;
    return padding.left + (index / (chartData.length - 1)) * innerWidth;
  };

  const getY = (val: number) => {
    const rangeVal = maxVal - minVal || 1;
    return padding.top + innerHeight - ((val - minVal) / rangeVal) * innerHeight;
  };

  // Generate smooth SVG bezier path
  const { pathD, areaD, points } = useMemo(() => {
    if (chartData.length === 0) return { pathD: "", areaD: "", points: [] };

    const pts = chartData.map((d, i) => ({
      x: getX(i),
      y: getY(d.cumulative),
      data: d,
    }));

    if (pts.length === 1) {
      return { pathD: `M ${pts[0].x} ${pts[0].y}`, areaD: "", points: pts };
    }

    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cx = (p0.x + p1.x) / 2;
      d += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
    }

    const area = `${d} L ${pts[pts.length - 1].x} ${height - padding.bottom} L ${pts[0].x} ${height - padding.bottom} Z`;

    return { pathD: d, areaD: area, points: pts };
  }, [chartData, maxVal, minVal]);

  return (
    <div className={`rounded-2xl bg-[#0E121B] border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between h-full space-y-4 ${className}`}>
      {/* Chart Header & Range Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
              XP Growth & Progression
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Cumulative learning experience points earned over time
          </p>
        </div>

        <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/[0.06] self-start sm:self-auto">
          {(["7d", "30d", "all"] as TimeRange[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                range === r
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Custom SVG Chart */}
      <div className="relative w-full overflow-hidden flex-1 flex flex-col justify-end pt-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            {/* Smooth Area Gradient */}
            <linearGradient id="xpAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8C71F6" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#8C71F6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#8C71F6" stopOpacity="0.0" />
            </linearGradient>

            <linearGradient id="xpLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8C71F6" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const yVal = minVal + ratio * (maxVal - minVal);
            const y = getY(yVal);
            return (
              <g key={ratio}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-neutral-500 text-[10px] font-mono"
                >
                  {Math.round(yVal)}
                </text>
              </g>
            );
          })}

          {/* Fill Area */}
          {areaD && <path d={areaD} fill="url(#xpAreaGrad)" />}

          {/* Spline Path */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="url(#xpLineGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Interactive Data Points */}
          {points.map((p, idx) => {
            const isHovered = hoveredPoint?.date === p.data.date;
            // Only draw every nth point unless hovered to prevent crowding on 30d/all
            const shouldShowDot =
              range === "7d" ||
              idx === points.length - 1 ||
              idx % (range === "30d" ? 5 : 10) === 0 ||
              isHovered;

            return (
              <g key={p.data.date}>
                {shouldShowDot && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isHovered ? 5.5 : 3.5}
                    className="transition-all duration-150 cursor-pointer"
                    fill={isHovered ? "#FFFFFF" : "#8C71F6"}
                    stroke="#0E121B"
                    strokeWidth="2"
                  />
                )}

                {/* Invisible larger hover hit target */}
                <rect
                  x={p.x - 12}
                  y={padding.top}
                  width={24}
                  height={innerHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() =>
                    setHoveredPoint({
                      date: p.data.label,
                      xp: p.data.xp,
                      cumulative: p.data.cumulative,
                      x: p.x,
                      y: p.y,
                    })
                  }
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            );
          })}

          {/* X Axis Date Labels */}
          {points
            .filter((_, idx) => {
              if (range === "7d") return true;
              if (range === "30d") return idx % 6 === 0 || idx === points.length - 1;
              return idx % 12 === 0 || idx === points.length - 1;
            })
            .map((p) => (
              <text
                key={p.data.date}
                x={p.x}
                y={height - 10}
                textAnchor="middle"
                className="fill-neutral-400 text-[10px] font-mono"
              >
                {p.data.label}
              </text>
            ))}
        </svg>

        {/* Floating Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute pointer-events-none rounded-xl bg-[#161B26] border border-purple-500/30 px-3 py-2 shadow-2xl z-30 transition-all duration-75 text-xs font-mono space-y-1 transform -translate-x-1/2 -translate-y-full -mt-2"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${(hoveredPoint.y / height) * 100}%`,
            }}
          >
            <div className="text-[11px] text-neutral-400 font-semibold">{hoveredPoint.date}</div>
            <div className="text-white font-bold flex items-center gap-1.5">
              <span className="text-purple-400 font-bold">{hoveredPoint.cumulative} XP</span>
              <span className="text-[10px] text-emerald-400 font-normal">
                (+{hoveredPoint.xp} today)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
