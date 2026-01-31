import { X, MapPin, Clock, Calendar, Users, Award, CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VolunteerDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEnroll: () => void;
    opportunity: {
        id: number;
        title: string;
        description: string;
        temple: {
            name: string;
            location: string;
            image: string;
        };
        category: string;
        duration: string;
        timeCommitment: string;
        volunteersNeeded: number;
        volunteersEnrolled: number;
        skills: string[];
        applicationDeadline: string;
        status: "Open" | "Filled" | "Closed";
        responsibilities?: string[];
        requirements?: string[];
        benefits?: string[];
    } | null;
}

const VolunteerDetailModal = ({ isOpen, onClose, onEnroll, opportunity }: VolunteerDetailModalProps) => {
    if (!isOpen || !opportunity) return null;

    const spotsLeft = opportunity.volunteersNeeded - opportunity.volunteersEnrolled;
    const percentageFilled = (opportunity.volunteersEnrolled / opportunity.volunteersNeeded) * 100;

    const getStatusColor = () => {
        switch (opportunity.status) {
            case "Open":
                return "bg-[#00BD40] text-white";
            case "Filled":
                return "bg-orange-500 text-white";
            case "Closed":
                return "bg-red-500 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };

    // Default data if not provided
    const responsibilities = opportunity.responsibilities || [
        "Assist with daily temple activities",
        "Help coordinate events and ceremonies",
        "Support devotees during their visit",
        "Maintain cleanliness and organization"
    ];

    const requirements = opportunity.requirements || [
        "Must be 18 years or older",
        "Commitment to the specified duration",
        "Respectful attitude towards all devotees",
        "Punctuality and reliability"
    ];

    const benefits = opportunity.benefits || [
        "Spiritual growth and learning",
        "Community service experience",
        "Certificate of appreciation",
        "Networking with like-minded individuals"
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-card rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border animate-scale-in">
                {/* Header with Image */}
                <div className="relative h-64 md:h-80">
                    <img
                        src={opportunity.temple.image}
                        alt={opportunity.temple.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-sm z-10"
                    >
                        <X className="h-5 w-5 text-white" />
                    </button>

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor()} shadow-lg`}>
                            {opportunity.status}
                        </span>
                    </div>

                    {/* Title and Temple Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <span className="inline-block bg-marigold px-3 py-1.5 rounded-full text-xs font-semibold mb-3 text-primary-foreground">
                            {opportunity.category}
                        </span>
                        <h2 className="font-heading text-2xl md:text-4xl font-bold text-white mb-2">
                            {opportunity.title}
                        </h2>
                        <div className="flex items-center gap-2 text-white/90">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm md:text-base">{opportunity.temple.name}, {opportunity.temple.location}</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-muted/50 rounded-lg p-4 text-center">
                            <Clock className="h-5 w-5 text-marigold mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground mb-1">Time Commitment</p>
                            <p className="font-semibold text-foreground">{opportunity.timeCommitment}</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4 text-center">
                            <Calendar className="h-5 w-5 text-marigold mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground mb-1">Duration</p>
                            <p className="font-semibold text-foreground">{opportunity.duration}</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4 text-center">
                            <Users className="h-5 w-5 text-marigold mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground mb-1">Volunteers</p>
                            <p className="font-semibold text-foreground">{opportunity.volunteersEnrolled}/{opportunity.volunteersNeeded}</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4 text-center">
                            <Award className="h-5 w-5 text-marigold mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground mb-1">Deadline</p>
                            <p className="font-semibold text-foreground text-xs">{opportunity.applicationDeadline}</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8 p-4 bg-muted/30 rounded-lg border border-border">
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="font-medium text-foreground">Enrollment Progress</span>
                            <span className="font-semibold text-foreground">
                                {spotsLeft > 0 ? `${spotsLeft} spots remaining` : "All spots filled"}
                            </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-marigold to-marigold-light h-full transition-all duration-500 rounded-full"
                                style={{ width: `${Math.min(percentageFilled, 100)}%` }}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="font-heading text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-marigold" />
                            About This Opportunity
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {opportunity.description}
                        </p>
                    </div>

                    {/* Responsibilities */}
                    <div className="mb-8">
                        <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                            Responsibilities
                        </h3>
                        <ul className="space-y-2">
                            {responsibilities.map((item, index) => (
                                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                    <ChevronRight className="h-4 w-4 text-marigold mt-1 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Requirements */}
                    <div className="mb-8">
                        <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                            Requirements
                        </h3>
                        <ul className="space-y-2">
                            {requirements.map((item, index) => (
                                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                    <ChevronRight className="h-4 w-4 text-marigold mt-1 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Skills */}
                    {opportunity.skills.length > 0 && (
                        <div className="mb-8">
                            <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                                Preferred Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {opportunity.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="inline-block bg-maroon/10 text-maroon text-sm font-medium px-4 py-2 rounded-full border border-maroon/20"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Benefits */}
                    <div className="mb-8">
                        <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                            What You'll Gain
                        </h3>
                        <ul className="space-y-2">
                            {benefits.map((item, index) => (
                                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                    <CheckCircle className="h-4 w-4 text-[#00BD40] mt-1 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Close
                        </Button>
                        <Button
                            variant="sacred"
                            onClick={onEnroll}
                            disabled={opportunity.status !== "Open"}
                            className="flex-1 group bg-[#00BD40] hover:bg-[#00BD40]/90 text-white border-none shadow-md shadow-[#00BD40]/30 disabled:bg-gray-400 disabled:shadow-none"
                        >
                            <Users className="h-4 w-4 mr-2" />
                            {opportunity.status === "Open" ? "Enroll Now" : opportunity.status}
                            <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VolunteerDetailModal;
