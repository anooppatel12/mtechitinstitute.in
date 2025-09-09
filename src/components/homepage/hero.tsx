
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { EnrollModal } from "@/components/enroll-modal";
import { Award } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative min-h-[60vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dzr4xjizf/image/upload/v1757136324/ChatGPT_Image_Sep_5_2025_10_25_03_PM_w0e2ry.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="container relative z-10 flex min-h-[60vh] flex-col items-center justify-center text-center py-20">
        
        <div className="absolute top-1/4 left-8 md:left-16 transform -translate-y-1/2 z-20">
          <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/10 p-3 pr-5 text-sm font-medium text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/20">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/80 animate-pulse">
              <Award className="h-6 w-6" />
            </div>
            <span className="[text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">20+ Years Of Experience</span>
          </div>
        </div>

        <h1 className="font-headline text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
          MTech IT Institute
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-200 sm:text-xl">
          Your Gateway to Excellence in IT Training and Computer Courses.
        </p>

        <div className="mt-6 text-sm sm:text-base text-slate-200 flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
            <span>1000+ Students Trained</span>
            <span className="hidden sm:inline">|</span>
            <span>Expert Trainers</span>
            <span className="hidden sm:inline">|</span>
            <span>Job-Ready IT Skills</span>
        </div>

        <div className="mt-8">
          <EnrollModal>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 transition-transform hover:scale-105">Join Now & Build Your Future</Button>
          </EnrollModal>
        </div>
      </div>
    </section>
  );
}
