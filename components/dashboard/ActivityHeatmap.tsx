"use client";

import { useState, useMemo } from "react";
import { DailyActivityRecord } from "@/types/gamification";

interface ActivityHeatmapProps {
  dailyActivity?: Record<string, DailyActivityRecord>;
  currentStreak?: number;
  longestStreak?: number;
}

export function ActivityHeatmap({
  dailyActivity = {},
  currentStreak = 0,
  longestStreak = 0,
}: ActivityHeatmapProps) {
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    count: number;
    xp: number;
    x: number;
    y: number;
  } | null>(null);

  // Generate 20 weeks of days ending today
  const { weeks, totalActiveDays, totalContributions } = useMemo(() => {
    const today = new Date();
    const daysToShow = 20 * 7; // 20 weeks
    const allDays: { date: string; dayOfWeek: number; count: number; xp: number }[] = [];
    let activeDays = 0;
    let contributions = 0;

    for (let i = daysToShow - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const record = dailyActivity[dateStr];

      // Calculate contribution points (lessons + reviews + notes)
      const count = record
        ? record.lessonsCompleted + (record.flashcardsReviewed || 0) + record.notesCreated
        : 0;
      const xp = record?.xpEarned || 0;

      if (count > 0 || xp > 0) {
        activeDays++;
        contributions += count || 1;
      }

      allDays.push({
        date: dateStr,
        dayOfWeek: d.getDay(), // 0 = Sun, 1 = Mon ...
        count,
        xp,
      });
    }

    // Group into weeks (columns)
    const groupedWeeks: { date: string; dayOfWeek: number; count: number; xp: number }[][] = [];
    let currentWeek: typeof allDays = [];

    allDays.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        groupedWeeks.push(currentWeek);
        currentWeek = [];
      }
    });
    if (currentWeek.length > 0) {
      groupedWeeks.push(currentWeek);
    }

    return {
      weeks: groupedWeeks,
      totalActiveDays: activeDays,
      totalContributions: contributions,
    };
  }, [dailyActivity]);

  // Heatmap color intensity scale
  const getColor = (count: number, xp: number) => {
    if (count === 0 && xp === 0) return "rgba(255, 255, 255, 0.03)";
    const score = count + (xp > 50 ? 2 : xp > 20 ? 1 : 0);
    if (score >= 5) return "#8B5CF6"; // deep purple
    if (score >= 3) return "#A78BFA"; // medium purple
    if (score >= 2) return "#C4B5FD"; // soft purple
    return "#DDD6FE"; // light purple
  };

  const cellSize = 12;
  const cellGap = 3.5;
  const cornerRadius = 3;

  return (
    <div className="rounded-2xl bg-[#0E121B] border border-white/[0.08] p-5 sm:p-6 space-y-4">
      {/* Header with Streak Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base">🔥</span>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Learning Activity & Streak Heatmap
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            {totalContributions} learning contributions across {totalActiveDays} active days
          </p>
        </div>

        {/* Quick Streak Stats Pills */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-1.5 text-xs font-mono">
            <span className="text-amber-400">🔥 Current:</span>
            <span className="font-bold text-white">{currentStreak} Days</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-1.5 text-xs font-mono">
            <span className="text-purple-400">⚡ Best:</span>
            <span className="font-bold text-white">{longestStreak} Days</span>
          </div>
        </div>
      </div>

      {/* SVG Matrix Heatmap */}
      <div className="relative overflow-x-auto pb-2">
        <svg
          width={weeks.length * (cellSize + cellGap) + 30}
          height={7 * (cellSize + cellGap) + 20}
          className="overflow-visible select-none"
        >
          {/* Day of Week Labels */}
          <text x="0" y={1 * (cellSize + cellGap) + 9} className="fill-neutral-500 text-[9px] font-mono">
            Mon
          </text>
          <text x="0" y={3 * (cellSize + cellGap) + 9} className="fill-neutral-500 text-[9px] font-mono">
            Wed
          </text>
          <text x="0" y={5 * (cellSize + cellGap) + 9} className="fill-neutral-500 text-[9px] font-mono">
            Fri
          </text>

          {/* Grid Cells */}
          {weeks.map((week, wIdx) => {
            const x = 30 + wIdx * (cellSize + cellGap);
            return (
              <g key={wIdx}>
                {week.map((day) => {
                  const y = day.dayOfWeek * (cellSize + cellGap);
                  const isHovered = hoveredCell?.date === day.date;

                  return (
                    <rect
                      key={day.date}
                      x={x}
                      y={y}
                      width={cellSize}
                      height={cellSize}
                      rx={cornerRadius}
                      ry={cornerRadius}
                      fill={getColor(day.count, day.xp)}
                      stroke={isHovered ? "#FFFFFF" : "rgba(255, 255, 255, 0.08)"}
                      strokeWidth={isHovered ? 1.5 : 0.5}
                      className="transition-all duration-150 cursor-pointer"
                      onMouseEnter={() => {
                        setHoveredCell({
                          date: day.date,
                          count: day.count,
                          xp: day.xp,
                          x: x + cellSize / 2,
                          y: y,
                        });
                      }}
                      onMouseLeave={() => setHoveredCell(null)}
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredCell && (
          <div
            className="absolute pointer-events-none rounded-xl bg-[#161B26] border border-white/[0.1] px-3 py-1.5 shadow-2xl z-30 text-xs font-mono space-y-0.5 transform -translate-x-1/2 -translate-y-full -mt-2"
            style={{
              left: hoveredCell.x,
              top: hoveredCell.y,
            }}
          >
            <div className="text-[10px] text-neutral-400 font-semibold">{hoveredCell.date}</div>
            <div className="text-white font-bold">
              {hoveredCell.count > 0 ? (
                <span>
                  {hoveredCell.count} actions · +{hoveredCell.xp} XP
                </span>
              ) : (
                <span className="text-neutral-500">No activity logged</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Heatmap Legend */}
      <div className="flex items-center justify-between text-xs text-neutral-400 pt-1 border-t border-white/[0.04]">
        <span className="text-[11px]">Learn consistently to keep streaks burning</span>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span>Less</span>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-white/[0.04] border border-white/[0.08]" />
            <span className="w-2.5 h-2.5 rounded-sm bg-[#DDD6FE]" />
            <span className="w-2.5 h-2.5 rounded-sm bg-[#C4B5FD]" />
            <span className="w-2.5 h-2.5 rounded-sm bg-[#A78BFA]" />
            <span className="w-2.5 h-2.5 rounded-sm bg-[#8B5CF6]" />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
