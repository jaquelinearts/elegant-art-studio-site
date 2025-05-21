
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminSiteContent } from "@/components/admin/AdminSiteContent";
import { AdminPortfolio } from "@/components/admin/AdminPortfolio";
import { AdminProducts } from "@/components/admin/AdminProducts";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Extra check for authentication
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    navigate("/login");
  };

  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h1 className="section-title">Painel Administrativo</h1>
          <button 
            onClick={handleLogout} 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sair
          </button>
        </div>
        
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Conteúdo do Site</TabsTrigger>
            <TabsTrigger value="portfolio">Portfólio</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="content">
              <AdminSiteContent />
            </TabsContent>
            <TabsContent value="portfolio">
              <AdminPortfolio />
            </TabsContent>
            <TabsContent value="products">
              <AdminProducts />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
