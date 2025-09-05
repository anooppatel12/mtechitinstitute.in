
import BlogCard from "@/components/blog-card";
import AdPlaceholder from "@/components/ad-placeholder";
import type { BlogPost } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export const metadata = {
  title: "Blog",
  description: "Read our latest articles on IT, career guidance, and productivity tips.",
};

// This forces the page to be dynamically rendered
export const revalidate = 0;

async function getPosts(): Promise<{ posts: BlogPost[], allTags: string[] }> {
    const blogQuery = query(collection(db, "blog"), orderBy("date", "desc"));
    const blogSnapshot = await getDocs(blogQuery);
    const posts = blogSnapshot.docs.map(doc => {
        const data = doc.data() as Omit<BlogPost, 'slug' | 'summary'>;
        const snippet = data.content.replace(/<[^>]+>/g, '').substring(0, 150);
        return { 
            ...data, 
            slug: doc.id,
            summary: `${snippet}...` 
        } as BlogPost;
    });

    const allTags = [...new Set(posts.flatMap(p => p.tags || []))];
    return { posts, allTags };
}

export default async function BlogPage() {
  const { posts, allTags } = await getPosts();

  return (
    <div className="bg-secondary">
      <div className="container py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold text-primary sm:text-5xl">Our Blog</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary/80">
            Insights, tutorials, and career advice from our experts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <main className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                    ))}
                </div>
            </main>
            <aside className="lg:col-span-1 space-y-8">
                <div className="p-6 bg-background rounded-lg shadow-sm">
                    <h3 className="font-headline text-lg font-semibold text-primary mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {allTags.map(tag => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                    </div>
                </div>
                <AdPlaceholder />
            </aside>
        </div>
      </div>
    </div>
  );
}
