import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, Award, ShoppingBag, Heart, TrendingUp, Users, Clock, CheckCircle2, Sparkles, Crown, ArrowRight, Flame, Zap, Timer, MapPin, Phone, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

// Mock data - Replace with actual API data
const championsData = {
  poojari: [
    {
      id: 1,
      rank: 1,
      name: "Pandit Rajesh Sharma",
      image: logo,
      specialty: "Vedic Rituals Expert",
      experience: "15+ Years",
      rating: 4.9,
      reviews: 2847,
      bookings: "5000+",
      verified: true,
      badge: "🥇 Top Rated",
      location: "Delhi NCR",
    },
    {
      id: 2,
      rank: 2,
      name: "Acharya Venkat Rao",
      image: logo,
      specialty: "South Indian Rituals",
      experience: "12+ Years",
      rating: 4.8,
      reviews: 1923,
      bookings: "3500+",
      verified: true,
      badge: "🥈 Most Loved",
      location: "Bangalore",
    },
    {
      id: 3,
      rank: 3,
      name: "Pandit Amit Kumar",
      image: logo,
      specialty: "Wedding Ceremonies",
      experience: "10+ Years",
      rating: 4.7,
      reviews: 1456,
      bookings: "2800+",
      verified: true,
      badge: "🥉 Rising Star",
      location: "Mumbai",
    },
  ],
  pooja: [
    {
      id: 1,
      rank: 1,
      name: "Rudrabhishekam",
      image: logo,
      specialty: "Lord Shiva Pooja",
      duration: "2-3 Hours",
      rating: 4.9,
      reviews: 3421,
      bookings: "8000+",
      verified: true,
      badge: "🥇 Most Booked",
      price: "₹2,999",
    },
    {
      id: 2,
      rank: 2,
      name: "Satyanarayan Katha",
      image: logo,
      specialty: "Lord Vishnu Pooja",
      duration: "3-4 Hours",
      rating: 4.8,
      reviews: 2789,
      bookings: "6500+",
      verified: true,
      badge: "🥈 Trending",
      price: "₹1,999",
    },
    {
      id: 3,
      rank: 3,
      name: "Lakshmi Pooja",
      image: logo,
      specialty: "Goddess Lakshmi",
      duration: "1-2 Hours",
      rating: 4.8,
      reviews: 2134,
      bookings: "5200+",
      verified: true,
      badge: "🥉 Popular",
      price: "₹1,499",
    },
  ],
  seller: [
    {
      id: 1,
      rank: 1,
      name: "Tirupati Laddu",
      image: logo,
      specialty: "Sacred Prasadam",
      temple: "Tirumala Temple",
      rating: 4.9,
      reviews: 4521,
      sold: "15000+",
      verified: true,
      badge: "🥇 Bestseller",
      price: "₹250",
    },
    {
      id: 2,
      rank: 2,
      name: "Complete Pooja Kit",
      image: logo,
      specialty: "All-in-One Kit",
      temple: "Authentic Items",
      rating: 4.8,
      reviews: 3234,
      sold: "10000+",
      verified: true,
      badge: "🥈 Top Choice",
      price: "₹799",
    },
    {
      id: 3,
      rank: 3,
      name: "Ganges Holy Water",
      image: logo,
      specialty: "Ganga Jal",
      temple: "Haridwar",
      rating: 4.7,
      reviews: 2876,
      sold: "8500+",
      verified: true,
      badge: "🥉 Fast Moving",
      price: "₹150",
    },
  ],
  volunteer: [
    {
      id: 1,
      rank: 1,
      name: "Priya Deshmukh",
      image: logo,
      specialty: "Event Organizer",
      since: "2020",
      rating: 5.0,
      reviews: 456,
      hours: "1200+",
      verified: true,
      badge: "🥇 Star Volunteer",
      events: "150+",
    },
    {
      id: 2,
      rank: 2,
      name: "Ramesh Patel",
      image: logo,
      specialty: "Temple Services",
      since: "2021",
      rating: 4.9,
      reviews: 389,
      hours: "950+",
      verified: true,
      badge: "🥈 Dedicated",
      events: "120+",
    },
    {
      id: 3,
      rank: 3,
      name: "Kavita Singh",
      image: logo,
      specialty: "Community Support",
      since: "2021",
      rating: 4.8,
      reviews: 312,
      hours: "780+",
      verified: true,
      badge: "🥉 Rising Star",
      events: "95+",
    },
  ],
};

type Category = "poojari" | "pooja" | "seller" | "volunteer";

