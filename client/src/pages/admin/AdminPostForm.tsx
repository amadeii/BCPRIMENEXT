import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useParams } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import RichTextEditor from "@/components/RichTextEditor";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Loader2, Eye, LogOut, ImagePlus, X } from "lucide-react";
import type { BlogPost } from "@shared/schema";

const postSchema = z.object({
  title: z.string().min(5, "Título deve ter pelo menos 5 caracteres"),
  slug: z.string().min(3, "Slug deve ter pelo menos 3 caracteres"),
  excerpt: z.string().min(20, "Resumo deve ter pelo menos 20 caracteres"),
  content: z.string().min(20, "Conteúdo deve ter pelo menos 20 caracteres"),
  coverImage: z.string().optional(),
  category: z.string().min(1, "Selecione uma categoria"),
  author: z.string().min(2, "Autor é obrigatório"),
  readTime: z.string().min(1, "Tempo de leitura é obrigatório"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.string().optional(),
  published: z.boolean(),
});

type PostForm = z.infer<typeof postSchema>;

const categories = [
  "Contabilidade",
  "Tributário",
  "MEI",
  "Gestão",
  "Finanças",
  "Notícias",
];

export default function AdminPostForm() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isEditing = params.id && params.id !== "new";
  const [uploadingCover, setUploadingCover] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth");
    if (!isAuth) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const { data: post } = useQuery<BlogPost>({
    queryKey: ["/api/admin/posts", params.id],
    enabled: !!isEditing,
  });

  const form = useForm<PostForm>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "",
      category: "",
      author: "Equipe BCPrimeON",
      readTime: "5 min",
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      published: false,
    },
  });

  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage || "",
        category: post.category,
        author: post.author,
        readTime: post.readTime,
        metaTitle: post.metaTitle || "",
        metaDescription: post.metaDescription || "",
        keywords: post.keywords || "",
        published: post.published,
      });
    }
  }, [post, form]);

  const mutation = useMutation({
    mutationFn: async (data: PostForm) => {
      if (isEditing) {
        return apiRequest("PATCH", `/api/admin/posts/${params.id}`, data);
      }
      return apiRequest("POST", "/api/admin/posts", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/posts"] });
      toast({
        title: isEditing ? "Post atualizado!" : "Post criado!",
        description: isEditing
          ? "As alterações foram salvas."
          : "O post foi criado com sucesso.",
      });
      setLocation("/admin/posts");
    },
    onError: () => {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o post.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PostForm) => {
    mutation.mutate(data);
  };

  const generateSlug = () => {
    const title = form.getValues("title");
    const slug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    form.setValue("slug", slug);
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      form.setValue("coverImage", data.url);
    } catch {
      toast({ title: "Erro ao enviar imagem", variant: "destructive" });
    } finally {
      setUploadingCover(false);
      e.target.value = "";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setLocation("/admin/login");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/posts">
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
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold">
            {isEditing ? "Editar Post" : "Novo Post"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? "Atualize as informações do post" : "Preencha os campos para criar um novo post"}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <Card>
                  <CardHeader>
                    <h2 className="font-heading text-lg font-semibold">Conteúdo</h2>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Título do post"
                              {...field}
                              onBlur={() => {
                                if (!form.getValues("slug")) {
                                  generateSlug();
                                }
                              }}
                              data-testid="input-title"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug *</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input placeholder="titulo-do-post" {...field} data-testid="input-slug" />
                            </FormControl>
                            <Button type="button" variant="outline" onClick={generateSlug}>
                              Gerar
                            </Button>
                          </div>
                          <FormDescription>URL amigável do post</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resumo *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Breve resumo do post..."
                              className="min-h-[80px]"
                              {...field}
                              data-testid="input-excerpt"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Conteúdo *</FormLabel>
                          <FormControl>
                            <RichTextEditor
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormDescription>Use a barra de ferramentas para formatar o texto e inserir imagens</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h2 className="font-heading text-lg font-semibold">SEO</h2>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="metaTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Título</FormLabel>
                          <FormControl>
                            <Input placeholder="Título para SEO" {...field} data-testid="input-meta-title" />
                          </FormControl>
                          <FormDescription>Deixe em branco para usar o título do post</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="metaDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Descrição</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Descrição para SEO..."
                              {...field}
                              data-testid="input-meta-description"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="keywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Palavras-chave</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="contabilidade, mei, impostos"
                              {...field}
                              data-testid="input-keywords"
                            />
                          </FormControl>
                          <FormDescription>Separe por vírgulas</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <h2 className="font-heading text-lg font-semibold">Publicação</h2>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="published"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Publicado</FormLabel>
                            <FormDescription>
                              O post será visível no site
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="switch-published"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={mutation.isPending}
                      data-testid="button-save-post"
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          {isEditing ? "Salvar Alterações" : "Criar Post"}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h2 className="font-heading text-lg font-semibold">Imagem de Capa</h2>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="coverImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              {field.value ? (
                                <div className="relative">
                                  <img
                                    src={field.value}
                                    alt="Capa do artigo"
                                    className="w-full rounded-md border object-cover"
                                    data-testid="img-cover-preview"
                                  />
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute right-2 top-2 h-7 w-7"
                                    onClick={() => form.setValue("coverImage", "")}
                                    data-testid="button-remove-cover"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ) : (
                                <div
                                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-muted-foreground/25 p-8 text-center transition-colors hover:border-primary/50"
                                  onClick={() => coverInputRef.current?.click()}
                                  data-testid="button-upload-cover"
                                >
                                  {uploadingCover ? (
                                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                  ) : (
                                    <ImagePlus className="h-8 w-8 text-muted-foreground" />
                                  )}
                                  <span className="text-sm text-muted-foreground">
                                    {uploadingCover ? "Enviando..." : "Clique para enviar uma imagem"}
                                  </span>
                                  <span className="text-xs text-muted-foreground/60">
                                    JPG, PNG, WebP (máx. 5MB)
                                  </span>
                                </div>
                              )}
                              <input
                                ref={coverInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleCoverUpload}
                                className="hidden"
                                data-testid="input-cover-upload"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h2 className="font-heading text-lg font-semibold">Detalhes</h2>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoria *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-category">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Autor *</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-author" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="readTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tempo de Leitura *</FormLabel>
                          <FormControl>
                            <Input placeholder="5 min" {...field} data-testid="input-read-time" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
}
