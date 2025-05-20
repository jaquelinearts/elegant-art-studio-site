
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="py-16">
      <div className="container-custom">
        <h1 className="section-title text-center mb-16">Sobre Mim</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
              alt="Artista em seu estúdio"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-playfair">Minha História</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Minha jornada artística começou quando era criança, fascinada pelas cores e formas que via no mundo ao meu redor. Estudei Belas Artes na Universidade de São Paulo, onde me especializei em pintura contemporânea e técnicas mistas.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Após me formar, passei dois anos viajando pela Europa, absorvendo influências de museus e galerias renomadas. Essa experiência transformadora moldou minha abordagem à arte, mesclando o clássico com o contemporâneo.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Hoje, trabalho em meu estúdio em São Paulo, onde exploro temas relacionados à natureza, identidade e memória coletiva. Minha obra busca provocar reflexões sobre nosso lugar no mundo e nossa relação com o ambiente.
            </p>
          </div>
        </div>
        
        {/* Inspiração e Processo Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6 p-8 rounded-lg bg-accent/20">
            <h2 className="text-2xl md:text-3xl font-playfair">Inspiração</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Encontro inspiração nas paisagens naturais, na arquitetura urbana e nas interações humanas cotidianas. A dualidade entre caos e ordem, luz e sombra, guia meu processo criativo e permeia minhas obras.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Artistas como Georgia O'Keeffe, Anselm Kiefer e Beatriz Milhazes influenciaram profundamente minha abordagem à cor e composição.
            </p>
          </div>
          
          <div className="space-y-6 p-8 rounded-lg bg-accent/20">
            <h2 className="text-2xl md:text-3xl font-playfair">Processo</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Meu processo começa com estudos e esboços, seguidos por experimentações com materiais e técnicas. Trabalho principalmente com tinta acrílica, óleos e mídias mistas, incorporando elementos digitais em algumas séries.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Cada obra pode levar de algumas semanas a vários meses para ser completada, dependendo da complexidade e tamanho. Valorizo o processo tanto quanto o resultado final.
            </p>
          </div>
        </div>
        
        {/* Exposições Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-playfair mb-6">Exposições Selecionadas</h2>
          <div className="space-y-4">
            {[
              { year: "2023", title: "Fronteiras Invisíveis", local: "Museu de Arte Contemporânea, São Paulo" },
              { year: "2022", title: "Entre Mundos", local: "Galeria Nova, Rio de Janeiro" },
              { year: "2021", title: "Coletiva Internacional de Arte", local: "Fundação Bienal, Buenos Aires" },
              { year: "2019", title: "Novos Caminhos", local: "Centro Cultural São Paulo" },
              { year: "2018", title: "Reflexos", local: "Pinacoteca do Estado, São Paulo" }
            ].map((expo) => (
              <div key={expo.year} className="flex border-b border-muted pb-4">
                <div className="w-20 font-medium">{expo.year}</div>
                <div>
                  <h3 className="font-medium">{expo.title}</h3>
                  <p className="text-muted-foreground">{expo.local}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
