import { Shield, Users, Award, Clock } from "lucide-react";

const trustBadges = [
  {
    icon: Shield,
    title: "Verified Poojaris",
    description: "All priests are verified with temple credentials",
  },
  {
    icon: Award,
    title: "Temple Certified",
    description: "Rituals follow authentic Agama Shastra",
  },
  {
    icon: Users,
    title: "10,000+ Happy Families",
    description: "Trusted by devotees across India",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "Prasadam & kits delivered fresh",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container px-4">
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div 
                  key={index} 
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-spiritual-green/20 to-spiritual-green/5 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7 text-spiritual-green" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                    {badge.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {badge.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
