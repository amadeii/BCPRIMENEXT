import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, Clock, Search, User } from "lucide-react";

const categories = [
  "Todos",
  "Contabilidade",
  "Tributário",
  "MEI",
  "Gestão",
  "Finanças",
];

const posts = [
  {
    id: 1,
    title: "Simples Nacional 2024: Tudo que você precisa saber",
    excerpt: "Entenda as principais regras e mudanças do Simples Nacional para este ano e como elas podem impactar sua empresa.",
    category: "Tributário",
    author: "Equipe BCPrimeON",
    date: "15 Jan 2024",
    readTime: "8 min",
    featured: true,
  },
  {
    id: 2,
    title: "Como abrir uma empresa do zero: Guia completo",
    excerpt: "Um passo a passo detalhado de tudo que você precisa para abrir sua empresa de forma correta e legal.",
    category: "Gestão",
    author: "João Carlos",
    date: "10 Jan 2024",
    readTime: "12 min",
    featured: false,
  },
  {
    id: 3,
    title: "MEI: Limite de faturamento e como se regularizar",
    excerpt: "Saiba qual é o limite de faturamento do MEI e o que fazer se você ultrapassar esse valor.",
    category: "MEI",
    author: "Maria Helena",
    date: "05 Jan 2024",
    readTime: "6 min",
    featured: false,
  },
  {
    id: 4,
    title: "BPO Financeiro: O que é e como pode ajudar sua empresa",
    excerpt: "Descubra como a terceirização da gestão financeira pode reduzir custos e aumentar a eficiência.",
    category: "Finanças",
    author: "Roberto Almeida",
    date: "28 Dez 2023",
    readTime: "7 min",
    featured: false,
  },
  {
    id: 5,
    title: "Planejamento tributário: Economize legalmente nos impostos",
    excerpt: "Estratégias legais para reduzir a carga tributária da sua empresa e aumentar a lucratividade.",
    category: "Tributário",
    author: "Ana Paula",
    date: "20 Dez 2023",
    readTime: "10 min",
    featured: false,
  },
  {
    id: 6,
    title: "Fluxo de caixa: Como controlar as finanças da sua empresa",
    excerpt: "Dicas práticas para manter um fluxo de caixa saudável e evitar problemas financeiros.",
    category: "Finanças",
    author: "Equipe BCPrimeON",
    date: "15 Dez 2023",
    readTime: "9 min",
    featured: false,
  },
];

const featuredPost = posts.find((post) => post.featured);
const regularPosts = posts.filter((post) => !post.featured);

export default function Blog() {
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
                  data-testid="input-search-blog"
                />
              </div>
              <Button data-testid="button-search-blog">Buscar</Button>
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
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                data-testid={`button-category-${index}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {featuredPost && (
        <section className="py-8">
          <div className="container mx-auto px-4 lg:px-8">
            <Card className="overflow-hidden" data-testid="card-featured-post">
              <div className="grid md:grid-cols-2">
                <div className="flex items-center justify-center bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-12">
                  <div className="text-center">
                    <Badge className="mb-4">{featuredPost.category}</Badge>
                    <div className="font-heading text-4xl font-bold text-primary/30">Destaque</div>
                  </div>
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
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <Link href={`/blog/${featuredPost.id}`}>
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

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-8 font-heading text-2xl font-bold">Últimos Artigos</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post, index) => (
              <Card key={post.id} className="group flex flex-col overflow-hidden" data-testid={`card-post-${index}`}>
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-muted via-muted/50 to-transparent">
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
                <CardContent className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 font-heading text-lg font-semibold group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                  <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <Link href={`/blog/${post.id}`}>
                    <span className="flex items-center text-sm font-medium text-primary">
                      Ler mais
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" data-testid="button-load-more">
              Carregar Mais Artigos
            </Button>
          </div>
        </div>
      </section>

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
