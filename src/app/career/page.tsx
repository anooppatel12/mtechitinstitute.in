import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Lightbulb, TrendingUp } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Career Guidance",
  description: "Explore career paths after 12th, find IT jobs, and learn about freelancing opportunities.",
};

const guidanceArticles = [
    {
        title: "Choosing the Right Career Path After 12th Grade",
        description: "A comprehensive guide to help you navigate the options and make an informed decision about your future.",
        href: "/blog/best-computer-courses-after-12th"
    },
    {
        title: "Top 5 High-Demand IT Jobs in 2024",
        description: "Discover the most sought-after roles in the tech industry and the skills you need to land them.",
        href: "#"
    },
    {
        title: "A Beginner's Guide to Starting a Freelancing Career",
        description: "Learn how to leverage your skills to build a successful freelancing business from scratch.",
        href: "#"
    },
     {
        title: "How to Build a Portfolio that Gets You Hired",
        description: "Practical tips and examples for creating a compelling portfolio that showcases your abilities.",
        href: "#"
    }
]

export default function CareerPage() {
  return (
    <div className="bg-secondary">
      <div className="container py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold text-primary sm:text-5xl">Career Guidance</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary/80">
            Let us help you navigate your career path in the world of technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4"><Briefcase className="h-10 w-10 text-accent" /></div>
                    <CardTitle className="font-headline text-xl text-primary">Explore IT Jobs</CardTitle>
                    <CardDescription className="pt-2">Understand the various roles and opportunities available in the IT sector.</CardDescription>
                </CardHeader>
            </Card>
             <Card className="text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4"><Lightbulb className="h-10 w-10 text-accent" /></div>
                    <CardTitle className="font-headline text-xl text-primary">Skill Development</CardTitle>
                    <CardDescription className="pt-2">Learn which skills are in demand and how to acquire them effectively.</CardDescription>
                </CardHeader>
            </Card>
             <Card className="text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4"><TrendingUp className="h-10 w-10 text-accent" /></div>
                    <CardTitle className="font-headline text-xl text-primary">Career Growth</CardTitle>
                    <CardDescription className="pt-2">Get insights on how to grow in your career, from entry-level to leadership.</CardDescription>
                </CardHeader>
            </Card>
        </div>

        <div>
            <h2 className="font-headline text-3xl font-bold text-primary mb-8 text-center sm:text-left">Guidance Articles</h2>
            <div className="space-y-6">
                {guidanceArticles.map((article, index) => (
                    <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <h3 className="font-headline text-xl text-primary mb-2">
                                <Link href={article.href} className="hover:text-accent transition-colors">
                                    {article.title}
                                </Link>
                            </h3>
                            <p className="text-foreground/80">{article.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
