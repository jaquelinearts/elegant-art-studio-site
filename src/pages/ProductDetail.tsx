
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

// Tamanhos disponíveis para produtos
const sizes = ["P", "M", "G", "GG"];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dados simulados do produto baseado no ID
  const product = {
    id: Number(id),
    title: `Produto ${id}`,
    price: 150 + Number(id) * 50,
    description: "Impressão Giclée em papel fine art 100% algodão. Cada impressão é produzida individualmente com tintas pigmentadas de alta qualidade, garantindo cores vibrantes e duradouras. Esta é uma edição limitada, assinada e numerada pela artista.",
    details: [
      "Impressão Giclée em papel fine art",
      "Edição limitada de 25 unidades",
      "Assinada e numerada pela artista",
      "Inclui certificado de autenticidade",
      "Cores resistentes à luz por mais de 100 anos"
    ],
    imageUrl: `https://images.unsplash.com/photo-${id === "1" ? '1579783900882-c0d08dad4e67' : id === "2" ? '1460661382334-790a226d29d7' : id === "3" ? '1579762593392-999e5d2d851d' : '1534349762230-e0caac6a3154'}`
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleBuy = () => {
    alert(`Produto adicionado ao carrinho: ${quantity} unidade(s) do ${product.title}, tamanho ${selectedSize}`);
    // Aqui você poderia adicionar lógica para o carrinho e redirecionamento
  };

  return (
    <div className="py-16">
      <div className="container-custom">
        <Card className="overflow-hidden border-none shadow-none">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
              {/* Imagem do Produto */}
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Informações do Produto */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-playfair mb-2">{product.title}</h1>
                  <p className="text-2xl font-medium text-beige">
                    R$ {product.price.toLocaleString('pt-BR')}
                  </p>
                </div>
                
                <div className="border-t border-b py-6 space-y-6">
                  <div>
                    <p className="text-lg mb-4">{product.description}</p>
                    <ul className="space-y-2">
                      {product.details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-beige mr-2">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Seletor de Tamanho */}
                  <div className="space-y-3">
                    <label className="font-medium block">Tamanho</label>
                    <Select value={selectedSize} onValueChange={setSelectedSize}>
                      <SelectTrigger className="w-full md:w-1/3">
                        <SelectValue placeholder="Selecione um tamanho" />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size} value={size}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Seletor de Quantidade */}
                  <div className="space-y-3">
                    <label className="font-medium block">Quantidade</label>
                    <div className="flex items-center">
                      <button 
                        className="w-10 h-10 rounded-full border border-input flex items-center justify-center"
                        onClick={() => handleQuantityChange(quantity - 1)}
                      >
                        -
                      </button>
                      <span className="mx-4 w-8 text-center">{quantity}</span>
                      <button 
                        className="w-10 h-10 rounded-full border border-input flex items-center justify-center"
                        onClick={() => handleQuantityChange(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Botão de Compra */}
                <Button 
                  className="w-full md:w-2/3 h-14 text-lg rounded-full bg-beige hover:bg-beige/90 text-foreground font-medium"
                  onClick={handleBuy}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Comprar
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full md:w-2/3 rounded-full border-beige text-beige hover:bg-beige/10"
                  onClick={() => navigate('/loja')}
                >
                  Continuar Comprando
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
