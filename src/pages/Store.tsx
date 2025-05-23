import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, ShoppingCart } from "lucide-react";

type ProductCategory = "all" | "pintura" | "gravura" | "impressao" | "objeto";

type Product = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  category: Exclude<ProductCategory, "all">;
  available: boolean;
  description: string;
};

const products: Product[] = [
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
  {
    id: 3,
    title: "Reflexos Urbanos",
    price: 450,
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    category: "impressao",
    available: true,
    description: "Impressão fine art em papel arquival. Tamanho 60x90cm."
  },
  {
    id: 4,
    title: "Fragmento Escultural #2",
    price: 1800,
    imageUrl: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
    category: "objeto",
    available: true,
    description: "Escultura em bronze e madeira. Peça única assinada pelo artista."
  },
  {
    id: 5,
    title: "Fluido Cromático",
    price: 950,
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    category: "pintura",
    available: true,
    description: "Pintura abstrata com técnica mista sobre tela. Tamanho 70x100cm."
  },
  {
    id: 6,
    title: "Série Botânica #7",
    price: 380,
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    category: "gravura",
    available: false,
    description: "Gravura em linóleo com detalhes em aquarela. Edição limitada de 15 exemplares."
  }
];

type CartItem = {
  product: Product;
  quantity: number;
};

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let result = products;
    
    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchQuery]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories: { value: ProductCategory; label: string }[] = [
    { value: "all", label: "Todos" },
    { value: "pintura", label: "Pinturas" },
    { value: "gravura", label: "Gravuras" },
    { value: "impressao", label: "Impressões" },
    { value: "objeto", label: "Objetos" },
  ];

  return (
    <div className="py-16">
      <div className="container-custom">
        <h1 className="section-title text-center mb-16">Loja</h1>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden bg-card">
              <div 
                className="relative aspect-square cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <img 
                  src={product.imageUrl} 
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
                {!product.available && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <p className="text-white font-medium text-lg">Esgotado</p>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-playfair text-xl truncate">{product.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <p className="font-medium">R$ {product.price.toLocaleString('pt-BR')}</p>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => addToCart(product)}
                    disabled={!product.available}
                  >
                    Adicionar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-xl text-muted-foreground">Nenhum produto encontrado.</p>
          </div>
        )}
        
        {/* Shopping Cart Button (Fixed) */}
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold">
              {cartCount}
            </span>
          )}
        </Button>
        
        {/* Shopping Cart Sidebar */}
        {isCartOpen && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
            <div className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-background shadow-xl flex flex-col">
              <div className="p-6 flex items-center justify-between border-b">
                <h2 className="font-playfair text-2xl">Seu Carrinho</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-accent/50"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex-1 overflow-auto p-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Seu carrinho está vazio</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex gap-4">
                        <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.product.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            R$ {item.product.price.toLocaleString('pt-BR')}
                          </p>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center rounded border"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center rounded border"
                            >
                              +
                            </button>
                            <button 
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-sm text-muted-foreground ml-auto hover:text-destructive"
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-6 border-t">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">R$ {cartTotal.toLocaleString('pt-BR')}</span>
                </div>
                <Button className="w-full" disabled={cart.length === 0}>
                  Finalizar Compra
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continuar Comprando
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Product Modal */}
        {selectedProduct && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <div 
              className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-[50vh] md:h-auto">
                  <img 
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 space-y-4">
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-background/80 text-foreground hover:bg-accent/50 transition-colors"
                  >
                    ✕
                  </button>
                  <h2 className="text-2xl md:text-3xl font-playfair">{selectedProduct.title}</h2>
                  <p className="text-xl font-medium">R$ {selectedProduct.price.toLocaleString('pt-BR')}</p>
                  
                  <Separator />
                  
                  <div className="py-2">
                    <p className="text-lg">{selectedProduct.description}</p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Categoria: {categories.find(c => c.value === selectedProduct.category)?.label}
                  </p>
                  
                  <div className="pt-4">
                    <Button
                      className="w-full"
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      disabled={!selectedProduct.available}
                    >
                      {selectedProduct.available ? 'Adicionar ao Carrinho' : 'Produto Esgotado'}
                    </Button>
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

export default Store;
