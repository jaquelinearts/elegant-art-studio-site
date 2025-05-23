import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

type SocialLinks = {
  instagram: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  youtube: string;
}

type SocialLinksVisibility = {
  instagram: boolean;
  facebook: boolean;
  twitter: boolean;
  linkedin: boolean;
  youtube: boolean;
}

type FooterContent = {
  title: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  copyright: string;
  socialLinks: SocialLinks;
  socialLinksVisibility?: SocialLinksVisibility;
};

export function Footer() {
  const [footerContent, setFooterContent] = useState<FooterContent>({
    title: "Jaqueline FineArt",
    description: "Criando arte contemporânea e inovadora que inspira e transforma espaços.",
    email: "contato@jaquelinefineart.com",
    phone: "+55 (11) 99999-9999",
    address: "São Paulo, Brasil",
    copyright: `© ${new Date().getFullYear()} Jaqueline FineArt. Todos os direitos reservados.`,
    socialLinks: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      youtube: "https://youtube.com"
    },
    socialLinksVisibility: {
      instagram: true,
      facebook: true,
      twitter: true,
      linkedin: true,
      youtube: true
    }
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
          copyright: parsedData.copyright || footerContent.copyright,
          socialLinks: {
            instagram: parsedData.socialLinks?.instagram || footerContent.socialLinks.instagram,
            facebook: parsedData.socialLinks?.facebook || footerContent.socialLinks.facebook,
            twitter: parsedData.socialLinks?.twitter || footerContent.socialLinks.twitter,
            linkedin: parsedData.socialLinks?.linkedin || footerContent.socialLinks.linkedin,
            youtube: parsedData.socialLinks?.youtube || footerContent.socialLinks.youtube
          },
          socialLinksVisibility: parsedData.socialLinksVisibility || footerContent.socialLinksVisibility
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
            <p className="text-muted-foreground max-w-xs mb-6">
              {footerContent.description}
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {footerContent.socialLinksVisibility?.instagram && (
                <a 
                  href={footerContent.socialLinks.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-beige transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
              )}
              {footerContent.socialLinksVisibility?.facebook && (
                <a 
                  href={footerContent.socialLinks.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-beige transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
              )}
              {footerContent.socialLinksVisibility?.twitter && (
                <a 
                  href={footerContent.socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-beige transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
              )}
              {footerContent.socialLinksVisibility?.linkedin && (
                <a 
                  href={footerContent.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-beige transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {footerContent.socialLinksVisibility?.youtube && (
                <a 
                  href={footerContent.socialLinks.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-beige transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl mb-4 text-beige">Links</h3>
            <nav className="flex flex-col space-y-2">
              <NavLink to="/" className="text-muted-foreground hover:text-beige transition-colors">
                Jaqueline
              </NavLink>
              <NavLink to="/portfolio" className="text-muted-foreground hover:text-beige transition-colors">
                Portfólio
              </NavLink>
              <NavLink to="/loja" className="text-muted-foreground hover:text-beige transition-colors">
                Loja
              </NavLink>
              <NavLink to="/contato" className="text-muted-foreground hover:text-beige transition-colors">
                Contato & Encomenda
              </NavLink>
              <NavLink to="/blog" className="text-muted-foreground hover:text-beige transition-colors">
                Blog
              </NavLink>
              <NavLink to="/apoiador" className="text-muted-foreground hover:text-beige transition-colors">
                Seja um Apoiador
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
