import Link from "next/link";
import { Facebook, Instagram, Phone, Mail, MapPin, Send } from "lucide-react";
import Logo from "./logo";
import { navItems } from "@/lib/data";

export default function Footer() {
  const footerQuickLinks = [
    ...navItems,
    { title: "Reviews", href: "/reviews" },
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Terms & Conditions", href: "/terms-and-conditions" },
  ];
  
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Institute Info */}
          <div className="space-y-4 lg:col-span-5">
            <Logo />
            <p className="text-sm max-w-md">
              MTech IT Institute is dedicated to providing top-quality IT training and computer courses to empower students for a successful career in technology.
            </p>
            <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent"/>
                    <span>Patti Pratapgarh, 230135, Uttar Pradesh.</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-accent"/>
                    <span>7800413348, 8299809562</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent"/>
                    <span>mtechitinstitute@gmail.com</span>
                </div>
            </div>
          </div>

          {/* Quick Links and Social Media */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
             <div className="md:col-span-2">
                <h3 className="font-headline text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm columns-2 md:columns-1">
                  {footerQuickLinks.map((item) => (
                    <li key={item.href} className="break-inside-avoid">
                      <Link href={item.href} className="hover:text-accent transition-colors">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                   <li>
                      <Link href="/admin/login" className="hover:text-accent transition-colors">
                        Admin Login
                      </Link>
                    </li>
                </ul>
              </div>

              <div>
                <h3 className="font-headline text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <Link href="#contact" aria-label="WhatsApp" className="p-2 bg-primary/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Send className="w-5 h-5" />
                  </Link>
                  <Link href="https://www.facebook.com/people/Mtech-it-institute/61562000094984/?mibextid=ZbWKwL" aria-label="Facebook" className="p-2 bg-primary/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Facebook className="w-5 h-5" />
                  </Link>
                  <Link href="https://www.instagram.com/mtechitinstitute" aria-label="Instagram" className="p-2 bg-primary/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Instagram className="w-5 h-5" />
                  </Link>
                </div>
              </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MTech IT Institute. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
