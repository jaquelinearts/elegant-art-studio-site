import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Category = "all" | "pintura" | "escultura" | "digital" | "instalacao" | "fotografia" | "desenhos" | "pintura_tela" | "pintura_papel" | "arquivos";

type ArtWork = {
  id: number;
  title: string;
  category: Exclude<Category, "all">;
  year: string;
  imageUrl: string;
  dimensions: string;
  technique: string;
};

const artworks: ArtWork[] = [
  {
    id: 1,
    title: "Fragmentos do Tempo",
    category: "pintura",
    year: "2023",
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    dimensions: "120 x 90 cm",
    technique: "Óleo sobre tela"
  },
  {
    id: 2,
    title: "Memória Coletiva",
    category: "pintura",
    year: "2022",
    imageUrl: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed",
    dimensions: "100 x 150 cm",
    technique: "Acrílica sobre tela"
  },
  {
    id: 3,
    title: "Conexões",
    category: "escultura",
    year: "2023",
    imageUrl: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
    dimensions: "60 x 40 x 40 cm",
    technique: "Bronze e madeira"
  },
  {
    id: 4,
    title: "Horizontes Digitais",
    category: "digital",
    year: "2022",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    dimensions: "Dimensões variáveis",
    technique: "Arte digital, impressão em papel fine art"
  },
  {
    id: 5,
    title: "Projeções Urbanas",
    category: "instalacao",
    year: "2021",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    dimensions: "Instalação site-specific",
    technique: "Projeção, som e objetos"
  },
  {
    id: 6,
    title: "Entre Sombras",
    category: "pintura",
    year: "2023",
    imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    dimensions: "80 x 120 cm",
    technique: "Técnica mista sobre tela"
  },
  {
    id: 7,
    title: "Natureza Silenciosa",
    category: "escultura",
    year: "2022",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    dimensions: "45 x 30 x 30 cm",
    technique: "Cerâmica e metal"
  },
  {
    id: 8,
    title: "Fluxo Contínuo",
    category: "digital",
    year: "2021",
    imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    dimensions: "Dimensões variáveis",
    technique: "Vídeo arte, loop de 10 minutos"
  },
  {
    id: 9,
    title: "Elevação",
    category: "instalacao",
    year: "2020",
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    dimensions: "300 x 250 x 200 cm",
    technique: "Instalação com materiais diversos"
  }
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [filteredArtworks, setFilteredArtworks] = useState<ArtWork[]>(artworks);
  const [selectedArtwork, setSelectedArtwork] = useState<ArtWork | null>(null);
  const [categoryDescriptions, setCategoryDescriptions] = useState<Record<Category, string>>({
    all: "Explore meu portfólio completo, uma coleção diversificada que reflete minha jornada artística através de diferentes meios e técnicas.",
    pintura: "Minhas pinturas exploram a interação entre cor, forma e emoção, criando narrativas visuais que convidam à contemplação e reflexão.",
    escultura: "Através da escultura, transformo materiais em formas tridimensionais que dialogam com o espaço e desafiam percepções.",
    digital: "Minha arte digital combina tecnologia e criatividade, explorando as possibilidades ilimitadas do meio digital para criar experiências visuais inovadoras.",
    instalacao: "Minhas instalações são experiências imersivas que transformam espaços e convidam o espectador a fazer parte da obra.",
    fotografia: "Através da fotografia, capturo momentos e perspectivas únicas, revelando beleza em detalhes muitas vezes despercebidos.",
    desenhos: "Através do desenho, exploro a essência da forma e da linha, desde estudos detalhados até expressões mais livres e espontâneas.",
    pintura_tela: "Minhas pinturas em tela exploram texturas e camadas, criando profundidade e dimensão através de técnicas tradicionais e experimentais.",
    pintura_papel: "A delicadeza do papel como suporte permite uma fluidez única nas minhas pinturas, explorando a transparência e leveza das cores.",
    arquivos: "Uma seleção de obras históricas do meu acervo pessoal, representando diferentes fases e experimentações ao longo da minha trajetória artística."
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Carregar descrições das categorias do localStorage
    const savedDescriptions = localStorage.getItem('categoryDescriptions');
    if (savedDescriptions) {
      try {
        const parsedData = JSON.parse(savedDescriptions);
        setCategoryDescriptions(prev => ({
          ...prev,
          ...parsedData
        }));
      } catch (error) {
        console.error("Erro ao carregar descrições das categorias:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredArtworks(artworks);
    } else {
      setFilteredArtworks(artworks.filter(artwork => artwork.category === selectedCategory));
    }
  }, [selectedCategory]);

  // Obter categorias que possuem obras
  const categoriesWithArtworks = ["all", ...Array.from(new Set(artworks.map(artwork => artwork.category)))];
  
  const categories: { value: Category; label: string }[] = [
    { value: "all", label: "Todos" },
    { value: "pintura", label: "Pintura" },
    { value: "pintura_tela", label: "Pintura em Tela" },
    { value: "pintura_papel", label: "Pintura em Papel" },
    { value: "escultura", label: "Escultura" },
    { value: "digital", label: "Arte Digital" },
    { value: "instalacao", label: "Instalação" },
    { value: "fotografia", label: "Fotografia" },
    { value: "desenhos", label: "Desenhos" },
    { value: "arquivos", label: "Obras de Arquivos" },
  ].filter(category => category.value === "all" || categoriesWithArtworks.includes(category.value));

  return (
    <div className="py-16">
      <div className="container-custom">
        <h1 className="section-title text-center mb-16">Portfólio</h1>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 max-w-4xl mx-auto">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              className="rounded-full text-sm md:text-base px-3 py-1 h-auto mb-2"
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </Button>
          ))}
        </div>
        
        {/* Category Description */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <p className="text-lg italic text-muted-foreground transition-opacity duration-300 ease-in-out">
            {categoryDescriptions[selectedCategory]}
          </p>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-all duration-300 ease-in-out">
          {filteredArtworks.map((artwork) => (
            <div 
              key={artwork.id} 
              className="group cursor-pointer transition-all duration-300 ease-in-out hover:translate-y-[-5px]"
              onClick={() => setSelectedArtwork(artwork)}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                <img 
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-playfair text-xl">{artwork.title}</h3>
              <p className="text-sm text-muted-foreground">
                {artwork.technique}, {artwork.year}
              </p>
            </div>
          ))}
        </div>
        
        {/* Modal for artwork details */}
        {selectedArtwork && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedArtwork(null)}
          >
            <div 
              className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-[50vh] md:h-auto">
                  <img 
                    src={selectedArtwork.imageUrl}
                    alt={selectedArtwork.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 space-y-4">
                  <button 
                    onClick={() => setSelectedArtwork(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-background/80 text-foreground hover:bg-accent/50 transition-colors"
                  >
                    ✕
                  </button>
                  <h2 className="text-2xl md:text-3xl font-playfair">{selectedArtwork.title}</h2>
                  <p className="text-muted-foreground">{selectedArtwork.year}</p>
                  <div className="pt-4 space-y-2">
                    <p><span className="font-medium">Técnica:</span> {selectedArtwork.technique}</p>
                    <p><span className="font-medium">Dimensões:</span> {selectedArtwork.dimensions}</p>
                    <p><span className="font-medium">Categoria:</span> {categories.find(c => c.value === selectedArtwork.category)?.label}</p>
                  </div>
                  <div className="pt-6">
                    <p className="text-lg">
                      Esta obra explora temas de conexão e transformação, convidando o espectador a refletir sobre as relações entre o natural e o artificial.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
