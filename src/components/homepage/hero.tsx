import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <section
    className="relative min-h-[60vh] bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://res.cloudinary.com/dzr4xjizf/image/upload/v1757058175/ChatGPT_Image_Sep_5_2025_12_30_58_AM_lskaik.png')",
    }}
  >
    <div className="absolute inset-0 bg-black/60" />
    <div className="container relative z-10 flex min-h-[60vh] flex-col items-center justify-center text-center py-20">
      <h1 className="font-headline text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
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
