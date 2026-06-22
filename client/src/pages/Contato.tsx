import { useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
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
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  company: z.string().optional(),
  subject: z.string().min(1, "Selecione um assunto"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactForm = z.infer<typeof contactSchema>;

const subjects = [
  "Abrir Empresa",
  "Contabilidade Digital",
  "BPO Financeiro",
  "Consultoria Tributária",
  "Desenquadramento MEI",
  "Planos e Preços",
  "Suporte",
  "Outro",
];

const contactInfo = [
  {
    icon: MapPin,
    title: "Endereço",
    content: "Av. Camilo di Lellis, nº 633\nSalas 45 e 47 - Pinhais - PR",
  },
  {
    icon: Phone,
    title: "Telefone",
    content: "(41) 3403-2089",
    href: "tel:+554134032089",
  },
  {
    icon: Mail,
    title: "E-mail",
    content: "sales@bcprimeon.com",
    href: "mailto:sales@bcprimeon.com",
  },
  {
    icon: Clock,
    title: "Horário",
    content: "Seg - Sex: 8h às 18h",
  },
];

export default function Contato() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      return apiRequest("POST", "/api/leads", data);
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">Contato</Badge>
            <h1 className="mb-6 font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
              Fale com a <span className="text-primary">BCPrimeNEXT</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Estamos prontos para ajudar você e sua empresa. Entre em contato por um de nossos canais.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  {submitted ? (
                    <div className="flex flex-col items-center py-12 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <CheckCircle2 className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="mb-2 font-heading text-2xl font-bold">Mensagem Enviada!</h2>
                      <p className="mb-6 text-muted-foreground">
                        Recebemos sua mensagem e entraremos em contato em breve.
                      </p>
                      <Button onClick={() => setSubmitted(false)} variant="outline" data-testid="button-new-message">
                        Enviar Nova Mensagem
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="mb-6 font-heading text-2xl font-bold">Envie sua mensagem</h2>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nome *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Seu nome completo" {...field} data-testid="input-name" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>E-mail *</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="seu@email.com" {...field} data-testid="input-email" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Telefone *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="(11) 99999-9999" {...field} data-testid="input-phone" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="company"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Empresa</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Nome da empresa (opcional)" {...field} data-testid="input-company" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Assunto *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger data-testid="select-subject">
                                      <SelectValue placeholder="Selecione o assunto" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {subjects.map((subject) => (
                                      <SelectItem key={subject} value={subject}>
                                        {subject}
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
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mensagem *</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Como podemos ajudar você?"
                                    className="min-h-[120px]"
                                    {...field}
                                    data-testid="input-message"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="submit"
                            size="lg"
                            className="w-full"
                            disabled={mutation.isPending}
                            data-testid="button-submit-contact"
                          >
                            {mutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Enviando...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-4 w-4" />
                                Enviar Mensagem
                              </>
                            )}
                          </Button>
                        </form>
                      </Form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card data-testid="card-whatsapp">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#25D366]/10">
                    <SiWhatsapp className="h-6 w-6 text-[#25D366]" />
                  </div>
                  <h3 className="mb-2 font-heading font-semibold">WhatsApp</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Atendimento rápido e direto com nossa equipe.
                  </p>
                  <a
                    href="https://wa.me/5541985117177?text=Olá! Gostaria de saber mais sobre os serviços da BCPrimeNEXT."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-[#25D366] hover:bg-[#20BD5A]" data-testid="button-whatsapp">
                      <SiWhatsapp className="mr-2 h-4 w-4" />
                      Chamar no WhatsApp
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {contactInfo.map((info, index) => (
                <Card key={index} data-testid={`card-info-${index}`}>
                  <CardContent className="flex gap-4 p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">{info.title}</h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="whitespace-pre-line text-sm text-muted-foreground hover:text-primary"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="whitespace-pre-line text-sm text-muted-foreground">
                          {info.content}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="aspect-video overflow-hidden rounded-2xl bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.7!2d-49.19!3d-25.42!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI1JzEyLjAiUyA0OcKwMTEnMjQuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização BCPrimeNEXT"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
