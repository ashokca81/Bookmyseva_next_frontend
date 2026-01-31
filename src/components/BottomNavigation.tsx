import { Home, BookOpen, Package, Gift, User, ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AuthModal from "./AuthModal";

const BottomNavigation = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("home");
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const navItems = [
    { id: "home", icon: Home, label: t('nav.home') },
    { id: "favorite", icon: Heart, label: t('common.favorite') },
    { id: "kits", icon: Package, label: t('nav.kits'), isCenter: true },
    { id: "cart", icon: ShoppingCart, label: t('common.cart'), badge: 2 },
    { id: "profile", icon: User, label: t('common.profile') },
  ];

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 safe-area-inset-bottom">
        {/* Clean Background with Theme Colors */}
        <div className="bg-card border-t border-marigold/20 shadow-lg">
          <div className="flex items-center justify-around h-16 px-2 relative">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isCenter = item.isCenter;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === "profile") {
                      setIsAuthOpen(true);
                    } else {
                      setActiveTab(item.id);
                    }
                  }}
                  className={`relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 ${isCenter ? "-mt-8" : ""
                    }`}
                >
                  {isCenter ? (
                    // Centered Search Button with Marigold Theme
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 bg-gradient-to-br from-marigold to-marigold-light rounded-full flex items-center justify-center shadow-lg shadow-marigold/30 mb-1">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <span className="text-[10px] font-medium text-muted-foreground">
                        {item.label}
                      </span>
                    </div>
                  ) : (
                    // Regular Navigation Items with Theme Colors
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative">
                        <Icon
                          className={`h-6 w-6 transition-colors duration-200 ${isActive ? "text-marigold" : "text-muted-foreground"
                            }`}
                        />
                        {item.badge && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-sacred-red text-secondary-foreground text-[8px] font-bold rounded-full flex items-center justify-center">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-medium mt-1 transition-colors duration-200 ${isActive ? "text-marigold font-semibold" : "text-muted-foreground"
                          }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </>
  );
};

export default BottomNavigation;
