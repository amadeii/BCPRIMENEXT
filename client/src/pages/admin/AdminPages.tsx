import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, EyeOff, Layout } from "lucide-react";
import { Link } from "wouter";
import type { Page } from "@shared/schema";

export default function AdminPages() {
  const { toast } = useToast();

  const { data: pages = [], isLoading } = useQuery<Page[]>({
    queryKey: ["/api/admin/pages"],
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, published }: { id: string; published: boolean }) =>
      apiRequest("PATCH", `/api/admin/pages/${id}`, { published }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pages"] });
      toast({ title: "Status atualizado!" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/pages/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pages"] });
      toast({ title: "Página removida!" });
    },
    onError: () => toast({ title: "Erro ao remover", variant: "destructive" }),
  });

  return (
    <AdminLayout title="Construtor de Páginas">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Crie páginas personalizadas com blocos de conteúdo (hero, texto, imagem, CTA, etc.)
          </p>
          <Link href="/admin/pages/new">
            <Button data-testid="button-new-page">
              <Plus className="w-4 h-4 mr-2" />
              Nova Página
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Carregando...</div>
        ) : pages.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <Layout className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">Nenhuma página criada ainda.</p>
            <p className="text-sm text-muted-foreground mt-1">Crie páginas personalizadas para seu site.</p>
          </div>
        ) : (
          <div className="border rounded-lg divide-y">
            {pages.map(page => (
              <div key={page.id} data-testid={`row-page-${page.id}`} className="flex items-center gap-4 p-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{page.title}</span>
                    <Badge variant={page.published ? "default" : "secondary"}>
                      {page.published ? "Publicada" : "Rascunho"}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    /p/{page.slug}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => toggleMutation.mutate({ id: page.id, published: !page.published })}
                    data-testid={`button-toggle-${page.id}`}
                    title={page.published ? "Despublicar" : "Publicar"}
                  >
                    {page.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Link href={`/admin/pages/${page.id}`}>
                    <Button size="icon" variant="ghost" data-testid={`button-edit-${page.id}`}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => deleteMutation.mutate(page.id)}
                    data-testid={`button-delete-${page.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
