import { useState, useEffect, useRef } from "react";
import { Play, X, Minimize2, Maximize2, Volume2, VolumeX, Volume1, Settings, Lock, LockOpen, Maximize, Minimize } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import liveAnimation from "../assets/Live.json";
import { useAppConfig } from "@/hooks/useAppConfig";

interface LiveStreamCardProps {
  isDismissed?: boolean;
  onDismissedChange?: (dismissed: boolean) => void;
}

const LiveStreamCard = ({ isDismissed: externalIsDismissed, onDismissedChange }: LiveStreamCardProps = {}) => {
  const navigate = useNavigate();
  const [isMinimized, setIsMinimized] = useState(false);
  const [internalIsDismissed, setInternalIsDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Advanced player states
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [volumeLevel, setVolumeLevel] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(100);
  const [isQualityMenuOpen, setIsQualityMenuOpen] = useState(false);
  const [currentQuality, setCurrentQuality] = useState("Auto");
  const [isControlsLocked, setIsControlsLocked] = useState(false);
  const [showBigPlayButton, setShowBigPlayButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Refs
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const youtubeIframeRef = useRef<HTMLIFrameElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const bigPlayButtonTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Use external state if provided, otherwise use internal state
  const isDismissed = externalIsDismissed !== undefined ? externalIsDismissed : internalIsDismissed;

  const handleDismiss = () => {
    if (onDismissedChange) {
      onDismissedChange(true);
    } else {
      setInternalIsDismissed(true);
    }
  };

  const config = useAppConfig();

  // YouTube video ID State
  const [youtubeVideoId, setYoutubeVideoId] = useState("eTWaPQW7rdk");

  // Helper to extract ID from various YouTube URL formats
  const extractYoutubeId = (url: string) => {
    if (!url) return null;

    // If it looks like a raw ID (11 chars, alphanumeric/dashes), return it
    const rawIdRegex = /^[a-zA-Z0-9_-]{11}$/;
    if (rawIdRegex.test(url)) {
      return url;
    }

    // Handle standard watch URL
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    }

    // Handle /live/ format
    if (url.includes("/live/")) {
      const liveMatch = url.split("/live/")[1];
      if (liveMatch) {
        // Remove query params if any
        return liveMatch.split("?")[0];
      }
    }

    return null;
  };

  // Update video ID when config changes
  useEffect(() => {
    if (config?.liveVideoUrl) {
      const extractedId = extractYoutubeId(config.liveVideoUrl);
      if (extractedId) {
        setYoutubeVideoId(extractedId);
      }
    }
  }, [config]);

  // YouTube embed URL with API enabled
  const youtubeEmbedUrl = `https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&mute=0&rel=0&controls=0&disablekb=1&fs=0&modestbranding=1&showinfo=0&iv_load_policy=3&playsinline=1&enablejsapi=1&origin=${window.location.origin}&widget_referrer=${window.location.origin}&color=white&loop=1&wmode=transparent&vq=hd1080&cc_load_policy=3`;

  // Volume icon based on level
  const getVolumeIcon = () => {
    if (isMuted || volumeLevel === 0) {
      return <VolumeX className="h-5 w-5 text-white" />;
    } else if (volumeLevel < 50) {
      return <Volume1 className="h-5 w-5 text-white" />;
    } else {
      return <Volume2 className="h-5 w-5 text-white" />;
    }
  };

  // Handle scroll to show/hide on mobile
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only apply scroll behavior on mobile (screen width < 768px)
      if (window.innerWidth < 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down & past 100px - hide
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - show
          setIsVisible(true);
        }
      } else {
        // Always visible on desktop
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Handle escape key to close video
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVideoPlaying) {
        handleCloseVideo();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isVideoPlaying]);

  // Keyboard shortcuts for video control
  useEffect(() => {
    if (!isVideoPlaying) return;

    const handleKeyboardShortcuts = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'arrowup':
          e.preventDefault();
          setVolumeLevel(prev => Math.min(100, prev + 5));
          updateVolume(Math.min(100, volumeLevel + 5));
          break;
        case 'arrowdown':
          e.preventDefault();
          setVolumeLevel(prev => Math.max(0, prev - 5));
          updateVolume(Math.max(0, volumeLevel - 5));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyboardShortcuts);
    return () => window.removeEventListener("keydown", handleKeyboardShortcuts);
  }, [isVideoPlaying, volumeLevel]);

  // Prevent body scroll when video is playing
  useEffect(() => {
    if (isVideoPlaying) {
      document.body.style.overflow = "hidden";

      // Lock orientation to landscape on mobile
      if (window.innerWidth < 768) {
        // Use a slight delay to ensure proper execution
        const lockOrientation = () => {
          try {
            const screenOrientation = window.screen.orientation;
            if (screenOrientation && 'lock' in screenOrientation) {
              (screenOrientation as any).lock('landscape').catch((err: any) => {
                console.log('Orientation lock not supported or failed:', err);
              });
            }
          } catch (err) {
            console.log('Orientation lock error:', err);
          }
        };

        // Try to lock orientation after a brief delay
        setTimeout(lockOrientation, 200);
      }

      // Load saved volume
      try {
        const savedVolume = localStorage.getItem('darshan-player-volume');
        if (savedVolume !== null) {
          const vol = parseInt(savedVolume, 10);
          setVolumeLevel(vol);
          // Apply the saved volume to the player
          setTimeout(() => updateVolume(vol), 500);
        }
      } catch (e) {
        // Ignore storage errors
      }

      // Simulate loading
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      // Auto-hide controls
      resetControlsTimeout();
    } else {
      document.body.style.overflow = "unset";

      // Unlock orientation on mobile
      if (window.innerWidth < 768) {
        try {
          const screenOrientation = window.screen.orientation;
          if (screenOrientation && 'unlock' in screenOrientation) {
            screenOrientation.unlock();
          }
        } catch (err) {
          console.log('Orientation unlock failed:', err);
        }
      }
    }
    return () => {
      document.body.style.overflow = "unset";
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      // Cleanup orientation lock
      try {
        const screenOrientation = window.screen.orientation;
        if (screenOrientation && 'unlock' in screenOrientation) {
          screenOrientation.unlock();
        }
      } catch (err) {
        // Ignore errors
      }
    };
  }, [isVideoPlaying]);

  const handlePlayVideo = async () => {
    // Set video playing state first
    setIsVideoPlaying(true);

    if (window.innerWidth < 768) {
      // Request fullscreen after modal renders
      requestAnimationFrame(() => {
        setTimeout(async () => {
          const container = playerContainerRef.current;
          if (container) {
            try {
              // Try different fullscreen methods for cross-browser compatibility
              if (container.requestFullscreen) {
                await container.requestFullscreen();
              } else if ((container as any).webkitRequestFullscreen) {
                await (container as any).webkitRequestFullscreen();
              } else if ((container as any).mozRequestFullScreen) {
                await (container as any).mozRequestFullScreen();
              } else if ((container as any).msRequestFullscreen) {
                await (container as any).msRequestFullscreen();
              }
              setIsFullScreen(true);
            } catch (err) {
              console.warn("Could not enter fullscreen:", err);
              // Still allow video to play even if fullscreen fails
            }
          }
        }, 150);
      });
    }
  };

  const handleCloseVideo = async () => {
    // Exit fullscreen first if in fullscreen
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch (error) {
        console.error('Error exiting fullscreen:', error);
      }
    }
    setIsVideoPlaying(false);
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    const iframe = youtubeIframeRef.current;
    if (iframe) {
      const command = isPlaying ? 'pauseVideo' : 'playVideo';
      iframe.contentWindow?.postMessage(JSON.stringify({
        event: 'command',
        func: command
      }), '*');
      setIsPlaying(!isPlaying);

      // Show big play button
      setShowBigPlayButton(true);
      if (bigPlayButtonTimeoutRef.current) {
        clearTimeout(bigPlayButtonTimeoutRef.current);
      }
      bigPlayButtonTimeoutRef.current = setTimeout(() => {
        setShowBigPlayButton(false);
      }, 800);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    const iframe = youtubeIframeRef.current;
    if (iframe) {
      const command = isMuted ? 'unMute' : 'mute';
      iframe.contentWindow?.postMessage(JSON.stringify({
        event: 'command',
        func: command
      }), '*');

      if (isMuted) {
        setVolumeLevel(previousVolume);
        updateVolume(previousVolume);
      } else {
        setPreviousVolume(volumeLevel);
        setVolumeLevel(0);
      }
      setIsMuted(!isMuted);
    }
  };

  // Update volume
  const updateVolume = (volume: number) => {
    const iframe = youtubeIframeRef.current;
    if (iframe) {
      const vol = Math.max(0, Math.min(100, volume));

      try {
        // Unmute if muted and volume > 0
        if (isMuted && vol > 0) {
          iframe.contentWindow?.postMessage(JSON.stringify({
            event: 'command',
            func: 'unMute'
          }), '*');
          setIsMuted(false);
        }

        // Set volume
        iframe.contentWindow?.postMessage(JSON.stringify({
          event: 'command',
          func: 'setVolume',
          args: [vol]
        }), '*');

        // Mute if volume is 0
        if (vol === 0 && !isMuted) {
          iframe.contentWindow?.postMessage(JSON.stringify({
            event: 'command',
            func: 'mute'
          }), '*');
          setIsMuted(true);
        }
      } catch (err) {
        console.error('Error updating volume:', err);
      }

      // Save to localStorage
      try {
        localStorage.setItem('darshan-player-volume', vol.toString());
      } catch (e) {
        // Ignore storage errors
      }
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = async () => {
    const element = playerContainerRef.current;
    if (!element) return;

    if (!document.fullscreenElement) {
      try {
        await element.requestFullscreen();
        setIsFullScreen(true);
      } catch (err) {
        console.error('Error enabling fullscreen:', err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullScreen(false);
      } catch (err) {
        console.error('Error exiting fullscreen:', err);
      }
    }
  };

  // Set quality
  const setQuality = (quality: string) => {
    setCurrentQuality(quality);
    setIsQualityMenuOpen(false);

    const iframe = youtubeIframeRef.current;
    if (iframe) {
      let qualityLevel: string;

      switch (quality) {
        case '1080p': qualityLevel = 'hd1080'; break;
        case '720p': qualityLevel = 'hd720'; break;
        case '480p': qualityLevel = 'large'; break;
        case '360p': qualityLevel = 'medium'; break;
        default: qualityLevel = 'default';
      }

      iframe.contentWindow?.postMessage(JSON.stringify({
        event: 'command',
        func: 'setPlaybackQuality',
        args: [qualityLevel]
      }), '*');
    }
  };

  // Mouse move handler
  const handleMouseMove = () => {
    if (isControlsLocked) return;
    setShowControls(true);
    resetControlsTimeout();
  };

  // Mouse leave handler
  const handleMouseLeave = () => {
    if (isControlsLocked) return;
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 1000);
  };

  // Reset controls timeout
  const resetControlsTimeout = () => {
    if (isControlsLocked) return;
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  // Toggle controls lock
  const toggleControlsLock = () => {
    setIsControlsLocked(!isControlsLocked);
    if (!isControlsLocked) {
      setShowControls(true);
    }
  };

  if (isDismissed) return null;

  return (
    <>
      <div
        className={`fixed z-40 transition-all duration-300 ${isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-20 pointer-events-none"
          } ${isMinimized
            ? "bottom-24 md:bottom-4 left-4"
            : "bottom-24 md:bottom-4 left-4 w-80 md:w-96"
          }`}
      >
        {isMinimized ? (
          // Minimized Pill Button
          <div className="bg-gradient-to-r from-[#8D0303] to-[#8D0303]/90 rounded-full shadow-elevated border border-[#FEB703]/30 px-4 py-3 flex items-center gap-3 hover:shadow-glow transition-all duration-300">
            {/* Live Indicator */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00BD40] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00BD40]"></span>
              </span>
            </div>

            {/* Avatar/Thumbnail */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#FEB703]/50">
              <img
                src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
                alt="Temple Live"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to medium quality if maxresdefault is not available
                  e.currentTarget.src = `https://img.youtube.com/vi/${youtubeVideoId}/mqdefault.jpg`;
                }}
              />
              {/* Mini Live Badge Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#00BD40]/90 text-white text-[8px] font-bold text-center py-0.5">
                LIVE
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(false)}
                className="p-1.5 hover:bg-secondary-foreground/10 rounded-full transition-colors"
                aria-label="Expand"
              >
                <Maximize2 className="h-4 w-4 text-secondary-foreground" />
              </button>
              <button
                onClick={handleDismiss}
                className="p-1.5 hover:bg-secondary-foreground/10 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-secondary-foreground" />
              </button>
            </div>
          </div>
        ) : (
          // Expanded Card
          <div className="bg-card rounded-2xl shadow-elevated border border-border overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-[#8D0303] to-[#8D0303]/90 px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00BD40] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00BD40]"></span>
                </span>
                <span className="text-secondary-foreground text-sm font-medium">
                  Live Darshan
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 hover:bg-secondary-foreground/10 rounded transition-colors"
                >
                  <Minimize2 className="h-4 w-4 text-secondary-foreground" />
                </button>
                <button
                  onClick={handleDismiss}
                  className="p-1 hover:bg-secondary-foreground/10 rounded transition-colors"
                >
                  <X className="h-4 w-4 text-secondary-foreground" />
                </button>
              </div>
            </div>

            {/* Video Placeholder */}
            {!isMinimized && (
              <>
                <div className="relative aspect-video bg-foreground/10">
                  <img
                    src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
                    alt="Temple Live"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to medium quality if maxresdefault is not available
                      e.currentTarget.src = `https://img.youtube.com/vi/${youtubeVideoId}/mqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/30">
                    <button
                      onClick={handlePlayVideo}
                      className="w-16 h-16 bg-[#FEB703] rounded-full flex items-center justify-center hover:bg-[#FEB703]/90 transition-colors shadow-glow hover:scale-110 transform duration-300"
                    >
                      <Play className="h-8 w-8 text-[#8D0303] ml-1" />
                    </button>
                  </div>
                  {/* Live Badge */}
                  <div className="absolute top-3 left-3 bg-[#00BD40] text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                    <span className="animate-pulse">●</span>
                    LIVE
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h4 className="font-heading font-semibold text-foreground mb-1">
                    Tirumala Balaji Morning Darshan
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Watch live aarti from TTD Temple
                  </p>
                  <button
                    onClick={handlePlayVideo}
                    className="w-full bg-[#FEB703] text-[#8D0303] font-semibold py-2 rounded-lg hover:bg-[#FEB703]/90 transition-colors text-sm"
                  >
                    Watch Full Screen
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Video Popup Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
          {/* Preconnect to YouTube for faster loading */}
          <link rel="preconnect" href="https://www.youtube-nocookie.com" />
          <link rel="preconnect" href="https://www.google.com" />
          <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />

          {/* Main Video Container - Full screen on mobile, centered on desktop */}
          <div
            ref={playerContainerRef}
            className="relative w-full h-full flex flex-col shadow-2xl"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={() => {
              setShowControls(true);
              resetControlsTimeout();
            }}
          >
            {/* YouTube iframe - object-cover ensures no black bars */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <iframe
                ref={youtubeIframeRef}
                width="100%"
                height="100%"
                src={youtubeEmbedUrl}
                title="Live Darshan"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; screen-wake-lock"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{
                  minWidth: '100%',
                  minHeight: '100%',
                  objectFit: 'cover'
                }}
              ></iframe>
            </div>

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="w-20 h-20 relative">
                  <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-t-[#FEB703] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[#FEB703] text-2xl">🕉️</span>
                  </div>
                </div>
              </div>
            )}

            {/* Big Play/Pause Button */}
            {showBigPlayButton && (
              <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/10 pointer-events-none">
                <div className="w-20 h-20 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full">
                  {isPlaying ? (
                    <div className="w-6 h-8 flex gap-1.5 items-center">
                      <div className="w-2 h-8 bg-white rounded"></div>
                      <div className="w-2 h-8 bg-white rounded"></div>
                    </div>
                  ) : (
                    <Play className="h-8 w-8 text-white ml-1" />
                  )}
                </div>
              </div>
            )}

            {/* Center Play/Pause Button - Always available for click */}
            {!showControls && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-40">
                <button
                  onClick={togglePlayPause}
                  className="w-20 h-20 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full hover:bg-black/60 transition-all active:scale-95"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <div className="w-6 h-8 flex gap-1.5 items-center">
                      <div className="w-2 h-8 bg-white rounded"></div>
                      <div className="w-2 h-8 bg-white rounded"></div>
                    </div>
                  ) : (
                    <Play className="h-8 w-8 text-white ml-1" />
                  )}
                </button>
              </div>
            )}

            {/* Top Chrome Bar */}
            <div
              className={`absolute top-0 left-0 right-0 pt-2 md:pt-4 pb-12 md:pb-16 z-30 bg-gradient-to-b from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${showControls || isControlsLocked ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <div className="px-2 md:px-6 flex items-center justify-between">
                {/* Back Button */}
                <button
                  onClick={handleCloseVideo}
                  className="flex items-center group"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full group-hover:bg-[#8D0303]/80 transition-all">
                    <X className="h-4 w-4 md:h-6 md:w-6 text-white" />
                  </div>
                </button>

                {/* Title and Live Indicator */}
                <div className="flex-1 flex flex-col md:flex-row items-center md:items-start mx-2 md:mx-4 gap-1 md:gap-2">
                  <div className="flex items-center gap-1 md:gap-2 bg-[#00BD40] px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow-lg">
                    <div className="w-5 h-5 md:w-6 md:h-6">
                      <Lottie animationData={liveAnimation} loop={true} />
                    </div>
                    <span className="text-white text-[10px] md:text-xs font-bold tracking-wide">LIVE</span>
                  </div>
                  <h1 className="text-white font-bold text-xs md:text-xl tracking-wide hidden sm:block">Tirumala Balaji Darshan</h1>
                </div>

                {/* Branding */}
                <div className="bg-[#FEB703] px-2 md:px-3 py-1 md:py-1.5 rounded-lg shadow-lg">
                  <span className="text-[#8D0303] font-heading font-bold text-[10px] md:text-sm">Book My Seva</span>
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div
              className={`absolute left-0 right-0 bottom-0 z-30 transition-opacity duration-300 pb-3 md:pb-6 pt-16 md:pt-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent ${showControls || isControlsLocked ? 'opacity-100' : 'opacity-0'
                }`}
            >
              {/* Main Controls */}
              <div className="px-2 md:px-8 flex items-center justify-between">
                {/* Left Controls */}
                <div className="flex items-center gap-2 md:gap-6">
                  {/* Play/Pause Button */}
                  <button
                    onClick={togglePlayPause}
                    className="group cursor-pointer"
                  >
                    <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                      {isPlaying ? (
                        <div className="w-4 h-5 md:w-5 md:h-6 flex gap-1 md:gap-1.5 items-center">
                          <div className="w-1 md:w-1.5 h-5 md:h-6 bg-white rounded group-hover:bg-[#FEB703] transition-colors"></div>
                          <div className="w-1 md:w-1.5 h-5 md:h-6 bg-white rounded group-hover:bg-[#FEB703] transition-colors"></div>
                        </div>
                      ) : (
                        <Play className="h-4 w-4 md:h-6 md:w-6 text-white group-hover:text-[#FEB703] transition-colors ml-0.5" />
                      )}
                    </div>
                  </button>

                  {/* Volume Control - Desktop only */}
                  <div className="hidden md:flex items-center group/volume">
                    <button
                      onClick={toggleMute}
                      className="group"
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                        {getVolumeIcon()}
                      </div>
                    </button>

                    {/* Volume Slider */}
                    <div className="w-0 overflow-hidden group-hover/volume:w-24 transition-all duration-200 h-10 flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volumeLevel}
                        onChange={(e) => {
                          const vol = parseInt(e.target.value);
                          setVolumeLevel(vol);
                          updateVolume(vol);
                        }}
                        className="ml-2 w-full h-1 bg-white/30 rounded-full appearance-none focus:outline-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #FEB703 0%, #FEB703 ${volumeLevel}%, rgba(255,255,255,0.3) ${volumeLevel}%, rgba(255,255,255,0.3) 100%)`
                        }}
                      />
                    </div>
                  </div>

                  {/* Live Indicator for Mobile */}
                  <div className="md:hidden flex items-center">
                    <span className="h-1.5 w-1.5 bg-[#00BD40] rounded-full animate-pulse mr-1"></span>
                    <span className="text-white/90 text-[10px] font-medium">LIVE</span>
                  </div>
                </div>

                {/* Center Info (Desktop) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 text-white items-center gap-2">
                  <span className="h-2 w-2 bg-[#00BD40] rounded-full animate-pulse"></span>
                  <span className="text-white/90 font-medium text-sm">Streaming Live</span>
                  <span className="text-white/50">|</span>
                  <span className="text-white/70 text-sm">HD Quality</span>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-1 md:gap-3">
                  {/* Settings Button */}
                  <div className="relative group/settings">
                    <button
                      onClick={() => setIsQualityMenuOpen(!isQualityMenuOpen)}
                      className="group"
                    >
                      <div className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                        <Settings className="h-4 w-4 md:h-5 md:w-5 text-white group-hover:text-[#FEB703] transition-colors" />
                      </div>
                    </button>

                    {/* Settings Menu */}
                    {isQualityMenuOpen && (
                      <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-md rounded-lg overflow-hidden border border-white/10 w-48">
                        <div className="py-2">
                          <div className="px-4 py-1 text-white/70 text-xs font-medium uppercase tracking-wider">Quality</div>
                          <div className="mt-1">
                            {['Auto', '1080p', '720p', '480p', '360p'].map((quality) => (
                              <button
                                key={quality}
                                onClick={() => setQuality(quality)}
                                className="w-full px-4 py-2 text-left text-sm text-white flex items-center justify-between hover:bg-white/10 transition-colors"
                              >
                                <span className={currentQuality === quality ? 'text-[#FEB703]' : ''}>{quality}</span>
                                {currentQuality === quality && (
                                  <span className="text-[#FEB703]">✓</span>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Lock Controls */}
                  <button
                    onClick={toggleControlsLock}
                    className="group hidden md:block"
                  >
                    <div className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                      {isControlsLocked ? (
                        <Lock className="h-4 w-4 md:h-5 md:w-5 text-[#FEB703]" />
                      ) : (
                        <LockOpen className="h-4 w-4 md:h-5 md:w-5 text-white group-hover:text-[#FEB703] transition-colors" />
                      )}
                    </div>
                  </button>

                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="group"
                  >
                    <div className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                      {isFullScreen ? (
                        <Minimize className="h-4 w-4 md:h-5 md:w-5 text-white group-hover:text-[#FEB703] transition-colors" />
                      ) : (
                        <Maximize className="h-4 w-4 md:h-5 md:w-5 text-white group-hover:text-[#FEB703] transition-colors" />
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveStreamCard;
