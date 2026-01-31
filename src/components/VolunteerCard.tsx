import { MapPin, Clock, Users, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VolunteerCardProps {
    opportunity: {
        id: number;
        title: string;
        temple: {
            name: string;
            location: string;
            image: string;
        };
        category: string;
        timeCommitment: string;
        volunteersNeeded: number;
        volunteersEnrolled: number;
        applicationDeadline: string;
        status: "Open" | "Filled" | "Closed";
    };
}

const VolunteerCard = ({ opportunity }: VolunteerCardProps) => {
    const spotsLeft = opportunity.volunteersNeeded - opportunity.volunteersEnrolled;
    const percentageFilled = (opportunity.volunteersEnrolled / opportunity.volunteersNeeded) * 100;

    const getStatusColor = () => {
        switch (opportunity.status) {
            case "Open":
                return "bg-[#00BD40]/10 text-[#00BD40] border-[#00BD40]/30";
            case "Filled":
                return "bg-orange-500/10 text-orange-600 border-orange-500/30";
            case "Closed":
                return "bg-red-500/10 text-red-600 border-red-500/30";
            default:
                return "bg-gray-500/10 text-gray-600 border-gray-500/30";
        }
    };

    return (
        <div
            className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-marigold/50 flex flex-col h-full"
        >
            {/* Temple Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={opportunity.temple.image}
                    alt={opportunity.temple.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${getStatusColor()}`}>
                        {opportunity.status}
                    </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className="bg-marigold/90 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                        {opportunity.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="font-heading text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-marigold transition-colors leading-tight">
                    {opportunity.title}
                </h3>

                {/* Temple Info */}
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="truncate">{opportunity.temple.name}, {opportunity.temple.location}</span>
                </div>

                {/* Quick Info */}
                <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 text-marigold" />
                            <span>{opportunity.timeCommitment}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4 text-marigold" />
                            <span className="text-xs">{opportunity.applicationDeadline}</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                            <span className="text-muted-foreground flex items-center gap-1">
                                <Users className="h-3.5 w-3.5" />
                                Volunteers
                            </span>
                            <span className="font-semibold text-foreground">
                                {opportunity.volunteersEnrolled}/{opportunity.volunteersNeeded}
                            </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-marigold to-marigold-light h-full transition-all duration-500 rounded-full"
                                style={{ width: `${Math.min(percentageFilled, 100)}%` }}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {spotsLeft > 0 ? `${spotsLeft} spots left` : "All spots filled"}
                        </p>
                    </div>
                </div>

                {/* Spacer to push button to bottom */}
                <div className="flex-grow"></div>

                {/* View Details Button */}
                <a
                    href="#"
                    className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg border border-marigold/30 text-foreground hover:bg-marigold hover:text-primary-foreground transition-all group/btn"
                >
                    View Details
                    <ChevronRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </a>
            </div>
        </div>
    );
};

export default VolunteerCard;
