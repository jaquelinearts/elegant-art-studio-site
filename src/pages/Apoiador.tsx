import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Apoiador = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [pixQRVisible, setPixQRVisible] = useState(false);

  return (
    <div className="py-16">
      <div className="container-custom">
        <h1 className="section-title text-center mb-12">Seja um Apoiador</h1>
        
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg text-center mb-8">
            Sua contribuição é fundamental para que eu continue desenvolvendo meu trabalho artístico com liberdade e independência. Escolha a forma que preferir para apoiar:
          </p>
          
          <Tabs defaultValue="pix" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pix">Pix</TabsTrigger>
              <TabsTrigger value="paypal">PayPal</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pix" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Apoiar via Pix</CardTitle>
                  <CardDescription>
                    Transferência instantânea e sem taxas para contas brasileiras
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center justify-center">
                    {pixQRVisible ? (
                      <div className="p-4 bg-white rounded-lg mb-4">
                        {/* Este seria um QR code real em produção */}
                        <div className="w-48 h-48 bg-gradient-to-r from-accent to-beige/50 flex items-center justify-center">
                          <p className="text-xs text-foreground/80">QR Code Pix</p>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setPixQRVisible(true)}
                        className="bg-beige hover:bg-beige/90 text-foreground mb-4"
                      >
                        Mostrar QR Code
                      </Button>
                    )}
                    
                    <div className="text-center">
                      <p className="font-medium mb-1">Chave Pix:</p>
                      <p className="bg-muted p-2 rounded text-muted-foreground select-all">
                        exemplo@email.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="paypal" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Apoiar via PayPal</CardTitle>
                  <CardDescription>
                    Pagamento seguro aceito internacionalmente
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center justify-center">
                    <Button 
                      className="bg-[#0070BA] hover:bg-[#003087] text-white mb-4"
                      onClick={() => window.open('https://www.paypal.com', '_blank')}
                    >
                      Doar com PayPal
                    </Button>
                    
                    <p className="text-sm text-muted-foreground text-center">
                      Você será redirecionado para o site do PayPal para completar a doação com segurança.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="crypto" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Apoiar via Criptomoedas</CardTitle>
                  <CardDescription>
                    Transferência global e descentralizada
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-b pb-4">
                      <p className="font-medium mb-1">Bitcoin (BTC):</p>
                      <p className="bg-muted p-2 rounded text-xs text-muted-foreground break-all select-all">
                        bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                      </p>
                    </div>
                    
                    <div className="border-b pb-4">
                      <p className="font-medium mb-1">Ethereum (ETH):</p>
                      <p className="bg-muted p-2 rounded text-xs text-muted-foreground break-all select-all">
                        0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-1">USDT (Tether - ERC20):</p>
                      <p className="bg-muted p-2 rounded text-xs text-muted-foreground break-all select-all">
                        0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="bg-accent/20 p-8 rounded-lg max-w-3xl mx-auto">
          <h2 className="text-2xl font-playfair text-beige mb-4 text-center">Benefícios para Apoiadores</h2>
          <ul className="space-y-3 text-lg">
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-beige mr-3"></div>
              <span>Acesso antecipado a novas coleções e obras</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-beige mr-3"></div>
              <span>Descontos exclusivos em produtos da loja</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-beige mr-3"></div>
              <span>Conteúdo exclusivo sobre meu processo criativo</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-beige mr-3"></div>
              <span>Seu nome mencionado na página de agradecimentos</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-beige mr-3"></div>
              <span>Convites para eventos e exposições</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Apoiador; 