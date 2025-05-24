import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { cn } from "@/lib/utils";

const NavItems = [
  { name: "Jaqueline", path: "/" },
  { name: "Portfólio", path: "/portfolio" },
  { name: "Loja", path: "/loja" },
  { name: "Contato & Encomenda", path: "/contato" },
  { name: "Blog", path: "/blog" },
  { name: "Seja um Apoiador", path: "/apoiador" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b transition-all duration-300">
      <div className="container-custom py-2 flex items-center justify-between">
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center">
            <img src="/logojacky.png" alt="Jaqueline FineArt" className="h-16 max-h-[64px] w-auto" />
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {NavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "text-sm uppercase tracking-wider hover:text-beige transition-colors",
                  isActive ? "font-medium text-beige" : "font-normal"
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
          <LanguageToggle />
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="flex items-center md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="ml-2 text-beige hover:text-beige/80"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={cn(
            "fixed inset-0 top-[72px] z-50 bg-background flex flex-col md:hidden px-6 h-screen",
            "transition-all duration-300 ease-in-out"
          )}
        >
          <nav className="flex flex-col space-y-6 items-center pt-10">
            {NavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "text-lg uppercase tracking-wider transition-colors",
                    isActive ? "font-medium text-beige" : "font-normal"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
