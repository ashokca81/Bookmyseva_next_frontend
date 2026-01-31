import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'te', name: 'తెలుగు', flag: '🌾' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    // Also trigger Google Translate if available
    const googleTranslateElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (googleTranslateElement) {
      const languageMap: { [key: string]: string } = {
        'en': 'en',
        'te': 'te',
        'hi': 'hi',
      };
      googleTranslateElement.value = languageMap[langCode] || 'en';
      googleTranslateElement.dispatchEvent(new Event('change'));
    }
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <>
      {/* Desktop Language Switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative hidden md:flex gap-0 hover:bg-accent"
            title="Change Language"
          >
            <Languages className="h-5 w-5" />
            <span className="text-sm font-medium">{currentLanguage.flag}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-card border-border shadow-xl">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`cursor-pointer py-2.5 px-3 flex items-center gap-3 ${i18n.language === lang.code ? 'bg-muted' : ''
                }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
              {i18n.language === lang.code && (
                <span className="ml-auto text-marigold">✓</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Mobile Language Switcher - Compact */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 gap-1 hover:bg-accent text-xs"
              title="Change Language"
            >
              <span className="text-base">{currentLanguage.flag}</span>
              <span className="font-medium">{currentLanguage.code.toUpperCase()}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 bg-card border-border shadow-xl">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`cursor-pointer py-2 px-3 flex items-center gap-2 text-sm ${i18n.language === lang.code ? 'bg-muted' : ''
                  }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {i18n.language === lang.code && (
                  <span className="ml-auto text-marigold text-xs">✓</span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default LanguageSwitcher;
