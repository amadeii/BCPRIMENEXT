import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useParams } from "wouter";
import { Plus, Trash2, GripVertical, Save, ChevronUp, ChevronDown } from "lucide-react";
import type { Page, PageBlock } from "@shared/schema";

type BlockType = "hero" | "text" | "image_text" | "cta" | "list" | "divider";

interface BlockData {
  title?: string;
  subtitle?: string;
  text?: string;
  buttonLabel?: string;
  buttonHref?: string;
  imageUrl?: string;
  imageAlt?: string;
  items?: string[];
  align?: "left" | "center" | "right";
  bgColor?: "white" | "muted" | "primary";
}

interface UIBlock {
  id?: string;
  type: BlockType;
  data: BlockData;
  displayOrder: string;
}

const BLOCK_TYPES: { value: BlockType; label: string; description: string }[] = [
  { value: "hero", label: "Hero / Banner", description: "Seção de destaque com título grande e botão" },
  { value: "text", label: "Bloco de Texto", description: "Parágrafo de texto com título opcional" },
  { value: "image_text", label: "Imagem + Texto", description: "Imagem ao lado de um bloco de texto" },
  { value: "cta", label: "Call to Action", description: "Seção de chamada para ação com botões" },
  { value: "list", label: "Lista de Itens", description: "Lista de tópicos ou benefícios" },
  { value: "divider", label: "Divisor", description: "Separador visual entre seções" },
];

