
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Store from "./pages/Store";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

// Protect routes that require authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  const [loading, setLoading] = useState(true);
  
  // Check auth status on app load
  useEffect(() => {
    // Just to simulate checking auth status
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-20">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sobre-mim" element={<About />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/loja" element={<Store />} />
                <Route path="/contato" element={<Contact />} />
                <Route path="/produto/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
