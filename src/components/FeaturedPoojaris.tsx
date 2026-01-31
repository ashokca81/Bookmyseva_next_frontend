import { useState, useEffect } from "react";
import { Star, MapPin, Award, CheckCircle, Languages, Calendar, ChevronLeft, ChevronRight, Info } from "lucide-react";

const poojaris = [
    {
        id: 1,
        name: "Pandit Rajesh Sharma",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=400&fit=crop&crop=faces",
        location: "Hyderabad",
        rating: 4.9,
        reviews: 156,
        experience: 15,
        specializations: ["Griha Pravesh", "Satyanarayan Pooja", "Navagraha Pooja"],
        verified: true,
        languages: ["Telugu", "Hindi", "Sanskrit"],
        completedPoojas: 500,
    },
    {
        id: 2,
        name: "Pandit Venkatesh Iyer",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=400&fit=crop&crop=faces",
        location: "Chennai",
        rating: 5.0,
        reviews: 203,
        experience: 20,
        specializations: ["Temple Rituals", "Wedding Ceremonies", "Housewarming"],
        verified: true,
        languages: ["Tamil", "Telugu", "Sanskrit"],
        completedPoojas: 750,
    },
    {
        id: 3,
        name: "Pandit Arun Kumar",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=400&fit=crop&crop=faces",
        location: "Bangalore",
        rating: 4.8,
        reviews: 128,
        experience: 12,
        specializations: ["Vastu Pooja", "Lakshmi Pooja", "Ganesh Pooja"],
        verified: true,
        languages: ["Kannada", "Hindi", "Sanskrit"],
        completedPoojas: 400,
    },
    {
        id: 4,
        name: "Pandit Suresh Reddy",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=400&fit=crop&crop=faces",
        location: "Mumbai",
        rating: 4.9,
        reviews: 189,
        experience: 18,
        specializations: ["Durga Pooja", "Saraswati Pooja", "Rudrabhishek"],
        verified: true,
        languages: ["Marathi", "Hindi", "Sanskrit"],
        completedPoojas: 620,
    },
];

