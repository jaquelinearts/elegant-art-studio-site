
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function AdminSiteContent() {
  const [heroTitle, setHeroTitle] = useState("Hello");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Sou uma artista contemporânea explorando as fronteiras entre o tradicional e o digital."
  );
  const [aboutText, setAboutText] = useState(
    "Informações sobre o site e a artista..."
  );
  
  // Footer content state
  const [footerTitle, setFooterTitle] = useState("ARTE");
  const [footerDescription, setFooterDescription] = useState(
    "Criando arte contemporânea e inovadora que inspira e transforma espaços."
  );
  const [footerEmail, setFooterEmail] = useState("contato@arteexemplo.com");
  const [footerPhone, setFooterPhone] = useState("+55 (11) 99999-9999");
  const [footerAddress, setFooterAddress] = useState("São Paulo, Brasil");
  const [footerCopyright, setFooterCopyright] = useState(
    `© ${new Date().getFullYear()} ARTE. Todos os direitos reservados.`
  );

  // Effect to load saved data from localStorage when component mounts
  useEffect(() => {
    const savedFooterData = localStorage.getItem('footerContent');
    if (savedFooterData) {
      const parsedData = JSON.parse(savedFooterData);
      setFooterTitle(parsedData.title || "ARTE");
      setFooterDescription(parsedData.description || "Criando arte contemporânea e inovadora que inspira e transforma espaços.");
      setFooterEmail(parsedData.email || "contato@arteexemplo.com");
      setFooterPhone(parsedData.phone || "+55 (11) 99999-9999");
      setFooterAddress(parsedData.address || "São Paulo, Brasil");
      setFooterCopyright(parsedData.copyright || `© ${new Date().getFullYear()} ARTE. Todos os direitos reservados.`);
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
      copyright: footerCopyright
    };
    localStorage.setItem('footerContent', JSON.stringify(footerData));
    
    // Display success toast
    toast({
      title: "Alterações salvas",
      description: "O conteúdo do site foi atualizado com sucesso.",
    });
  };

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
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="general">Conteúdo Geral</TabsTrigger>
            <TabsTrigger value="footer">Rodapé</TabsTrigger>
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
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSave} 
          className="w-full md:w-auto bg-beige hover:bg-beige/90 text-foreground"
        >
          Salvar Alterações
        </Button>
      </CardFooter>
    </Card>
  );
}
