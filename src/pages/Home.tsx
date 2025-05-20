
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
                <Button asChild size="lg" className="rounded-full px-8 bg-beige hover:bg-beige/90 text-foreground">
                  <NavLink to="/portfolio">Ver Trabalhos</NavLink>
                </Button>
                <Button variant="outline" asChild size="lg" className="rounded-full px-8 border-beige text-beige hover:bg-beige/10">
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
                <h3 className="font-playfair text-xl text-beige">Obra {item}</h3>
                <p className="text-muted-foreground">Técnica mista sobre tela, 2023</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" asChild size="lg" className="rounded-full gap-2 border-beige text-beige hover:bg-beige/10">
              <NavLink to="/portfolio">
                Ver Portfólio Completo
                <ArrowRight className="w-4 h-4" />
              </NavLink>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Products Showcase Section */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Loja em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden group border border-border/50 hover:border-beige transition-all duration-300">
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-${item === 1 ? '1579783900882-c0d08dad4e67' : item === 2 ? '1460661382334-790a226d29d7' : item === 3 ? '1579762593392-999e5d2d851d' : '1534349762230-e0caac6a3154'}`} 
                    alt={`Produto ${item}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/0 transition-all duration-300"></div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-playfair text-lg text-beige">Produto {item}</h3>
                  <p className="text-muted-foreground text-sm">Impressão Giclée, Série Limitada</p>
                  <p className="font-medium mt-2">R$ {(150 + item * 50).toLocaleString('pt-BR')}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    variant="default" 
                    className="w-full rounded-full gap-2 bg-beige hover:bg-beige/90 text-foreground font-medium"
                    asChild
                  >
                    <NavLink to={`/produto/${item}`}>
                      <ShoppingBag className="h-4 w-4" />
                      Comprar
                    </NavLink>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" asChild size="lg" className="rounded-full gap-2 border-beige text-beige hover:bg-beige/10">
              <NavLink to="/loja">
                Ver Loja Completa
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
