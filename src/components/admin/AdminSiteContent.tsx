import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

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
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="general">Conteúdo Geral</TabsTrigger>
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
