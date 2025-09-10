
import Link from "next/link";
import { Facebook, Instagram, Phone, Mail, MapPin, Send } from "lucide-react";
import Logo from "./logo";
import { navItems } from "@/lib/data";

export default function Footer() {
  const primaryLinks = navItems.slice(0, 4); // Home, About, Courses, Blog
  const secondaryLinks = [
      ...navItems.slice(4), // Career Guidance, Resources, Contact
      { title: "Reviews", href: "/reviews" },
  ];
  const legalLinks = [
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Terms & Conditions", href: "/terms-and-conditions" },
    { title: "Admin Login", href: "/admin/login" },
  ];
  
  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container py-12 text-center md:text-left">
        
        {/* Top Section: Logo and Description */}
        <div className="flex flex-col items-center md:items-start mb-8">
            <Logo />
            <p className="text-sm max-w-md mt-4 text-center md:text-left">
              MTech IT Institute is dedicated to providing top-quality IT training and computer courses to empower students for a successful career in technology.
            </p>
        </div>

        {/* Middle Section: Links and Contact */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Contact Info */}
            <div className="space-y-3 md:col-span-2">
                 <h3 className="font-headline text-lg font-semibold">Contact Us</h3>
                 <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-accent flex-shrink-0"/>
                    <span>Patti Pratapgarh, 230135, Uttar Pradesh.</span>
                </div>
                 <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                    <Phone className="w-4 h-4 text-accent flex-shrink-0"/>
                    <span>7800413348, 8299809562</span>
                </div>
                 <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                    <Mail className="w-4 h-4 text-accent flex-shrink-0"/>
                    <span>mtechitinstitute@gmail.com</span>
                </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
                 <h3 className="font-headline text-lg font-semibold">Quick Links</h3>
                 <ul className="space-y-2 text-sm">
                  {[...primaryLinks, ...secondaryLinks].map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="hover:text-accent transition-colors">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
            </div>
            
            {/* Legal Links and Socials */}
            <div className="space-y-3">
                 <h3 className="font-headline text-lg font-semibold invisible">More</h3>
                 <ul className="space-y-2 text-sm">
                  {legalLinks.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="hover:text-accent transition-colors">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                 <div className="flex space-x-4 justify-center md:justify-start pt-4">
                  <Link href="https://wa.me/918299809562" aria-label="WhatsApp" className="p-2 bg-primary/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
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

        {/* Bottom Section: Copyright */}
        <div className="pt-6 border-t border-border/50 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MTech IT Institute. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