const FeaturedExcellence = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("poojari");
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const today = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = dayNames[today.getDay()];

  const categories = [
    { id: "poojari" as Category, label: "Best Poojaris", icon: "🔱", color: "from-orange-500 to-amber-600" },
    { id: "pooja" as Category, label: "Best Poojas", icon: "🪔", color: "from-rose-500 to-pink-600" },
    { id: "seller" as Category, label: "Bestsellers", icon: "📦", color: "from-emerald-500 to-teal-600" },
    { id: "volunteer" as Category, label: "Star Volunteers", icon: "⭐", color: "from-purple-500 to-indigo-600" },
  ];

  const currentChampions = championsData[activeCategory];

  const handleCategoryChange = (category: Category) => {
    if (category === activeCategory) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveCategory(category);
      setIsAnimating(false);
    }, 300);
  };

  // Medal colors based on rank
  const getMedalGradient = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-400 via-yellow-300 to-amber-500"; // Gold
      case 2:
        return "from-gray-300 via-gray-200 to-gray-400"; // Silver
      case 3:
        return "from-orange-400 via-amber-600 to-orange-700"; // Bronze
      default:
        return "from-gray-200 to-gray-300";
    }
  };

  // Podium height based on rank
  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1:
        return "md:h-72 lg:h-80"; // Tallest - Center
      case 2:
        return "md:h-56 lg:h-64"; // Medium - Left
      case 3:
        return "md:h-56 lg:h-64"; // Same as #2 - Right
      default:
        return "md:h-40";
    }
  };

  return (
    <section className="pt-5 pb-12 md:pt-10 md:pb-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 left-10 w-64 h-64 bg-marigold rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-10 right-10 w-64 h-64 bg-sacred-red rounded-full blur-3xl" 
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-marigold/20 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Serve with Devotion Badge - Like reference design */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-spiritual-green"></div>
            <span className="inline-flex items-center gap-2 text-spiritual-green text-xs md:text-sm font-bold tracking-wider uppercase px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-spiritual-green/10 via-spiritual-green/20 to-spiritual-green/10 border border-spiritual-green/30">
              <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-spiritual-green animate-pulse" />
              SERVE WITH DEVOTION
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-spiritual-green"></div>
          </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-[#8D0303] via-[#FEB703] to-[#8D0303] bg-clip-text text-transparent">
              Champions of Excellence
            </span>
            <motion.span
              className="inline-block ml-3"
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🏆
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto"
          >
            Handpicked by <span className="font-bold text-marigold">10,000+</span> devotees - Our top performers across all categories
            <motion.span 
              className="inline-block ml-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ✨
            </motion.span>
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="overflow-x-auto hide-scrollbar mb-12 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex md:flex-wrap justify-start md:justify-center gap-3 min-w-max md:min-w-0">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleCategoryChange(category.id)}
              className={`relative group px-6 py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 overflow-hidden ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-spiritual-green to-spiritual-green/90 text-white shadow-lg scale-105"
                  : "bg-card border-2 border-border text-muted-foreground hover:border-marigold/50 hover:text-foreground hover:scale-105"
              }`}
            >
              {/* Shine effect on active tab */}
              {activeCategory === category.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: [-200, 200] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              )}
              
              <span className="flex items-center gap-2 relative z-10">
                <motion.span 
                  className="text-xl"
                  animate={activeCategory === category.id ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {category.icon}
                </motion.span>
                <span>{category.label}</span>
                {activeCategory === category.id && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center justify-center w-5 h-5 bg-white/30 rounded-full"
                  >
                    <Zap className="h-3 w-3" />
                  </motion.span>
                )}
              </span>
            </motion.button>
          ))}
          </div>
        </div>

        {/* Champions Podium */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            {/* Desktop Podium Layout */}
            <div className="hidden md:flex items-end justify-center gap-6 mb-12">
              {/* Rank #2 - Left (Silver) */}
              <ChampionCard
                champion={currentChampions[1]}
                category={activeCategory}
                delay={0.2}
                podiumHeight={getPodiumHeight(2)}
                medalGradient={getMedalGradient(2)}
              />

              {/* Rank #1 - Center (Gold) */}
              <ChampionCard
                champion={currentChampions[0]}
                category={activeCategory}
                delay={0.1}
                podiumHeight={getPodiumHeight(1)}
                medalGradient={getMedalGradient(1)}
                isWinner
              />

              {/* Rank #3 - Right (Bronze) */}
              <ChampionCard
                champion={currentChampions[2]}
                category={activeCategory}
                delay={0.3}
                podiumHeight={getPodiumHeight(3)}
                medalGradient={getMedalGradient(3)}
              />
            </div>

            {/* Mobile Layout - #1 Top, #2 and #3 Side by Side */}
            <div className="md:hidden space-y-4">
              {/* Winner Card - Full Width */}
              <ChampionCardMobile
                key={currentChampions[0].id}
                champion={currentChampions[0]}
                category={activeCategory}
                delay={0}
                medalGradient={getMedalGradient(currentChampions[0].rank)}
              />
              
              {/* Second and Third Cards - Side by Side */}
              <div className="grid grid-cols-2 gap-3">
                <ChampionCardMobile
                  key={currentChampions[1].id}
                  champion={currentChampions[1]}
                  category={activeCategory}
                  delay={0.1}
                  medalGradient={getMedalGradient(currentChampions[1].rank)}
                />
                <ChampionCardMobile
                  key={currentChampions[2].id}
                  champion={currentChampions[2]}
                  category={activeCategory}
                  delay={0.2}
                  medalGradient={getMedalGradient(currentChampions[2].rank)}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="flex flex-col items-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-marigold/50 text-foreground hover:bg-marigold hover:text-[#8D0303] hover:border-marigold transition-all duration-300 group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-marigold/20 to-transparent"
                animate={{ x: [-200, 200] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <span>View All {categories.find(c => c.id === activeCategory)?.label}</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Desktop Champion Card Component
const ChampionCard = ({
  champion,
  category,
  delay,
  podiumHeight,
  medalGradient,
  isWinner = false,
}: {
  champion: any;
  category: Category;
  delay: number;
  podiumHeight: string;
  medalGradient: string;
  isWinner?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative group ${isWinner ? "scale-110 z-10" : ""}`}
    >
      {/* Glowing Effect on Hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -inset-2 bg-gradient-to-r from-marigold/20 to-sacred-red/20 rounded-3xl blur-xl"
        />
      )}

      {/* Card Container */}
      <div className={`${podiumHeight} w-64 bg-card border-2 border-border rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative`}>
        {/* Trending Badge for Winner */}
        {isWinner && (
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ delay: delay + 0.7, type: "spring" }}
            className="absolute top-12 left-0 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-r-full flex items-center gap-1 z-10 shadow-lg"
          >
            <Flame className="h-3 w-3" />
            TRENDING
          </motion.div>
        )}

        {/* Medal Badge with Pulse */}
        <motion.div 
          className="absolute top-4 right-4 z-10"
          animate={isWinner ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${medalGradient} flex items-center justify-center shadow-lg border-2 border-white transform rotate-12 group-hover:rotate-0 transition-transform duration-300`}>
            <span className="text-2xl font-bold text-white drop-shadow">
              {champion.rank}
            </span>
          </div>
        </motion.div>

        {/* Content */}
        <div className="p-6 h-full flex flex-col">
          {/* Image with Hover Effect */}
          <div className="relative mb-4">
            <motion.div 
              className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-marigold/30 shadow-lg relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={champion.image}
                alt={champion.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {champion.verified && (
              <motion.div 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: delay + 0.3, type: "spring", bounce: 0.5 }}
              >
                <CheckCircle2 className="h-6 w-6 text-green-500 fill-white bg-white rounded-full" />
              </motion.div>
            )}
          </div>

          {/* Info */}
          <div className="text-center flex-1">
            <h3 className="font-heading font-bold text-lg mb-1 text-foreground line-clamp-2">
              {champion.name}
            </h3>
            <p className="text-xs text-muted-foreground mb-2 flex items-center justify-center gap-1">
              {category === "poojari" && <MapPin className="h-3 w-3" />}
              {champion.specialty}
            </p>

            {/* Badge with Animation */}
            <motion.div 
              className="inline-block bg-gradient-to-r from-marigold/20 to-sacred-red/20 rounded-full px-3 py-1 mb-3"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xs font-semibold text-foreground">{champion.badge}</span>
            </motion.div>

            {/* Stats with Icons */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: delay + 0.1 * i }}
                  >
                    <Star className={`h-4 w-4 ${i < Math.floor(champion.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  </motion.div>
                ))}
                <span className="text-sm font-bold text-foreground ml-1">{champion.rating}</span>
                <span className="text-xs text-muted-foreground">({champion.reviews})</span>
              </div>

              {category === "poojari" && (
                <motion.div 
                  className="text-xs text-muted-foreground bg-card-foreground/5 rounded-lg px-2 py-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <Users className="h-3 w-3 inline mr-1" />
                  {champion.bookings} bookings • {champion.experience}
                </motion.div>
              )}

              {category === "pooja" && (
                <p className="text-xs text-muted-foreground bg-card-foreground/5 rounded-lg px-2 py-1">
                  <Clock className="h-3 w-3 inline mr-1" />
                  {champion.duration}
                </p>
              )}

              {category === "seller" && (
                <p className="text-xs text-muted-foreground bg-card-foreground/5 rounded-lg px-2 py-1">
                  <ShoppingBag className="h-3 w-3 inline mr-1" />
                  {champion.sold} sold • {champion.temple}
                </p>
              )}

              {category === "volunteer" && (
                <p className="text-xs text-muted-foreground bg-card-foreground/5 rounded-lg px-2 py-1">
                  <Heart className="h-3 w-3 inline mr-1 text-red-500" />
                  {champion.hours} hours • {champion.events} events
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Podium Base with Gradient */}
      <motion.div 
        className={`h-4 bg-gradient-to-br ${medalGradient} rounded-b-lg border-x-2 border-b-2 border-border mx-4 relative overflow-hidden`}
        whileHover={{ height: 20 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: [-100, 100] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
};

// Mobile Champion Card Component
const ChampionCardMobile = ({
  champion,
  category,
  delay,
  medalGradient,
}: {
  champion: any;
  category: Category;
  delay: number;
  medalGradient: string;
}) => {
  const isWinner = champion.rank === 1;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className="bg-card border-2 border-border rounded-2xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
    >
      {/* Animated Background Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-marigold/5 via-transparent to-sacred-red/5"
        animate={{ x: [-100, 100] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Rank Badge - Top Right with Pulse */}
      <motion.div 
        className="absolute top-2 right-2 z-10"
        animate={isWinner ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${medalGradient} flex items-center justify-center shadow-lg border-2 border-white`}>
          <span className="text-sm font-bold text-white drop-shadow">
            {champion.rank}
          </span>
        </div>
      </motion.div>

      {/* Trending Badge for #1 - Only on full width card */}
      {isWinner && (
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="absolute top-12 left-0 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-r-full flex items-center gap-1 z-20"
        >
          <Flame className="h-3 w-3" />
          HOT
        </motion.div>
      )}

      <div className={`${isWinner ? 'flex gap-3' : 'flex flex-col items-center text-center'} relative z-10`}>
        {/* Image with Enhanced Effects */}
        <div className="relative flex-shrink-0">
          <motion.div 
            className={`${isWinner ? 'w-20 h-20' : 'w-16 h-16'} rounded-xl overflow-hidden border-2 border-marigold/30 shadow-md`}
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <img
              src={champion.image}
              alt={champion.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          {champion.verified && (
            <motion.div 
              className="absolute -bottom-1 -right-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.2, type: "spring", bounce: 0.5 }}
            >
              <CheckCircle2 className={`${isWinner ? 'h-5 w-5' : 'h-4 w-4'} text-green-500 fill-white bg-white rounded-full`} />
            </motion.div>
          )}
        </div>

        {/* Info */}
        <div className={`flex-1 ${!isWinner && 'mt-2'}`}>
          <h3 className={`font-heading font-bold ${isWinner ? 'text-base' : 'text-sm'} mb-1 text-foreground line-clamp-1`}>
            {champion.name}
          </h3>
          <p className={`text-[10px] text-muted-foreground mb-1 ${isWinner ? 'flex items-center gap-1' : 'line-clamp-1'}`}>
            {category === "poojari" && isWinner && <MapPin className="h-3 w-3" />}
            {champion.specialty}
          </p>

          {/* Badge with Glow */}
          <motion.div 
            className="inline-block bg-gradient-to-r from-marigold/20 to-sacred-red/20 rounded-full px-2 py-0.5 mb-1 border border-marigold/30"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-[9px] font-semibold text-foreground">{champion.badge}</span>
          </motion.div>

          {/* Stats with Enhanced Styling */}
          <div className={`flex ${isWinner ? 'items-center gap-2' : 'flex-col gap-1'} text-xs`}>
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-md">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-foreground text-[10px]">{champion.rating}</span>
            </div>

            {category === "poojari" && (
              <span className="text-muted-foreground bg-card-foreground/5 px-2 py-0.5 rounded-md text-[10px] truncate">
                <Users className="h-3 w-3 inline mr-1" />
                {isWinner ? champion.bookings : champion.bookings.split('+')[0]}
              </span>
            )}
            {category === "pooja" && (
              <span className="text-muted-foreground bg-card-foreground/5 px-2 py-0.5 rounded-md text-[10px]">
                <Clock className="h-3 w-3 inline mr-1" />
                {champion.duration}
              </span>
            )}
            {category === "seller" && (
              <span className="text-muted-foreground bg-card-foreground/5 px-2 py-0.5 rounded-md text-[10px] truncate">
                <ShoppingBag className="h-3 w-3 inline mr-1" />
                {isWinner ? champion.sold : champion.sold.split('+')[0]}
              </span>
            )}
            {category === "volunteer" && (
              <span className="text-muted-foreground bg-card-foreground/5 px-2 py-0.5 rounded-md text-[10px] truncate">
                <Heart className="h-3 w-3 inline mr-1 text-red-500" />
                {isWinner ? champion.hours : champion.hours.split('+')[0]}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedExcellence;
