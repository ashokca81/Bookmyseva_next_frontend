import { Calendar, ArrowRight, Clock, User, BookOpen } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The Significance of Maha Shivaratri",
    excerpt: "Discover the spiritual importance of Shivaratri and the rituals that make this night sacred. Learn about the ancient traditions and their modern relevance.",
    date: "Feb 20, 2025",
    readTime: "5 min read",
    category: "Festival",
    author: "Pandit Sharma",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop&crop=faces",
    featured: true,
  },
  {
    id: 2,
    title: "How to Perform Satyanarayan Pooja at Home",
    excerpt: "A complete guide to performing this auspicious pooja with proper mantras and vidhi...",
    date: "Feb 18, 2025",
    readTime: "8 min read",
    category: "Guide",
    author: "Dr. Priya Iyer",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop&crop=faces",
  },
  {
    id: 3,
    title: "Benefits of Reciting Vishnu Sahasranama",
    excerpt: "Learn about the 1000 names of Lord Vishnu and the blessings they bring...",
    date: "Feb 15, 2025",
    readTime: "6 min read",
    category: "Spirituality",
    author: "Swami Anand",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop&crop=faces",
  },
  {
    id: 4,
    title: "Ganesh Chaturthi: Celebration and Rituals",
    excerpt: "Explore the vibrant traditions of Ganesh Chaturthi and learn how to celebrate this auspicious festival with devotion...",
    date: "Feb 12, 2025",
    readTime: "7 min read",
    category: "Festival",
    author: "Pandit Sharma",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop&crop=faces",
  },
  {
    id: 5,
    title: "Complete Guide to Diwali Pooja Vidhi",
    excerpt: "Step-by-step instructions for performing Lakshmi Pooja during Diwali with proper mantras and offerings...",
    date: "Feb 10, 2025",
    readTime: "9 min read",
    category: "Guide",
    author: "Dr. Priya Iyer",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop&crop=faces",
  },
];

const BlogSection = () => {
  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  return (
    <section className="py-5 md:py-15 bg-muted/30">
      <div className="container px-4">
        {/* Section Header */}
        <div className="mb-5">
          {/* Divine Knowledge Badge - Mobile */}
          <div className="flex md:hidden items-center justify-center gap-2 mb-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-spiritual-green"></div>
            <span className="inline-flex items-center gap-2 text-spiritual-green text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-gradient-to-r from-spiritual-green/10 via-spiritual-green/20 to-spiritual-green/10 border border-spiritual-green/30">
              <BookOpen className="w-3.5 h-3.5 fill-spiritual-green animate-pulse" />
              Divine Knowledge
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-spiritual-green"></div>
          </div>

          {/* Title and Link Row */}
          <div className="flex flex-row items-center justify-between">
            <div className="text-left md:text-center">
              {/* Divine Knowledge Badge - Desktop */}
              <div className="hidden md:flex items-center justify-center gap-2 mb-2">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-spiritual-green"></div>
                <span className="inline-flex items-center gap-2 text-spiritual-green text-sm font-bold tracking-wider uppercase px-4 py-2 rounded-full bg-gradient-to-r from-spiritual-green/10 via-spiritual-green/20 to-spiritual-green/10 border border-spiritual-green/30">
                  <BookOpen className="w-4 h-4 fill-spiritual-green animate-pulse" />
                  Divine Knowledge
                </span>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-spiritual-green"></div>
              </div>
              <h2 className="font-heading text-2xl md:text-5xl font-bold text-maroon-dark md:mt-2">
                From Our Blog
              </h2>
            </div>
            <a
              href="/blog"
              className="inline-flex items-center text-spiritual-green font-medium hover:text-spiritual-green/80 transition-colors whitespace-nowrap group text-sm md:text-base"
            >
              View All Articles
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Blog Grid with Featured Post */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured Post - Spans 2 columns on desktop */}
          <article className="group relative md:col-span-2 lg:col-span-2 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow">
            {/* Large Image with Overlay */}
            <div className="relative h-80 md:h-96 overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <span className="inline-block bg-marigold px-3 py-1.5 rounded-full text-xs font-semibold mb-4 shadow-lg">
                  ⭐ {featuredPost.category}
                </span>

                <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight">
                  {featuredPost.title}
                </h3>

                <p className="text-white/90 text-sm md:text-base mb-4 line-clamp-2 max-w-2xl">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-4 text-sm text-white/80">
                  <span className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-marigold flex items-center justify-center text-primary-foreground font-semibold">
                      {featuredPost.author[0]}
                    </div>
                    {featuredPost.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {featuredPost.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {featuredPost.readTime}
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* Regular Posts */}
          {regularPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-border hover:border-marigold/50"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Category Badge */}
                <span className="absolute top-3 left-3 bg-marigold/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-heading text-xl font-bold mb-2 line-clamp-2 group-hover:text-marigold transition-colors leading-tight">
                  {post.title}
                </h3>

                <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Author & Meta */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-marigold/20 flex items-center justify-center text-marigold font-semibold">
                      {post.author[0]}
                    </div>
                    <span className="font-medium">{post.author}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Read More Link */}
                <div className="mt-4">
                  <span className="inline-flex items-center text-marigold font-medium text-sm group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
