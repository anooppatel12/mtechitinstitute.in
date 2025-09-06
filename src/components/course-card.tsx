import Image from "next/image";
import type { Course } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, IndianRupee } from "lucide-react";
import { EnrollModal } from "./enroll-modal";

type CourseCardProps = {
  course: Course;
};

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
            <Image
                src={course.image}
                alt={`${course.title} course at MTech IT Institute`}
                data-ai-hint={course.title.split(' ').slice(0,2).join(' ').toLowerCase()}
                fill
                className="object-cover"
            />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="font-headline text-xl mb-2">{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 p-6 pt-0">
        <div className="flex justify-between w-full text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-primary">
                <IndianRupee className="h-4 w-4" />
                <span>{course.fees}</span>
            </div>
        </div>
        <EnrollModal>
          <Button className="w-full">Enroll Now</Button>
        </EnrollModal>
      </CardFooter>
    </Card>
  );
}
