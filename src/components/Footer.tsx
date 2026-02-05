import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.png";
import footerBg from "@/assets/footer-bg.png";
import appStore from "@/assets/app-store.png";
import playStore from "@/assets/play-store.png";
import { useAppConfig } from "@/hooks/useAppConfig";
import { getImageUrl } from "@/config";

const Footer = () => {
  const { t } = useTranslation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const config = useAppConfig();

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down more than 300px
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    services: [
      { name: "Book a Pooja", href: "/poojas" },
      { name: "Pooja Kits", href: "/kits" },
      { name: "Temple Prasadam", href: "/prasadam" },
      { name: "Online Pooja", href: "/online-pooja" },
      { name: "Astrology", href: "/astrology" },
      { name: "Vastu Consultation", href: "/vastu" },
      { name: "Kundali Matching", href: "/kundali" },
      { name: "Festival Poojas", href: "/festivals" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Poojaris", href: "/poojaris" },
      { name: "Partner Temples", href: "/temples" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Press & Media", href: "/press" },
      { name: "Testimonials", href: "/testimonials" },
      { name: "Our Mission", href: "/mission" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "FAQs", href: "/faq" },
      { name: "Contact Us", href: "/contact" },
      { name: "Refund Policy", href: "/refund" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Shipping Policy", href: "/shipping" },
      { name: "Track Order", href: "/track" },
    ],
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#FEB703] to-[#FFCB05] text-[#8D0303] overflow-hidden">
      {/* Footer Background Image */}
      <div className="absolute bottom-0 left-0 right-0 h-40 opacity-10">
        <img src={footerBg} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="container px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden">
                {config?.logoUrl ? (
                  <img src={getImageUrl(config.logoUrl)} alt="Book My Seva" className="w-full h-full object-contain" />
                ) : (
                  <img src={logo} alt="Book My Seva" className="w-full h-full object-contain" />
                )}
              </div>
              <div>
                <h3 className="font-heading text-2xl font-bold text-[#00BD40]">Book My Seva</h3>
                <p className="text-[#8D0303]/70 text-sm">{t('footer.tagline')}</p>
              </div>
            </div>

            <p className="text-[#8D0303]/80 mb-6 max-w-sm">
              {t('footer.description')}
            </p>

            {/* Devotional Quote */}
            <blockquote className="border-l-4 border-[#8D0303] pl-4 italic text-[#8D0303]/70">
              "सर्वं ब्रह्ममयं जगत्"
              <br />
              <span className="text-sm not-italic">The entire universe is the manifestation of the Divine</span>
            </blockquote>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <a href="tel:+919876543210" className="flex items-center gap-2 text-[#8D0303]/80 hover:text-[#00BD40] transition-colors font-medium">
                <Phone className="h-4 w-4" />
                +91 98765 43210
              </a>
              <a href="mailto:namaste@bookmyseva.com" className="flex items-center gap-2 text-[#8D0303]/80 hover:text-[#00BD40] transition-colors font-medium">
                <Mail className="h-4 w-4" />
                namaste@bookmyseva.com
              </a>
            </div>

            {/* App Download Buttons */}
            <div className="mt-6">
              <p className="text-[#8D0303] text-sm font-semibold mb-3">{t('footer.downloadApp')}</p>
              <div className="flex gap-3">
                <a
                  href={config?.iosLink || "https://apps.apple.com/app/bookmyseva"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-105 transition-all hover:drop-shadow-[0_0_8px_rgba(0,189,64,0.5)]"
                >
                  <img src={appStore} alt="Download on App Store" className="h-10 w-auto" />
                </a>
                <a
                  href={config?.androidLink || "https://play.google.com/store/apps/details?id=com.bookmyseva"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-105 transition-all hover:drop-shadow-[0_0_8px_rgba(0,189,64,0.5)]"
                >
                  <img src={playStore} alt="Get it on Google Play" className="h-10 w-auto" />
                </a>
              </div>
            </div>
          </div>

          {/* Links Columns - Services, Company & Support in 2 columns on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-6 md:gap-8 md:contents">
            <div className="md:bg-white/10 md:backdrop-blur-sm md:rounded-2xl md:p-6 md:border md:border-[#00BD40]/20 md:hover:border-[#00BD40]/40 md:transition-all md:duration-300">
              <h4 className="font-heading text-xl md:text-2xl font-bold mb-0 text-[#00BD40] relative inline-block pb-2">
                {t('footer.services')}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00BD40] to-transparent rounded"></span>
              </h4>
              <ul className="space-y-3 md:space-y-4 mt-6">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[#8D0303]/70 hover:text-[#00BD40] hover:translate-x-1 transition-all inline-block font-medium text-sm md:text-base py-1 group relative"
                    >
                      <span className="relative z-10">{link.name}</span>
                      <span className="absolute inset-0 bg-[#00BD40]/0 group-hover:bg-[#00BD40]/5 rounded-md -left-2 -right-2 transition-all duration-300"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden md:block md:bg-white/10 md:backdrop-blur-sm md:rounded-2xl md:p-6 md:border md:border-[#00BD40]/20 md:hover:border-[#00BD40]/40 md:transition-all md:duration-300">
              <h4 className="font-heading text-xl md:text-2xl font-bold mb-0 text-[#00BD40] relative inline-block pb-2">
                {t('footer.company')}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00BD40] to-transparent rounded"></span>
              </h4>
              <ul className="space-y-3 md:space-y-4 mt-6">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[#8D0303]/70 hover:text-[#00BD40] hover:translate-x-1 transition-all inline-block font-medium text-sm md:text-base py-1 group relative"
                    >
                      <span className="relative z-10">{link.name}</span>
                      <span className="absolute inset-0 bg-[#00BD40]/0 group-hover:bg-[#00BD40]/5 rounded-md -left-2 -right-2 transition-all duration-300"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:bg-white/10 md:backdrop-blur-sm md:rounded-2xl md:p-6 md:border md:border-[#00BD40]/20 md:hover:border-[#00BD40]/40 md:transition-all md:duration-300">
              <h4 className="font-heading text-xl md:text-2xl font-bold mb-0 text-[#00BD40] relative inline-block pb-2">
                {t('footer.support')}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00BD40] to-transparent rounded"></span>
              </h4>
              <ul className="space-y-3 md:space-y-4 mt-6">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[#8D0303]/70 hover:text-[#00BD40] hover:translate-x-1 transition-all inline-block font-medium text-sm md:text-base py-1 group relative"
                    >
                      <span className="relative z-10">{link.name}</span>
                      <span className="absolute inset-0 bg-[#00BD40]/0 group-hover:bg-[#00BD40]/5 rounded-md -left-2 -right-2 transition-all duration-300"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container px-4 border-t border-[#8D0303]/20 py-6">
        {/* Mobile Layout - Stacked */}
        <div className="flex flex-col items-center gap-4 md:hidden">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="w-10 h-10 bg-[#8D0303]/10 rounded-full flex items-center justify-center hover:bg-[#00BD40] hover:text-white transition-all hover:shadow-lg hover:shadow-[#00BD40]/30"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-[#8D0303]/60 text-sm text-center">
            <p>© {new Date().getFullYear()} Book My Seva. All rights reserved.</p>
            <p className="mt-1">
              Designed and Developed by{" "}
              <a
                href="http://lavishstar.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8D0303] font-semibold hover:text-[#A01010] transition-colors"
              >
                Lavishstar Technologies
              </a>
            </p>
          </div>

          {/* Scroll to Top - Hidden on Mobile */}
        </div>

        {/* Desktop Layout - Horizontal with absolute positioning */}
        <div className="hidden md:flex items-center justify-center relative">
          {/* Social Links - Left */}
          <div className="absolute left-0 flex items-center gap-4">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="w-10 h-10 bg-[#8D0303]/10 rounded-full flex items-center justify-center hover:bg-[#00BD40] hover:text-white transition-all hover:shadow-lg hover:shadow-[#00BD40]/30"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Copyright - Center */}
          <div className="text-[#8D0303]/60 text-sm text-center">
            <p>© {new Date().getFullYear()} Book My Seva. All rights reserved.</p>
            <p className="mt-1">
              Designed and Developed by{" "}
              <a
                href="http://lavishstar.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8D0303] font-semibold hover:text-[#A01010] transition-colors"
              >
                Lavishstar Technologies
              </a>
            </p>
          </div>

          {/* Scroll to Top - Right */}
          <button
            onClick={scrollToTop}
            className="absolute right-0 w-10 h-10 bg-[#00BD40] rounded-full flex items-center justify-center hover:bg-[#00BD40]/90 transition-all shadow-lg shadow-[#00BD40]/30 hover:shadow-xl hover:shadow-[#00BD40]/50 hover:scale-110"
          >
            <ArrowUp className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;