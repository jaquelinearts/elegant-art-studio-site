
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Plus, Trash } from "lucide-react";

// Mock blog post data structure
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
  category: string;
}

// Initial mock data for blog posts
const initialBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Explorando Novas Técnicas com Acrílica",
    excerpt: "Compartilho minhas descobertas recentes sobre técnicas inovadoras de pintura acrílica e como elas transformaram meu processo criativo.",
    content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p><p>Nullam euismod, nisl eget aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc sit amet nunc.</p>",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
    date: "2025-04-18",
    author: "Ana Souza",
    category: "Técnicas"
  },
  {
    id: 2,
    title: "A Influência da Arte Digital na Arte Contemporânea",
    excerpt: "Uma análise sobre como as ferramentas digitais estão mudando a forma como artistas contemporâneos criam e compartilham seu trabalho.",
    content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p><p>Nullam euismod, nisl eget aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc sit amet nunc.</p>",
    imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d",
    date: "2025-04-05",
    author: "Carlos Mendes",
    category: "Arte Digital"
  },
  {
    id: 3,
    title: "Exposições Virtuais: O Futuro das Galerias?",
    excerpt: "Como a pandemia acelerou a adoção de exposições virtuais e o que isso significa para o futuro das galerias de arte tradicionais.",
    content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p><p>Nullam euismod, nisl eget aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl nunc sit amet nunc.</p>",
    imageUrl: "https://images.unsplash.com/photo-1545989253-02cc26577f88",
    date: "2025-03-22",
    author: "Ana Souza",
    category: "Tendências"
  }
];

// Blog post categories
const CATEGORIES = ["Técnicas", "Arte Digital", "Tendências", "Pessoal", "Notícias", "Dicas"];

export const AdminBlog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isAddingPost, setIsAddingPost] = useState(false);
  const { toast } = useToast();

  // Form state for new/editing post
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    excerpt: "",
    content: "",
    imageUrl: "",
    date: new Date().toISOString().split('T')[0],
    author: "Ana Souza",
    category: "Técnicas"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      imageUrl: "",
      date: new Date().toISOString().split('T')[0],
      author: "Ana Souza", 
      category: "Técnicas"
    });
  };

  const handleAddPost = () => {
    setIsAddingPost(true);
    setEditingPost(null);
    resetForm();
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setIsAddingPost(false);
    setFormData({ ...post });
  };

  const handleDeletePost = (postId: number) => {
    if (window.confirm("Tem certeza que deseja excluir este post?")) {
      setBlogPosts(blogPosts.filter(post => post.id !== postId));
      toast({
        title: "Post excluído",
        description: "O post foi removido com sucesso.",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.excerpt || !formData.content || !formData.imageUrl) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    if (editingPost) {
      // Update existing post
      const updatedPosts = blogPosts.map(post => 
        post.id === editingPost.id ? { ...post, ...formData as BlogPost } : post
      );
      setBlogPosts(updatedPosts);
      setEditingPost(null);
      toast({
        title: "Post atualizado",
        description: "As alterações foram salvas com sucesso.",
      });
    } else {
      // Add new post
      const newPost: BlogPost = {
        ...formData as Omit<BlogPost, 'id'>,
        id: Math.max(0, ...blogPosts.map(post => post.id)) + 1,
        date: formData.date || new Date().toISOString().split('T')[0],
      };
      
      setBlogPosts([...blogPosts, newPost]);
      setIsAddingPost(false);
      toast({
        title: "Post adicionado",
        description: "O novo post foi adicionado com sucesso.",
      });
    }
    
    resetForm();
  };

  const handleCancelForm = () => {
    setEditingPost(null);
    setIsAddingPost(false);
    resetForm();
  };

  // Delete uploaded image
  const handleDeleteImage = () => {
    setFormData(prev => ({ ...prev, imageUrl: "" }));
    toast({
      title: "Imagem removida",
      description: "A imagem foi removida. Você pode fazer upload de uma nova imagem."
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-playfair">Gerenciar Blog</h2>
        <Button 
          onClick={handleAddPost} 
          variant="default" 
          className="bg-beige hover:bg-beige/90 text-foreground rounded-full flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Novo Post
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(isAddingPost || editingPost) && (
        <div className="border rounded-lg p-6 bg-card">
          <h3 className="text-xl font-playfair mb-4">
            {editingPost ? "Editar Post" : "Adicionar Novo Post"}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Título *
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Título do post"
                  />
                </div>
                
                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
                    Resumo *
                  </label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    required
                    placeholder="Breve resumo do conteúdo"
                    className="h-24"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium mb-1">
                      Autor *
                    </label>
                    <Input
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium mb-1">
                      Data
                    </label>
                    <Input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-1">
                    Categoria
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  >
                    {CATEGORIES.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
                    Imagem *
                  </label>
                  {formData.imageUrl ? (
                    <div className="relative mb-2 rounded-lg overflow-hidden">
                      <img 
                        src={formData.imageUrl} 
                        alt="Preview" 
                        className="w-full h-40 object-cover"
                      />
                      <Button 
                        type="button"
                        variant="destructive" 
                        size="sm" 
                        className="absolute top-2 right-2 rounded-full"
                        onClick={handleDeleteImage}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : null}
                  
                  <div className="flex gap-2">
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      required
                      placeholder="URL da imagem"
                      className="flex-grow"
                    />
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={() => document.getElementById('fileUpload')?.click()} 
                      className="border-beige text-beige"
                    >
                      Upload
                    </Button>
                    <input
                      id="fileUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Here would normally upload to a server
                          // For demo, we'll use a placeholder URL
                          const randomId = Math.floor(Math.random() * 1000);
                          setFormData(prev => ({
                            ...prev,
                            imageUrl: `https://images.unsplash.com/photo-1555${randomId}`
                          }));
                          toast({
                            title: "Imagem carregada",
                            description: "A imagem foi carregada com sucesso."
                          });
                        }
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-1">
                    Conteúdo *
                  </label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    placeholder="Conteúdo do post (suporta HTML básico)"
                    className="h-40"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancelForm}
                className="rounded-full"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-beige hover:bg-beige/90 text-foreground rounded-full"
              >
                {editingPost ? "Atualizar Post" : "Adicionar Post"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Blog Posts List */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left py-3 px-4">Título</th>
              <th className="text-left py-3 px-4 hidden md:table-cell">Data</th>
              <th className="text-left py-3 px-4 hidden md:table-cell">Categoria</th>
              <th className="text-right py-3 px-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {blogPosts.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-muted-foreground">
                  Nenhum post encontrado.
                </td>
              </tr>
            ) : (
              blogPosts.map((post) => (
                <tr key={post.id} className="border-t">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="h-10 w-10 rounded bg-muted overflow-hidden flex-shrink-0"
                        style={{backgroundImage: `url(${post.imageUrl})`, backgroundSize: 'cover'}}
                      />
                      <div>
                        <p className="font-medium truncate max-w-[200px] md:max-w-[300px]">{post.title}</p>
                        <p className="text-xs text-muted-foreground md:hidden">
                          {new Date(post.date).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    {new Date(post.date).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <span className="bg-accent/50 text-xs px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0" 
                        onClick={() => handleEditPost(post)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive/90" 
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Excluir</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
