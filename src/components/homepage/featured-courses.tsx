
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/course-card";
import { db } from "@/lib/firebase";
import { collection, getDocs, limit, query } from "firebase/firestore";
import type { Course } from "@/lib/types";

// This forces the component to be dynamically rendered
export const revalidate = 0;

async function getFeaturedCourses(): Promise<Course[]> {
    const coursesQuery = query(collection(db, "courses"), limit(3));
    const courseSnapshot = await getDocs(coursesQuery);
    const courseList = courseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
    return courseList;
}

export default async function FeaturedCourses() {
  const featuredCourses = await getFeaturedCourses();

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold text-primary sm:text-4xl">Our Popular Courses</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Explore our most sought-after courses designed to kickstart your career in IT.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