function BlockEditor({ block, onChange, onRemove, onMoveUp, onMoveDown }: {
  block: UIBlock;
  onChange: (data: BlockData) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const d = block.data;

  return (
    <div className="border rounded-lg p-4 space-y-3 bg-background">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-sm">{BLOCK_TYPES.find(b => b.value === block.type)?.label}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={onMoveUp} data-testid="button-block-up"><ChevronUp className="w-3 h-3" /></Button>
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={onMoveDown} data-testid="button-block-down"><ChevronDown className="w-3 h-3" /></Button>
          <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={onRemove} data-testid="button-block-remove"><Trash2 className="w-3 h-3" /></Button>
        </div>
      </div>

      {block.type !== "divider" && (
        <div className="grid grid-cols-1 gap-3">
          {(block.type === "hero" || block.type === "text" || block.type === "image_text" || block.type === "cta") && (
            <div className="space-y-1">
              <Label className="text-xs">Título</Label>
              <Input data-testid="input-block-title" placeholder="Título da seção" value={d.title ?? ""} onChange={e => onChange({ ...d, title: e.target.value })} />
            </div>
          )}
          {(block.type === "hero" || block.type === "cta") && (
            <div className="space-y-1">
              <Label className="text-xs">Subtítulo / Descrição</Label>
              <Textarea data-testid="input-block-subtitle" placeholder="Subtítulo ou descrição curta" value={d.subtitle ?? ""} onChange={e => onChange({ ...d, subtitle: e.target.value })} rows={2} />
            </div>
          )}
          {(block.type === "text" || block.type === "image_text") && (
            <div className="space-y-1">
              <Label className="text-xs">Texto</Label>
              <Textarea data-testid="input-block-text" placeholder="Conteúdo do bloco" value={d.text ?? ""} onChange={e => onChange({ ...d, text: e.target.value })} rows={4} />
            </div>
          )}
          {(block.type === "image_text") && (
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs">URL da Imagem</Label>
                <Input data-testid="input-block-image" placeholder="https://..." value={d.imageUrl ?? ""} onChange={e => onChange({ ...d, imageUrl: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Alt da Imagem</Label>
                <Input placeholder="Descrição da imagem" value={d.imageAlt ?? ""} onChange={e => onChange({ ...d, imageAlt: e.target.value })} />
              </div>
            </div>
          )}
          {(block.type === "hero" || block.type === "cta") && (
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs">Texto do Botão</Label>
                <Input data-testid="input-block-btn-label" placeholder="Ex: Saiba mais" value={d.buttonLabel ?? ""} onChange={e => onChange({ ...d, buttonLabel: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Link do Botão</Label>
                <Input placeholder="Ex: /contato" value={d.buttonHref ?? ""} onChange={e => onChange({ ...d, buttonHref: e.target.value })} />
              </div>
            </div>
          )}
          {block.type === "list" && (
            <div className="space-y-2">
              <Label className="text-xs">Itens da lista (um por linha)</Label>
              <Textarea
                data-testid="input-block-list"
                placeholder={"Item 1\nItem 2\nItem 3"}
                value={(d.items ?? []).join("\n")}
                onChange={e => onChange({ ...d, items: e.target.value.split("\n") })}
                rows={4}
              />
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">Alinhamento</Label>
              <Select value={d.align ?? "left"} onValueChange={v => onChange({ ...d, align: v as "left" | "center" | "right" })}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Esquerda</SelectItem>
                  <SelectItem value="center">Centro</SelectItem>
                  <SelectItem value="right">Direita</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Fundo</Label>
              <Select value={d.bgColor ?? "white"} onValueChange={v => onChange({ ...d, bgColor: v as "white" | "muted" | "primary" })}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="white">Branco</SelectItem>
                  <SelectItem value="muted">Cinza claro</SelectItem>
                  <SelectItem value="primary">Verde (primário)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPageEditor() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isNew = !id || id === "new";

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [blocks, setBlocks] = useState<UIBlock[]>([]);
  const [addingBlock, setAddingBlock] = useState(false);

  const { data: existing } = useQuery<Page & { blocks: PageBlock[] }>({
    queryKey: ["/api/admin/pages", id],
    enabled: !isNew,
  });

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setSlug(existing.slug);
      setMetaTitle(existing.metaTitle ?? "");
      setMetaDescription(existing.metaDescription ?? "");
      setPublished(existing.published);
      setBlocks(existing.blocks.map(b => ({
        id: b.id,
        type: b.type as BlockType,
        data: JSON.parse(b.data),
        displayOrder: b.displayOrder ?? "0",
      })));
    }
  }, [existing]);

  const createMutation = useMutation({
    mutationFn: async () => {
      const page = await apiRequest("POST", "/api/admin/pages", { title, slug, metaTitle, metaDescription, published }).then(r => r.json());
      await apiRequest("PUT", `/api/admin/pages/${page.id}/blocks`, {
        blocks: blocks.map((b, i) => ({ type: b.type, data: JSON.stringify(b.data), displayOrder: String(i) })),
      });
      return page;
    },
    onSuccess: (page) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pages"] });
      toast({ title: "Página criada!" });
      setLocation(`/admin/pages/${page.id}`);
    },
    onError: () => toast({ title: "Erro ao criar", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("PATCH", `/api/admin/pages/${id}`, { title, slug, metaTitle, metaDescription, published });
      await apiRequest("PUT", `/api/admin/pages/${id}/blocks`, {
        blocks: blocks.map((b, i) => ({ type: b.type, data: JSON.stringify(b.data), displayOrder: String(i) })),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pages", id] });
      toast({ title: "Página salva!" });
    },
    onError: () => toast({ title: "Erro ao salvar", variant: "destructive" }),
  });

  function addBlock(type: BlockType) {
    setBlocks(prev => [...prev, { type, data: {}, displayOrder: String(prev.length) }]);
    setAddingBlock(false);
  }

  function moveBlock(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    const copy = [...blocks];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    setBlocks(copy.map((b, idx) => ({ ...b, displayOrder: String(idx) })));
  }

  function handleSave() {
    if (isNew) createMutation.mutate();
    else updateMutation.mutate();
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <AdminLayout title={isNew ? "Nova Página" : `Editar: ${title}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page meta */}
        <div className="border rounded-lg p-5 space-y-4 bg-background">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Configurações da Página</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Título da Página</Label>
              <Input data-testid="input-page-title" placeholder="Ex: Sobre Nós" value={title} onChange={e => {
                setTitle(e.target.value);
                if (isNew) setSlug(e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
              }} />
            </div>
            <div className="space-y-1">
              <Label>Slug (URL)</Label>
              <div className="flex items-center gap-1">
                <span className="text-sm text-muted-foreground whitespace-nowrap">/p/</span>
                <Input data-testid="input-page-slug" placeholder="sobre-nos" value={slug} onChange={e => setSlug(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Meta Title (SEO)</Label>
              <Input data-testid="input-page-metatitle" placeholder="Título para Google" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Meta Description (SEO)</Label>
              <Input data-testid="input-page-metadesc" placeholder="Descrição para Google" value={metaDescription} onChange={e => setMetaDescription(e.target.value)} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={published} onCheckedChange={setPublished} data-testid="switch-page-published" />
            <Label>Publicada (visível no site)</Label>
          </div>
        </div>

        {/* Blocks */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Blocos de Conteúdo</h3>
            <Button variant="outline" size="sm" onClick={() => setAddingBlock(!addingBlock)} data-testid="button-add-block">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Bloco
            </Button>
          </div>

          {addingBlock && (
            <div className="border rounded-lg p-4 bg-muted/30">
              <p className="text-sm font-medium mb-3">Escolha o tipo de bloco:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {BLOCK_TYPES.map(bt => (
                  <button
                    key={bt.value}
                    data-testid={`button-block-type-${bt.value}`}
                    onClick={() => addBlock(bt.value)}
                    className="text-left p-3 border rounded-lg hover:bg-background hover:border-primary transition-colors"
                  >
                    <div className="font-medium text-sm">{bt.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{bt.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {blocks.length === 0 && !addingBlock && (
            <div className="text-center py-8 border rounded-lg border-dashed text-muted-foreground text-sm">
              Clique em "Adicionar Bloco" para montar sua página
            </div>
          )}

          {blocks.map((block, i) => (
            <BlockEditor
              key={`${block.id ?? i}-${i}`}
              block={block}
              onChange={data => setBlocks(prev => prev.map((b, idx) => idx === i ? { ...b, data } : b))}
              onRemove={() => setBlocks(prev => prev.filter((_, idx) => idx !== i))}
              onMoveUp={() => moveBlock(i, -1)}
              onMoveDown={() => moveBlock(i, 1)}
            />
          ))}
        </div>

        {/* Save */}
        <div className="flex gap-3">
          <Button data-testid="button-save-page" onClick={handleSave} disabled={isSaving || !title || !slug}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Salvando..." : isNew ? "Criar Página" : "Salvar Alterações"}
          </Button>
          <Button variant="ghost" onClick={() => setLocation("/admin/pages")}>Cancelar</Button>
        </div>
      </div>
    </AdminLayout>
  );
}
