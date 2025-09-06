import { MetadataRoute } from 'next';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { Course, BlogPost } from "@/lib/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mtechitinstitute.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    '/courses',
    '/blog',
    '/career',
    '/resources',
    '/contact',
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const coursesSnapshot = await getDocs(collection(db, "courses"));
  const coursesUrls = coursesSnapshot.docs.map((doc) => {
    const course = { id: doc.id, ...doc.data() } as Course;
    return {
      url: `${siteUrl}/courses`, // No individual course pages yet
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    };
  });
  
  const blogSnapshot = await getDocs(collection(db, "blog"));
  const blogUrls = blogSnapshot.docs.map((doc) => {
    const post = { slug: doc.id, ...doc.data() } as BlogPost;
    return {
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    };
  });


  return [...staticUrls, ...coursesUrls, ...blogUrls];
}
