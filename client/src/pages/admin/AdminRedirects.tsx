import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, ExternalLink, Copy, Pencil, X, Check } from "lucide-react";
import type { Redirect } from "@shared/schema";

interface RedirectForm {
  slug: string;
  destination: string;
  label: string;
  active: boolean;
}

const empty: RedirectForm = { slug: "", destination: "", label: "", active: true };

export default function AdminRedirects() {
  const { toast } = useToast();
  const [form, setForm] = useState<RedirectForm>(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: redirects = [], isLoading } = useQuery<Redirect[]>({
    queryKey: ["/api/admin/redirects"],
  });

  const createMutation = useMutation({
    mutationFn: (data: RedirectForm) => apiRequest("POST", "/api/admin/redirects", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/redirects"] });
      setForm(empty);
      setShowForm(false);
      toast({ title: "Redirecionamento criado!" });
    },
    onError: () => toast({ title: "Erro ao criar", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<RedirectForm> }) =>
      apiRequest("PATCH", `/api/admin/redirects/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/redirects"] });
      setEditId(null);
      setForm(empty);
      toast({ title: "Atualizado!" });
    },
    onError: () => toast({ title: "Erro ao atualizar", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/redirects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/redirects"] });
      toast({ title: "Removido!" });
    },
    onError: () => toast({ title: "Erro ao remover", variant: "destructive" }),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      apiRequest("PATCH", `/api/admin/redirects/${id}`, { active }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/redirects"] }),
  });

  function startEdit(r: Redirect) {
    setEditId(r.id);
    setForm({ slug: r.slug, destination: r.destination, label: r.label, active: r.active });
    setShowForm(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editId) {
      updateMutation.mutate({ id: editId, data: form });
    } else {
      createMutation.mutate(form);
    }
  }

  const copyLink = (slug: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/r/${slug}`);
    toast({ title: "Link copiado!" });
  };

  const baseUrl = window.location.origin;

  return (
    <AdminLayout title="Redirecionamentos">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Crie URLs curtas que redirecionam para links externos (portal, ERP, WhatsApp, etc.)
            </p>
          </div>
          <Button
            data-testid="button-new-redirect"
            onClick={() => { setShowForm(!showForm); setEditId(null); setForm(empty); }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Redirecionamento
          </Button>
        </div>

        {(showForm || editId) && (
          <div className="border rounded-lg p-5 bg-muted/30 space-y-4">
            <h3 className="font-semibold">{editId ? "Editar redirecionamento" : "Novo redirecionamento"}</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Rótulo (nome interno)</Label>
                <Input
                  data-testid="input-redirect-label"
                  placeholder="Ex: Portal do Cliente"
                  value={form.label}
                  onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label>Slug (caminho da URL)</Label>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">/r/</span>
                  <Input
                    data-testid="input-redirect-slug"
                    placeholder="portal"
                    value={form.slug}
                    onChange={e => setForm(f => ({ ...f, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") }))}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1 md:col-span-2">
                <Label>URL de destino</Label>
                <Input
                  data-testid="input-redirect-destination"
                  placeholder="https://app.seuportal.com.br"
                  value={form.destination}
                  onChange={e => setForm(f => ({ ...f, destination: e.target.value }))}
                  required
                />
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <Switch
                  checked={form.active}
                  onCheckedChange={v => setForm(f => ({ ...f, active: v }))}
                  data-testid="switch-redirect-active"
                />
                <Label>Ativo</Label>
              </div>
              <div className="flex gap-2 md:col-span-2">
                <Button type="submit" data-testid="button-save-redirect" disabled={createMutation.isPending || updateMutation.isPending}>
                  <Check className="w-4 h-4 mr-2" />
                  {editId ? "Salvar alterações" : "Criar redirecionamento"}
                </Button>
                <Button type="button" variant="ghost" onClick={() => { setShowForm(false); setEditId(null); setForm(empty); }}>
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Carregando...</div>
        ) : redirects.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <ExternalLink className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">Nenhum redirecionamento criado ainda.</p>
          </div>
        ) : (
          <div className="border rounded-lg divide-y">
            {redirects.map(r => (
              <div key={r.id} data-testid={`row-redirect-${r.id}`} className="flex items-center gap-4 p-4">
                <Switch
                  checked={r.active}
                  onCheckedChange={active => toggleMutation.mutate({ id: r.id, active })}
                  data-testid={`switch-active-${r.id}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{r.label}</span>
                    <Badge variant={r.active ? "default" : "secondary"}>
                      {r.active ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                    <span className="font-mono">{baseUrl}/r/{r.slug}</span>
                    <span>→</span>
                    <span className="truncate">{r.destination}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" onClick={() => copyLink(r.slug)} data-testid={`button-copy-${r.id}`}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" asChild>
                    <a href={r.destination} target="_blank" rel="noreferrer" data-testid={`button-open-${r.id}`}>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => startEdit(r)} data-testid={`button-edit-${r.id}`}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => deleteMutation.mutate(r.id)}
                    data-testid={`button-delete-${r.id}`}
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
