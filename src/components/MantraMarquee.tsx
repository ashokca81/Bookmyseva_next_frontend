const MantraMarquee = () => {
  const mantras = [
    { text: "ॐ नमः शिवाय", meaning: "Om Namah Shivaya" },
    { text: "ॐ गं गणपतये नमः", meaning: "Om Gam Ganapataye Namah" },
    { text: "ॐ श्री महालक्ष्म्यै नमः", meaning: "Om Sri Mahalakshmyai Namah" },
    { text: "ॐ नमो नारायणाय", meaning: "Om Namo Narayanaya" },
    { text: "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे", meaning: "Om Aim Hreem Kleem Chamundaye Vichche" },
    { text: "ॐ श्री रामाय नमः", meaning: "Om Sri Ramaya Namah" },
  ];

  const duplicatedMantras = [...mantras, ...mantras];

  return (
    <div className="w-full bg-gradient-to-r from-[#FEB703] via-[#FFCB05] to-[#FEB703] py-3 overflow-hidden border-y-2 border-[#8D0303]/20">
      <div className="animate-marquee flex whitespace-nowrap hover:pause">
        {duplicatedMantras.map((mantra, index) => (
          <div key={index} className="inline-flex items-center mx-8">
            <span className="text-[#8D0303] mr-2 text-xl">🙏</span>
            <span className="text-[#8D0303] font-bold text-lg font-heading drop-shadow-sm">
              {mantra.text}
            </span>
            <span className="text-[#8D0303]/80 ml-2 text-sm font-medium">
              ({mantra.meaning})
            </span>
            <span className="text-[#8D0303] ml-2 font-bold">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MantraMarquee;
