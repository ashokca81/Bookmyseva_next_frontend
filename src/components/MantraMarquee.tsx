import { useState, useEffect } from "react";

const MantraMarquee = () => {
  const [mantras, setMantras] = useState<any[]>([]);

  useEffect(() => {
    const fetchMantras = async () => {
      try {
        const { API_URL } = await import("@/config");
        // Use v1 path explicitly
        const response = await fetch(`${API_URL.replace('/api', '/api/v1')}/mantras/list`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setMantras(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch mantras", error);
      }
    };
    fetchMantras();
  }, []);

  if (mantras.length === 0) return null;

  const duplicatedMantras = [...mantras, ...mantras, ...mantras, ...mantras]; // Repeat more times for smooth scroll

  return (
    <div className="w-full bg-gradient-to-r from-[#FEB703] via-[#FFCB05] to-[#FEB703] py-3 overflow-hidden border-y-2 border-[#8D0303]/20">
      <div className="animate-marquee flex whitespace-nowrap hover:pause">
        {duplicatedMantras.map((mantra, index) => (
          <div key={`${mantra._id}-${index}`} className="inline-flex items-center mx-8">
            <span className="text-[#8D0303] mr-2 text-xl">🙏</span>
            <span className="text-[#8D0303] font-bold text-lg font-heading drop-shadow-sm">
              {mantra.text}
            </span>
            {mantra.transliteration && (
              <span className="text-[#8D0303]/80 ml-2 text-sm font-medium">
                ({mantra.transliteration})
              </span>
            )}
            <span className="text-[#8D0303] ml-2 font-bold">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MantraMarquee;
