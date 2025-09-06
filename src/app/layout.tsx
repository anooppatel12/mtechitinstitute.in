import type { Metadata } from "next";
import { PT_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/schema";

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mtechitinstitute.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MTech IT Institute - Best Computer Training Institute in India",
    template: "%s | MTech IT Institute",
  },
  description: "Join MTech IT Institute, the best computer training center in India. Offering expert-led IT courses in web development, digital marketing, coding, and more to kickstart your tech career.",
  keywords: ["best computer institute in India", "IT training institute", "computer courses", "after 12th career courses", "MTech IT Institute", "learn coding", "digital marketing courses", "web development course", "Patti", "Pratapgarh"],
  icons: {
    icon: "https://res.cloudinary.com/dzr4xjizf/image/upload/v1757138798/mtechlogo_1_wsdhhx.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "MTech IT Institute - Best Computer Training Institute in India",
    description: "Join MTech IT Institute, the best computer training center in India. Offering expert-led IT courses to kickstart your tech career.",
    images: [
      {
        url: "https://res.cloudinary.com/dzr4xjizf/image/upload/v1757136324/ChatGPT_Image_Sep_5_2025_10_25_03_PM_w0e2ry.png",
        width: 1200,
        height: 630,
        alt: "MTech IT Institute Classroom",
      },
    ],
    siteName: "MTech IT Institute",
  },
  twitter: {
    card: "summary_large_image",
    title: "MTech IT Institute - Best Computer Training Institute in India",
    description: "Join MTech IT Institute, the best computer training center in India. Offering expert-led IT courses to kickstart your tech career.",
    images: ["https://res.cloudinary.com/dzr4xjizf/image/upload/v1757136324/ChatGPT_Image_Sep_5_2025_10_25_03_PM_w0e2ry.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-body antialiased", ptSans.variable, spaceGrotesk.variable)}>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <div className="relative flex min-h-dvh flex-col bg-background">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
