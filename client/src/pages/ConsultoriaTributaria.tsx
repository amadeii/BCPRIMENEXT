import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Scale,
  TrendingDown,
  Building2,
  FileSearch,
  AlertTriangle,
} from "lucide-react";

const services = [
  {
    icon: Calculator,
    title: "Análise Tributária",
    description: "Diagnóstico completo da situação fiscal da sua empresa.",
  },
  {
    icon: TrendingDown,
    title: "Redução de Impostos",
    description: "Estratégias legais para diminuir a carga tributária.",
  },
  {
    icon: Scale,
    title: "Escolha do Regime",
    description: "Simples Nacional, Lucro Presumido ou Lucro Real? Escolhemos o melhor.",
  },
  {
    icon: FileSearch,
    title: "Recuperação de Créditos",
    description: "Identificação e recuperação de créditos tributários.",
  },
  {
    icon: Building2,
    title: "Reestruturação Societária",
    description: "Planejamento para operações societárias com menor impacto fiscal.",
  },
  {
    icon: AlertTriangle,
    title: "Gestão de Riscos",
    description: "Identificação e mitigação de riscos fiscais e tributários.",
  },
];

const savings = [
  { regime: "Simples Nacional", saving: "Até 30%" },
  { regime: "Lucro Presumido", saving: "Até 25%" },
  { regime: "Lucro Real", saving: "Até 40%" },
];

export default function ConsultoriaTributaria() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-purple-500/5 via-background to-purple-500/10 py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-4">Tax-ON</Badge>
              <h1 className="mb-6 font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
                Consultoria <span className="text-primary">Tributária</span> Estratégica
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Pague menos impostos de forma legal e segura. Nossos especialistas analisam sua
                empresa e encontram as melhores estratégias para otimizar sua carga tributária.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/contato">
                  <Button size="lg" data-testid="button-tributaria-cta">
                    Solicitar Diagnóstico
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/planos-e-precos">
                  <Button variant="outline" size="lg" data-testid="button-tributaria-planos">
                    Ver Planos
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent p-8">
                <div className="flex h-full items-center justify-center">
                  <FileText className="h-32 w-32 text-purple-500/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
              Nossos Serviços Tributários
            </h2>
            <p className="text-muted-foreground">
              Soluções completas para otimizar a tributação da sua empresa.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={index} className="h-full" data-testid={`card-service-${index}`}>
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                    <service.icon className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-semibold">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-heading text-3xl font-bold md:text-4xl">
                Economize com planejamento tributário
              </h2>
              <p className="mb-6 text-muted-foreground">
                Empresas que fazem planejamento tributário economizam significativamente em impostos.
                Veja o potencial de economia por regime tributário:
              </p>
              <div className="space-y-4">
                {savings.map((item, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border bg-background p-4">
                    <span className="font-medium">{item.regime}</span>
                    <span className="font-heading text-xl font-bold text-primary">{item.saving}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                * Valores médios baseados em análises de clientes. Economia real varia conforme atividade e faturamento.
              </p>
            </div>
            <div className="rounded-2xl border bg-background p-8">
              <h3 className="mb-6 text-center font-heading text-2xl font-bold">
                Diagnóstico Tributário Gratuito
              </h3>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Análise do regime tributário atual
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Simulação de economia
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Identificação de oportunidades
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Plano de ação personalizado
                </li>
              </ul>
              <Link href="/contato">
                <Button className="w-full" size="lg" data-testid="button-diagnostico">
                  Solicitar Diagnóstico Gratuito
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-4 font-heading text-3xl font-bold">
            Não deixe dinheiro na mesa
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Descubra quanto você pode economizar com uma consultoria tributária especializada.
          </p>
          <Link href="/contato">
            <Button size="lg" variant="secondary" data-testid="button-tributaria-cta-final">
              Fale com um Especialista
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
