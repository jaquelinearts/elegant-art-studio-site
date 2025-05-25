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
    <footer className="border-t py-12" style={{ backgroundColor: "#F4EEE1" }}>
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-playfair text-xl mb-4" style={{ color: "#5B431A" }}>{footerContent.title}</h3>
            <p className="max-w-xs mb-6" style={{ color: "#5B431A" }}>
              {footerContent.description}
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {footerContent.socialLinksVisibility?.instagram && (
                <a 
                  href={footerContent.socialLinks.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: "#5B431A" }}
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
                  className="transition-colors"
                  style={{ color: "#5B431A" }}
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
                  className="transition-colors"
                  style={{ color: "#5B431A" }}
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
                  className="transition-colors"
                  style={{ color: "#5B431A" }}
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
                  className="transition-colors"
                  style={{ color: "#5B431A" }}
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl mb-4" style={{ color: "#5B431A" }}>Links</h3>
            <nav className="flex flex-col space-y-2">
              <NavLink to="/" className="transition-colors hover:font-medium" style={{ color: "#5B431A" }}>
                Jaqueline
              </NavLink>
              <NavLink to="/portfolio" className="transition-colors hover:font-medium" style={{ color: "#5B431A" }}>
                Portfólio
              </NavLink>
              <NavLink to="/loja" className="transition-colors hover:font-medium" style={{ color: "#5B431A" }}>
                Loja
              </NavLink>
              <NavLink to="/contato" className="transition-colors hover:font-medium" style={{ color: "#5B431A" }}>
                Contato & Encomenda
              </NavLink>
              <NavLink to="/blog" className="transition-colors hover:font-medium" style={{ color: "#5B431A" }}>
                Blog
              </NavLink>
              <NavLink to="/apoiador" className="transition-colors hover:font-medium" style={{ color: "#5B431A" }}>
                Seja um Apoiador
              </NavLink>
            </nav>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl mb-4" style={{ color: "#5B431A" }}>Contato</h3>
            <address className="not-italic" style={{ color: "#5B431A" }}>
              <p>{footerContent.address}</p>
              <p className="mt-2">{footerContent.email}</p>
              <p className="mt-2">{footerContent.phone}</p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t text-center text-sm" style={{ borderColor: "#5B431A", color: "#5B431A" }}>
          <p>{footerContent.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
