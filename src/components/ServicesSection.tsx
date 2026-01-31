import { Star, ArrowRight, ChevronLeft, ChevronRight, Home, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import poojaThali from "@/assets/pooja-thali.jpg";
import poojaKit from "@/assets/pooja-kit.jpg";
import prasadam from "@/assets/prasadam.jpg";
import onlinePooja from "@/assets/online-pooja.jpg";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from "react";

const services = [
  {
    id: 1,
    title: "Book My Pooja",
    description: "Personalized Pooja ceremonies performed by verified temple priests at your home or online.",
    image: poojaThali,
    rating: 4.9,
    reviews: 2847,
    price: "From ₹999",
    badge: "Most Popular",
    badgeColor: "bg-sacred-red",
  },
  {
    id: 2,
    title: "Pooja Kits",
    description: "Complete pooja samagri kits with authentic items blessed at sacred temples.",
    image: poojaKit,
    rating: 4.8,
    reviews: 1523,
    price: "From ₹499",
    badge: "Fast Delivery",
    badgeColor: "bg-[#00BD40]",
  },
  {
    id: 3,
    title: "Prasadam",
    description: "Sacred blessed offerings from famous temples delivered fresh to your doorstep.",
    image: prasadam,
    rating: 4.9,
    reviews: 3201,
    price: "From ₹299",
    badge: "Temple Fresh",
    badgeColor: "bg-marigold",
  },
  {
    id: 4,
    title: "Online Temple Pooja",
    description: "Watch live pooja performed on your behalf at renowned temples across India.",
    image: onlinePooja,
    rating: 4.7,
    reviews: 986,
    price: "From ₹799",
    badge: "Live Streaming",
    badgeColor: "bg-maroon",
  },
  {
    id: 5,
    title: "Home Services",
    description: "Professional priests visit your home for personalized rituals and ceremonies.",
    image: poojaThali,
    rating: 4.8,
    reviews: 1845,
    price: "From ₹1,299",
    badge: "Doorstep Service",
    badgeColor: "bg-spiritual-green",
  },
  {
    id: 6,
    title: "Volunteer Services",
    description: "Join our community of volunteers and serve with devotion at temples and events.",
    image: onlinePooja,
    rating: 4.9,
    reviews: 756,
    price: "Free",
    badge: "Seva Opportunity",
    badgeColor: "bg-maroon-dark",
  },
];

const ServicesSection = () => {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: false,
      dragFree: false,
      containScroll: 'trimSnaps',
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Mobile scroll tracking with IntersectionObserver
  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector('.mobile-services-scroll');
      if (!container) return;

      const cards = container.querySelectorAll('.service-card-mobile');
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(cardCenter - containerCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setMobileActiveIndex(closestIndex);
    };

    const container = document.querySelector('.mobile-services-scroll');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial call
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section className="py-8 md:py-10 bg-background relative overflow-hidden">
      {/* Enhanced Decorative Elements */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-marigold/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-spiritual-green/15 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-maroon/10 rounded-full blur-3xl" />

      <div className="container px-4 md:px-4 relative z-10">
        {/* Section Header - Mobile Optimized */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-spiritual-green"></div>
            <span className="inline-flex items-center gap-2 text-spiritual-green text-xs md:text-sm font-bold tracking-wider uppercase px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-spiritual-green/10 via-spiritual-green/20 to-spiritual-green/10 border border-spiritual-green/30">
              <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-spiritual-green animate-pulse" />
              Our Services
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-spiritual-green"></div>
          </div>
          <h2 className="font-heading text-3xl md:text-6xl font-bold text-maroon-dark mb-3 md:mb-6 drop-shadow-sm">
            Best of Book My Seva
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-3xl mx-auto leading-relaxed px-4">
            Experience the divine with our comprehensive range of spiritual services, &nbsp;
            <br className="hidden md:block" />
            crafted with devotion and delivered with care.
          </p>
        </div>

        {/* Mobile: Horizontal Scroll, Desktop: Carousel */}
        <div className="relative">
          {/* Desktop Carousel with Navigation */}
          <div className="hidden md:block px-12 md:px-16">
            <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
              <div className="flex -ml-4 md:-ml-6 touch-pan-y py-2">
                {services.map((service, index) => (
                  <div key={service.id} className="flex-[0_0_100%] min-w-0 pl-4 md:pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%]">
                    <ServiceCard service={service} index={index} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons - Desktop Only */}
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-marigold to-marigold-light shadow-xl border border-white/50 flex items-center justify-center hover:scale-110 hover:shadow-2xl hover:shadow-marigold/50 transition-all duration-300 group z-20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-lg" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-marigold to-marigold-light shadow-xl border border-white/50 flex items-center justify-center hover:scale-110 hover:shadow-2xl hover:shadow-marigold/50 transition-all duration-300 group z-20"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-lg" />
            </button>
          </div>

          {/* Mobile: Horizontal Scroll Grid */}
          <div className="md:hidden -mx-4 px-4">
            <div className="mobile-services-scroll flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 scroll-smooth">
              {services.map((service, index) => (
                <div key={service.id} className="service-card-mobile flex-shrink-0 w-[85vw] snap-center">
                  <ServiceCard service={service} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Scroll Indicators */}
        <div className="flex md:hidden justify-center gap-2 mt-4">
          {services.map((_, index) => (
            <div
              key={index}
              className={`transition-all duration-300 rounded-full ${index === mobileActiveIndex
                ? 'w-8 h-2 bg-gradient-to-r from-marigold via-marigold-light to-marigold'
                : 'w-2 h-2 bg-muted-foreground/30'
                }`}
            />
          ))}
        </div>

        {/* Carousel Indicators - Desktop Only */}
        <div className="hidden md:flex justify-center gap-3 mt-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`transition-all duration-300 rounded-full ${index === selectedIndex
                ? 'w-12 h-3 bg-gradient-to-r from-marigold via-marigold-light to-marigold shadow-lg'
                : 'w-3 h-3 bg-muted-foreground/30 hover:bg-marigold/50'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* View All Button - Enhanced */}
        <div className="text-center mt-6 md:mt-5">
          <button className="bg-spiritual-green hover:bg-spiritual-green/90 text-white shadow-xl hover:shadow-2xl hover:shadow-spiritual-green/40 transition-all duration-300 px-8 py-3.5 md:py-4 text-sm md:text-base font-semibold rounded-xl active:scale-95">
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({
  service,
  index
}: {
  service: typeof services[0];
  index: number;
}) => {
  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 border border-border/50 shadow-lg hover:shadow-2xl active:scale-[0.98] md:hover:-translate-y-2 md:active:scale-100"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image Container - Enhanced */}
      <div className="relative h-48 md:h-52 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/80 via-maroon/40 to-transparent" />

        {/* Badge - Enhanced */}
        <span className={`absolute top-4 left-4 ${service.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm`}>
          {service.badge}
        </span>

        {/* Price Tag - Enhanced */}
        <span className="absolute bottom-3 right-3 bg-marigold text-maroon-dark text-sm font-bold px-3 py-1.5 rounded-lg shadow-xl backdrop-blur-sm border border-marigold-light">
          {service.price}
        </span>
      </div>

      {/* Content - Enhanced */}
      <div className="p-4 md:p-6">
        <h3 className="font-heading text-lg md:text-xl font-bold text-maroon-dark mb-2 md:mb-3 group-hover:text-marigold transition-colors line-clamp-1">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4 line-clamp-2 leading-relaxed">
          {service.description}
        </p>

        {/* Rating - Left Aligned */}
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <div className="flex items-center gap-1 bg-marigold/10 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full">
            <Star className="h-3.5 w-3.5 md:h-4 md:w-4 fill-marigold text-marigold" />
            <span className="font-bold text-maroon-dark text-xs md:text-sm">{service.rating}</span>
          </div>
          <span className="text-muted-foreground text-xs">
            ({service.reviews.toLocaleString()})
          </span>
        </div>

        {/* Action Button - Full Width Left Aligned */}
        <Button
          className="w-full bg-spiritual-green hover:bg-spiritual-green/90 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all group/btn justify-center md:justify-start active:scale-95 h-10 md:h-auto text-sm md:text-base"
        >
          Book Now
          <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default ServicesSection;
