
import { MetadataRoute } from 'next';
 
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mtechitinstitute.in';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
