
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export function AdminSiteContent() {
  const [heroTitle, setHeroTitle] = useState("Hello");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Sou uma artista contemporânea explorando as fronteiras entre o tradicional e o digital."
  );
  const [aboutText, setAboutText] = useState(
    "Informações sobre o site e a artista..."
  );
  const [footerText, setFooterText] = useState(
    "© 2023 ARTE. Todos os direitos reservados."
  );

  const handleSave = () => {
    // Aqui seria implementada a lógica para salvar no backend
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
        
        <div className="space-y-2">
          <Label htmlFor="footer-text">Texto do Rodapé</Label>
          <Input
            id="footer-text"
            value={footerText}
            onChange={(e) => setFooterText(e.target.value)}
          />
        </div>
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
