
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Mock data for blog posts - in a real app, these would come from an API/database
const MOCK_BLOG_POSTS = [
  {
    id: 1,
    title: "Explorando Novas Técnicas com Acrílica",
    excerpt: "Compartilho minhas descobertas recentes sobre técnicas inovadoras de pintura acrílica e como elas transformaram meu processo criativo.",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
    date: "2025-04-18",
    author: "Ana Souza",
    category: "Técnicas",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc sit amet nunc. Sed euismod, diam quis aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc sit amet nunc."
  },
  {
    id: 2,
    title: "A Influência da Arte Digital na Arte Contemporânea",
    excerpt: "Uma análise sobre como as ferramentas digitais estão mudando a forma como artistas contemporâneos criam e compartilham seu trabalho.",
    imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d",
    date: "2025-04-05",
    author: "Carlos Mendes",
    category: "Arte Digital",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc sit amet nunc. Sed euismod, diam quis aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc sit amet nunc."
  },
  {
    id: 3,
    title: "Exposições Virtuais: O Futuro das Galerias?",
    excerpt: "Como a pandemia acelerou a adoção de exposições virtuais e o que isso significa para o futuro das galerias de arte tradicionais.",
    imageUrl: "https://images.unsplash.com/photo-1545989253-02cc26577f88",
    date: "2025-03-22",
    author: "Ana Souza",
    category: "Tendências",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc sit amet nunc. Sed euismod, diam quis aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc sit amet nunc."
  },
  {
    id: 4,
    title: "Minha Jornada Como Artista Independente",
    excerpt: "Reflexões sobre os desafios e alegrias de seguir uma carreira como artista independente no cenário atual.",
    imageUrl: "https://images.unsplash.com/photo-1579762593131-b8945254345c",
    date: "2025-03-10",
    author: "Ana Souza",
    category: "Pessoal",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc sit amet nunc. Sed euismod, diam quis aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc sit amet nunc."
  }
];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("pt-BR", options);
};

// BlogPost component to display individual blog post cards
const BlogPostCard = ({ post }: { post: typeof MOCK_BLOG_POSTS[0] }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex flex-col h-full overflow-hidden border border-border/50 rounded-lg hover:border-beige transition-all duration-300">
      <div className="relative aspect-[16/9] overflow-hidden">
        {!imageLoaded && <Skeleton className="absolute inset-0" />}
        <img 
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? "block" : "none" }}
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
          <span>{post.category}</span>
          <span>{formatDate(post.date)}</span>
        </div>
        
        <h3 className="font-playfair text-xl mb-2 text-beige">{post.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 flex-grow">{post.excerpt}</p>
        
        <Button variant="outline" asChild className="rounded-full border-beige text-beige hover:bg-beige/10 w-full mt-auto">
          <NavLink to={`/blog/${post.id}`}>
            Ler Mais
          </NavLink>
        </Button>
      </div>
    </div>
  );
};

// Main Blog Page
const Blog = () => {
  const [posts, setPosts] = useState(MOCK_BLOG_POSTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="py-16 min-h-screen">
      <div className="container-custom">
        <h1 className="section-title text-center mb-4">Blog</h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Compartilho aqui reflexões sobre arte, técnicas, tendências e minha jornada como artista.
        </p>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex flex-col h-full overflow-hidden border border-border/50 rounded-lg">
                <Skeleton className="aspect-[16/9] w-full" />
                <div className="p-5">
                  <Skeleton className="h-5 w-20 mb-2" />
                  <Skeleton className="h-7 w-full mb-2" />
                  <Skeleton className="h-24 w-full mb-4" />
                  <Skeleton className="h-9 w-full rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
