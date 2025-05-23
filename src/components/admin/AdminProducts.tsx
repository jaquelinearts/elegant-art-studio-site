import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, X, Upload, Trash } from "lucide-react";

type ProductCategory = "pintura-exclusiva" | "arte-digital" | "fotografia" | "ebook" | "encomendas";

type Product = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
  available: boolean;
  description: string;
  additionalImages?: string[]; // Campo para imagens adicionais
};

// Dados de exemplo dos produtos
const initialProducts: Product[] = [
  {
    id: 1,
    title: "Horizonte Abstrato",
    price: 1200,
    imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
    category: "pintura-exclusiva",
    available: true,
    description: "Pintura abstrata em acrílica sobre tela, com tons azuis e dourados."
  },
  {
    id: 2,
    title: "Série Natureza #3",
    price: 850,
    imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
    category: "arte-digital",
    available: true,
    description: "Arte digital em alta resolução, impressa em papel de algodão. Edição limitada de 25 exemplares."
  },
  // ... outros produtos seriam carregados do banco de dados
];

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [uploadingAdditional, setUploadingAdditional] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const additionalFileInputRef = useRef<HTMLInputElement>(null);
  
  const emptyProduct: Product = {
    id: Math.max(0, ...products.map(p => p.id)) + 1,
    title: "",
    price: 0,
    imageUrl: "",
    category: "pintura-exclusiva",
    available: true,
    description: ""
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setNewProduct(false);
    setAdditionalImages(product.additionalImages || []);
  };

  const handleNew = () => {
    setEditingProduct(emptyProduct);
    setNewProduct(true);
    setAdditionalImages([]);
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setNewProduct(false);
    setAdditionalImages([]);
  };

  const handleSave = () => {
    if (!editingProduct) return;
    
    const finalProduct = {
      ...editingProduct,
      additionalImages: additionalImages.length > 0 ? additionalImages : undefined
    };
    
    if (newProduct) {
      setProducts([...products, finalProduct]);
      toast({
        title: "Produto adicionado",
        description: "O novo produto foi adicionado à loja com sucesso."
      });
    } else {
      setProducts(products.map(p => p.id === finalProduct.id ? finalProduct : p));
      toast({
        title: "Produto atualizado",
        description: "O produto foi atualizado com sucesso."
      });
    }
    
    setEditingProduct(null);
    setNewProduct(false);
    setAdditionalImages([]);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Produto removido",
      description: "O produto foi removido da loja."
    });
  };

  const handleChange = (field: keyof Product, value: any) => {
    if (!editingProduct) return;
    
    if (field === "imageUrl") {
      setUploadedImage(null); // Limpa a imagem carregada quando uma URL é inserida
    }
    
    setEditingProduct({
      ...editingProduct,
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
        if (editingProduct) {
          setEditingProduct({
            ...editingProduct,
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

  const handleDeleteImage = () => {
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
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
        <h2 className="text-2xl font-playfair text-beige">Gerenciar Produtos</h2>
        <Button 
          onClick={handleNew}
          className="bg-beige hover:bg-beige/90 text-foreground"
        >
          <Plus className="w-4 h-4 mr-2" /> Adicionar Novo Produto
        </Button>
      </div>
      
      {editingProduct ? (
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-playfair mb-4">
            {newProduct ? "Adicionar Novo Produto" : "Editar Produto"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input 
                  id="title" 
                  value={editingProduct.title} 
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="price">Preço (R$)</Label>
                <Input 
                  id="price" 
                  type="number"
                  min="0"
                  step="0.01"
                  value={editingProduct.price} 
                  onChange={(e) => handleChange("price", parseFloat(e.target.value))}
                />
              </div>
              
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select 
                  value={editingProduct.category}
                  onValueChange={(value: ProductCategory) => handleChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pintura-exclusiva">Pintura Exclusiva</SelectItem>
                    <SelectItem value="arte-digital">Arte Digital</SelectItem>
                    <SelectItem value="fotografia">Fotografia</SelectItem>
                    <SelectItem value="ebook">Ebook</SelectItem>
                    <SelectItem value="encomendas">Encomendas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="available"
                  checked={editingProduct.available}
                  onCheckedChange={(checked) => handleChange("available", checked)}
                />
                <Label htmlFor="available">Disponível para venda</Label>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea 
                  id="description" 
                  value={editingProduct.description} 
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="imageUrl">URL da Imagem</Label>
                <div className="flex gap-2">
                  <Input 
                    id="imageUrl" 
                    value={editingProduct.imageUrl} 
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
                  className={`mt-2 border-2 ${!uploadedImage && !editingProduct?.imageUrl ? 'border-dashed' : 'border-solid'} rounded bg-background relative transition-all duration-200`}
                  onDragOver={(e) => {
                    // Só permitir drag over se não houver imagem
                    if (!uploadedImage && !editingProduct?.imageUrl) {
                      e.preventDefault();
                      e.stopPropagation();
                      e.currentTarget.classList.add('border-beige', 'bg-beige/5');
                    }
                  }}
                  onDragLeave={(e) => {
                    // Só processar se não houver imagem
                    if (!uploadedImage && !editingProduct?.imageUrl) {
                      e.preventDefault();
                      e.stopPropagation();
                      e.currentTarget.classList.remove('border-beige', 'bg-beige/5');
                    }
                  }}
                  onDrop={(e) => {
                    // Só permitir drop se não houver imagem
                    if (!uploadedImage && !editingProduct?.imageUrl) {
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
                  {(uploadedImage || editingProduct?.imageUrl) ? (
                    <>
                      <div className="p-4 flex items-center justify-center">
                        <img 
                          src={uploadedImage || editingProduct?.imageUrl} 
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
                  Tamanho recomendado: 1000x1000 pixels (proporção 1:1)
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
                        <div className="aspect-square">
                          <img 
                            src={img} 
                            alt={`Imagem adicional ${index + 1}`} 
                            className="w-full h-full object-cover"
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
              disabled={!editingProduct.title || !editingProduct.imageUrl || editingProduct.price <= 0}
            >
              Salvar
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden bg-card">
              <div className="relative aspect-square">
                <img 
                  src={product.imageUrl} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {!product.available && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <p className="text-white font-medium text-lg">Esgotado</p>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-playfair text-xl truncate">{product.title}</h3>
                <p className="text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                <p className="font-medium">R$ {product.price.toLocaleString('pt-BR')}</p>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(product)}
                  >
                    <Pencil className="w-4 h-4 mr-2" /> Editar
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(product.id)}
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
