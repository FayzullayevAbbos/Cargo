import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/srb.png";
const LOGO_WIDTH = 229;
const LOGO_HEIGHT = 60;

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
        "flex items-center outline-none focus-visible:ring-2 focus-visible:ring-[var(--sarbon-navy)]/30 rounded-md",
        collapsed ? "justify-center" : "min-w-0",
        className,
      )}
    >
      <span
        className={cn(
          "relative block shrink-0 overflow-hidden",
          collapsed ? "h-8 w-10" : "h-8 w-[122px]",
        )}
      >
        <Image
          src={LOGO_SRC}
          alt="Sarbon"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          className="h-8 w-auto max-w-none object-contain object-left"
          priority
        />
      </span>
    </Link>
  );
}
