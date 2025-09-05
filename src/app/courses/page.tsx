
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, IndianRupee, BookOpen } from "lucide-react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import type { Course } from "@/lib/types";

export const metadata = {
  title: "Our Courses",
  description: "Explore our wide range of IT and computer courses. Find details on duration, syllabus, and fees.",
};

// This forces the page to be dynamically rendered
export const revalidate = 0;

async function getCourses(): Promise<Course[]> {
    const coursesCollection = collection(db, "courses");
    const courseSnapshot = await getDocs(coursesCollection);
    const courseList = courseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
    return courseList;
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="bg-background">
      <div className="container py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold text-primary sm:text-5xl">Our Courses</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Find the perfect course to advance your skills and career.
          </p>
        </div>

        <div className="space-y-12">
          {courses.map((course, index) => (
            <Card key={course.id} className="overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2">
              <div className="relative min-h-[250px] md:min-h-full">
                <Image
                  src={course.image}
                  alt={course.title}
                  data-ai-hint={course.title.split(' ').slice(0,2).join(' ').toLowerCase()}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col">
                <CardHeader className="p-0">
                  <CardTitle className="font-headline text-2xl mb-2 text-primary">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-0 mt-4 flex-grow">
                  <div className="flex items-center justify-between text-muted-foreground text-sm mb-4">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Duration: {course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-lg text-primary">
                        <IndianRupee className="h-5 w-5" />
                        <span>{course.fees}</span>
                    </div>
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-base font-semibold">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5" />
                          <span>View Syllabus</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-6 space-y-1 mt-2 text-foreground/80">
                          {course.syllabus.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter className="p-0 mt-6">
                  <Button className="w-full" size="lg">Enroll Now</Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
