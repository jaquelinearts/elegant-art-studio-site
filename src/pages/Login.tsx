
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { LockIcon } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // For demo purposes, using a simple hardcoded credential check
  // In a real application, this would use an authentication system
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (username === "admin" && password === "password") {
        // Set a session in localStorage (for demo only)
        localStorage.setItem("adminAuthenticated", "true");
        toast.success("Login realizado com sucesso!");
        navigate("/admin");
      } else {
        toast.error("Credenciais inválidas. Tente novamente.");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-playfair text-center text-beige">
            Área Administrativa
          </CardTitle>
          <CardDescription className="text-center">
            Entre com suas credenciais para acessar o painel administrativo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Usuário
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Senha
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleLogin} 
            disabled={isLoading} 
            className="w-full bg-beige hover:bg-beige/90 text-foreground"
          >
            {isLoading ? "Carregando..." : "Entrar"}
            {!isLoading && <LockIcon className="w-4 h-4 ml-2" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
