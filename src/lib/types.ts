
export type InternalLink = {
  keyword: string;
  url: string;
  title: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  duration: string;
  fees: string;
  syllabus: string[];
  image: string;
};

export type BlogPost = {
  slug: string;
  title:string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  content: string;
  summary?: string;
  internalLinks?: InternalLink[];
};

export type Resource = {
  id: string;
  title: string;
  description: string;
  type: "PDF" | "Worksheet" | "Quiz";
  fileUrl: string;
};

export type NavItem = {
  title: string;
  href: string;
};

export type Enrollment = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
};

export type ContactSubmission = {
    id: string;
    name: string;
    email: string;
    message: string;
    submittedAt: string;
}
