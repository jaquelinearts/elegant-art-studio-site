
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";

const NavItems = [
  { name: "Home", path: "/" },
  { name: "Sobre Mim", path: "/sobre-mim" },
  { name: "Portfólio", path: "/portfolio" },
  { name: "Loja", path: "/loja" },
  { name: "Contato", path: "/contato" },
  { name: "Admin", path: "/admin" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b transition-all duration-300">
      <div className="container-custom py-4 flex items-center justify-between">
        <div className="flex items-center">
          <NavLink to="/" className="font-playfair font-bold text-2xl text-beige">
            ARTE
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
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="flex items-center md:hidden">
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
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background flex flex-col md:hidden pt-24 px-6",
          isMenuOpen ? "translate-y-0" : "-translate-y-full",
          "transition-transform duration-300 ease-in-out"
        )}
      >
        <nav className="flex flex-col space-y-6 items-center">
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
    </header>
  );
}
