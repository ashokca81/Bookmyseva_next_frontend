import { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";

const FestivalCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Next festival - Makar Sankranti 2026
  const nextFestival = {
    name: "Makar Sankranti",
    date: new Date("2026-01-14"),
    deity: "Surya Bhagavan",
    significance: "Harvest festival marking the sun's transition into Capricorn, celebrating prosperity and new beginnings",
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = nextFestival.date.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#FEB703] to-[#FFCB05] rounded-2xl p-6 shadow-2xl overflow-hidden relative border-2 border-[#8D0303]/20">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#8D0303]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#8D0303]/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-[#8D0303]/20 rounded-lg flex items-center justify-center">
            <Calendar className="h-5 w-5 text-[#8D0303]" />
          </div>
          <div>
            <p className="text-[#8D0303] text-sm font-semibold">Upcoming Festival</p>
            <h3 className="font-heading text-xl font-bold text-[#8D0303]">
              {nextFestival.name}
            </h3>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Mins" },
            { value: timeLeft.seconds, label: "Secs" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-lg p-2 text-center border-2 border-[#8D0303]/20 shadow-md"
            >
              <p className="text-2xl md:text-3xl font-bold text-[#8D0303] tabular-nums">
                {item.value.toString().padStart(2, "0")}
              </p>
              <p className="text-[10px] text-[#8D0303]/70 uppercase tracking-wide font-medium">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-[#8D0303]/80 text-sm mb-4 font-medium">
          {nextFestival.significance}
        </p>

        {/* CTA */}
        <button className="w-full bg-[#00BD40] text-white font-semibold py-3 rounded-lg hover:bg-[#00BD40]/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#00BD40]/30 hover:shadow-xl hover:shadow-[#00BD40]/40">
          <Clock className="h-4 w-4" />
          Book Festival Special Pooja
        </button>
      </div>
    </div>
  );
};

export default FestivalCountdown;
