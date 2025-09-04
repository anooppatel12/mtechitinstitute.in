import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative bg-secondary text-secondary-foreground">
      <div className="container relative z-10 flex min-h-[60vh] flex-col items-center justify-center text-center py-20">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
          MTech IT Institute
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-primary/80 sm:text-xl">
          Your Gateway to Excellence in IT Training and Computer Courses.
        </p>
        <div className="mt-10">
          <Button asChild size="lg">
            <Link href="/courses">Join Now & Build Your Future</Link>
          </Button>
        </div>
      </div>
       <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[10px_10px] [mask-image:linear-gradient(0deg,transparent,black)]"></div>
    </section>
  );
}
