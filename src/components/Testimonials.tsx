import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Lakshmi Venkatesh",
    location: "Hyderabad",
    avatar: "L",
    rating: 5,
    text: "The Griha Pravesh pooja was performed beautifully. The pandit was very knowledgeable and explained every ritual. Highly recommend!",
    service: "Griha Pravesh Pooja",
  },
  {
    id: 2,
    name: "Ramesh Kumar",
    location: "Chennai",
    avatar: "R",
    rating: 5,
    text: "Received the Tirupati Prasadam within 2 days. It was fresh and authentic. The packaging was excellent. Will order again!",
    service: "Temple Prasadam",
  },
  {
    id: 3,
    name: "Priya Sharma",
    location: "Bangalore",
    avatar: "P",
    rating: 5,
    text: "Watched my Satyanarayan Pooja live from the temple. The experience was surreal. Thank you Book My Seva for this divine connection.",
    service: "Online Temple Pooja",
  },
  {
    id: 4,
    name: "Arun Reddy",
    location: "Mumbai",
    avatar: "A",
    rating: 5,
    text: "The pooja kit arrived with all necessary items. The quality was exceptional and the instructions were very clear. Perfect for home rituals!",
    service: "Pooja Kit Delivery",
  },
  {
    id: 5,
    name: "Meera Iyer",
    location: "Pune",
    avatar: "M",
    rating: 5,
    text: "Booked a Navagraha Pooja and the experience was divine. The pandit was punctual and performed the rituals with utmost devotion.",
    service: "Navagraha Pooja",
  },
  {
    id: 6,
    name: "Suresh Patel",
    location: "Ahmedabad",
    avatar: "S",
    rating: 5,
    text: "Amazing service! The online darshan was crystal clear and I felt truly blessed. The entire process was seamless and spiritual.",
    service: "Live Temple Darshan",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Minimum swipe distance (in px) to trigger slide change
  const minSwipeDistance = 50;

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // On desktop, show 3 cards at a time, so max index is length - 3
        const maxIndex = window.innerWidth >= 768 ? testimonials.length - 3 : testimonials.length - 1;
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = window.innerWidth >= 768 ? testimonials.length - 3 : testimonials.length - 1;
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = window.innerWidth >= 768 ? testimonials.length - 3 : testimonials.length - 1;
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  // Touch event handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <section className="py-16 md:py-10 bg-background">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-spiritual-green"></div>
            <span className="inline-flex items-center gap-2 text-spiritual-green text-sm font-bold tracking-wider uppercase px-4 py-2 rounded-full bg-gradient-to-r from-spiritual-green/10 via-spiritual-green/20 to-spiritual-green/10 border border-spiritual-green/30">
              <Star className="w-4 h-4 fill-spiritual-green animate-pulse" />
              Testimonials
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-spiritual-green"></div>
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-maroon-dark mb-6 drop-shadow-sm">
            Blessed by Our Devotees
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied families who have experienced divine blessings through our services.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div
          className="relative mb-12"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Carousel Container */}
          <div
            className="overflow-hidden touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: typeof window !== 'undefined' && window.innerWidth >= 768
                  ? `translateX(-${currentIndex * (100 / 3)}%)`
                  : `translateX(-${currentIndex * 100}%)`
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full md:w-1/3 flex-shrink-0 px-3"
                >
                  <div className="card-sacred p-6 relative group h-full">
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4 text-marigold/20">
                      <Quote className="h-10 w-10" />
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-marigold text-marigold" />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-foreground mb-6 relative z-10">
                      "{testimonial.text}"
                    </p>

                    {/* Service Tag */}
                    <span className="inline-block bg-marigold/10 text-marigold text-xs font-medium px-3 py-1 rounded-full mb-4">
                      {testimonial.service}
                    </span>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-maroon to-maroon-dark rounded-full flex items-center justify-center text-secondary-foreground font-semibold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Hidden on mobile */}
          <button
            onClick={goToPrevious}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 bg-marigold rounded-full items-center justify-center hover:bg-marigold-light transition-colors shadow-lg z-10"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-6 w-6 text-primary-foreground" />
          </button>
          <button
            onClick={goToNext}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 bg-marigold rounded-full items-center justify-center hover:bg-marigold-light transition-colors shadow-lg z-10"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-6 w-6 text-primary-foreground" />
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: window.innerWidth >= 768 ? testimonials.length - 2 : testimonials.length }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${index === currentIndex
                  ? "w-8 h-2 bg-marigold"
                  : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-12 bg-gradient-to-br from-marigold via-marigold-light to-marigold rounded-2xl p-6 md:p-8 relative overflow-hidden group shadow-lg">
          {/* Decorative glow effects */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-spiritual-green/20 rounded-full blur-3xl" />
          
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "4.9/5", label: "Average Rating" },
              { value: "10,000+", label: "Happy Customers" },
              { value: "50+", label: "Cities Covered" },
              { value: "100%", label: "Authentic Rituals" },
            ].map((stat, index) => (
              <div key={index} className="relative">
                <p className="text-2xl md:text-3xl font-heading font-bold text-maroon-dark mb-1">
                  {stat.value}
                </p>
                <p className="text-spiritual-green text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
