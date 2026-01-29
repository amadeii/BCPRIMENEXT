import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  FileText,
  BarChart3,
  Bell,
  HelpCircle,
  Lock,
  ArrowRight,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const features = [
  {
    icon: FileText,
    title: "Documentos",
    description: "Acesse notas fiscais, guias e declarações.",
  },
  {
    icon: BarChart3,
    title: "Dashboard",
    description: "Visualize relatórios e indicadores da sua empresa.",
  },
  {
    icon: Bell,
    title: "Notificações",
    description: "Fique por dentro das obrigações e prazos.",
  },
  {
    icon: Lock,
    title: "Segurança",
    description: "Seus dados protegidos com criptografia.",
  },
];

export default function AreaCliente() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">Área do Cliente</Badge>
            <h1 className="mb-6 font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
              Acesse sua <span className="text-primary">conta</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Gerencie sua empresa de forma simples e prática através do nosso portal exclusivo.
            </p>
            <a
              href="https://portal.bcprimeon.com.br"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="min-w-[200px]" data-testid="button-acessar-portal">
                Acessar Portal
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold">
              O que você encontra no portal
            </h2>
            <p className="text-muted-foreground">
              Acesse todos os recursos para gerenciar sua empresa.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} data-testid={`card-feature-${index}`}>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-heading font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl border bg-background p-8 text-center md:p-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-4 font-heading text-2xl font-bold md:text-3xl">
              Precisa de ajuda?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Se você está tendo dificuldades para acessar o portal ou precisa de suporte,
              entre em contato conosco.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://wa.me/5511999999999?text=Olá! Preciso de ajuda para acessar a Área do Cliente."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" data-testid="button-whatsapp-suporte">
                  <SiWhatsapp className="mr-2 h-4 w-4" />
                  WhatsApp Suporte
                </Button>
              </a>
              <Link href="/contato">
                <Button data-testid="button-contato-suporte">
                  Entre em Contato
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-heading text-2xl font-bold">
              Ainda não é cliente?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Conheça nossos planos e comece a simplificar a contabilidade da sua empresa.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/planos-e-precos">
                <Button variant="outline" data-testid="button-ver-planos">
                  Ver Planos
                </Button>
              </Link>
              <Link href="/abrir-empresa">
                <Button data-testid="button-abrir-empresa">
                  Abra sua Empresa Grátis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
