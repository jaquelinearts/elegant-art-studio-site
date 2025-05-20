
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
      <h1 className="hero-text">404</h1>
      <p className="text-xl md:text-2xl text-muted-foreground max-w-lg text-center mt-4 mb-8">
        Oops! Parece que esta página não existe.
      </p>
      <Button asChild size="lg">
        <NavLink to="/">Voltar para a Home</NavLink>
      </Button>
    </div>
  );
};

export default NotFound;
