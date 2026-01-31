import { Sun, Moon, Calendar, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const PanchangamSection = () => {
    const today = new Date();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const englishDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const dayName = dayNames[today.getDay()];

    const dayRecommendations: Record<string, { deity: string; pooja: string; icon: string; teluguDeity: string; teluguPooja: string }> = {
        Sunday: { deity: "Surya Bhagavan", pooja: "Surya Namaskar Pooja", icon: "☀️", teluguDeity: "సూర్య భగవాన్", teluguPooja: "సూర్య నమస్కార పూజ" },
        Monday: { deity: "Lord Shiva", pooja: "Rudrabhishekam", icon: "🔱", teluguDeity: "శివుడు", teluguPooja: "రుద్రాభిషేకం" },
        Tuesday: { deity: "Lord Hanuman", pooja: "Hanuman Chalisa Path", icon: "🙏", teluguDeity: "హనుమాన్", teluguPooja: "హనుమాన్ చాలీసా పాఠం" },
        Wednesday: { deity: "Lord Ganesha", pooja: "Ganapati Homam", icon: "🪔", teluguDeity: "గణేశుడు", teluguPooja: "గణపతి హోమం" },
        Thursday: { deity: "Lord Vishnu", pooja: "Vishnu Sahasranama", icon: "🔯", teluguDeity: "విష్ణువు", teluguPooja: "విష్ణు సహస్రనామం" },
        Friday: { deity: "Goddess Lakshmi", pooja: "Lakshmi Pooja", icon: "🌸", teluguDeity: "లక్ష్మీ దేవి", teluguPooja: "లక్ష్మీ పూజ" },
        Saturday: { deity: "Lord Shani", pooja: "Shani Shanti Pooja", icon: "🪐", teluguDeity: "శని దేవుడు", teluguPooja: "శని శాంతి పూజ" },
    };

    const recommendation = dayRecommendations[dayName];

    const panchangamData = {
        tithi: "Shukla Paksha Dwadashi",
        nakshatra: "Uttara Bhadrapada",
        yoga: "Shubha",
        karana: "Bava",
        rahu: "07:30 - 09:00, 14:00 - 15:30",
        sunrise: "06:42",
        sunset: "17:43",
        auspiciousTime: "16:00 - 18:30",
    };

    return (
        <section className="relative bg-gradient-to-br from-[#FEB703] via-[#FFCB05] to-[#FEB703] py-6 md:py-8 overflow-hidden rounded-2xl lg:rounded-3xl mt-6 shadow-xl">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#8D0303]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#8D0303]/5 rounded-full blur-3xl" />

            <div className="relative container px-4 md:px-8">
                {/* Header */}
                <div className="text-center mb-6">
                    <p className="text-[#8D0303] text-sm font-semibold mb-1">Today's Panchangam</p>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#8D0303]">Daily Panchangam</h2>
                    <p className="text-[#8D0303]/70 text-sm mt-1 font-medium">Daily devotional information and auspicious timings</p>
                </div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-[1fr,auto] gap-4 md:gap-6">
                    {/* Left Side - Panchangam Details */}
                    <div className="space-y-4">
                        {/* Date Card */}
                        <div className="bg-white border-2 border-[#8D0303]/10 rounded-xl p-4 shadow-md">
                            <div className="flex items-center gap-4">
                                <div className="bg-[#8D0303]/10 rounded-lg p-3 flex items-center justify-center min-w-[70px]">
                                    <div className="text-center">
                                        <Calendar className="h-5 w-5 text-[#8D0303] mx-auto mb-1" />
                                        <p className="text-2xl font-bold text-[#8D0303]">{today.getDate()}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[#8D0303]/70 text-sm font-medium">{englishDays[today.getDay()]}</p>
                                    <p className="text-[#8D0303] font-semibold">{monthNames[today.getMonth()]} {today.getFullYear()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Panchangam Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <PanchangamItem icon={<Calendar className="h-4 w-4" />} label="Tithi" value={panchangamData.tithi} />
                            <PanchangamItem icon={<Star className="h-4 w-4" />} label="Nakshatra" value={panchangamData.nakshatra} />
                            <PanchangamItem icon={<Sun className="h-4 w-4" />} label="Yoga" value={panchangamData.yoga} />
                            <PanchangamItem icon={<Moon className="h-4 w-4" />} label="Karana" value={panchangamData.karana} />
                        </div>

                        {/* Time Sections */}
                        <div className="grid md:grid-cols-2 gap-3">
                            {/* Rahu Kalam */}
                            <div className="bg-white border-2 border-[#8D0303]/30 rounded-lg p-4 shadow-md">
                                <div className="flex items-center gap-2 text-[#8D0303] font-semibold mb-2 text-sm">
                                    <Clock className="h-5 w-5" />
                                    <span>Rahu Kalam</span>
                                </div>
                                <p className="text-[#8D0303] text-sm font-medium">{panchangamData.rahu}</p>
                            </div>

                            {/* Auspicious Time */}
                            <div className="bg-white border-2 border-[#00BD40]/40 rounded-lg p-4 shadow-md">
                                <div className="flex items-center gap-2 text-[#00BD40] font-semibold mb-2 text-sm">
                                    <Clock className="h-5 w-5" />
                                    <span>Shubh Muhurat</span>
                                </div>
                                <p className="text-[#8D0303] text-sm font-medium">{panchangamData.auspiciousTime}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Today's Event */}
                    <div className="md:w-[280px]">
                        <div className="bg-white border-2 border-[#8D0303]/20 rounded-xl p-4 h-full shadow-lg">
                            <div className="flex items-center gap-2 mb-3">
                                <Star className="h-4 w-4 text-[#8D0303] fill-[#8D0303]" />
                                <span className="font-semibold text-[#8D0303] text-sm">Today's Event</span>
                            </div>

                            <div className="text-center mb-4">
                                <span className="text-5xl">{recommendation.icon}</span>
                                <p className="text-[#8D0303] font-semibold mt-2">{recommendation.deity}</p>
                            </div>

                            <div className="bg-[#8D0303]/10 rounded-lg p-3 mb-3 border border-[#8D0303]/20">
                                <p className="text-[#8D0303] font-heading font-bold text-center">{recommendation.pooja}</p>
                                <p className="text-[#8D0303]/70 text-xs text-center mt-1 font-medium">Recommended for today</p>
                            </div>

                            <Button variant="sacred" size="sm" className="w-full group bg-[#00BD40] hover:bg-[#00BD40]/90 text-white border-none shadow-md hover:shadow-lg hover:shadow-[#00BD40]/30">
                                Book Now
                                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const PanchangamItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="bg-white border border-[#8D0303]/10 rounded-lg p-3 shadow-md">
        <div className="flex items-center gap-1.5 text-[#8D0303]/70 text-xs font-medium mb-1.5">
            {icon}
            <span>{label}</span>
        </div>
        <p className="text-sm font-semibold text-[#8D0303]">{value}</p>
    </div>
);

export default PanchangamSection;
