import { blogPosts } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, User, Tag } from "lucide-react";
import AdPlaceholder from "@/components/ad-placeholder";
import { Badge } from "@/components/ui/badge";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.content.substring(0, 160).replace(/<[^>]+>/g, ''),
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-background">
      <div className="container py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <article className="lg:col-span-3 prose prose-lg max-w-none dark:prose-invert prose-headings:font-headline prose-headings:text-primary prose-a:text-accent">
                <div className="mb-8">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
                        <Image src={post.image} alt={post.title} data-ai-hint={post.tags.slice(0, 2).join(' ')} fill className="object-cover" />
                    </div>
                    <h1 className="text-3xl md:text-4xl">{post.title}</h1>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mt-4">
                        <div className="flex items-center gap-1.5"><User className="h-4 w-4" /> {post.author}</div>
                        <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {post.date}</div>
                        <div className="flex items-center gap-1.5"><Tag className="h-4 w-4" /> {post.category}</div>
                    </div>
                </div>

                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                
                <div className="mt-8 flex flex-wrap gap-2">
                    {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
            </article>
            <aside className="lg:col-span-1 space-y-8">
                 <AdPlaceholder />
                 <AdPlaceholder className="h-96" />
            </aside>
        </div>
      </div>
    </div>
  );
}
