import { useSmartScroll } from "@/hooks/useSmartScroll";
import { useTranslation } from "react-i18next";
import FestivalCountdown from "./FestivalCountdown";
import { BookOpen, Gift, ArrowRight, Smartphone, Sparkles, Heart, Star } from "lucide-react";
import appStore from "@/assets/app-store.png";
import playStore from "@/assets/play-store.png";

import { useAppConfig } from "@/hooks/useAppConfig";

interface Sloka {
  chapter?: number;
  verse?: number;
  theme?: string;
  telugu: string;
  translation?: string;
  emoji?: string;
  title?: string;
  simpleTranslation?: string;
}

interface SidebarProps {
  gitaSlokas?: Sloka[];
  kidsGitaSlokas?: Sloka[];
}

const Sidebar = ({ gitaSlokas = [], kidsGitaSlokas = [] }: SidebarProps) => {
  const { t } = useTranslation();
  const { ref, style } = useSmartScroll(100);
  const config = useAppConfig();

  return (
    <aside className="hidden lg:block w-80 shrink-0 relative">
      <div ref={ref} style={style} className="w-80 space-y-5">

        {/* Festival Countdown */}
        <FestivalCountdown />

        {/* Download App Section */}
        <div className="card-sacred p-5 relative overflow-hidden group">
          {/* Decorative glow */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-marigold/10 rounded-full blur-2xl group-hover:bg-marigold/20 transition-colors duration-500" />

          <div className="relative text-center">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <div className="p-2 bg-marigold/10 rounded-lg">
                <Smartphone className="h-5 w-5 text-marigold" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">{t('sidebar.downloadApp')}</h3>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {t('sidebar.downloadAppDesc')}
            </p>

            <div className="flex flex-row gap-3 justify-center">
              <a href={config?.androidLink || "#"} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src={playStore} alt="Get it on Google Play" className="h-10 w-auto" />
              </a>
              <a href={config?.iosLink || "#"} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src={appStore} alt="Download on the App Store" className="h-10 w-auto" />
              </a>
            </div>
          </div>
        </div>

        {/* Bhagavad Gita Slokas Section */}
        <div className="card-sacred p-5 relative overflow-hidden group">
          {/* Decorative glow */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-marigold/10 rounded-full blur-2xl group-hover:bg-marigold/20 transition-colors duration-500" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-spiritual-green/5 rounded-full blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-marigold/20 to-maroon/20 rounded-lg">
                <BookOpen className="h-5 w-5 text-marigold" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">{t('sidebar.gitaTitle')}</h3>
              <Sparkles className="h-4 w-4 text-marigold ml-auto animate-pulse" />
            </div>

            <div className="space-y-3">
              {gitaSlokas.map((sloka, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl border border-marigold/10"
                >
                  {/* Chapter & Verse Reference */}
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold text-white bg-spiritual-green px-3 py-1.5 rounded-md shadow-md">
                      {t('sidebar.chapter')} {sloka.chapter} : {t('sidebar.verse')} {sloka.verse}
                    </span>
                    <span className="text-xs text-muted-foreground italic">{sloka.theme}</span>
                  </div>

                  {/* Telugu Sloka */}
                  <p className="text-sm font-semibold mb-2.5 leading-relaxed font-serif text-foreground/90">
                    {sloka.telugu}
                  </p>

                  {/* English Translation */}
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {sloka.translation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kids Gita Section */}
        <div className="card-sacred p-5 relative overflow-hidden group">
          {/* Enhanced decorative elements matching sacred theme */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-marigold/10 rounded-full blur-2xl group-hover:bg-marigold/20 transition-colors duration-500" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-spiritual-green/5 rounded-full blur-3xl" />
          <div className="absolute bottom-4 right-1/4 w-20 h-20 bg-maroon/5 rounded-full blur-2xl" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-marigold/20 to-spiritual-green/20 rounded-lg">
                <Heart className="h-5 w-5 text-marigold" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">{t('sidebar.kidsGitaTitle')}</h3>
              <Star className="h-4 w-4 text-marigold ml-auto animate-pulse" />
            </div>

            <p className="text-xs text-muted-foreground mb-4 italic">
              ✨ Simple wisdom from Bhagavad Gita for young minds
            </p>

            <div className="space-y-3">
              {kidsGitaSlokas.map((sloka, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl border border-marigold/20 hover:border-marigold/40 transition-all duration-300 hover:shadow-lg group/card"
                >
                  {/* Title with Emoji */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-xl group-hover/card:scale-110 transition-transform">{sloka.emoji}</span>
                    <h4 className="font-bold text-sm text-foreground">{sloka.title}</h4>
                  </div>

                  {/* Telugu Text */}
                  <p className="text-xs font-semibold mb-2.5 leading-relaxed font-serif text-foreground/90">
                    {sloka.telugu}
                  </p>

                  {/* Simple Translation */}
                  <div className="flex items-start gap-2 p-2 rounded-lg border-l-2 border-marigold/40 bg-marigold/5">
                    <p className="text-xs leading-relaxed flex-1 text-muted-foreground">
                      {sloka.simpleTranslation}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-gradient-to-r from-marigold/10 to-spiritual-green/10 rounded-lg border border-marigold/30">
              <p className="text-xs text-center text-foreground/70 font-semibold">
                🌟 {t('sidebar.teachingValues')}
              </p>
            </div>
          </div>
        </div>

        {/* Premium Offer Card */}
        <div className="card-sacred overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-marigold/30 via-marigold/10 to-maroon/20 group-hover:from-marigold/40 transition-colors duration-500" />

          {/* Animated sparkles */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-marigold rounded-full animate-pulse" />
          <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-marigold-light rounded-full animate-pulse delay-300" />
          <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-marigold rounded-full animate-pulse delay-700" />

          <div className="relative p-6 text-center">
            <div className="inline-flex p-3 bg-marigold/20 rounded-2xl mb-4">
              <Gift className="h-8 w-8 text-marigold" />
            </div>
            <h4 className="font-heading text-xl font-bold text-foreground mb-2">Special Offer</h4>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Get 20% off on your first Pooja booking
            </p>
            <div className="relative inline-block">
              <span className="inline-block bg-gradient-to-r from-marigold to-marigold-light text-primary-foreground font-bold px-5 py-2.5 rounded-xl text-sm shadow-lg shadow-marigold/30">
                FIRSTPOOJA20
              </span>
              <div className="absolute -inset-1 bg-marigold/30 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="card-sacred p-4 bg-spiritual-green/5 border-spiritual-green/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-spiritual-green/10 rounded-full">
              <span className="text-xl">✓</span>
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">100% Verified Poojaris</p>
              <p className="text-xs text-muted-foreground">Background checked & temple certified</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
