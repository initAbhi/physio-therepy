"use client";

import Link from "next/link";
import Image from "next/image";
import { useBooking } from "@/context/BookingContext";

const Footer = () => {
  const { openBooking } = useBooking();

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center shadow-soft">
                <Image src="/adaptus.png" alt="Adaptus Logo" width={96} height={96} className="w-16 h-16 md:w-24 md:h-24 object-contain" />
              </div>
              <span className="font-display font-bold text-xl">PhysioHeal</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Expert physiotherapy care for pain-free living. Your journey to recovery starts here.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li>
                <button
                  onClick={openBooking}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Book Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Pain Management</li>
              <li>Sports Rehabilitation</li>
              <li>Post-Surgery Recovery</li>
              <li>Posture Correction</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>📍 123 Wellness Street, Health City</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>✉️ care@physioheal.com</li>
              <li>🕐 Mon-Sat: 9AM - 8PM</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2024 PhysioHeal. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
