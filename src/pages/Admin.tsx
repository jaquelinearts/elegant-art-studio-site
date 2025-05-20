
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSiteContent } from "@/components/admin/AdminSiteContent";
import { AdminPortfolio } from "@/components/admin/AdminPortfolio";
import { AdminProducts } from "@/components/admin/AdminProducts";

const Admin = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-16">
      <div className="container-custom">
        <h1 className="section-title text-center mb-8">Painel Administrativo</h1>
        
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
