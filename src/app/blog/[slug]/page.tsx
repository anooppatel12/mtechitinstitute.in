import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, User, Tag } from "lucide-react";
import AdPlaceholder from "@/components/ad-placeholder";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import type { BlogPost } from "@/lib/types";
import type { Metadata } from 'next';
import { JsonLd } from "@/components/json-ld";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mtechitinstitute.in";

// This allows Next.js to know which slugs are available at build time
export async function generateStaticParams() {
  const blogSnapshot = await getDocs(collection(db, "blog"));
  return blogSnapshot.docs.map((doc) => ({
    slug: doc.id,
  }));
}

async function getPost(slug: string): Promise<BlogPost | null> {
    const docRef = doc(db, "blog", slug);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return null;
    }
    return { slug: docSnap.id, ...docSnap.data() } as BlogPost;
}


export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The article you are looking for does not exist.",
    };
  }
  
  const postDescription = post.content.substring(0, 160).replace(/<[^>]+>/g, '');

  return {
    title: post.title,
    description: postDescription,
    keywords: post.tags,
    alternates: {
      canonical: `${siteUrl}/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: postDescription,
      url: `${siteUrl}/blog/${params.slug}`,
      type: 'article',
      article: {
        publishedTime: new Date(post.date).toISOString(),
        authors: [post.author],
        tags: post.tags,
      },
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: postDescription,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }
  
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <div className="bg-background">
        <div className="container py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <article className="lg:col-span-3 prose prose-lg max-w-none dark:prose-invert prose-headings:font-headline prose-headings:text-primary prose-a:text-accent">
                  <div className="mb-8">
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
                          <Image src={post.image} alt={`${post.title} - Blog Post Banner`} data-ai-hint={(post.tags || []).slice(0, 2).join(' ')} fill className="object-cover" />
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
                      {(post.tags || []).map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                  </div>
              </article>
              <aside className="lg:col-span-1 space-y-8">
                   <AdPlaceholder />
                   <AdPlaceholder className="h-96" />
              </aside>
          </div>
        </div>
      </div>
    </>
  );
}
