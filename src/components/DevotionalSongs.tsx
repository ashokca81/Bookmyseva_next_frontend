import { Music, Play, Pause, Heart, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DevotionalSongs = () => {
    const [playingId, setPlayingId] = useState<number | null>(null);
    const [favorites, setFavorites] = useState<number[]>([]);

    const songs = [
        {
            id: 1,
            title: "Om Namah Shivaya",
            deity: "Lord Shiva",
            duration: "5:30",
            image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=400&fit=crop&crop=faces",
        },
        {
            id: 2,
            title: "Hanuman Chalisa",
            deity: "Lord Hanuman",
            duration: "8:15",
            image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=400&fit=crop&crop=faces",
        },
        {
            id: 3,
            title: "Vishnu Sahasranamam",
            deity: "Lord Vishnu",
            duration: "12:45",
            image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=400&fit=crop&crop=faces",
        },
        {
            id: 4,
            title: "Gayatri Mantra",
            deity: "Universal Prayer",
            duration: "3:20",
            image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=400&fit=crop&crop=faces",
        },
        {
            id: 5,
            title: "Lakshmi Aarti",
            deity: "Goddess Lakshmi",
            duration: "4:50",
            image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=400&fit=crop&crop=faces",
        },
        {
            id: 6,
            title: "Saraswati Vandana",
            deity: "Goddess Saraswati",
            duration: "6:10",
            image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=400&fit=crop&crop=faces",
        },
    ];

    const handlePlayPause = (id: number) => {
        if (playingId === id) {
            setPlayingId(null);
        } else {
            setPlayingId(id);
        }
    };

    const toggleFavorite = (id: number) => {
        setFavorites(prev =>
            prev.includes(id)
                ? prev.filter(fav => fav !== id)
                : [...prev, id]
        );
    };

    return (
        <section className="py-12 md:py-16">
            <div className="container px-4">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-12">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Music className="h-8 w-8 text-marigold" />
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                            Devotional Songs
                        </h2>
                    </div>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Listen to divine bhajans and mantras to connect with the divine
                    </p>
                </div>

                {/* Songs List */}
                <div className="max-w-4xl mx-auto">
                    {/* Desktop: Table Layout */}
                    <div className="hidden md:block bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                        {/* Table Header */}
                        <div className="grid grid-cols-[40px_60px_1fr_50px_100px_80px_80px] gap-4 px-4 py-3 border-b border-border bg-muted/30 text-sm font-medium text-muted-foreground">
                            <div className="text-center">#</div>
                            <div></div>
                            <div>Title</div>
                            <div></div>
                            <div>Duration</div>
                            <div></div>
                            <div></div>
                        </div>

                        {/* Song Rows */}
                        <div className="divide-y divide-border">
                            {songs.map((song, index) => (
                                <div
                                    key={song.id}
                                    className={cn(
                                        "grid grid-cols-[40px_60px_1fr_50px_100px_80px_80px] gap-4 px-4 py-3 hover:bg-muted/50 transition-all duration-200 group cursor-pointer",
                                        playingId === song.id && "bg-marigold/5 hover:bg-marigold/10"
                                    )}
                                    onClick={() => handlePlayPause(song.id)}
                                >
                                    {/* Index / Now Playing Indicator */}
                                    <div className="flex items-center justify-center">
                                        {playingId === song.id ? (
                                            <div className="flex gap-0.5 items-end h-4">
                                                <div className="w-0.5 bg-marigold animate-pulse" style={{ height: '60%', animationDelay: '0ms' }} />
                                                <div className="w-0.5 bg-marigold animate-pulse" style={{ height: '100%', animationDelay: '150ms' }} />
                                                <div className="w-0.5 bg-marigold animate-pulse" style={{ height: '80%', animationDelay: '300ms' }} />
                                            </div>
                                        ) : (
                                            <span className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                                                {index + 1}
                                            </span>
                                        )}
                                    </div>

                                    {/* Album Art Thumbnail */}
                                    <div className="relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0 shadow-sm group/image">
                                        <img
                                            src={song.image}
                                            alt={song.title}
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Play Button Overlay on Hover */}
                                        {playingId !== song.id && (
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity">
                                                <Play className="h-6 w-6 text-white" />
                                            </div>
                                        )}
                                        {/* Playing Spinner */}
                                        {playingId === song.id && (
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                <div className="w-6 h-6 border-2 border-white rounded-full animate-spin border-t-transparent" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Song Info */}
                                    <div className="flex flex-col justify-center min-w-0">
                                        <h4 className={cn(
                                            "font-medium truncate transition-colors",
                                            playingId === song.id ? "text-marigold" : "text-foreground"
                                        )}>
                                            {song.title}
                                        </h4>
                                        <p className="text-sm text-muted-foreground truncate">
                                            {song.deity}
                                        </p>
                                    </div>

                                    {/* Music Playing Animation - Between Title and Duration */}
                                    <div className="flex items-center justify-center w-12">
                                        {playingId === song.id && (
                                            <div className="flex gap-0.5 items-end h-4">
                                                <div className="w-0.5 bg-marigold animate-pulse" style={{ height: '60%', animationDelay: '0ms' }} />
                                                <div className="w-0.5 bg-marigold animate-pulse" style={{ height: '100%', animationDelay: '150ms' }} />
                                                <div className="w-0.5 bg-marigold animate-pulse" style={{ height: '80%', animationDelay: '300ms' }} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Duration */}
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        {song.duration}
                                    </div>

                                    {/* Favorite Button */}
                                    <div className="flex items-center justify-center">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className={cn(
                                                "h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity",
                                                favorites.includes(song.id) && "opacity-100"
                                            )}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavorite(song.id);
                                            }}
                                        >
                                            <Heart
                                                className={cn(
                                                    "h-4 w-4 transition-colors",
                                                    favorites.includes(song.id) && "fill-sacred-red text-sacred-red"
                                                )}
                                            />
                                        </Button>
                                    </div>

                                    {/* More Options */}
                                    <div className="flex items-center justify-center">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile: Card Layout */}
                    <div className="md:hidden space-y-3">
                        {songs.map((song, index) => (
                            <div
                                key={song.id}
                                className={cn(
                                    "card-sacred p-4 cursor-pointer transition-all duration-200",
                                    playingId === song.id && "bg-marigold/5 border-marigold/30"
                                )}
                                onClick={() => handlePlayPause(song.id)}
                            >
                                <div className="flex items-center gap-4">
                                    {/* Album Art with Play Button Overlay */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md">
                                            <img
                                                src={song.image}
                                                alt={song.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {/* Play/Pause Button Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className={cn(
                                                "w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all",
                                                playingId === song.id
                                                    ? "bg-marigold"
                                                    : "bg-white/90 backdrop-blur-sm"
                                            )}>
                                                {playingId === song.id ? (
                                                    <Pause className="h-5 w-5 text-primary-foreground" />
                                                ) : (
                                                    <Play className="h-5 w-5 text-maroon ml-0.5" />
                                                )}
                                            </div>
                                        </div>
                                        {/* Now Playing Indicator */}
                                        {playingId === song.id && (
                                            <div className="absolute -top-1 -right-1 bg-marigold rounded-full p-1">
                                                <div className="flex gap-0.5 items-end h-3">
                                                    <div className="w-0.5 bg-white animate-pulse" style={{ height: '60%', animationDelay: '0ms' }} />
                                                    <div className="w-0.5 bg-white animate-pulse" style={{ height: '100%', animationDelay: '150ms' }} />
                                                    <div className="w-0.5 bg-white animate-pulse" style={{ height: '80%', animationDelay: '300ms' }} />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Song Info */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className={cn(
                                            "font-heading font-semibold text-base mb-1 truncate",
                                            playingId === song.id ? "text-marigold" : "text-foreground"
                                        )}>
                                            {song.title}
                                        </h4>
                                        <p className="text-sm text-muted-foreground mb-2 truncate">
                                            {song.deity}
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                                {song.duration}
                                            </span>
                                            {playingId === song.id && (
                                                <span className="text-xs text-marigold font-medium">
                                                    Now Playing
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Favorite Button */}
                                    <div className="flex-shrink-0">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-10 w-10"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavorite(song.id);
                                            }}
                                        >
                                            <Heart
                                                className={cn(
                                                    "h-5 w-5 transition-colors",
                                                    favorites.includes(song.id)
                                                        ? "fill-sacred-red text-sacred-red"
                                                        : "text-muted-foreground"
                                                )}
                                            />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats & View All */}
                    <div className="flex items-center justify-between mt-6 px-2">
                        <p className="text-sm text-muted-foreground">
                            {songs.length} songs • {playingId ? 'Now playing' : 'Ready to play'}
                        </p>
                        <Button variant="outline" size="sm" className="hover:bg-marigold/10 hover:text-marigold hover:border-marigold">
                            <Music className="h-4 w-4 mr-2" />
                            View All Songs
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DevotionalSongs;
