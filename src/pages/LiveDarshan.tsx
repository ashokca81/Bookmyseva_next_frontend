import { useEffect, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LiveDarshan = () => {
    const navigate = useNavigate();
    const [isFullscreen, setIsFullscreen] = useState(false);
    // YouTube video ID
    const youtubeVideoId = "eTWaPQW7rdk";

    // Auto-rotate effect for mobile and fullscreen check
    useEffect(() => {
        // Lock body scroll
        document.body.style.overflow = "hidden";

        // Check initial fullscreen state
        if (document.fullscreenElement) {
            setIsFullscreen(true);
        }

        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.body.style.overflow = "unset";
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black overflow-hidden flex items-center justify-center">
            {/* 
                Main Content Container
                Mobile: Forces 90deg rotation to simulate landscape
                Desktop: Standard full screen
            */}
            <div className="relative w-[100dvh] h-[100dvw] md:w-full md:h-full rotate-90 md:rotate-0 origin-center flex flex-col items-center justify-center bg-black">

                {/* Top Controls - Floating (Relative to rotated container) */}
                <div className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6 bg-gradient-to-b from-black/90 via-black/60 to-transparent flex justify-between items-start pointer-events-none">
                    <button
                        onClick={() => navigate(-1)}
                        className="pointer-events-auto p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors border border-white/10 shadow-lg"
                    >
                        <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
                    </button>

                    <div className="flex flex-col items-end gap-2 pointer-events-auto">
                        {/* Fullscreen Toggle (Visible on Mobile) */}
                        <button
                            onClick={toggleFullScreen}
                            className="md:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors border border-white/10 mb-2 shadow-lg"
                        >
                            {isFullscreen ? <X className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4 rotate-45" />}
                        </button>

                        <div className="flex items-center gap-2 bg-[#00BD40] px-3 py-1 rounded-full shadow-lg shadow-[#00BD40]/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            <span className="text-white text-[10px] md:text-xs font-bold tracking-wide">LIVE</span>
                        </div>
                        <div className="bg-[#FEB703] px-3 py-1 rounded-md shadow-lg">
                            <span className="text-[#8D0303] font-bold text-[10px] md:text-xs font-heading">Book My Seva</span>
                        </div>
                    </div>
                </div>

                {/* Video Player - Full Size of Container */}
                <div className="relative w-full h-full md:max-w-7xl md:aspect-video flex items-center justify-center">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=0&fs=0&playsinline=1&enablejsapi=1&origin=${window.location.origin}`}
                        title="Live Darshan"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full object-cover"
                        style={{ pointerEvents: 'auto' }}
                    ></iframe>

                    {/* Overlay to catch clicks on youtube logo if needed, but pointer-events auto on iframe usually handles controls well */}
                </div>

                {/* Bottom Info - Floating */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none">
                    <div className="text-white">
                        <h1 className="text-lg md:text-2xl font-bold mb-1 text-shadow-lg font-heading">Tirumala Balaji Morning Darshan</h1>
                        <p className="text-white/70 text-sm md:text-base font-medium">Live from TTD Temple</p>

                        <div className="flex items-center gap-4 mt-3 text-xs md:text-sm font-medium text-white/80">
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#00BD40] rounded-full animate-pulse"></span>
                                Streaming Live
                            </span>
                            <span className="opacity-50">|</span>
                            <span>HD Quality</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveDarshan;
