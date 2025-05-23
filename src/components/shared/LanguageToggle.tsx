import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Language = "pt-BR" | "en" | "fr";

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: "pt-BR", name: "Português", flag: "🇧🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

export function LanguageToggle() {
  const [language, setLanguage] = useState<Language>("pt-BR");
  const [isOpen, setIsOpen] = useState(false);

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    setIsOpen(false);
    
    // Aqui você poderia implementar a lógica para mudar o idioma da aplicação
    // usando i18n ou outra biblioteca de internacionalização
  };

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-9 w-9 text-beige hover:text-beige/80 hover:bg-background"
          aria-label="Selecionar idioma"
        >
          <Globe className="h-[1.2rem] w-[1.2rem] transition-all" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div className="space-y-1">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={lang.code === language ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => changeLanguage(lang.code)}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
} 