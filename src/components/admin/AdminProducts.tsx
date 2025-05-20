
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, X } from "lucide-react";

type ProductCategory = "pintura" | "gravura" | "impressao" | "objeto";

type Product = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
  available: boolean;
  description: string;
};

// Dados de exemplo dos produtos
const initialProducts: Product[] = [
  {
    id: 1,
    title: "Horizonte Abstrato",
    price: 1200,
    imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
    category: "pintura",
    available: true,
    description: "Pintura abstrata em acrílica sobre tela, com tons azuis e dourados."
  },
  {
    id: 2,
    title: "Série Natureza #3",
    price: 850,
    imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
    category: "gravura",
    available: true,
    description: "Gravura em metal, impressa em papel de algodão. Edição limitada de 25 exemplares."
  },
  // ... outros produtos seriam carregados do banco de dados
];

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState(false);
  
  const emptyProduct: Product = {
    id: Math.max(0, ...products.map(p => p.id)) + 1,
    title: "",
    price: 0,
    imageUrl: "",
    category: "pintura",
    available: true,
    description: ""
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setNewProduct(false);
  };

  const handleNew = () => {
    setEditingProduct(emptyProduct);
    setNewProduct(true);
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setNewProduct(false);
  };

  const handleSave = () => {
    if (!editingProduct) return;
    
    if (newProduct) {
      setProducts([...products, editingProduct]);
      toast({
        title: "Produto adicionado",
        description: "O novo produto foi adicionado à loja com sucesso."
      });
    } else {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      toast({
        title: "Produto atualizado",
        description: "O produto foi atualizado com sucesso."
      });
    }
    
    setEditingProduct(null);
    setNewProduct(false);
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
    
    setEditingProduct({
      ...editingProduct,
      [field]: value
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
                    <SelectItem value="pintura">Pinturas</SelectItem>
                    <SelectItem value="gravura">Gravuras</SelectItem>
                    <SelectItem value="impressao">Impressões</SelectItem>
                    <SelectItem value="objeto">Objetos</SelectItem>
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
                <Input 
                  id="imageUrl" 
                  value={editingProduct.imageUrl} 
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                />
              </div>
              
              <div className="mt-4">
                <Label>Pré-visualização da Imagem</Label>
                <div className="mt-2 aspect-square border rounded overflow-hidden">
                  {editingProduct.imageUrl ? (
                    <img 
                      src={editingProduct.imageUrl} 
                      alt="Pré-visualização" 
                      className="w-full h-full object-cover"
                    />
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
