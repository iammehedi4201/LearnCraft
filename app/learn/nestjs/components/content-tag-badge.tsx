import { ContentTag } from "../data/nestjs-curriculum";

interface ContentTagBadgeProps {
  tag: ContentTag;
  size?: "sm" | "md";
}

const TAG_STYLES: Record<
  ContentTag,
  { label: string; className: string; description: string }
> = {
  CORE: {
    label: "Core",
    className: "bg-ds-error-lighter text-ds-error-dark",
    description: "Essential foundational knowledge for all NestJS developers",
  },
  BUILD: {
    label: "Build",
    className: "bg-ds-feature-lighter text-ds-feature-dark",
    description: "Hands-on implementation patterns for building real-world features",
  },
  PROFESSIONAL: {
    label: "Pro",
    className: "bg-ds-away-lighter text-ds-away-dark",
    description: "Production-grade patterns, performance tuning, and enterprise architectures",
  },
  REFERENCE: {
    label: "Ref",
    className: "bg-ds-faded-lighter text-ds-faded-dark",
    description: "Reference material and niche tooling to consult when needed",
  },
};

export function ContentTagBadge({ tag, size = "sm" }: ContentTagBadgeProps) {
  const config = TAG_STYLES[tag] || TAG_STYLES.CORE;
  const sizeClasses =
    size === "sm"
      ? "text-[11px] px-2 py-0.5"
      : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center font-bold rounded-full tracking-wide uppercase font-mono ${config.className} ${sizeClasses}`}
      title={config.description}
    >
      {config.label}
    </span>
  );
}
