import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import axios from "axios";
import { API_URL } from "@/config";

interface Review {
  _id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  city?: string;
  service?: string;
  avgRating?: number; // Optional if backend sends stats
}

const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Minimum swipe distance (in px) to trigger slide change
  const minSwipeDistance = 50;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_URL.replace('/api', '/api/v1')}/reviews?status=approved&featured=true&limit=10`);
        setReviews(response.data.reviews || response.data || []);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Display testimonials (if none, show empty state or fallback)
  const displayReviews = reviews.length > 0 ? reviews : [];

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || displayReviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // On desktop, show 3 cards at a time, so max index is length - 3 (if length >= 3)
        // If length < 3, just cycle through
        const itemsToShow = window.innerWidth >= 768 ? 3 : 1;
        const maxIndex = Math.max(0, displayReviews.length - itemsToShow);

        // If we reached the end, loop back (logic simplified for safety)
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, displayReviews.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const traverseSlide = (direction: 'next' | 'prev') => {
    if (displayReviews.length === 0) return;
    const itemsToShow = window.innerWidth >= 768 ? 3 : 1;
    const maxIndex = Math.max(0, displayReviews.length - itemsToShow);

    setCurrentIndex((prev) => {
      if (direction === 'next') {
        return prev >= maxIndex ? 0 : prev + 1;
      } else {
        return prev === 0 ? maxIndex : prev - 1;
      }
    });
  };

  const goToPrevious = () => traverseSlide('prev');
  const goToNext = () => traverseSlide('next');

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

  if (isLoading) {
    return (
      <section className="py-16 md:py-10 bg-background">
        <div className="container px-4 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#8D0303]" />
        </div>
      </section>
    )
  }

  if (displayReviews.length === 0) {
    return null;
  }

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
              {displayReviews.map((review) => (
                <div
                  key={review._id}
                  className="w-full md:w-1/3 flex-shrink-0 px-3"
                >
                  <div className="card-sacred p-6 relative group h-full">
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4 text-marigold/20">
                      <Quote className="h-10 w-10" />
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-marigold text-marigold" />
                      ))}
                    </div>

                    {/* Text */}
                    {/* Text */}
                    <p className="text-[#6f1d1d] mb-6 relative z-10 min-h-[80px] font-medium leading-relaxed">
                      "{review.comment.length > 154 ? `${review.comment.slice(0, 154)}...` : review.comment}"
                    </p>

                    {/* Service Tag */}
                    {review.service && (
                      <span className="inline-block bg-[#FFF9E5] text-[#D97706] text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-[#FEF3C7]">
                        {review.service}
                      </span>
                    )}

                    {/* Author */}
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-10 h-10 bg-gradient-to-br from-maroon to-maroon-dark rounded-full flex items-center justify-center text-secondary-foreground font-semibold">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{review.name}</p>
                        <p className="text-sm text-muted-foreground">{review.city || "Devotee"}</p>
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
            {Array.from({ length: window.innerWidth >= 768 ? Math.max(0, displayReviews.length - 2) : displayReviews.length }).map((_, index) => (
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
