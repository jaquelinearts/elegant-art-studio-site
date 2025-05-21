
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import NotFound from "./NotFound";

// Using the same mock data structure from Blog.tsx
const MOCK_BLOG_POSTS = [
  {
    id: 1,
    title: "Explorando Novas Técnicas com Acrílica",
    excerpt: "Compartilho minhas descobertas recentes sobre técnicas inovadoras de pintura acrílica e como elas transformaram meu processo criativo.",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
    date: "2025-04-18",
    author: "Ana Souza",
    category: "Técnicas",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porta malesuada eros, eget luctus velit consectetur et. Vestibulum nec congue leo. Ut sed eros vitae mi vestibulum pharetra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin eu purus pulvinar, ultrices massa vel, placerat augue.</p>
      
      <p>Nullam euismod, nisl eget aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc sit amet nunc. Sed euismod, diam quis aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc sit amet nunc.</p>
      
      <h2>Técnicas Exploradas</h2>
      
      <p>Maecenas eu placerat ante. Fusce ut neque justo, et aliquet enim. In hac habitasse platea dictumst. Nullam commodo neque erat, vitae facilisis erat. Cras at mauris ut tortor vestibulum fringilla vel sed metus. Donec interdum purus a justo feugiat rutrum. Sed ac neque ut neque dictum accumsan.</p>
      
      <p>Vestibulum vitae faucibus lectus. Suspendisse elementum tellus vel magna bibendum, in suscipit magna efficitur. Maecenas eu placerat ante.</p>
      
      <h2>Resultados e Aprendizados</h2>
      
      <p>Aliquam erat volutpat. Donec ornare hendrerit dapibus. Aliquam rhoncus lorem ac lacus pulvinar, et luctus lacus consequat. Donec malesuada diam eget turpis venenatis blandit. Proin ac ligula id diam feugiat porta eu a justo. Vestibulum vitae faucibus lectus. Suspendisse elementum tellus vel magna bibendum, in suscipit magna efficitur.</p>
    `
  },
  {
    id: 2,
    title: "A Influência da Arte Digital na Arte Contemporânea",
    excerpt: "Uma análise sobre como as ferramentas digitais estão mudando a forma como artistas contemporâneos criam e compartilham seu trabalho.",
    imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d",
    date: "2025-04-05",
    author: "Carlos Mendes",
    category: "Arte Digital",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porta malesuada eros, eget luctus velit consectetur et. Vestibulum nec congue leo. Ut sed eros vitae mi vestibulum pharetra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin eu purus pulvinar, ultrices massa vel, placerat augue.</p>
      
      <p>Nullam euismod, nisl eget aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc sit amet nunc. Sed euismod, diam quis aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc sit amet nunc.</p>
      
      <h2>O Mundo Digital</h2>
      
      <p>Maecenas eu placerat ante. Fusce ut neque justo, et aliquet enim. In hac habitasse platea dictumst. Nullam commodo neque erat, vitae facilisis erat. Cras at mauris ut tortor vestibulum fringilla vel sed metus. Donec interdum purus a justo feugiat rutrum. Sed ac neque ut neque dictum accumsan.</p>
      
      <p>Vestibulum vitae faucibus lectus. Suspendisse elementum tellus vel magna bibendum, in suscipit magna efficitur. Maecenas eu placerat ante.</p>
      
      <h2>Adaptação dos Artistas</h2>
      
      <p>Aliquam erat volutpat. Donec ornare hendrerit dapibus. Aliquam rhoncus lorem ac lacus pulvinar, et luctus lacus consequat. Donec malesuada diam eget turpis venenatis blandit. Proin ac ligula id diam feugiat porta eu a justo. Vestibulum vitae faucibus lectus. Suspendisse elementum tellus vel magna bibendum, in suscipit magna efficitur.</p>
    `
  },
  {
    id: 3,
    title: "Exposições Virtuais: O Futuro das Galerias?",
    excerpt: "Como a pandemia acelerou a adoção de exposições virtuais e o que isso significa para o futuro das galerias de arte tradicionais.",
    imageUrl: "https://images.unsplash.com/photo-1545989253-02cc26577f88",
    date: "2025-03-22",
    author: "Ana Souza",
    category: "Tendências",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porta malesuada eros, eget luctus velit consectetur et. Vestibulum nec congue leo. Ut sed eros vitae mi vestibulum pharetra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin eu purus pulvinar, ultrices massa vel, placerat augue.</p>
      
      <p>Nullam euismod, nisl eget aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc sit amet nunc. Sed euismod, diam quis aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc sit amet nunc.</p>
      
      <h2>A Nova Realidade</h2>
      
      <p>Maecenas eu placerat ante. Fusce ut neque justo, et aliquet enim. In hac habitasse platea dictumst. Nullam commodo neque erat, vitae facilisis erat. Cras at mauris ut tortor vestibulum fringilla vel sed metus. Donec interdum purus a justo feugiat rutrum. Sed ac neque ut neque dictum accumsan.</p>
      
      <p>Vestibulum vitae faucibus lectus. Suspendisse elementum tellus vel magna bibendum, in suscipit magna efficitur. Maecenas eu placerat ante.</p>
      
      <h2>O Futuro das Galerias</h2>
      
      <p>Aliquam erat volutpat. Donec ornare hendrerit dapibus. Aliquam rhoncus lorem ac lacus pulvinar, et luctus lacus consequat. Donec malesuada diam eget turpis venenatis blandit. Proin ac ligula id diam feugiat porta eu a justo. Vestibulum vitae faucibus lectus. Suspendisse elementum tellus vel magna bibendum, in suscipit magna efficitur.</p>
    `
  },
  {
    id: 4,
    title: "Minha Jornada Como Artista Independente",
    excerpt: "Reflexões sobre os desafios e alegrias de seguir uma carreira como artista independente no cenário atual.",
    imageUrl: "https://images.unsplash.com/photo-1579762593131-b8945254345c",
    date: "2025-03-10",
    author: "Ana Souza",
    category: "Pessoal",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porta malesuada eros, eget luctus velit consectetur et. Vestibulum nec congue leo. Ut sed eros vitae mi vestibulum pharetra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin eu purus pulvinar, ultrices massa vel, placerat augue.</p>
      
      <p>Nullam euismod, nisl eget aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc sit amet nunc. Sed euismod, diam quis aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc sit amet nunc.</p>
      
      <h2>O Início da Jornada</h2>
      
      <p>Maecenas eu placerat ante. Fusce ut neque justo, et aliquet enim. In hac habitasse platea dictumst. Nullam commodo neque erat, vitae facilisis erat. Cras at mauris ut tortor vestibulum fringilla vel sed metus. Donec interdum purus a justo feugiat rutrum. Sed ac neque ut neque dictum accumsan.</p>
      
      <p>Vestibulum vitae faucibus lectus. Suspendisse elementum tellus vel magna bibendum, in suscipit magna efficitur. Maecenas eu placerat ante.</p>
      
      <h2>Desafios e Conquistas</h2>
      
      <p>Aliquam erat volutpat. Donec ornare hendrerit dapibus. Aliquam rhoncus lorem ac lacus pulvinar, et luctus lacus consequat. Donec malesuada diam eget turpis venenatis blandit. Proin ac ligula id diam feugiat porta eu a justo. Vestibulum vitae faucibus lectus. Suspendisse elementum tellus vel magna bibendum, in suscipit magna efficitur.</p>
    `
  }
];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("pt-BR", options);
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<typeof MOCK_BLOG_POSTS[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate fetching post data
    const timer = setTimeout(() => {
      const foundPost = MOCK_BLOG_POSTS.find(p => p.id === Number(id));
      setPost(foundPost || null);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  if (!isLoading && !post) {
    return <NotFound />;
  }

  return (
    <div className="py-16 min-h-screen">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <Button 
          variant="outline" 
          asChild 
          className="mb-6 rounded-full border-beige text-beige hover:bg-beige/10 flex items-center gap-2"
        >
          <NavLink to="/blog">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Blog
          </NavLink>
        </Button>
        
        {isLoading ? (
          <>
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-8" />
            <Skeleton className="aspect-[16/9] w-full mb-8 rounded-lg" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-3/4 mb-8" />
            <Skeleton className="h-6 w-1/3 mb-4" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-4" />
          </>
        ) : post && (
          <>
            <h1 className="font-playfair text-4xl md:text-5xl mb-4 text-beige">{post.title}</h1>
            
            <div className="flex items-center justify-between text-muted-foreground mb-8">
              <div>
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <span>{formatDate(post.date)}</span>
              </div>
              <span className="text-sm bg-accent/50 px-3 py-1 rounded-full">{post.category}</span>
            </div>
            
            <div className="relative aspect-[16/9] w-full mb-8 rounded-lg overflow-hidden">
              {!imageLoaded && <Skeleton className="absolute inset-0" />}
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover"
                onLoad={() => setImageLoaded(true)}
                style={{ display: imageLoaded ? "block" : "none" }}
              />
            </div>
            
            <div 
              className="prose prose-lg max-w-none prose-headings:font-playfair prose-headings:text-beige prose-p:text-foreground/80"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
