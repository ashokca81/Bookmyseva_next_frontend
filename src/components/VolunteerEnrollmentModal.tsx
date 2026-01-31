import { useState } from "react";
import { X, User, Mail, Phone, Calendar, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VolunteerEnrollmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    opportunity: {
        id: number;
        title: string;
        temple: {
            name: string;
            location: string;
        };
    } | null;
}

const VolunteerEnrollmentModal = ({ isOpen, onClose, opportunity }: VolunteerEnrollmentModalProps) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        availability: [] as string[],
        skills: "",
        experience: "",
        motivation: "",
    });

    const availabilityOptions = [
        "Weekday Mornings",
        "Weekday Evenings",
        "Weekend Mornings",
        "Weekend Evenings",
        "Flexible",
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Submit to backend
        console.log("Enrollment submitted:", formData);
        alert("Application submitted successfully! You will receive a confirmation email soon.");
        onClose();
        setFormData({
            name: "",
            email: "",
            phone: "",
            availability: [],
            skills: "",
            experience: "",
            motivation: "",
        });
    };

    const toggleAvailability = (option: string) => {
        setFormData((prev) => ({
            ...prev,
            availability: prev.availability.includes(option)
                ? prev.availability.filter((a) => a !== option)
                : [...prev.availability, option],
        }));
    };

    if (!isOpen || !opportunity) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border animate-scale-in">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-maroon to-maroon-dark text-white p-6 rounded-t-2xl z-10">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <h2 className="font-heading text-2xl font-bold mb-2">Volunteer Enrollment</h2>
                    <p className="text-white/90 text-sm">
                        {opportunity.title} at {opportunity.temple.name}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Personal Information */}
                    <div>
                        <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <User className="h-5 w-5 text-marigold" />
                            Personal Information
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-marigold focus:border-transparent transition-all"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-marigold focus:border-transparent transition-all"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Phone Number *
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-marigold focus:border-transparent transition-all"
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Availability */}
                    <div>
                        <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-marigold" />
                            Availability *
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {availabilityOptions.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => toggleAvailability(option)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.availability.includes(option)
                                            ? "bg-marigold text-primary-foreground shadow-md"
                                            : "bg-muted text-foreground hover:bg-muted/80"
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Relevant Skills
                        </label>
                        <input
                            type="text"
                            value={formData.skills}
                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-marigold focus:border-transparent transition-all"
                            placeholder="e.g., Event Management, Teaching, Cooking"
                        />
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Previous Volunteer Experience
                        </label>
                        <textarea
                            value={formData.experience}
                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-marigold focus:border-transparent transition-all resize-none"
                            placeholder="Briefly describe any previous volunteer work..."
                        />
                    </div>

                    {/* Motivation */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-marigold" />
                            Why do you want to volunteer? *
                        </label>
                        <textarea
                            required
                            value={formData.motivation}
                            onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-marigold focus:border-transparent transition-all resize-none"
                            placeholder="Share your motivation for volunteering..."
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="sacred"
                            className="flex-1 group"
                        >
                            <Send className="h-4 w-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
                            Submit Application
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VolunteerEnrollmentModal;
