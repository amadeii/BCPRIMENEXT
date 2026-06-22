import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Zap, X, Check, Bot } from "lucide-react";
import type { AiSetting } from "@shared/schema";

const PROVIDERS = [
  { value: "openai", label: "OpenAI (ChatGPT)", models: ["gpt-4o-mini", "gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"] },
  { value: "gemini", label: "Google Gemini", models: ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash"] },
  { value: "ollama", label: "Ollama (Local)", models: ["llama3", "llama3.1", "mistral", "qwen2", "deepseek-r1"] },
  { value: "anthropic", label: "Anthropic Claude", models: ["claude-3-5-sonnet-20241022", "claude-3-haiku-20240307"] },
  { value: "kimi", label: "Kimi (Moonshot)", models: ["moonshot-v1-8k", "moonshot-v1-32k"] },
];

interface SettingForm {
  label: string;
  provider: string;
  model: string;
  apiKey: string;
  baseUrl: string;
}

const empty: SettingForm = { label: "", provider: "openai", model: "gpt-4o-mini", apiKey: "", baseUrl: "" };

export default function AdminAiSettings() {
  const { toast } = useToast();
  const [form, setForm] = useState<SettingForm>(empty);
  const [showForm, setShowForm] = useState(false);

  const { data: settings = [], isLoading } = useQuery<AiSetting[]>({
    queryKey: ["/api/admin/ai-settings"],
  });

  const createMutation = useMutation({
    mutationFn: (data: SettingForm) => apiRequest("POST", "/api/admin/ai-settings", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/ai-settings"] });
      setForm(empty);
      setShowForm(false);
      toast({ title: "Provedor adicionado!" });
    },
    onError: () => toast({ title: "Erro ao salvar", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/ai-settings/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/ai-settings"] });
      toast({ title: "Provedor removido!" });
    },
  });

  const activateMutation = useMutation({
    mutationFn: (id: string) => apiRequest("POST", `/api/admin/ai-settings/${id}/activate`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/ai-settings"] });
      toast({ title: "Provedor ativado!" });
    },
  });

  const selectedProvider = PROVIDERS.find(p => p.value === form.provider);
  const needsApiKey = form.provider !== "ollama";
  const needsBaseUrl = form.provider === "ollama";

  return (
    <AdminLayout title="Configurações de IA">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Configure os provedores de IA para o assistente do admin. Apenas um fica ativo por vez.
          </p>
          <Button data-testid="button-new-ai" onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Provedor
          </Button>
        </div>

        {showForm && (
          <div className="border rounded-lg p-5 bg-muted/30 space-y-4">
            <h3 className="font-semibold">Novo provedor de IA</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Nome (identificação)</Label>
                <Input
                  data-testid="input-ai-label"
                  placeholder="Ex: GPT-4 Mini"
                  value={form.label}
                  onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                />
              </div>
              <div className="space-y-1">
                <Label>Provedor</Label>
                <Select value={form.provider} onValueChange={v => setForm(f => ({ ...f, provider: v, model: PROVIDERS.find(p => p.value === v)?.models[0] ?? "" }))}>
                  <SelectTrigger data-testid="select-ai-provider">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROVIDERS.map(p => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Modelo</Label>
                <Select value={form.model} onValueChange={v => setForm(f => ({ ...f, model: v }))}>
                  <SelectTrigger data-testid="select-ai-model">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedProvider?.models.map(m => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {needsApiKey && (
                <div className="space-y-1">
                  <Label>Chave de API</Label>
                  <Input
                    data-testid="input-ai-apikey"
                    type="password"
                    placeholder="sk-..."
                    value={form.apiKey}
                    onChange={e => setForm(f => ({ ...f, apiKey: e.target.value }))}
                  />
                </div>
              )}
              {needsBaseUrl && (
                <div className="space-y-1 md:col-span-2">
                  <Label>URL Base do Ollama</Label>
                  <Input
                    data-testid="input-ai-baseurl"
                    placeholder="http://localhost:11434"
                    value={form.baseUrl}
                    onChange={e => setForm(f => ({ ...f, baseUrl: e.target.value }))}
                  />
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                data-testid="button-save-ai"
                onClick={() => createMutation.mutate(form)}
                disabled={createMutation.isPending || !form.label || !form.provider || !form.model}
              >
                <Check className="w-4 h-4 mr-2" />
                Salvar provedor
              </Button>
              <Button variant="ghost" onClick={() => setShowForm(false)}>
                <X className="w-4 h-4 mr-2" />Cancelar
              </Button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Carregando...</div>
        ) : settings.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <Bot className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">Nenhum provedor de IA configurado.</p>
            <p className="text-sm text-muted-foreground mt-1">Adicione OpenAI, Gemini, Ollama ou outro para ativar o assistente.</p>
          </div>
        ) : (
          <div className="border rounded-lg divide-y">
            {settings.map(s => (
              <div key={s.id} data-testid={`row-ai-${s.id}`} className="flex items-center gap-4 p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{s.label}</span>
                    {s.active && <Badge className="bg-green-500 text-white">Ativo</Badge>}
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    {PROVIDERS.find(p => p.value === s.provider)?.label ?? s.provider} — {s.model}
                    {s.apiKey && <span className="ml-2 text-xs bg-muted px-1 py-0.5 rounded">Chave configurada</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!s.active && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => activateMutation.mutate(s.id)}
                      data-testid={`button-activate-${s.id}`}
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Ativar
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => deleteMutation.mutate(s.id)}
                    data-testid={`button-delete-ai-${s.id}`}
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