const FeaturedPoojaris = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const minSwipeDistance = 50;

    // Auto-slide functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const maxIndex = window.innerWidth >= 768 ? poojaris.length - 3 : poojaris.length - 1;
                return prevIndex >= maxIndex ? 0 : prevIndex + 1;
            });
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => {
            const maxIndex = window.innerWidth >= 768 ? poojaris.length - 3 : poojaris.length - 1;
            return prevIndex === 0 ? maxIndex : prevIndex - 1;
        });
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => {
            const maxIndex = window.innerWidth >= 768 ? poojaris.length - 3 : poojaris.length - 1;
            return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
    };

    // Touch event handlers for swipe
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(0);
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
        <section className="py-16 md:py-24 bg-background relative overflow-hidden">
            {/* Enhanced Decorative Elements */}
            <div className="absolute top-10 right-10 w-96 h-96 bg-spiritual-green/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-marigold/15 rounded-full blur-3xl" />
            
            <div className="container px-4 relative z-10">
                {/* Section Header - Redesigned */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="h-px w-8 bg-gradient-to-r from-transparent to-spiritual-green"></div>
                        <span className="inline-flex items-center gap-2 text-spiritual-green text-sm font-bold tracking-wider uppercase px-4 py-2 rounded-full bg-gradient-to-r from-spiritual-green/10 via-spiritual-green/20 to-spiritual-green/10 border border-spiritual-green/30">
                            <CheckCircle className="w-4 h-4 fill-spiritual-green animate-pulse" />
                            Our Expert Poojaris
                        </span>
                        <div className="h-px w-8 bg-gradient-to-l from-transparent to-spiritual-green"></div>
                    </div>
                    <h2 className="font-heading text-4xl md:text-6xl font-bold text-maroon-dark mb-6 drop-shadow-sm">
                        Verified & Experienced Priests
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                        Book certified Poojaris with years of experience in performing authentic Vedic rituals and ceremonies.
                    </p>
                </div>

                {/* Poojaris Carousel - Redesigned */}
                <div className="relative px-12 md:px-16">
                    <div
                        className="relative mb-12"
                        onMouseEnter={() => setIsAutoPlaying(false)}
                        onMouseLeave={() => setIsAutoPlaying(true)}
                    >
                        {/* Carousel Container */}
                        <div
                            className="overflow-hidden rounded-2xl touch-pan-y"
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
                            {poojaris.map((poojari) => (
                                <div
                                    key={poojari.id}
                                    className="w-full md:w-1/3 flex-shrink-0 px-3"
                                >
                                    <div className="card-sacred p-6 relative group h-full transition-all duration-300 flex flex-col">
                                        {/* Verified Badge */}
                                        {poojari.verified && (
                                            <div className="absolute top-4 right-4 bg-[#00BD40] text-white rounded-full p-1 z-10 shadow-lg shadow-[#00BD40]/30">
                                                <CheckCircle className="h-5 w-5" />
                                            </div>
                                        )}

                                        {/* Profile Image */}
                                        <div className="relative mb-4">
                                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-marigold/30 group-hover:border-marigold transition-colors">
                                                <img
                                                    src={poojari.image}
                                                    alt={poojari.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>

                                        {/* Name & Location */}
                                        <div className="text-center mb-4">
                                            <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                                                {poojari.name}
                                            </h3>
                                            <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm">
                                                <MapPin className="h-3 w-3" />
                                                <span>{poojari.location}</span>
                                            </div>
                                        </div>

                                        {/* Rating */}
                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 ${i < Math.floor(poojari.rating)
                                                            ? "fill-marigold text-marigold"
                                                            : "text-muted-foreground/30"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm font-semibold text-foreground">
                                                {poojari.rating}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                ({poojari.reviews} reviews)
                                            </span>
                                        </div>

                                        {/* Experience & Stats */}
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="bg-marigold/5 rounded-lg p-3 text-center">
                                                <div className="flex items-center justify-center gap-1 mb-1">
                                                    <Calendar className="h-4 w-4 text-marigold" />
                                                </div>
                                                <p className="text-lg font-bold text-foreground">{poojari.experience}+</p>
                                                <p className="text-xs text-muted-foreground">Years Exp.</p>
                                            </div>
                                            <div className="bg-marigold/5 rounded-lg p-3 text-center">
                                                <div className="flex items-center justify-center gap-1 mb-1">
                                                    <Award className="h-4 w-4 text-marigold" />
                                                </div>
                                                <p className="text-lg font-bold text-foreground">{poojari.completedPoojas}+</p>
                                                <p className="text-xs text-muted-foreground">Poojas Done</p>
                                            </div>
                                        </div>

                                        {/* Spacer to push content to bottom */}
                                        <div className="flex-grow"></div>

                                        {/* Specializations - Fixed height section */}
                                        <div className="mb-4 min-h-[60px]">
                                            <p className="text-xs font-semibold text-muted-foreground mb-2">Specializations:</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {poojari.specializations.slice(0, 3).map((spec, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-block bg-maroon/10 text-maroon text-xs font-medium px-2 py-1 rounded-full"
                                                    >
                                                        {spec}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Languages */}
                                        <div className="mb-4">
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Languages className="h-3 w-3" />
                                                <span>{poojari.languages.join(", ")}</span>
                                            </div>
                                        </div>


                                        {/* Action Buttons */}
                                        <div className="grid grid-cols-2 gap-2">
                                            <button className="w-full bg-maroon/10 text-maroon font-semibold py-2.5 rounded-lg hover:bg-maroon/20 transition-colors text-sm border border-maroon/30 flex items-center justify-center gap-1">
                                                <Info className="h-4 w-4" />
                                                Info
                                            </button>
                                            <button className="w-full bg-[#00BD40] text-white font-semibold py-2.5 rounded-lg hover:bg-[#00BD40]/90 transition-colors text-sm shadow-md hover:shadow-lg hover:shadow-[#00BD40]/30">
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                        {/* Navigation Buttons - Enhanced Design */}
                        <button
                            onClick={goToPrevious}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-16 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-marigold to-marigold-light shadow-xl border border-white/50 flex items-center justify-center hover:scale-110 hover:shadow-2xl hover:shadow-marigold/50 transition-all duration-300 group z-20"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-lg" />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-16 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-marigold to-marigold-light shadow-xl border border-white/50 flex items-center justify-center hover:scale-110 hover:shadow-2xl hover:shadow-marigold/50 transition-all duration-300 group z-20"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-lg" />
                        </button>

                        {/* Carousel Indicators - Enhanced */}
                        <div className="flex justify-center gap-3 mt-10">
                            {Array.from({ length: typeof window !== 'undefined' && window.innerWidth >= 768 ? poojaris.length - 2 : poojaris.length }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`transition-all duration-300 rounded-full ${index === currentIndex
                                        ? "w-12 h-3 bg-gradient-to-r from-marigold via-marigold-light to-marigold shadow-lg"
                                        : "w-3 h-3 bg-muted-foreground/30 hover:bg-marigold/50"
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* View All Button - Enhanced */}
                <div className="text-center mt-14">
                    <button className="bg-gradient-to-r from-maroon to-maroon-dark hover:from-maroon-dark hover:to-maroon text-white shadow-xl hover:shadow-2xl hover:shadow-maroon/40 transition-all duration-300 px-8 py-4 text-base font-semibold rounded-xl">
                        View All Poojaris
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedPoojaris;
