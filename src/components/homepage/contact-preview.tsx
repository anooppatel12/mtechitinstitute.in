import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPreview() {
  return (
    <section className="py-16 sm:py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold text-primary sm:text-4xl">Get In Touch</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary/80">
            We're here to help you on your learning journey. Contact us for any queries.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-accent">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Address</h3>
                <p className="text-primary/80">123 Tech Park, Silicon Valley, India</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-accent">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Phone</h3>
                <p className="text-primary/80">+91 12345 67890</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-accent">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Email</h3>
                <p className="text-primary/80">contact@mtechitinstitute.com</p>
              </div>
            </div>
            <div className="pt-4">
                <Button asChild>
                    <Link href="/contact">Send us a Message</Link>
                </Button>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://picsum.photos/seed/location-map/800/600"
              alt="Google Map preview"
              data-ai-hint="map location"
              width={800}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
