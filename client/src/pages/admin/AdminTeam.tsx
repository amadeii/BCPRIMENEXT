import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
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
  Edit,
  Trash2,
  Eye,
  LogOut,
  ImagePlus,
  X,
  Loader2,
  Users,
  Save,
} from "lucide-react";
import type { TeamMember } from "@shared/schema";

function MemberForm({
  member,
  onSave,
  onClose,
}: {
  member?: TeamMember;
  onSave: () => void;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const [name, setName] = useState(member?.name || "");
  const [role, setRole] = useState(member?.role || "");
  const [bio, setBio] = useState(member?.bio || "");
  const [photo, setPhoto] = useState(member?.photo || "");
  const [order, setOrder] = useState(member?.order || "0");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const data = { name, role, bio, photo: photo || null, order };
      if (member) {
        return apiRequest("PATCH", `/api/admin/team/${member.id}`, data);
      }
      return apiRequest("POST", "/api/admin/team", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/team"] });
      toast({
        title: member ? "Membro atualizado!" : "Membro adicionado!",
        description: member
          ? "As informações foram salvas."
          : "O profissional foi adicionado à equipe.",
      });
      onSave();
      onClose();
    },
    onError: () => {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as informações.",
        variant: "destructive",
      });
    },
  });

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setPhoto(data.url);
    } catch {
      toast({ title: "Erro ao enviar imagem", variant: "destructive" });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Foto</Label>
        <div className="mt-2">
          {photo ? (
            <div className="relative inline-block">
              <img
                src={photo}
                alt="Foto do profissional"
                className="h-24 w-24 rounded-full border object-cover"
                data-testid="img-member-photo"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -right-1 -top-1 h-6 w-6"
                onClick={() => setPhoto("")}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div
              className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-primary/50"
              onClick={() => fileRef.current?.click()}
              data-testid="button-upload-photo"
            >
              {uploading ? (
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              ) : (
                <ImagePlus className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>
      </div>

      <div>
        <Label>Nome *</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome completo"
          data-testid="input-member-name"
        />
      </div>

      <div>
        <Label>Cargo *</Label>
        <Input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Ex: CEO & Fundador"
          data-testid="input-member-role"
        />
      </div>

      <div>
        <Label>Minicurrículo *</Label>
        <Textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Breve descrição profissional..."
          className="min-h-[100px]"
          data-testid="input-member-bio"
        />
      </div>

      <div>
        <Label>Ordem de exibição</Label>
        <Input
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          placeholder="0"
          type="number"
          data-testid="input-member-order"
        />
      </div>

      <Button
        className="w-full"
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending || !name || !role || !bio}
        data-testid="button-save-member"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Salvando...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            {member ? "Salvar Alterações" : "Adicionar Membro"}
          </>
        )}
      </Button>
    </div>
  );
}

export default function AdminTeam() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [editingMember, setEditingMember] = useState<TeamMember | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth");
    if (!isAuth) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const { data: members, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/admin/team"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/admin/team/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/team"] });
      toast({ title: "Membro removido", description: "O profissional foi removido da equipe." });
    },
    onError: () => {
      toast({ title: "Erro ao remover", variant: "destructive" });
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setLocation("/admin/login");
  };

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
            <h1 className="font-heading text-3xl font-bold">Equipe</h1>
            <p className="text-muted-foreground">Gerencie os profissionais da empresa</p>
          </div>
          <Dialog
            open={dialogOpen}
            onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) setEditingMember(undefined);
            }}
          >
            <DialogTrigger asChild>
              <Button
                data-testid="button-new-member"
                onClick={() => {
                  setEditingMember(undefined);
                  setDialogOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Novo Membro
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingMember ? "Editar Membro" : "Novo Membro"}
                </DialogTitle>
              </DialogHeader>
              <MemberForm
                member={editingMember}
                onSave={() => {}}
                onClose={() => {
                  setDialogOpen(false);
                  setEditingMember(undefined);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-muted-foreground">Carregando equipe...</div>
        ) : members && members.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {members.map((member) => (
              <Card key={member.id} data-testid={`card-member-${member.id}`}>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-primary/10">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Users className="h-10 w-10 text-primary/50" />
                    )}
                  </div>
                  <h3 className="font-heading font-semibold">{member.name}</h3>
                  <div className="mb-2 text-sm text-primary">{member.role}</div>
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingMember(member);
                        setDialogOpen(true);
                      }}
                      data-testid={`button-edit-member-${member.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid={`button-delete-member-${member.id}`}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remover membro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            {member.name} será removido da equipe. Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteMutation.mutate(member.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Remover
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
            <p className="mb-4 text-muted-foreground">Nenhum membro cadastrado</p>
            <Button
              onClick={() => {
                setEditingMember(undefined);
                setDialogOpen(true);
              }}
              data-testid="button-create-first-member"
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Primeiro Membro
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
