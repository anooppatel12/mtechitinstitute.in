import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-headline text-3xl font-bold text-primary sm:text-4xl">
              Unlock Your Potential with Expert IT Training
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              At MTech IT Institute, we are committed to providing high-quality, industry-relevant training in a wide range of computer and IT courses. Our mission is to equip students with the skills and knowledge they need to thrive in the ever-evolving tech landscape.
            </p>
            <p className="mt-4 text-foreground/80">
              Whether you are a beginner looking to start your journey in IT, or a professional aiming to upgrade your skills, our comprehensive curriculum and experienced instructors are here to guide you every step of the way. We focus on practical, hands-on learning to ensure you are job-ready from day one.
            </p>
          </div>
          <div className="w-full">
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <Image
                  src="https://picsum.photos/800/600"
                  alt="Students learning in a modern classroom"
                  data-ai-hint="modern classroom"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
