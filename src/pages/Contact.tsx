
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Mail, Phone, MapPin } from "lucide-react";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialFormValues: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const Contact = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Mensagem enviada com sucesso!", {
        description: "Entraremos em contato em breve.",
      });
      setFormValues(initialFormValues);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="py-16">
      <div className="container-custom">
        <h1 className="section-title text-center mb-16">Entre em Contato</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-accent/10 p-8 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-playfair mb-6">Envie uma Mensagem</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Seu nome completo"
                  value={formValues.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Assunto</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Assunto da mensagem"
                  value={formValues.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Sua mensagem aqui..."
                  rows={5}
                  value={formValues.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl md:text-3xl font-playfair mb-6">Informações de Contato</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Endereço</h3>
                  <p className="text-muted-foreground">
                    Rua das Artes, 123<br />
                    Jardim Paulista<br />
                    São Paulo, SP - 01000-000
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Email</h3>
                  <p className="text-muted-foreground">contato@arteexemplo.com</p>
                  <p className="text-muted-foreground">info@arteexemplo.com</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Telefone</h3>
                  <p className="text-muted-foreground">+55 (11) 99999-9999</p>
                  <p className="text-muted-foreground">+55 (11) 3333-3333</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="font-medium text-lg mb-4">Horário de Atendimento</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex justify-between">
                  <span>Segunda - Sexta</span>
                  <span>10:00 - 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Sábado</span>
                  <span>11:00 - 15:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Domingo</span>
                  <span>Fechado</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
