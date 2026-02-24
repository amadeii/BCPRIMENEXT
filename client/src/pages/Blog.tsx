import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, Clock, Search, User } from "lucide-react";
import type { BlogPost } from "@shared/schema";

const categories = [
  "Todos",
  "Contabilidade",
  "Tributário",
  "MEI",
  "Gestão",
  "Finanças",
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/posts"],
  });

  const filteredPosts = posts?.filter((post) => {
    const matchesCategory = activeCategory === "Todos" || post.category === activeCategory;
    const matchesSearch = !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">Blog</Badge>
            <h1 className="mb-6 font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
              Conteúdos para impulsionar seu <span className="text-primary">negócio</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Artigos, dicas e novidades sobre contabilidade, tributação e gestão empresarial.
            </p>
            <div className="mx-auto flex max-w-md gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar artigos..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-testid="input-search-blog"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                data-testid={`button-category-${index}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {isLoading ? (
        <section className="py-20">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            Carregando artigos...
          </div>
        </section>
      ) : filteredPosts.length === 0 ? (
        <section className="py-20">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            Nenhum artigo encontrado.
          </div>
        </section>
      ) : (
        <>
          {featuredPost && (
            <section className="py-8">
              <div className="container mx-auto px-4 lg:px-8">
                <Card className="overflow-hidden" data-testid="card-featured-post">
                  <div className="grid md:grid-cols-2">
                    <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
                      {featuredPost.coverImage ? (
                        <img
                          src={featuredPost.coverImage}
                          alt={featuredPost.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="p-12 text-center">
                          <Badge className="mb-4">{featuredPost.category}</Badge>
                          <div className="font-heading text-4xl font-bold text-primary/30">Destaque</div>
                        </div>
                      )}
                    </div>
                    <CardContent className="flex flex-col justify-center p-8">
                      <Badge variant="secondary" className="mb-4 w-fit">Em Destaque</Badge>
                      <h2 className="mb-4 font-heading text-2xl font-bold">{featuredPost.title}</h2>
                      <p className="mb-6 text-muted-foreground">{featuredPost.excerpt}</p>
                      <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {featuredPost.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(featuredPost.createdAt).toLocaleDateString("pt-BR")}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {featuredPost.readTime}
                        </div>
                      </div>
                      <Link href={`/blog/${featuredPost.slug}`}>
                        <Button data-testid="button-read-featured">
                          Ler Artigo
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </div>
                </Card>
              </div>
            </section>
          )}

          {regularPosts.length > 0 && (
            <section className="py-12 lg:py-20">
              <div className="container mx-auto px-4 lg:px-8">
                <h2 className="mb-8 font-heading text-2xl font-bold">Últimos Artigos</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {regularPosts.map((post, index) => (
                    <Card key={post.id} className="group flex flex-col overflow-hidden" data-testid={`card-post-${index}`}>
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-muted via-muted/50 to-transparent">
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Badge variant="secondary">{post.category}</Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="flex flex-1 flex-col p-6">
                        <Badge variant="secondary" className="mb-2 w-fit">{post.category}</Badge>
                        <h3 className="mb-2 font-heading text-lg font-semibold group-hover:text-primary">
                          {post.title}
                        </h3>
                        <p className="mb-4 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                        <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </div>
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <span className="flex items-center text-sm font-medium text-primary">
                            Ler mais
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <section className="bg-card py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-heading text-2xl font-bold md:text-3xl">
              Receba nossos conteúdos por e-mail
            </h2>
            <p className="mb-6 text-muted-foreground">
              Cadastre-se e receba dicas exclusivas sobre contabilidade e gestão.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                className="sm:w-72"
                data-testid="input-newsletter"
              />
              <Button data-testid="button-subscribe">
                Cadastrar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
