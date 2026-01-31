import { useState } from "react";
import { Search, Filter, Heart, TrendingUp } from "lucide-react";
import VolunteerCard from "./VolunteerCard";

const VolunteerOpportunities = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const opportunities = [
        {
            id: 1,
            title: "Temple Morning Service Volunteer",
            description: "Help with daily morning rituals, flower decoration, and assisting devotees during darshan hours. Perfect for early risers who want to serve the divine.",
            temple: {
                name: "Sri Venkateswara Temple",
                location: "Hyderabad",
                image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop&crop=faces",
            },
            category: "Temple Service",
            duration: "3 months",
            timeCommitment: "2 hours/day",
            volunteersNeeded: 10,
            volunteersEnrolled: 7,
            skills: ["Punctuality", "Devotion", "Physical Fitness"],
            applicationDeadline: "March 15, 2025",
            status: "Open" as const,
        },
        {
            id: 2,
            title: "Festival Event Coordinator",
            description: "Organize and manage upcoming Maha Shivaratri celebrations. Coordinate with vendors, manage volunteers, and ensure smooth event execution.",
            temple: {
                name: "Shiva Mandir",
                location: "Bangalore",
                image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop&crop=faces",
            },
            category: "Event Management",
            duration: "1 month",
            timeCommitment: "10 hours/week",
            volunteersNeeded: 5,
            volunteersEnrolled: 3,
            skills: ["Event Planning", "Leadership", "Communication"],
            applicationDeadline: "March 1, 2025",
            status: "Open" as const,
        },
        {
            id: 3,
            title: "Sanskrit Teaching Assistant",
            description: "Assist in teaching basic Sanskrit shlokas and mantras to children aged 6-12. Help create a fun and engaging learning environment.",
            temple: {
                name: "Lakshmi Narayana Temple",
                location: "Chennai",
                image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop&crop=faces",
            },
            category: "Spiritual Educator",
            duration: "6 months",
            timeCommitment: "3 hours/week",
            volunteersNeeded: 8,
            volunteersEnrolled: 8,
            skills: ["Sanskrit Knowledge", "Teaching", "Patience"],
            applicationDeadline: "February 28, 2025",
            status: "Filled" as const,
        },
        {
            id: 4,
            title: "Prasadam Distribution Volunteer",
            description: "Help prepare and distribute prasadam to devotees during special occasions and festivals. Maintain hygiene and serve with devotion.",
            temple: {
                name: "Hanuman Temple",
                location: "Mumbai",
                image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop&crop=faces",
            },
            category: "Prasadam Distribution",
            duration: "Ongoing",
            timeCommitment: "4 hours/week",
            volunteersNeeded: 15,
            volunteersEnrolled: 12,
            skills: ["Food Handling", "Hygiene Awareness", "Service Mindset"],
            applicationDeadline: "March 20, 2025",
            status: "Open" as const,
        },
        {
            id: 5,
            title: "Digital Content Creator",
            description: "Create engaging social media content, manage temple's online presence, and help spread spiritual knowledge through digital platforms.",
            temple: {
                name: "Ganesh Temple",
                location: "Pune",
                image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop&crop=faces",
            },
            category: "Other",
            duration: "6 months",
            timeCommitment: "5 hours/week",
            volunteersNeeded: 3,
            volunteersEnrolled: 1,
            skills: ["Social Media", "Content Creation", "Photography"],
            applicationDeadline: "March 10, 2025",
            status: "Open" as const,
        },
        {
            id: 6,
            title: "Elderly Care & Support",
            description: "Assist elderly devotees during temple visits, help them with mobility, and ensure they have a comfortable darshan experience.",
            temple: {
                name: "Durga Temple",
                location: "Kolkata",
                image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop&crop=faces",
            },
            category: "Temple Service",
            duration: "Ongoing",
            timeCommitment: "3 hours/week",
            volunteersNeeded: 6,
            volunteersEnrolled: 4,
            skills: ["Empathy", "Patience", "Physical Fitness"],
            applicationDeadline: "March 25, 2025",
            status: "Open" as const,
        },
    ];

    const categories = ["All", "Temple Service", "Event Management", "Spiritual Educator", "Prasadam Distribution", "Other"];

    const filteredOpportunities = opportunities.filter((opp) => {
        const matchesSearch =
            opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            opp.temple.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || opp.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <section className="py-16 md:py-20 bg-background">
            <div className="container px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="h-px w-8 bg-gradient-to-r from-transparent to-spiritual-green"></div>
                        <span className="inline-flex items-center gap-2 text-spiritual-green text-sm font-bold tracking-wider uppercase px-4 py-2 rounded-full bg-gradient-to-r from-spiritual-green/10 via-spiritual-green/20 to-spiritual-green/10 border border-spiritual-green/30">
                            <Heart className="w-4 h-4 fill-spiritual-green animate-pulse" />
                            Serve with Devotion
                        </span>
                        <div className="h-px w-8 bg-gradient-to-l from-transparent to-spiritual-green"></div>
                    </div>
                    <h2 className="font-heading text-4xl md:text-6xl font-bold text-maroon-dark mb-6 drop-shadow-sm">
                        Volunteer Opportunities
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                        Join our community of dedicated volunteers and make a meaningful impact through temple service
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
                    {[
                        { label: "Active Opportunities", value: "12+", icon: TrendingUp },
                        { label: "Volunteers Needed", value: "50+", icon: Heart },
                        { label: "Temples Participating", value: "25+", icon: Filter },
                        { label: "Hours Contributed", value: "1000+", icon: Search },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-marigold via-marigold-light to-marigold rounded-xl p-6 text-center hover:shadow-lg transition-shadow shadow-md"
                        >
                            <stat.icon className="h-8 w-8 text-maroon-dark mx-auto mb-3" />
                            <p className="text-3xl md:text-4xl font-heading font-bold text-maroon-dark">{stat.value}</p>
                            <p className="text-sm text-maroon mt-2 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Search and Filter */}
                <div className="mb-8 space-y-4">
                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search opportunities by title, temple, or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-marigold focus:border-transparent transition-all shadow-sm"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                    ? "bg-marigold text-primary-foreground shadow-md"
                                    : "bg-card border border-border text-foreground hover:bg-muted"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        Showing <span className="font-semibold text-foreground">{filteredOpportunities.length}</span> opportunities
                    </p>
                </div>

                {/* Opportunities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {filteredOpportunities.map((opportunity) => (
                        <VolunteerCard
                            key={opportunity.id}
                            opportunity={opportunity}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredOpportunities.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                            No opportunities found
                        </h3>
                        <p className="text-muted-foreground">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                )}

                {/* Call to Action */}
                <div className="mt-12 text-center bg-gradient-to-r from-maroon/10 to-marigold/10 rounded-2xl p-8 border border-marigold/20">
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                        Want to Post a Volunteer Opportunity?
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        If you're a temple administrator and want to post volunteer opportunities, please contact our team.
                    </p>
                    <button className="btn-primary px-8 py-3">
                        Contact Admin Team
                    </button>
                </div>
            </div>
        </section>
    );
};

export default VolunteerOpportunities;
