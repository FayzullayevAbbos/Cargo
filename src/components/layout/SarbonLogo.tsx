import Link from "next/link";
import { cn } from "@/lib/utils";

export function SarbonLogo({
  className,
  collapsed,
}: {
  className?: string;
  collapsed?: boolean;
}) {
  return (
    <Link
      href="/dispatcher/cargo"
      className={cn(
        "flex items-center",
        collapsed ? "justify-center" : "gap-2",
        className,
      )}
    >
      <svg
        width={collapsed ? 28 : 32}
        height={collapsed ? 28 : 32}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <rect width="32" height="32" rx="8" fill="url(#sarbon-gradient)" />
        <path
          d="M9 22V10h4.2c2.4 0 4 1.3 4 3.4 0 1.4-.8 2.4-2.1 2.9 1.6.5 2.6 1.7 2.6 3.5 0 2.3-1.8 3.7-4.5 3.7H9zm3.2-8.8h1c1.1 0 1.7-.5 1.7-1.3s-.6-1.2-1.7-1.2h-1v2.5zm0 6.4h1.2c1.3 0 2-.6 2-1.5s-.7-1.5-2-1.5h-1.2v3zM20 22l5-12h3.4l-5 12H20z"
          fill="white"
        />
        <defs>
          <linearGradient
            id="sarbon-gradient"
            x1="4"
            y1="4"
            x2="28"
            y2="28"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0ea5e9" />
            <stop offset="1" stopColor="#22c55e" />
          </linearGradient>
        </defs>
      </svg>
      {!collapsed && (
        <span className="text-xl font-semibold tracking-tight text-[#1e3a5f] lowercase">
          sarbon
        </span>
      )}
    </Link>
  );
}
