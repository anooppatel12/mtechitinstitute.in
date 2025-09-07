
import type { Course, BlogPost } from './types';
import { WithContext, Organization, WebSite, Course as CourseSchema, BlogPosting, BreadcrumbList, ListItem } from 'schema-dts';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mtechitinstitute.in';

export const organizationSchema: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MTech IT Institute',
  url: siteUrl,
  logo: 'https://res.cloudinary.com/dzr4xjizf/image/upload/v1757138798/mtechlogo_1_wsdhhx.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-7800413348',
    contactType: 'Customer Service',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi'],
  },
  sameAs: [
    'https://www.facebook.com/people/Mtech-it-institute/61562000094984/?mibextid=ZbWKwL',
    'https://www.instagram.com/mtechitinstitute',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Patti',
    addressLocality: 'Pratapgarh',
    addressRegion: 'UP',
    postalCode: '230135',
    addressCountry: 'IN',
  },
};

export const websiteSchema: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: siteUrl,
    name: 'MTech IT Institute',
    publisher: {
        '@type': 'Organization',
        name: 'MTech IT Institute',
        logo: {
            '@type': 'ImageObject',
            url: 'https://res.cloudinary.com/dzr4xjizf/image/upload/v1757138798/mtechlogo_1_wsdhhx.png',
        },
    },
};

export const courseSchema = (course: Course): WithContext<CourseSchema> => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: course.title,
  description: course.description,
  provider: {
    '@type': 'Organization',
    name: 'MTech IT Institute',
    url: siteUrl,
  },
  image: course.image,
  courseCode: course.title.replace(/\s+/g, '-').toUpperCase(),
});
