
"use client";

import { useState, useMemo } from "react";
import BlogCard from "@/components/blog-card";
import AdPlaceholder from "@/components/ad-placeholder";
import type { BlogPost } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Search } from "lucide-react";
import Link from "next/link";

// Note: This is now a client component. 
// For a production app with a lot of posts, you might move fetching into a hook
// or use server-side search. For now, we'll assume the data is passed as props.
// To keep SEO benefits, we can fetch data in a parent Server Component, which we will do.

export default function BlogPageClient({ posts, popularTags }: { posts: BlogPost[], popularTags: string[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = useMemo(() => {
    if (!searchTerm) {
      return posts;
    }
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  return (
    <div className="bg-secondary">
      <div className="container py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold text-primary sm:text-5xl">Our Tech Blog</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary/80">
            Find insights, tutorials, and career advice from our IT experts. Stay updated with the latest trends in technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <main className="lg:col-span-3">
                <div className="mb-8 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 text-base"
                    />
                    {searchTerm && (
                        <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setSearchTerm('')}>
                           <X className="h-5 w-5" />
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredPosts.length > 0 ? (
                      filteredPosts.map((post) => (
                          <BlogCard key={post.slug} post={post} />
                      ))
                    ) : (
                       <div className="md:col-span-2 text-center py-12">
                          <p className="text-lg text-muted-foreground">No articles found matching your search.</p>
                       </div>
                    )}
                </div>
            </main>
            <aside className="lg:col-span-1 space-y-8">
                <div className="p-6 bg-background rounded-lg shadow-sm">
                    <h3 className="font-headline text-lg font-semibold text-primary mb-4">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {popularTags.map(tag => (
                            <Link href={`/blog/tag/${tag}`} key={tag}>
                                <Badge variant="outline">{tag}</Badge>
                            </Link>
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
