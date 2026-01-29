import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Plus,
  Search,
  Trash2,
  Eye,
  LogOut,
  Tag,
  Loader2,
} from "lucide-react";
import type { Keyword } from "@shared/schema";

const keywordSchema = z.object({
  keyword: z.string().min(2, "Palavra-chave deve ter pelo menos 2 caracteres"),
  category: z.string().optional(),
});

type KeywordForm = z.infer<typeof keywordSchema>;

export default function AdminKeywords() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth");
    if (!isAuth) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const { data: keywords, isLoading } = useQuery<Keyword[]>({
    queryKey: ["/api/admin/keywords"],
  });

  const form = useForm<KeywordForm>({
    resolver: zodResolver(keywordSchema),
    defaultValues: {
      keyword: "",
      category: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: KeywordForm) => {
      return apiRequest("POST", "/api/admin/keywords", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/keywords"] });
      toast({
        title: "Palavra-chave criada!",
        description: "A palavra-chave foi adicionada com sucesso.",
      });
      form.reset();
      setDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Erro ao criar",
        description: "Não foi possível criar a palavra-chave.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/admin/keywords/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/keywords"] });
      toast({
        title: "Palavra-chave excluída",
        description: "A palavra-chave foi removida com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir a palavra-chave.",
        variant: "destructive",
      });
    },
  });

  const filteredKeywords = keywords?.filter(
    (kw) =>
      kw.keyword.toLowerCase().includes(search.toLowerCase()) ||
      (kw.category && kw.category.toLowerCase().includes(search.toLowerCase()))
  );

  const onSubmit = (data: KeywordForm) => {
    createMutation.mutate(data);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setLocation("/admin/login");
  };

  const groupedKeywords = filteredKeywords?.reduce((acc, kw) => {
    const category = kw.category || "Geral";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(kw);
    return acc;
  }, {} as Record<string, Keyword[]>);

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-1">
              <span className="font-heading text-xl font-extrabold text-primary">BC</span>
              <span className="font-heading text-xl font-extrabold">Prime</span>
              <span className="font-heading text-xl font-extrabold text-primary">ON</span>
            </div>
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
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Palavras-chave SEO</h1>
            <p className="text-muted-foreground">Gerencie palavras-chave para otimização</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-new-keyword">
                <Plus className="mr-2 h-4 w-4" />
                Nova Palavra-chave
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Palavra-chave</DialogTitle>
                <DialogDescription>
                  Adicione uma nova palavra-chave para SEO.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="keyword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Palavra-chave *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: contabilidade digital"
                            {...field}
                            data-testid="input-new-keyword"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoria</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Serviços, MEI, Tributário"
                            {...field}
                            data-testid="input-keyword-category"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled={createMutation.isPending}
                      data-testid="button-save-keyword"
                    >
                      {createMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        "Adicionar"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar palavras-chave..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-keywords"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="py-12 text-center text-muted-foreground">
                Carregando palavras-chave...
              </div>
            ) : groupedKeywords && Object.keys(groupedKeywords).length > 0 ? (
              <div className="space-y-6">
                {Object.entries(groupedKeywords).map(([category, kws]) => (
                  <div key={category}>
                    <h3 className="mb-3 font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {kws.map((kw) => (
                        <div
                          key={kw.id}
                          className="group flex items-center gap-1 rounded-full border bg-muted/50 py-1 pl-3 pr-1"
                          data-testid={`keyword-${kw.id}`}
                        >
                          <Tag className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{kw.keyword}</span>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                data-testid={`button-delete-keyword-${kw.id}`}
                              >
                                <Trash2 className="h-3 w-3 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Excluir palavra-chave?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteMutation.mutate(kw.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Tag className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="mb-4 text-muted-foreground">Nenhuma palavra-chave encontrada</p>
                <Button onClick={() => setDialogOpen(true)} data-testid="button-create-first-keyword">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Primeira Palavra-chave
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
