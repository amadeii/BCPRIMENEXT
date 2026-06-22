import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FileText,
  Tag,
  Users,
  TrendingUp,
  Plus,
  LogOut,
  Eye,
  CreditCard,
  ExternalLink,
  Layout,
  Bot,
  MessageSquare,
} from "lucide-react";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth");
    if (!isAuth) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const { data: stats } = useQuery<{
    posts: number;
    keywords: number;
    leads: number;
    team: number;
    plans: number;
    redirects: number;
    pages: number;
  }>({
    queryKey: ["/api/admin/stats"],
  });

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setLocation("/admin/login");
  };

  const statCards = [
    { title: "Posts do Blog", value: stats?.posts || 0, icon: FileText, href: "/admin/posts", color: "bg-blue-500/10 text-blue-500" },
    { title: "Palavras-chave", value: stats?.keywords || 0, icon: Tag, href: "/admin/keywords", color: "bg-purple-500/10 text-purple-500" },
    { title: "Leads", value: stats?.leads || 0, icon: Users, href: "/admin/leads", color: "bg-green-500/10 text-green-500" },
    { title: "Equipe", value: stats?.team || 0, icon: TrendingUp, href: "/admin/team", color: "bg-orange-500/10 text-orange-500" },
    { title: "Planos", value: stats?.plans || 0, icon: CreditCard, href: "/admin/plans", color: "bg-teal-500/10 text-teal-500" },
    { title: "Redirecionamentos", value: stats?.redirects || 0, icon: ExternalLink, href: "/admin/redirects", color: "bg-pink-500/10 text-pink-500" },
    { title: "Páginas", value: stats?.pages || 0, icon: Layout, href: "/admin/pages", color: "bg-indigo-500/10 text-indigo-500" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1">
              <span className="font-heading text-xl font-extrabold">bcprime</span>
              <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white">NEXT</span>
            </Link>
            <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="outline" size="sm" data-testid="button-view-site">
                <Eye className="mr-2 h-4 w-4" />
                Ver Site
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold">Painel Administrativo</h1>
          <p className="text-muted-foreground">Gerencie o conteúdo do site BcprimeNEXT</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          {statCards.map((stat, index) => (
            <Link key={index} href={stat.href}>
              <Card className="cursor-pointer transition-all hover-elevate" data-testid={`card-stat-${index}`}>
                <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div className="font-heading text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground leading-tight">{stat.title}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Cards de gestão */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Blog */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-semibold">Blog</h2>
                <Link href="/admin/posts/new">
                  <Button size="sm" data-testid="button-new-post"><Plus className="mr-2 h-4 w-4" />Novo Post</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground text-sm">Crie e gerencie os artigos do blog.</p>
              <Link href="/admin/posts">
                <Button variant="outline" className="w-full" data-testid="button-manage-posts">Gerenciar Posts</Button>
              </Link>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-semibold">SEO e Palavras-chave</h2>
                <Link href="/admin/keywords/new">
                  <Button size="sm" data-testid="button-new-keyword"><Plus className="mr-2 h-4 w-4" />Nova</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground text-sm">Gerencie palavras-chave para otimização.</p>
              <Link href="/admin/keywords">
                <Button variant="outline" className="w-full" data-testid="button-manage-keywords">Gerenciar SEO</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Equipe */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-semibold">Equipe</h2>
                <Link href="/admin/team">
                  <Button size="sm" data-testid="button-manage-team-header"><Plus className="mr-2 h-4 w-4" />Novo</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground text-sm">Gerencie os profissionais da equipe.</p>
              <Link href="/admin/team">
                <Button variant="outline" className="w-full" data-testid="button-manage-team">Gerenciar Equipe</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Planos */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-semibold">Planos e Preços</h2>
                <Link href="/admin/plans/new">
                  <Button size="sm" data-testid="button-new-plan"><Plus className="mr-2 h-4 w-4" />Novo</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground text-sm">Gerencie os planos exibidos no site.</p>
              <Link href="/admin/plans">
                <Button variant="outline" className="w-full" data-testid="button-manage-plans">Gerenciar Planos</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Redirecionamentos */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-pink-500" />
                  Redirecionamentos
                </h2>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground text-sm">
                Crie URLs curtas para portal, ERP, WhatsApp e qualquer link externo.
              </p>
              <Link href="/admin/redirects">
                <Button variant="outline" className="w-full" data-testid="button-manage-redirects">Gerenciar Links</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Construtor de Páginas */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                  <Layout className="h-5 w-5 text-indigo-500" />
                  Construtor de Páginas
                </h2>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground text-sm">
                Crie páginas personalizadas com blocos de conteúdo drag-and-drop.
              </p>
              <Link href="/admin/pages">
                <Button variant="outline" className="w-full" data-testid="button-manage-pages">Gerenciar Páginas</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Assistente IA */}
          <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                  <Bot className="h-5 w-5 text-green-600" />
                  Assistente de IA
                </h2>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground text-sm">
                Chat com IA para gerar textos, posts e conteúdo para o site.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/admin/ai-chat">
                  <Button className="w-full" data-testid="button-open-ai-chat">
                    <MessageSquare className="mr-2 h-4 w-4" />Chat
                  </Button>
                </Link>
                <Link href="/admin/ai-settings">
                  <Button variant="outline" className="w-full" data-testid="button-ai-settings">Configurar</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Leads */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-semibold">Leads</h2>
                <Link href="/admin/leads">
                  <Button variant="outline" size="sm" data-testid="button-view-all-leads">Ver Todos</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Acompanhe os contatos recebidos pelo formulário do site.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
