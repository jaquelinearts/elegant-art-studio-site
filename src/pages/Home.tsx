
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="hero-text">Hello</h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-lg">
                Sou uma artista contemporânea explorando as fronteiras entre o tradicional e o digital.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="rounded-full px-8">
                  <NavLink to="/portfolio">Ver Trabalhos</NavLink>
                </Button>
                <Button variant="outline" asChild size="lg" className="rounded-full px-8">
                  <NavLink to="/contato">Entre em Contato</NavLink>
                </Button>
              </div>
            </div>
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86" 
                alt="Arte representativa" 
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Work Section */}
      <section className="py-20 bg-accent/30">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Trabalhos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-4">
                  <img 
                    src={`https://images.unsplash.com/photo-${item === 1 ? '1469474968028-56623f02e42e' : item === 2 ? '1482938289607-e9573fc25ebb' : '1470071459604-3b5ec3a7fe05'}`} 
                    alt={`Obra ${item}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-playfair text-xl">Obra {item}</h3>
                <p className="text-muted-foreground">Técnica mista sobre tela, 2023</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" asChild size="lg" className="rounded-full gap-2">
              <NavLink to="/portfolio">
                Ver Portfólio Completo
                <ArrowRight className="w-4 h-4" />
              </NavLink>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
