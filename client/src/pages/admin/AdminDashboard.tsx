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
} from "lucide-react";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth");
    if (!isAuth) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const { data: stats } = useQuery<{ posts: number; keywords: number; leads: number; team: number }>({
    queryKey: ["/api/admin/stats"],
  });

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setLocation("/admin/login");
  };

  const statCards = [
    {
      title: "Posts do Blog",
      value: stats?.posts || 0,
      icon: FileText,
      href: "/admin/posts",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Palavras-chave",
      value: stats?.keywords || 0,
      icon: Tag,
      href: "/admin/keywords",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Leads",
      value: stats?.leads || 0,
      icon: Users,
      href: "/admin/leads",
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Equipe",
      value: stats?.team || 0,
      icon: Users,
      href: "/admin/team",
      color: "bg-orange-500/10 text-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1">
              <span className="font-heading text-xl font-extrabold text-primary">BC</span>
              <span className="font-heading text-xl font-extrabold">Prime</span>
              <span className="font-heading text-xl font-extrabold text-primary">ON</span>
            </Link>
            <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              Admin
            </span>
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
          <p className="text-muted-foreground">Gerencie o conteúdo do site BCPrimeON</p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (
            <Link key={index} href={stat.href}>
              <Card className="cursor-pointer transition-all hover-elevate" data-testid={`card-stat-${index}`}>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-heading text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.title}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-semibold">Blog</h2>
                <Link href="/admin/posts/new">
                  <Button size="sm" data-testid="button-new-post">
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Post
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Crie e gerencie os artigos do blog para atrair mais visitantes.
              </p>
              <Link href="/admin/posts">
                <Button variant="outline" className="w-full" data-testid="button-manage-posts">
                  Gerenciar Posts
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-semibold">SEO e Palavras-chave</h2>
                <Link href="/admin/keywords/new">
                  <Button size="sm" data-testid="button-new-keyword">
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Palavra
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Gerencie palavras-chave para otimização de mecanismos de busca.
              </p>
              <Link href="/admin/keywords">
                <Button variant="outline" className="w-full" data-testid="button-manage-keywords">
                  Gerenciar Palavras-chave
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-semibold">Equipe</h2>
                <Link href="/admin/team">
                  <Button size="sm" data-testid="button-manage-team-header">
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Membro
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Gerencie os profissionais que aparecem na página Sobre Nós.
              </p>
              <Link href="/admin/team">
                <Button variant="outline" className="w-full" data-testid="button-manage-team">
                  Gerenciar Equipe
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-semibold">Leads Recentes</h2>
                <Link href="/admin/leads">
                  <Button variant="outline" size="sm" data-testid="button-view-all-leads">
                    Ver Todos
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Acompanhe os contatos recebidos através do formulário do site.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
