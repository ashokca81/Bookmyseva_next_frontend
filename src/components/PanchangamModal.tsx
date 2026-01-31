import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sun, Moon, Calendar, Clock, Star } from "lucide-react";

interface PanchangamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PanchangamModal = ({ open, onOpenChange }: PanchangamModalProps) => {
  const today = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const panchangamData = {
    tithi: "Shukla Paksha Dwadashi",
    nakshatra: "Uttara Bhadrapada",
    yoga: "Shubha",
    karana: "Bava",
    rahu: "10:30 AM - 12:00 PM",
    sunrise: "6:15 AM",
    sunset: "6:45 PM",
    moonrise: "4:30 PM",
    auspiciousTime: "9:00 AM - 10:30 AM, 2:00 PM - 3:30 PM",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-[#FEB703] via-[#FFCB05] to-[#FEB703] border-maroon/40 border-2 animate-slide-up shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-heading text-2xl text-[#8D0303]">
            <Sun className="h-6 w-6 text-[#8D0303]" />
            Today's Panchangam
          </DialogTitle>
          <DialogDescription className="sr-only">
            Daily panchangam details including tithi, nakshatra, and auspicious timings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Date Display - White Card */}
          <div className="text-center p-4 bg-white rounded-xl shadow-md border border-[#8D0303]/10">
            <p className="text-sm text-[#8D0303]/70 font-medium">{dayNames[today.getDay()]}</p>
            <p className="text-4xl font-heading font-bold text-[#8D0303]">{today.getDate()}</p>
            <p className="text-sm text-[#8D0303]/70 font-medium">
              {monthNames[today.getMonth()]} {today.getFullYear()}
            </p>
          </div>

          {/* Panchangam Details - White Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            <PanchangamItem icon={<Calendar className="h-4 w-4" />} label="Tithi" value={panchangamData.tithi} />
            <PanchangamItem icon={<Star className="h-4 w-4" />} label="Nakshatra" value={panchangamData.nakshatra} />
            <PanchangamItem icon={<Sun className="h-4 w-4" />} label="Sunrise" value={panchangamData.sunrise} />
            <PanchangamItem icon={<Moon className="h-4 w-4" />} label="Sunset" value={panchangamData.sunset} />
          </div>

          {/* Auspicious Time - White Card */}
          <div className="p-4 bg-white border-2 border-[#00BD40]/40 rounded-lg shadow-md">
            <div className="flex items-center gap-2 text-[#00BD40] font-semibold mb-2">
              <Clock className="h-5 w-5" />
              <span className="text-base">Auspicious Time (Shubh Muhurat)</span>
            </div>
            <p className="text-sm text-[#8D0303] font-medium">{panchangamData.auspiciousTime}</p>
          </div>

          {/* Rahu Kalam Warning - White Card */}
          <div className="p-4 bg-white border-2 border-[#8D0303]/30 rounded-lg shadow-md">
            <div className="flex items-center gap-2 text-[#8D0303] font-semibold mb-2">
              <Clock className="h-5 w-5" />
              <span className="text-base">Rahu Kalam (Avoid)</span>
            </div>
            <p className="text-sm text-[#8D0303] font-medium">{panchangamData.rahu}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PanchangamItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="p-3 bg-white rounded-lg shadow-md border border-[#8D0303]/10">
    <div className="flex items-center gap-1.5 text-[#8D0303]/70 text-xs font-medium mb-1.5">
      {icon}
      <span>{label}</span>
    </div>
    <p className="text-sm font-semibold text-[#8D0303]">{value}</p>
  </div>
);

export default PanchangamModal;
