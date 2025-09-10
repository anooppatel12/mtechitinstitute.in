
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy } from "firebase/firestore";
import type { BlogPost } from "@/lib/types";
import BlogPageClient from "@/components/blog-page-client";
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mtechitinstitute.in";

export const metadata: Metadata = {
  title: "Tech Blog - MTech IT Institute",
  description: "Explore the latest in tech with articles from MTech IT Institute. Discover insights on web development, digital marketing, and essential IT skills.",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
   openGraph: {
    title: "Tech Blog - MTech IT Institute",
    description: "Explore the latest in tech with articles from MTech IT Institute. Discover insights on web development, digital marketing, and essential IT skills.",
    url: `${siteUrl}/blog`,
  },
};

// This forces the page to be dynamically rendered, ensuring data is always fresh
export const revalidate = 0;

async function getBlogData(): Promise<{ posts: BlogPost[], tags: string[] }> {
    const blogQuery = query(collection(db, "blog"), orderBy("date", "desc"));
    const blogSnapshot = await getDocs(blogQuery);
    
    const posts = blogSnapshot.docs.map(doc => {
        const data = doc.data() as Omit<BlogPost, 'slug' | 'summary'>;
        const summary = data.content.replace(/<[^>]+>/g, '').substring(0, 150) + '...';
        return { slug: doc.id, ...data, summary } as BlogPost;
    });

    const tagCounts = posts.reduce((acc, post) => {
        post.tags.forEach(tag => {
            acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
    }, {} as Record<string, number>);

    const popularTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(entry => entry[0]);

    return { posts, tags: popularTags };
}


export default async function BlogPage() {
    const { posts, tags } = await getBlogData();

    return <BlogPageClient posts={posts} popularTags={tags} />;
}
