import Hero from "@/components/homepage/hero";
import About from "@/components/homepage/about";
import Highlights from "@/components/homepage/highlights";
import ContactPreview from "@/components/homepage/contact-preview";
import FeaturedCourses from "@/components/homepage/featured-courses";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Highlights />
      <FeaturedCourses />
      <ContactPreview />
    </>
  );
}
