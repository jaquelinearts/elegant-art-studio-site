import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, X, Upload, Trash } from "lucide-react";

type Category = "pintura-tela" | "pintura-papel" | "desenhos" | "obras-arquivo";

type ArtWork = {
  id: number;
  title: string;
  category: Category;
  year: string;
  imageUrl: string;
  dimensions: string;
  technique: string;
  additionalImages?: string[]; // Campo para imagens adicionais
};

// Dados de exemplo do portfólio
const initialArtworks: ArtWork[] = [
  {
    id: 1,
    title: "Fragmentos do Tempo",
    category: "pintura-tela",
    year: "2023",
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    dimensions: "120 x 90 cm",
    technique: "Óleo sobre tela",
    additionalImages: [
      "https://images.unsplash.com/photo-1517697471339-4aa32003c11a",
      "https://images.unsplash.com/photo-1579783900882-c0d08dad4e67"
    ]
  },
  {
    id: 2,
    title: "Memória Coletiva",
    category: "pintura-tela",
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
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [uploadingAdditional, setUploadingAdditional] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const additionalFileInputRef = useRef<HTMLInputElement>(null);
  
  const emptyArtwork: ArtWork = {
    id: Math.max(0, ...artworks.map(a => a.id)) + 1,
    title: "",
    category: "pintura-tela",
    year: new Date().getFullYear().toString(),
    imageUrl: "",
    dimensions: "",
    technique: ""
  };

  const handleEdit = (artwork: ArtWork) => {
    setEditingArtwork(artwork);
    setNewArtwork(false);
    setUploadedImage(null);
    setAdditionalImages(artwork.additionalImages || []);
  };

  const handleNew = () => {
    setEditingArtwork(emptyArtwork);
    setNewArtwork(true);
    setUploadedImage(null);
    setAdditionalImages([]);
  };

  const handleCancel = () => {
    setEditingArtwork(null);
    setNewArtwork(false);
    setUploadedImage(null);
    setAdditionalImages([]);
  };

  const handleSave = () => {
    if (!editingArtwork) return;
    
    // If we have a newly uploaded image, use that instead of the URL
    const finalArtwork = {
      ...editingArtwork,
      imageUrl: uploadedImage || editingArtwork.imageUrl,
      additionalImages: additionalImages.length > 0 ? additionalImages : undefined
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
    
    if (field === "imageUrl") {
      setUploadedImage(null); // Limpa a imagem carregada quando uma URL é inserida
    }
    
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

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "A imagem deve ter no máximo 10MB.",
        variant: "destructive"
      });
      return;
    }

    // Mostrar feedback ao usuário
    toast({
      title: "Processando imagem",
      description: "Aguarde enquanto a imagem está sendo processada..."
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        setUploadedImage(result);
        if (editingArtwork) {
          setEditingArtwork({
            ...editingArtwork,
            imageUrl: "" // Limpa a URL quando uma imagem é carregada
          });

          // Limpar o campo de URL
          const urlInput = document.getElementById('imageUrl') as HTMLInputElement;
          if (urlInput) {
            urlInput.value = '';
          }

          toast({
            title: "Imagem carregada",
            description: "A imagem foi carregada com sucesso."
          });
        }
      }
    };
    
    reader.readAsDataURL(file);
  };

    // Funções de crop removidas pois não são mais necessárias

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerAdditionalFileInput = () => {
    additionalFileInputRef.current?.click();
  };
  
  const handleAdditionalImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Verificar se não ultrapassará o limite de 5 imagens
    if (additionalImages.length + files.length > 5) {
      toast({
        title: "Limite de imagens",
        description: "Você pode adicionar no máximo 5 imagens adicionais.",
        variant: "destructive"
      });
      return;
    }

    setUploadingAdditional(true);
    
    // Array para armazenar as promessas de leitura dos arquivos
    const fileReadPromises: Promise<string>[] = [];
    
    // Para cada arquivo selecionado
    Array.from(files).forEach(file => {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Erro no upload",
          description: "Por favor, selecione apenas arquivos de imagem válidos.",
          variant: "destructive"
        });
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "Cada imagem deve ter no máximo 5MB.",
          variant: "destructive"
        });
        return;
      }
      
      // Criar uma promessa para ler o arquivo
      const filePromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (typeof result === 'string') {
            resolve(result);
          }
        };
        reader.readAsDataURL(file);
      });
      
      fileReadPromises.push(filePromise);
    });
    
    // Quando todas as leituras forem concluídas
    Promise.all(fileReadPromises).then(results => {
      setAdditionalImages(prev => [...prev, ...results]);
      
      // Reset the file input
      if (additionalFileInputRef.current) {
        additionalFileInputRef.current.value = "";
      }
      
      toast({
        title: "Imagens adicionais carregadas",
        description: `${results.length} imagem(ns) adicional(is) foi(foram) carregada(s) com sucesso.`
      });
      
      setUploadingAdditional(false);
    });
  };
  
  const handleRemoveAdditionalImage = (index: number) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
    
    toast({
      title: "Imagem adicional removida",
      description: "A imagem adicional foi removida com sucesso."
    });
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
                    <SelectItem value="pintura-tela">Pintura em tela</SelectItem>
                    <SelectItem value="pintura-papel">Pintura em papel</SelectItem>
                    <SelectItem value="desenhos">Desenhos</SelectItem>
                    <SelectItem value="obras-arquivo">Obras de Arquivos</SelectItem>
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
                <div 
                  className={`mt-2 border-2 ${!uploadedImage && !editingArtwork?.imageUrl ? 'border-dashed' : 'border-solid'} rounded bg-background relative transition-all duration-200`}
                  onDragOver={(e) => {
                    // Só permitir drag over se não houver imagem
                    if (!uploadedImage && !editingArtwork?.imageUrl) {
                      e.preventDefault();
                      e.stopPropagation();
                      e.currentTarget.classList.add('border-beige', 'bg-beige/5');
                    }
                  }}
                  onDragLeave={(e) => {
                    // Só processar se não houver imagem
                    if (!uploadedImage && !editingArtwork?.imageUrl) {
                      e.preventDefault();
                      e.stopPropagation();
                      e.currentTarget.classList.remove('border-beige', 'bg-beige/5');
                    }
                  }}
                  onDrop={(e) => {
                    // Só permitir drop se não houver imagem
                    if (!uploadedImage && !editingArtwork?.imageUrl) {
                      e.preventDefault();
                      e.stopPropagation();
                      e.currentTarget.classList.remove('border-beige', 'bg-beige/5');
                      
                      const file = e.dataTransfer.files[0];
                      if (file && file.type.startsWith('image/')) {
                        // Simular o upload como se fosse pelo input
                        const dataTransfer = new DataTransfer();
                        dataTransfer.items.add(file);
                        if (fileInputRef.current) {
                          fileInputRef.current.files = dataTransfer.files;
                          handleImageUpload({ target: { files: dataTransfer.files } } as any);
                        }
                      } else {
                        toast({
                          title: "Arquivo inválido",
                          description: "Por favor, arraste apenas arquivos de imagem.",
                          variant: "destructive"
                        });
                      }
                    } else {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                >
                  {(uploadedImage || editingArtwork?.imageUrl) ? (
                    <>
                      <div className="p-4 flex items-center justify-center">
                        <img 
                          src={uploadedImage || editingArtwork?.imageUrl} 
                          alt="Pré-visualização" 
                          className="w-auto h-auto"
                          style={{ maxWidth: '100%', maxHeight: '600px', objectFit: 'contain' }}
                        />
                      </div>
                      <div className="absolute top-2 right-2">
                        <Button 
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={handleDeleteImage}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div 
                      className="flex flex-col items-center justify-center py-16 text-muted-foreground cursor-pointer hover:bg-accent/10 transition-colors"
                      onClick={triggerFileInput}
                    >
                      <Upload className="w-8 h-8 mb-2 opacity-50" />
                      <span className="text-center px-4">Arraste uma imagem ou clique para selecionar</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Tamanho recomendado: 1200x900 pixels (proporção 4:3)
                </p>
              </div>
              
              {/* Imagens adicionais */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <Label>Imagens Adicionais ({additionalImages.length}/5)</Label>
                  <Button 
                    type="button" 
                    variant="outline"
                    size="sm"
                    onClick={triggerAdditionalFileInput}
                    disabled={uploadingAdditional || additionalImages.length >= 5}
                  >
                    <Upload className="w-4 h-4 mr-2" /> Adicionar
                  </Button>
                  <input
                    type="file"
                    ref={additionalFileInputRef}
                    onChange={handleAdditionalImageUpload}
                    accept="image/*"
                    className="hidden"
                    multiple
                  />
                </div>
                
                {additionalImages.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {additionalImages.map((img, index) => (
                      <div key={index} className="border rounded overflow-hidden relative">
                        <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden">
                          <img 
                            src={img} 
                            alt={`Imagem adicional ${index + 1}`} 
                            className="w-auto h-auto max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div className="absolute top-2 right-2 bg-white/70 rounded-full">
                          <Button 
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="h-6 w-6 p-0"
                            onClick={() => handleRemoveAdditionalImage(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border rounded p-4 text-center text-muted-foreground">
                    Nenhuma imagem adicional
                  </div>
                )}
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
              <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden">
                <img 
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-auto h-auto max-w-full max-h-full object-contain"
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
