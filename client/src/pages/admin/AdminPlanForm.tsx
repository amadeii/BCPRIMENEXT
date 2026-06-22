import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Trash2, Eye, LogOut } from "lucide-react";
import type { Plan } from "@shared/schema";
import { insertPlanSchema } from "@shared/schema";

const planFormSchema = insertPlanSchema.extend({
  name: z.string().min(1, "Nome é obrigatório"),
  slug: z.string().min(1, "Slug é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  price: z.string().min(1, "Preço é obrigatório"),
  ctaLabel: z.string().min(1, "Texto do botão é obrigatório"),
  ctaHref: z.string().min(1, "Link do botão é obrigatório"),
});

type PlanFormValues = z.infer<typeof planFormSchema>;

interface Feature {
  name: string;
  included: boolean;
}

export default function AdminPlanForm() {
  const [, setLocation] = useLocation();
  const params = useParams<{ id: string }>();
  const isNew = !params.id || params.id === "new";
  const { toast } = useToast();
  const [features, setFeatures] = useState<Feature[]>([{ name: "", included: true }]);

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth");
    if (!isAuth) setLocation("/admin/login");
  }, [setLocation]);

  const { data: plan, isLoading } = useQuery<Plan>({
    queryKey: ["/api/admin/plans", params.id],
    enabled: !isNew,
  });

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      price: "",
      billing: "/mês",
      popular: false,
      features: "[]",
      ctaLabel: "Começar Agora",
      ctaHref: "/contato",
      displayOrder: "0",
      active: true,
    },
  });

  useEffect(() => {
    if (plan) {
      form.reset({
        name: plan.name,
        slug: plan.slug,
        description: plan.description,
        price: plan.price,
        billing: plan.billing ?? "/mês",
        popular: plan.popular,
        features: plan.features,
        ctaLabel: plan.ctaLabel,
        ctaHref: plan.ctaHref,
        displayOrder: plan.displayOrder ?? "0",
        active: plan.active,
      });
      try {
        const parsed: Feature[] = JSON.parse(plan.features);
        if (Array.isArray(parsed)) setFeatures(parsed);
      } catch {
        setFeatures([{ name: "", included: true }]);
      }
    }
  }, [plan, form]);

  const createMutation = useMutation({
    mutationFn: async (data: PlanFormValues) => apiRequest("POST", "/api/admin/plans", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/plans"] });
      toast({ title: "Plano criado", description: "O plano foi criado com sucesso." });
      setLocation("/admin/plans");
    },
    onError: () => {
      toast({ title: "Erro ao criar", description: "Não foi possível criar o plano.", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: PlanFormValues) => apiRequest("PATCH", `/api/admin/plans/${params.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/plans"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/plans", params.id] });
      toast({ title: "Plano atualizado", description: "O plano foi atualizado com sucesso." });
      setLocation("/admin/plans");
    },
    onError: () => {
      toast({ title: "Erro ao atualizar", description: "Não foi possível atualizar o plano.", variant: "destructive" });
    },
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = (data: PlanFormValues) => {
    const payload = { ...data, features: JSON.stringify(features) };
    if (isNew) {
      createMutation.mutate(payload);
    } else {
      updateMutation.mutate(payload);
    }
  };

  const addFeature = () => setFeatures([...features, { name: "", included: true }]);
  const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));
  const updateFeature = (index: number, field: keyof Feature, value: string | boolean) => {
    setFeatures(features.map((f, i) => (i === index ? { ...f, [field]: value } : f)));
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setLocation("/admin/login");
  };

  if (!isNew && isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/plans">
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-1">
              <span className="font-heading text-xl font-extrabold text-primary">Bcprime</span>
              <span className="font-heading text-xl font-extrabold">NEXT</span>
            </div>
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

      <main className="container mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold">
            {isNew ? "Novo Plano" : "Editar Plano"}
          </h1>
          <p className="text-muted-foreground">
            {isNew ? "Crie um novo plano de preços" : "Edite as informações do plano"}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="font-heading text-lg font-semibold">Informações Básicas</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Plano</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Central Starter" {...field} data-testid="input-plan-name" />
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
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: central-starter" {...field} data-testid="input-plan-slug" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Ideal para MEI" {...field} data-testid="input-plan-description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preço</FormLabel>
                        <FormControl>
                          <Input placeholder='Ex: 195 ou "Sob consulta"' {...field} data-testid="input-plan-price" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="billing"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Período</FormLabel>
                        <FormControl>
                          <Input placeholder="/mês" {...field} data-testid="input-plan-billing" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="displayOrder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ordem de Exibição</FormLabel>
                        <FormControl>
                          <Input placeholder="1" {...field} data-testid="input-plan-order" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="ctaLabel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Texto do Botão</FormLabel>
                        <FormControl>
                          <Input placeholder="Começar Agora" {...field} data-testid="input-plan-cta-label" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ctaHref"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link do Botão</FormLabel>
                        <FormControl>
                          <Input placeholder="/contato" {...field} data-testid="input-plan-cta-href" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-wrap gap-6">
                  <FormField
                    control={form.control}
                    name="popular"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="switch-plan-popular"
                          />
                        </FormControl>
                        <FormLabel className="!mt-0">Destaque "Mais Popular"</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="switch-plan-active"
                          />
                        </FormControl>
                        <FormLabel className="!mt-0">Plano Ativo (visível no site)</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-lg font-semibold">Features do Plano</h2>
                  <Button type="button" variant="outline" size="sm" onClick={addFeature} data-testid="button-add-feature">
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Feature
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3" data-testid={`feature-row-${index}`}>
                    <Switch
                      checked={feature.included}
                      onCheckedChange={(val) => updateFeature(index, "included", val)}
                      data-testid={`switch-feature-${index}`}
                    />
                    <Input
                      value={feature.name}
                      onChange={(e) => updateFeature(index, "name", e.target.value)}
                      placeholder="Ex: Contabilidade completa"
                      className="flex-1"
                      data-testid={`input-feature-${index}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeature(index)}
                      disabled={features.length <= 1}
                      data-testid={`button-remove-feature-${index}`}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Link href="/admin/plans">
                <Button type="button" variant="outline" data-testid="button-cancel">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" disabled={isPending} data-testid="button-save-plan">
                {isPending ? "Salvando..." : isNew ? "Criar Plano" : "Salvar Alterações"}
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
}
