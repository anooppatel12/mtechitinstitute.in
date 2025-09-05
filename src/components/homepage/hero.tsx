import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 z-[-1]">
        <Image
          src="https://jsdl.in/RSL-YAY1757056988"
          alt="MTech IT Institute computer lab"
          data-ai-hint="computer lab"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="container relative z-10 flex min-h-[60vh] flex-col items-center justify-center text-center py-20">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
          MTech IT Institute
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-200 sm:text-xl">
          Your Gateway to Excellence in IT Training and Computer Courses.
        </p>
        <div className="mt-10">
          <Button asChild size="lg">
            <Link href="/courses">Join Now & Build Your Future</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
