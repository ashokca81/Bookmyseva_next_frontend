import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import heroTemple from "@/assets/hero-temple.jpg";
import poojaThali from "@/assets/pooja-thali.jpg";
import poojaKit from "@/assets/pooja-kit.jpg";
import prasadam from "@/assets/prasadam.jpg";
import onlinePooja from "@/assets/online-pooja.jpg";
import appStoreIcon from "@/assets/appstore-icon.png";
import playStoreIcon from "@/assets/playstore-icon.webp";
import { Button } from "@/components/ui/button";
import { Play, Star, ArrowRight, Sparkles, ChevronLeft, ChevronRight, Pause } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useAppConfig } from "@/hooks/useAppConfig";
import { getImageUrl } from "@/config";

const HeroSection = () => {
  const { t } = useTranslation();
  const config = useAppConfig();
  const [qrPlatform, setQrPlatform] = useState<"ios" | "android">("android");
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

  const today = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = dayNames[today.getDay()];

  const dayRecommendations: Record<string, { deity: string; pooja: string; icon: string }> = {
    Sunday: { deity: "Surya Bhagavan", pooja: "Surya Namaskar Pooja", icon: "☀️" },
    Monday: { deity: "Lord Shiva", pooja: "Rudrabhishekam", icon: "🔱" },
    Tuesday: { deity: "Lord Hanuman", pooja: "Hanuman Chalisa Path", icon: "🙏" },
    Wednesday: { deity: "Lord Ganesha", pooja: "Ganapati Homam", icon: "🪔" },
    Thursday: { deity: "Lord Vishnu", pooja: "Vishnu Sahasranama", icon: "🔯" },
    Friday: { deity: "Goddess Lakshmi", pooja: "Lakshmi Pooja", icon: "🌸" },
    Saturday: { deity: "Lord Shani", pooja: "Shani Shanti Pooja", icon: "🪐" },
  };

  const recommendation = dayRecommendations[dayName];

  const [dynamicSlides, setDynamicSlides] = useState<any[]>([]);

  // Hero slides data - Fallback
  const staticSlides = [
    {
      id: 1,
      badge: "🙏 Welcome",
      title: "Divine Services",
      subtitle: "At Your Doorstep",
      description: "Book authentic temple poojas with verified priests",
      primaryCTA: "Explore Poojas",
      primaryLink: "/poojas",
      secondaryCTA: "Live Darshan",
      secondaryLink: "/darshan",
      desktopImage: heroTemple,
      mobileImage: poojaThali,
      bgGradient: "from-orange-500 to-amber-600",
    },
    {
      id: 2,
      badge: "🪔 Sacred",
      title: "Temple Fresh",
      subtitle: "Prasadam Delivered",
      description: "Blessed offerings from renowned temples to your doorstep",
      primaryCTA: "Order Prasadam",
      primaryLink: "/prasadam",
      secondaryCTA: "View Temples",
      secondaryLink: "/temples",
      desktopImage: prasadam,
      mobileImage: prasadam,
      bgGradient: "from-rose-500 to-pink-600",
    },
    {
      id: 3,
      badge: "🎯 Verified",
      title: "500+ Poojaris",
      subtitle: "Ready to Serve",
      description: "Experienced priests for personalized ceremonies",
      primaryCTA: "Find Poojari",
      primaryLink: "/poojaris",
      secondaryCTA: "Learn More",
      secondaryLink: "/about",
      desktopImage: poojaKit,
      mobileImage: poojaKit,
      bgGradient: "from-amber-500 to-yellow-600",
    },
    {
      id: 4,
      badge: "📿 Festivals",
      title: "Special Poojas",
      subtitle: "Book in Advance",
      description: "Pre-book festival ceremonies for all occasions",
      primaryCTA: "Browse Festivals",
      primaryLink: "/festivals",
      secondaryCTA: "View Calendar",
      secondaryLink: "/calendar",
      desktopImage: onlinePooja,
      mobileImage: onlinePooja,
      bgGradient: "from-red-600 to-orange-600",
    },
  ];

  const slides = dynamicSlides.length > 0 ? dynamicSlides : staticSlides;

  // Fetch Dynamic Banners
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { API_URL } = await import("@/config");
        // Use v1 path explicitly
        const response = await fetch(`${API_URL.replace('/api', '/api/v1')}/content/home-hero`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.content && Array.isArray(data.content.slides) && data.content.slides.length > 0) {
            setDynamicSlides(data.content.slides);
          }
        }
      } catch (error) {
        console.error("Failed to fetch banners", error);
      }
    };
    fetchBanners();
  }, []);

  // Desktop Carousel - Full screen immersive
  const [desktopEmblaRef, desktopEmblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  // Mobile Carousel - Full screen immersive
  const [mobileEmblaRef, mobileEmblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (desktopEmblaApi) desktopEmblaApi.scrollPrev();
    if (mobileEmblaApi) mobileEmblaApi.scrollPrev();
  }, [desktopEmblaApi, mobileEmblaApi]);

  const scrollNext = useCallback(() => {
    if (desktopEmblaApi) desktopEmblaApi.scrollNext();
    if (mobileEmblaApi) mobileEmblaApi.scrollNext();
  }, [desktopEmblaApi, mobileEmblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (desktopEmblaApi) desktopEmblaApi.scrollTo(index);
      if (mobileEmblaApi) mobileEmblaApi.scrollTo(index);
    },
    [desktopEmblaApi, mobileEmblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const desktopAutoplay = desktopEmblaApi?.plugins()?.autoplay;
    const mobileAutoplay = mobileEmblaApi?.plugins()?.autoplay;

    if (desktopAutoplay) {
      const isPlaying = desktopAutoplay.isPlaying();
      if (isPlaying) {
        desktopAutoplay.stop();
        setIsAutoplayPaused(true);
      } else {
        desktopAutoplay.play();
        setIsAutoplayPaused(false);
      }
    }

    if (mobileAutoplay) {
      const isPlaying = mobileAutoplay.isPlaying();
      if (isPlaying) {
        mobileAutoplay.stop();
      } else {
        mobileAutoplay.play();
      }
    }
  }, [desktopEmblaApi, mobileEmblaApi]);

  const onSelect = useCallback(() => {
    if (desktopEmblaApi) {
      setSelectedIndex(desktopEmblaApi.selectedScrollSnap());
    }
    if (mobileEmblaApi) {
      setSelectedIndex(mobileEmblaApi.selectedScrollSnap());
    }
  }, [desktopEmblaApi, mobileEmblaApi]);

  useEffect(() => {
    if (desktopEmblaApi) {
      onSelect();
      setScrollSnaps(desktopEmblaApi.scrollSnapList());
      desktopEmblaApi.on('select', onSelect);
      desktopEmblaApi.on('reInit', onSelect);
    }
  }, [desktopEmblaApi, onSelect]);

  useEffect(() => {
    if (mobileEmblaApi) {
      onSelect();
      setScrollSnaps(mobileEmblaApi.scrollSnapList());
      mobileEmblaApi.on('select', onSelect);
      mobileEmblaApi.on('reInit', onSelect);
    }
  }, [mobileEmblaApi, onSelect]);

  return (
    <>
      {/* DESKTOP VIEW - Full Screen Immersive Carousel */}
      <section className="hidden md:block relative h-[70vh] lg:h-[75vh] overflow-hidden rounded-2xl lg:rounded-3xl">
        {/* Desktop Carousel Container */}
        <div className="absolute inset-0" ref={desktopEmblaRef}>
          <div className="flex h-full">
            {slides.map((slide) => (
              <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative">
                {/* Desktop Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${slide.desktopImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                  }}
                >
                  {/* Strong Dark Overlay for Better Text Visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Border */}
        <div className="absolute inset-0 rounded-2xl lg:rounded-3xl border-2 border-marigold/20 pointer-events-none z-10" />

        {/* Desktop Content */}
        <div className="relative w-full h-full flex flex-col justify-center z-20">
          <div className="px-10 py-8 max-w-2xl">
            {/* Premium Badge */}
            {slides[selectedIndex]?.badge && (
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-[8px] px-4 py-1 mb-4 border border-marigold/50 shadow-xl transition-all duration-500">
                <span className="text-xl">
                  {slides[selectedIndex]?.badge.split(' ')[0]}
                </span>
                <span className="text-gray-800 font-semibold tracking-wide text-sm">
                  {slides[selectedIndex]?.badge.split(' ').slice(1).join(' ')}
                </span>
              </div>
            )}

            {/* Main Headline */}
            {(slides[selectedIndex]?.title || slides[selectedIndex]?.subtitle) && (
              <h1 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 leading-[1.1] tracking-tight transition-all duration-500" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>
                {slides[selectedIndex]?.title}
                {slides[selectedIndex]?.subtitle && (
                  <span className="block mt-2 text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>
                    {slides[selectedIndex]?.subtitle}
                  </span>
                )}
              </h1>
            )}

            {/* Subheading */}
            {slides[selectedIndex]?.description && (
              <p className="text-base lg:text-lg text-white/95 mb-6 max-w-lg leading-relaxed font-medium transition-all duration-500 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                {slides[selectedIndex]?.description}
              </p>
            )}

            {/* CTA Buttons */}
            {(slides[selectedIndex]?.primaryCTA || slides[selectedIndex]?.secondaryCTA) && (
              <div className="flex flex-row gap-3 mb-6">
                {slides[selectedIndex]?.primaryCTA && (
                  <Button asChild variant="sacred" size="lg" className="text-base group bg-[#FEB703] hover:bg-[#FEB703]/90 text-[#8D0303] border-none shadow-lg shadow-[#FEB703]/30 hover:shadow-[#FEB703]/50 transition-all duration-500">
                    <Link to={slides[selectedIndex]?.primaryLink || "/"}>
                      <span>{slides[selectedIndex]?.primaryCTA}</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                )}
                {slides[selectedIndex]?.secondaryCTA && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="text-base border-2 border-secondary-foreground/40 text-secondary-foreground bg-secondary-foreground/5 backdrop-blur-sm hover:bg-secondary-foreground/15 hover:border-secondary-foreground/60 transition-all duration-500"
                  >
                    <Link to={slides[selectedIndex]?.secondaryLink || "/"}>
                      <Play className="h-4 w-4 mr-2 fill-current" />
                      {slides[selectedIndex]?.secondaryCTA}
                    </Link>
                  </Button>
                )}
              </div>
            )}

            {/* Trust Stats */}
            <div className="flex flex-wrap gap-6 pt-4 pb-4 border-t border-secondary-foreground/10">
              {[
                { value: "10K+", label: "Poojas" },
                { value: "500+", label: "Poojaris" },
                { value: "4.9★", label: "Rating" },
              ].map((stat) => (
                <div key={stat.label} className="relative group">
                  <p className="text-2xl lg:text-3xl font-heading font-bold text-marigold drop-shadow-sm">
                    {stat.value}
                  </p>
                  <p className="text-xs text-secondary-foreground/75 mt-0.5 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Navigation Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
            <button
              onClick={scrollPrev}
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-marigold/30 flex items-center justify-center hover:bg-[#FEB703] hover:border-[#FEB703] transition-all duration-300 hover:scale-110 group"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-maroon group-hover:text-[#8D0303] transition-colors" />
            </button>

            <div className="flex gap-1.5">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`transition-all duration-300 rounded-full ${index === selectedIndex
                    ? 'w-8 h-2.5 bg-gradient-to-r from-marigold to-sacred-red shadow-md shadow-marigold/50'
                    : 'w-2.5 h-2.5 bg-white/60 hover:bg-white/90 backdrop-blur-sm'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-marigold/30 flex items-center justify-center hover:bg-[#FEB703] hover:border-[#FEB703] transition-all duration-300 hover:scale-110 group"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-maroon group-hover:text-[#8D0303] transition-colors" />
            </button>

            <button
              onClick={toggleAutoplay}
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-marigold/30 flex items-center justify-center hover:bg-[#FEB703] hover:border-[#FEB703] transition-all duration-300 hover:scale-110 group"
              aria-label={isAutoplayPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {isAutoplayPaused ? (
                <Play className="w-5 h-5 text-maroon group-hover:text-[#8D0303] transition-colors fill-current" />
              ) : (
                <Pause className="w-5 h-5 text-maroon group-hover:text-[#8D0303] transition-colors" />
              )}
            </button>
          </div>

          {/* QR Code Widget - Desktop Only */}
          <div className="hidden xl:block absolute bottom-4 right-4 animate-fade-in-up z-40">
            <div className="flex flex-row items-center gap-0">
              <div className="relative group">
                <div className={`relative bg-white p-2 rounded-xl transition-all duration-500 border ${qrPlatform === "ios" ? "border-blue-500" : "border-[#3DDC84]"}`}>
                  <div className="relative overflow-hidden rounded-lg w-[100px] h-[100px] flex items-center justify-center bg-white">
                    {/* Dynamic QR Display Logic */}
                    {(qrPlatform === "ios" && config?.iosQrImage) ? (
                      <img
                        src={getImageUrl(config.iosQrImage)}
                        alt="iOS QR Code"
                        className="w-full h-full object-contain"
                      />
                    ) : (qrPlatform === "android" && config?.androidQrImage) ? (
                      <img
                        src={getImageUrl(config.androidQrImage)}
                        alt="Android QR Code"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      // Fallback to Generated QR if no image uploaded
                      <QRCodeSVG
                        value={qrPlatform === "ios"
                          ? (config?.iosLink || "https://apps.apple.com/app/bookmyseva")
                          : (config?.androidLink || "https://play.google.com/store/apps/details?id=com.bookmyseva")}
                        size={100}
                        level="H"
                        includeMargin={false}
                        imageSettings={{
                          src: qrPlatform === "ios" ? appStoreIcon : playStoreIcon,
                          x: undefined,
                          y: undefined,
                          height: 24,
                          width: 24,
                          excavate: true,
                        }}
                      />
                    )}

                    <div className={`absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-50 animate-scan ${qrPlatform === "ios" ? "text-blue-500" : "text-[#3DDC84]"}`} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-lg">
                <button
                  onClick={() => setQrPlatform("ios")}
                  className={`relative w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300 ${qrPlatform === "ios" ? "bg-white shadow-lg scale-110" : "hover:bg-white/10 opacity-70 hover:opacity-100"}`}
                  title="Show iOS QR"
                >
                  <img
                    src={appStoreIcon}
                    alt="App Store"
                    className={`w-4 h-4 object-contain transition-transform duration-300 ${qrPlatform === "ios" ? "scale-100" : "grayscale"}`}
                  />
                </button>

                <button
                  onClick={() => setQrPlatform("android")}
                  className={`relative w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300 ${qrPlatform === "android" ? "bg-white shadow-lg scale-110" : "hover:bg-white/10 opacity-70 hover:opacity-100"}`}
                  title="Show Android QR"
                >
                  <img
                    src={playStoreIcon}
                    alt="Play Store"
                    className={`w-4 h-4 object-contain transition-transform duration-300 ${qrPlatform === "android" ? "scale-100" : "grayscale"}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE VIEW - Full Screen Immersive Carousel */}
      <section className="md:hidden relative flex items-center overflow-hidden" style={{ height: 'calc(100vh - 64px - 200px)' }}>
        {/* Mobile Carousel Container */}
        <div className="absolute inset-0" ref={mobileEmblaRef}>
          <div className="flex h-full touch-pan-y">
            {slides.map((slide) => (
              <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative">
                {/* Mobile Background Image - Full Screen */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${slide.mobileImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                  }}
                >
                  {/* Strong Gradient Overlay for Better Text Visibility */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/85" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Content */}
        <div className="relative w-full h-full flex flex-col justify-center z-20">
          <div className="px-5 py-0 max-w-2xl">
            {/* Premium Badge */}
            {slides[selectedIndex]?.badge && (
              <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-[5px] px-3 py-1 mb-3 border border-marigold/50 shadow-xl transition-all duration-500">
                <span className="text-base">
                  {slides[selectedIndex]?.badge.split(' ')[0]}
                </span>
                <span className="text-gray-800 font-semibold tracking-wide text-xs">
                  {slides[selectedIndex]?.badge.split(' ').slice(1).join(' ')}
                </span>
              </div>
            )}

            {/* Main Headline */}
            {(slides[selectedIndex]?.title || slides[selectedIndex]?.subtitle) && (
              <h1 className="font-heading text-xl font-bold text-white mb-2 leading-[1.1] tracking-tight transition-all duration-500" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.6)' }}>
                {slides[selectedIndex]?.title}
                {slides[selectedIndex]?.subtitle && (
                  <span className="block mt-1 text-white" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.6)' }}>
                    {slides[selectedIndex]?.subtitle}
                  </span>
                )}
              </h1>
            )}

            {/* Subheading */}
            {slides[selectedIndex]?.description && (
              <p className="text-xs text-white/95 mb-4 max-w-lg leading-relaxed font-medium transition-all duration-500 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.9)' }}>
                {slides[selectedIndex]?.description}
              </p>
            )}

            {/* CTA Buttons */}
            {(slides[selectedIndex]?.primaryCTA || slides[selectedIndex]?.secondaryCTA) && (
              <div className="flex flex-col sm:flex-row gap-2 mb-3">
                {slides[selectedIndex]?.primaryCTA && (
                  <Button asChild variant="sacred" size="lg" className="w-full sm:w-auto text-sm group bg-[#FEB703] hover:bg-[#FEB703]/90 text-[#8D0303] border-none shadow-lg shadow-[#FEB703]/30 hover:shadow-[#FEB703]/50 transition-all duration-500">
                    <Link to={slides[selectedIndex]?.primaryLink || "/"}>
                      <span>{slides[selectedIndex]?.primaryCTA}</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                )}
                {slides[selectedIndex]?.secondaryCTA && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto text-sm border-2 border-secondary-foreground/40 text-secondary-foreground bg-secondary-foreground/5 backdrop-blur-sm hover:bg-secondary-foreground/15 hover:border-secondary-foreground/60 transition-all duration-500"
                  >
                    <Link to={slides[selectedIndex]?.secondaryLink || "/"}>
                      <Play className="h-4 w-4 mr-2 fill-current" />
                      {slides[selectedIndex]?.secondaryCTA}
                    </Link>
                  </Button>
                )}
              </div>
            )}

            {/* Trust Stats - Card Design for Mobile */}
            <div className="flex justify-center gap-2 pt-2 pb-20">
              {[
                { value: "10K+", label: "Poojas" },
                { value: "500+", label: "Poojaris" },
                { value: "4.9★", label: "Rating" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/95 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg border border-marigold/20 text-center min-w-[80px]">
                  <p className="text-lg font-heading font-bold text-[#FEB703]">
                    {stat.value}
                  </p>
                  <p className="text-[9px] text-gray-700 mt-0.5 font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
            <button
              onClick={scrollPrev}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-marigold/30 flex items-center justify-center hover:bg-[#FEB703] hover:border-[#FEB703] transition-all duration-300 hover:scale-110 group"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 text-maroon group-hover:text-[#8D0303] transition-colors" />
            </button>

            <div className="flex gap-1.5">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`transition-all duration-300 rounded-full ${index === selectedIndex
                    ? 'w-8 h-2.5 bg-gradient-to-r from-marigold to-sacred-red shadow-md shadow-marigold/50'
                    : 'w-2.5 h-2.5 bg-white/60 hover:bg-white/90 backdrop-blur-sm'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-marigold/30 flex items-center justify-center hover:bg-[#FEB703] hover:border-[#FEB703] transition-all duration-300 hover:scale-110 group"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 text-maroon group-hover:text-[#8D0303] transition-colors" />
            </button>

            <button
              onClick={toggleAutoplay}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-marigold/30 flex items-center justify-center hover:bg-[#FEB703] hover:border-[#FEB703] transition-all duration-300 hover:scale-110 group"
              aria-label={isAutoplayPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {isAutoplayPaused ? (
                <Play className="w-4 h-4 text-maroon group-hover:text-[#8D0303] transition-colors fill-current" />
              ) : (
                <Pause className="w-4 h-4 text-maroon group-hover:text-[#8D0303] transition-colors" />
              )}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
