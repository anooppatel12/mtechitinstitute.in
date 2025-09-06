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
            We're here to help you on your learning journey. Contact us for any queries about our computer courses.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-accent">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Our Address</h3>
                <p className="text-primary/80">Patti Pratapgarh, 230135, Uttar Pradesh.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-accent">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Call Us</h3>
                <p className="text-primary/80">7800413348, 8299809562</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-accent">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Email Us</h3>
                <p className="text-primary/80">mtechitinstitute@gmail.com</p>
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
              src="https://res.cloudinary.com/dzr4xjizf/image/upload/v1757137831/map1_gah3hr.png"
              alt="Map showing location of MTech IT Institute"
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
