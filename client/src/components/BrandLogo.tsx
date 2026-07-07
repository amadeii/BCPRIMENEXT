import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <span className={cn("bcprime-brand-mark", className)} aria-label="bcprime NEXT">
      <span className="bcprime-brand-word">
        <span className="bcprime-word-bc">bc</span>
        <span className="bcprime-word-prime">prime</span>
      </span>

      <span className="bcprime-next-switch" aria-hidden="true">
        <span className="bcprime-next-knob">
          <span>NEXT &rsaquo;</span>
        </span>
      </span>
    </span>
  );
}
