import { resources } from "@/lib/data";
import ResourceCard from "@/components/resource-card";
import AdPlaceholder from "@/components/ad-placeholder";

export const metadata = {
  title: "Student Resources",
  description: "Download free PDF notes, practice worksheets, and quizzes to supplement your learning.",
};

export default function ResourcesPage() {
  return (
    <div className="bg-background">
      <div className="container py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold text-primary sm:text-5xl">Student Resources</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Access free materials to support your learning journey with us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <main className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {resources.map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                    ))}
                </div>
            </main>
            <aside className="lg:col-span-1 space-y-8">
                <AdPlaceholder />
            </aside>
        </div>
      </div>
    </div>
  );
}
