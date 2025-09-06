import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Lightbulb, TrendingUp } from "lucide-react";
import Link from "next/link";
import { getBlogPostsByCategory } from "@/lib/firebase";
import type { BlogPost } from "@/lib/types";

export const metadata = {
  title: "Career Guidance",
  description: "Explore career paths, find IT jobs, and learn about freelancing opportunities.",
};

// This forces the page to be dynamically rendered
export const revalidate = 0;

export default async function CareerPage() {
  const guidanceArticles = await getBlogPostsByCategory("Career Guidance");

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
                {guidanceArticles.length > 0 ? (
                    guidanceArticles.map((article) => (
                        <Card key={article.slug} className="shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <h3 className="font-headline text-xl text-primary mb-2">
                                    <Link href={`/blog/${article.slug}`} className="hover:text-accent transition-colors">
                                        {article.title}
                                    </Link>
                                </h3>
                                <p className="text-foreground/80 line-clamp-2">{article.content.replace(/<[^>]+>/g, '')}</p>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                            <p>No guidance articles have been added yet. Check back soon!</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
