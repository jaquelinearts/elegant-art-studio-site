
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

type FooterContent = {
  title: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  copyright: string;
};

export function Footer() {
  const [footerContent, setFooterContent] = useState<FooterContent>({
    title: "ARTE",
    description: "Criando arte contemporânea e inovadora que inspira e transforma espaços.",
    email: "contato@arteexemplo.com",
    phone: "+55 (11) 99999-9999",
    address: "São Paulo, Brasil",
    copyright: `© ${new Date().getFullYear()} ARTE. Todos os direitos reservados.`
  });

  // Get footer content from localStorage on component mount
  useEffect(() => {
    const savedFooterData = localStorage.getItem('footerContent');
    if (savedFooterData) {
      try {
        const parsedData = JSON.parse(savedFooterData);
        setFooterContent({
          title: parsedData.title || footerContent.title,
          description: parsedData.description || footerContent.description,
          email: parsedData.email || footerContent.email,
          phone: parsedData.phone || footerContent.phone,
          address: parsedData.address || footerContent.address,
          copyright: parsedData.copyright || footerContent.copyright
        });
      } catch (error) {
        console.error("Error parsing footer data:", error);
      }
    }
  }, []);

  return (
    <footer className="border-t bg-background py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-playfair text-xl mb-4 text-beige">{footerContent.title}</h3>
            <p className="text-muted-foreground max-w-xs">
              {footerContent.description}
            </p>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl mb-4 text-beige">Links</h3>
            <nav className="flex flex-col space-y-2">
              <NavLink to="/" className="text-muted-foreground hover:text-beige transition-colors">
                Home
              </NavLink>
              <NavLink to="/sobre-mim" className="text-muted-foreground hover:text-beige transition-colors">
                Sobre Mim
              </NavLink>
              <NavLink to="/portfolio" className="text-muted-foreground hover:text-beige transition-colors">
                Portfólio
              </NavLink>
              <NavLink to="/loja" className="text-muted-foreground hover:text-beige transition-colors">
                Loja
              </NavLink>
              <NavLink to="/contato" className="text-muted-foreground hover:text-beige transition-colors">
                Contato
              </NavLink>
              <NavLink to="/blog" className="text-muted-foreground hover:text-beige transition-colors">
                Blog
              </NavLink>
            </nav>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl mb-4 text-beige">Contato</h3>
            <address className="not-italic text-muted-foreground">
              <p>{footerContent.address}</p>
              <p className="mt-2">{footerContent.email}</p>
              <p className="mt-2">{footerContent.phone}</p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>{footerContent.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
