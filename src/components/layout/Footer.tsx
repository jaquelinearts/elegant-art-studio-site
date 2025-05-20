

import { NavLink } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-background py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-playfair text-xl mb-4 text-beige">ARTE</h3>
            <p className="text-muted-foreground max-w-xs">
              Criando arte contemporânea e inovadora que inspira e transforma espaços.
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
            </nav>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl mb-4 text-beige">Contato</h3>
            <address className="not-italic text-muted-foreground">
              <p>São Paulo, Brasil</p>
              <p className="mt-2">contato@arteexemplo.com</p>
              <p className="mt-2">+55 (11) 99999-9999</p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ARTE. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
