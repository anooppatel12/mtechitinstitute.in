import Link from "next/link";
import { Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  textClassName?: string;
};

export default function Logo({ className, textClassName }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 text-primary hover:text-primary/80 transition-colors",
        className
      )}
    >
      <Laptop className="h-7 w-7 text-accent" />
      <span
        className={cn(
          "font-headline text-xl font-bold tracking-tight",
          textClassName
        )}
      >
        MTech IT Institute
      </span>
    </Link>
  );
}
