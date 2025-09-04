import Link from "next/link";
import { Facebook, Instagram, Phone, Mail, MapPin, Send } from "lucide-react";
import Logo from "./logo";
import { navItems } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Institute Info */}
          <div className="space-y-4 md:col-span-2">
            <Logo />
            <p className="text-sm max-w-md">
              MTech IT Institute is dedicated to providing top-quality IT training and computer courses to empower students for a successful career in technology.
            </p>
            <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent"/>
                    <span>123 Tech Park, Silicon Valley, India</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-accent"/>
                    <span>+91 12345 67890</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent"/>
                    <span>contact@mtechitinstitute.com</span>
                </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-accent transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="WhatsApp" className="p-2 bg-primary/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                <Send className="w-5 h-5" />
              </Link>
              <Link href="#" aria-label="Facebook" className="p-2 bg-primary/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" aria-label="Instagram" className="p-2 bg-primary/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
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
