import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, X, Upload, Trash } from "lucide-react";

type Category = "pintura" | "escultura" | "digital" | "instalacao";

type ArtWork = {
  id: number;
  title: string;
  category: Category;
  year: string;
  imageUrl: string;
  dimensions: string;
  technique: string;
};

// Dados de exemplo do portfólio
const initialArtworks: ArtWork[] = [
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
  // ... outros itens seriam carregados do banco de dados
];

export function AdminPortfolio() {
  const [artworks, setArtworks] = useState<ArtWork[]>(initialArtworks);
  const [editingArtwork, setEditingArtwork] = useState<ArtWork | null>(null);
  const [newArtwork, setNewArtwork] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const emptyArtwork: ArtWork = {
    id: Math.max(0, ...artworks.map(a => a.id)) + 1,
    title: "",
    category: "pintura",
    year: new Date().getFullYear().toString(),
    imageUrl: "",
    dimensions: "",
    technique: ""
  };

  const handleEdit = (artwork: ArtWork) => {
    setEditingArtwork(artwork);
    setNewArtwork(false);
    setUploadedImage(null);
  };

  const handleNew = () => {
    setEditingArtwork(emptyArtwork);
    setNewArtwork(true);
    setUploadedImage(null);
  };

  const handleCancel = () => {
    setEditingArtwork(null);
    setNewArtwork(false);
    setUploadedImage(null);
  };

  const handleSave = () => {
    if (!editingArtwork) return;
    
    // If we have a newly uploaded image, use that instead of the URL
    const finalArtwork = {
      ...editingArtwork,
      imageUrl: uploadedImage || editingArtwork.imageUrl
    };
    
    if (newArtwork) {
      setArtworks([...artworks, finalArtwork]);
      toast({
        title: "Obra adicionada",
        description: "A nova obra foi adicionada ao portfólio com sucesso."
      });
    } else {
      setArtworks(artworks.map(a => a.id === finalArtwork.id ? finalArtwork : a));
      toast({
        title: "Obra atualizada",
        description: "A obra foi atualizada com sucesso."
      });
    }
    
    setEditingArtwork(null);
    setNewArtwork(false);
    setUploadedImage(null);
  };

  const handleDelete = (id: number) => {
    setArtworks(artworks.filter(a => a.id !== id));
    toast({
      title: "Obra removida",
      description: "A obra foi removida do portfólio."
    });
  };

  const handleDeleteImage = () => {
    if (editingArtwork) {
      setEditingArtwork({
        ...editingArtwork,
        imageUrl: ""
      });
      setUploadedImage(null);
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast({
        title: "Imagem removida",
        description: "A imagem foi removida com sucesso."
      });
    }
  };

  const handleChange = (field: keyof ArtWork, value: string) => {
    if (!editingArtwork) return;
    
    setEditingArtwork({
      ...editingArtwork,
      [field]: value
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Erro no upload",
        description: "Por favor, selecione um arquivo de imagem válido.",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "A imagem deve ter no máximo 5MB.",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        setUploadedImage(result);
        
        if (editingArtwork) {
          // Update the editing artwork with the new image URL
          setEditingArtwork({
            ...editingArtwork,
            imageUrl: result
          });
        }
      }
    };
    
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-playfair text-beige">Gerenciar Portfólio</h2>
        <Button 
          onClick={handleNew}
          className="bg-beige hover:bg-beige/90 text-foreground"
        >
          <Plus className="w-4 h-4 mr-2" /> Adicionar Nova Obra
        </Button>
      </div>
      
      {editingArtwork ? (
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-playfair mb-4">
            {newArtwork ? "Adicionar Nova Obra" : "Editar Obra"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input 
                  id="title" 
                  value={editingArtwork.title} 
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select 
                  value={editingArtwork.category}
                  onValueChange={(value: Category) => handleChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pintura">Pintura</SelectItem>
                    <SelectItem value="escultura">Escultura</SelectItem>
                    <SelectItem value="digital">Arte Digital</SelectItem>
                    <SelectItem value="instalacao">Instalação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="year">Ano</Label>
                <Input 
                  id="year" 
                  value={editingArtwork.year} 
                  onChange={(e) => handleChange("year", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="dimensions">Dimensões</Label>
                <Input 
                  id="dimensions" 
                  value={editingArtwork.dimensions} 
                  onChange={(e) => handleChange("dimensions", e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="technique">Técnica</Label>
                <Input 
                  id="technique" 
                  value={editingArtwork.technique} 
                  onChange={(e) => handleChange("technique", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="imageUrl">URL da Imagem</Label>
                <div className="flex gap-2">
                  <Input 
                    id="imageUrl" 
                    value={editingArtwork.imageUrl} 
                    onChange={(e) => handleChange("imageUrl", e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={triggerFileInput}
                    className="flex-shrink-0"
                  >
                    <Upload className="w-4 h-4 mr-2" /> Upload
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Label>Pré-visualização da Imagem</Label>
                <div className="mt-2 aspect-square border rounded overflow-hidden relative">
                  {(uploadedImage || editingArtwork.imageUrl) ? (
                    <>
                      <img 
                        src={uploadedImage || editingArtwork.imageUrl} 
                        alt="Pré-visualização" 
                        className="w-full h-full object-cover"
                      />
                      <Button 
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={handleDeleteImage}
                      >
                        <Trash className="w-4 h-4 mr-2" /> Excluir
                      </Button>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <span className="text-muted-foreground">Sem imagem</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-beige hover:bg-beige/90 text-foreground"
              disabled={!editingArtwork.title || !(uploadedImage || editingArtwork.imageUrl)}
            >
              Salvar
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <div key={artwork.id} className="border rounded-lg overflow-hidden bg-card">
              <div className="aspect-square">
                <img 
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-playfair text-xl">{artwork.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {artwork.technique}, {artwork.year}
                </p>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(artwork)}
                  >
                    <Pencil className="w-4 h-4 mr-2" /> Editar
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(artwork.id)}
                  >
                    <X className="w-4 h-4 mr-2" /> Remover
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
