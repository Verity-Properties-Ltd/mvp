import { cn } from "@/lib/utils";
import VerityMark from "./VerityMark";
import VerityWordmark from "./VerityWordmark";

export default function VerityLogo({
  markSize = 32,
  wordmarkWidth = 140,
  className,
}: {
  markSize?: number;
  wordmarkWidth?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <VerityMark size={markSize} />
      <VerityWordmark width={wordmarkWidth} />
    </div>
  );
}
