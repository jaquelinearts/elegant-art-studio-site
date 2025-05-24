import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

// Definir o tipo Category igual ao do Portfolio.tsx
type Category = "all" | "pintura" | "escultura" | "digital" | "instalacao" | "fotografia" | "desenhos" | "pintura_tela" | "pintura_papel" | "arquivos";

export function AdminSiteContent() {
  const [heroTitle, setHeroTitle] = useState("Hello");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Sou uma artista contemporânea explorando as fronteiras entre o tradicional e o digital."
  );
  const [aboutText, setAboutText] = useState(
    "Informações sobre o site e a artista..."
  );
  
  // Footer content state
  const [footerTitle, setFooterTitle] = useState("Jaqueline FineArt");
  const [footerDescription, setFooterDescription] = useState(
    "Criando arte contemporânea e inovadora que inspira e transforma espaços."
  );
  const [footerEmail, setFooterEmail] = useState("contato@jaquelinefineart.com");
  const [footerPhone, setFooterPhone] = useState("+55 (11) 99999-9999");
  const [footerAddress, setFooterAddress] = useState("São Paulo, Brasil");
  const [footerCopyright, setFooterCopyright] = useState(
    `© ${new Date().getFullYear()} Jaqueline FineArt. Todos os direitos reservados.`
  );
  
  // Social links state
  const [socialLinks, setSocialLinks] = useState({
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com"
  });
  
  // Social links visibility state
  const [socialLinksVisibility, setSocialLinksVisibility] = useState({
    instagram: true,
    facebook: true,
    twitter: true,
    linkedin: true,
    youtube: true
  });

  // Category descriptions state
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

  // Effect to load saved data from localStorage when component mounts
  useEffect(() => {
    const savedFooterData = localStorage.getItem('footerContent');
    if (savedFooterData) {
      try {
        const parsedData = JSON.parse(savedFooterData);
        setFooterTitle(parsedData.title || "Jaqueline FineArt");
        setFooterDescription(parsedData.description || "Criando arte contemporânea e inovadora que inspira e transforma espaços.");
        setFooterEmail(parsedData.email || "contato@jaquelinefineart.com");
        setFooterPhone(parsedData.phone || "+55 (11) 99999-9999");
        setFooterAddress(parsedData.address || "São Paulo, Brasil");
        setFooterCopyright(parsedData.copyright || `© ${new Date().getFullYear()} Jaqueline FineArt. Todos os direitos reservados.`);
        
        if (parsedData.socialLinks) {
          setSocialLinks({
            instagram: parsedData.socialLinks.instagram || "https://instagram.com",
            facebook: parsedData.socialLinks.facebook || "https://facebook.com",
            twitter: parsedData.socialLinks.twitter || "https://twitter.com",
            linkedin: parsedData.socialLinks.linkedin || "https://linkedin.com",
            youtube: parsedData.socialLinks.youtube || "https://youtube.com"
          });
        }
        
        if (parsedData.socialLinksVisibility) {
          setSocialLinksVisibility(parsedData.socialLinksVisibility);
        }
      } catch (error) {
        console.error("Error parsing footer data:", error);
      }
    }

    // Carregar descrições das categorias
    const savedCategoryDescriptions = localStorage.getItem('categoryDescriptions');
    if (savedCategoryDescriptions) {
      try {
        const parsedData = JSON.parse(savedCategoryDescriptions);
        setCategoryDescriptions(prev => ({
          ...prev,
          ...parsedData
        }));
      } catch (error) {
        console.error("Erro ao carregar descrições das categorias:", error);
      }
    }
  }, []);

  const handleSave = () => {
    // Save the footer content to localStorage
    const footerData = {
      title: footerTitle,
      description: footerDescription,
      email: footerEmail,
      phone: footerPhone,
      address: footerAddress,
      copyright: footerCopyright,
      socialLinks,
      socialLinksVisibility
    };
    localStorage.setItem('footerContent', JSON.stringify(footerData));
    
    // Save category descriptions
    localStorage.setItem('categoryDescriptions', JSON.stringify(categoryDescriptions));
    
    // Display success toast
    toast({
      title: "Alterações salvas",
      description: "O conteúdo do site foi atualizado com sucesso.",
    });
  };
  
  const handleSocialLinkChange = (network: keyof typeof socialLinks, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [network]: value
    }));
  };
  
  const handleSocialVisibilityChange = (network: keyof typeof socialLinksVisibility) => {
    setSocialLinksVisibility(prev => ({
      ...prev,
      [network]: !prev[network]
    }));
  };

  const handleCategoryDescriptionChange = (category: Category, value: string) => {
    setCategoryDescriptions(prev => ({
      ...prev,
      [category]: value
    }));
  };

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
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-beige">Editar Conteúdo do Site</CardTitle>
        <CardDescription>
          Atualize os textos principais exibidos no site.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="general">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="general">Conteúdo Geral</TabsTrigger>
            <TabsTrigger value="portfolio">Portfólio</TabsTrigger>
            <TabsTrigger value="footer">Rodapé</TabsTrigger>
            <TabsTrigger value="social">Redes Sociais</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="hero-title">Título da Página Inicial</Label>
              <Input
                id="hero-title"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hero-subtitle">Subtítulo da Página Inicial</Label>
              <Textarea
                id="hero-subtitle"
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="about-text">Texto da Página Sobre</Label>
              <Textarea
                id="about-text"
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                rows={5}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="portfolio" className="space-y-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Descrições das Categorias do Portfólio</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Personalize os textos que aparecem para cada categoria no portfólio.
              </p>
              
              <Tabs defaultValue="all" className="w-full">
                <div className="overflow-x-auto pb-2">
                  <TabsList className="flex flex-wrap gap-2 mb-6 h-auto bg-transparent min-w-max">
                    {categories.map((category) => (
                      <TabsTrigger 
                        key={category.value} 
                        value={category.value}
                        className="px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base rounded-full border border-muted 
                          data-[state=active]:bg-primary data-[state=active]:text-primary-foreground 
                          data-[state=active]:shadow-sm data-[state=active]:font-medium
                          transition-all duration-200"
                      >
                        {category.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                {categories.map((category) => (
                  <TabsContent 
                    key={category.value} 
                    value={category.value} 
                    className="mt-4 border rounded-lg p-4 shadow-sm transition-all duration-200"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-2 mb-2">
                        <h4 className="text-md font-medium">{category.label}</h4>
                      </div>
                      <Textarea
                        id={`category-${category.value}`}
                        value={categoryDescriptions[category.value]}
                        onChange={(e) => handleCategoryDescriptionChange(category.value, e.target.value)}
                        rows={5}
                        className="mb-1"
                        placeholder={`Descrição para a categoria ${category.label}...`}
                      />
                      <p className="text-xs text-muted-foreground">
                        Este texto será exibido quando a categoria {category.label} estiver selecionada.
                      </p>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </TabsContent>
          
          <TabsContent value="footer" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="footer-title">Título do Rodapé</Label>
              <Input
                id="footer-title"
                value={footerTitle}
                onChange={(e) => setFooterTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="footer-description">Descrição do Rodapé</Label>
              <Textarea
                id="footer-description"
                value={footerDescription}
                onChange={(e) => setFooterDescription(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="footer-email">Email</Label>
                <Input
                  id="footer-email"
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="footer-phone">Telefone</Label>
                <Input
                  id="footer-phone"
                  value={footerPhone}
                  onChange={(e) => setFooterPhone(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="footer-address">Endereço</Label>
              <Input
                id="footer-address"
                value={footerAddress}
                onChange={(e) => setFooterAddress(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="footer-copyright">Texto de Copyright</Label>
              <Input
                id="footer-copyright"
                value={footerCopyright}
                onChange={(e) => setFooterCopyright(e.target.value)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="social" className="space-y-6">
            <div className="mb-6">
              <h3 className="font-medium mb-3">Visibilidade das Redes Sociais</h3>
              <p className="text-sm text-muted-foreground mb-4">Selecione quais redes sociais devem aparecer no rodapé do site.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="show-instagram" 
                    checked={socialLinksVisibility.instagram} 
                    onCheckedChange={() => handleSocialVisibilityChange("instagram")}
                  />
                  <label
                    htmlFor="show-instagram"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Instagram
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="show-facebook" 
                    checked={socialLinksVisibility.facebook} 
                    onCheckedChange={() => handleSocialVisibilityChange("facebook")}
                  />
                  <label
                    htmlFor="show-facebook"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Facebook
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="show-twitter" 
                    checked={socialLinksVisibility.twitter} 
                    onCheckedChange={() => handleSocialVisibilityChange("twitter")}
                  />
                  <label
                    htmlFor="show-twitter"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Twitter
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="show-linkedin" 
                    checked={socialLinksVisibility.linkedin} 
                    onCheckedChange={() => handleSocialVisibilityChange("linkedin")}
                  />
                  <label
                    htmlFor="show-linkedin"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    LinkedIn
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="show-youtube" 
                    checked={socialLinksVisibility.youtube} 
                    onCheckedChange={() => handleSocialVisibilityChange("youtube")}
                  />
                  <label
                    htmlFor="show-youtube"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    YouTube
                  </label>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={socialLinks.instagram}
                  onChange={(e) => handleSocialLinkChange("instagram", e.target.value)}
                  placeholder="https://instagram.com/seu_perfil"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={socialLinks.facebook}
                  onChange={(e) => handleSocialLinkChange("facebook", e.target.value)}
                  placeholder="https://facebook.com/sua_pagina"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={socialLinks.twitter}
                  onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
                  placeholder="https://twitter.com/seu_perfil"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={socialLinks.linkedin}
                  onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/seu_perfil"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube</Label>
                <Input
                  id="youtube"
                  value={socialLinks.youtube}
                  onChange={(e) => handleSocialLinkChange("youtube", e.target.value)}
                  placeholder="https://youtube.com/@seu_canal"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="ml-auto">
          Salvar Alterações
        </Button>
      </CardFooter>
    </Card>
  );
}
