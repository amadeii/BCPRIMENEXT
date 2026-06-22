import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ServicePricingCard } from "@/components/ServicePricingCard";
import {
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Wallet,
  PiggyBank,
  CreditCard,
  Receipt,
  BarChart3,
  Target,
} from "lucide-react";

import servicoFinanceOn from "@assets/servico_finance_on_1769721849189.png";

const services = [
  {
    icon: Wallet,
    title: "Contas a Pagar",
    description: "Gestão completa de todas as obrigações financeiras da sua empresa.",
  },
  {
    icon: Receipt,
    title: "Contas a Receber",
    description: "Controle de recebíveis e gestão de inadimplência.",
  },
  {
    icon: CreditCard,
    title: "Conciliação Bancária",
    description: "Conferência automática de extratos e movimentações.",
  },
  {
    icon: BarChart3,
    title: "Fluxo de Caixa",
    description: "Projeções e análises para melhor gestão do seu capital.",
  },
  {
    icon: PiggyBank,
    title: "Planejamento Financeiro",
    description: "Estratégias para otimizar os recursos da empresa.",
  },
  {
    icon: Target,
    title: "Indicadores de Performance",
    description: "KPIs financeiros para tomada de decisão estratégica.",
  },
];

const benefits = [
  "Redução de custos operacionais",
  "Mais tempo para o core business",
  "Equipe especializada dedicada",
  "Tecnologia de ponta",
  "Relatórios gerenciais personalizados",
  "Sem custos com contratação CLT",
  "Escalabilidade conforme demanda",
  "Visão estratégica financeira",
];

export default function ConsultoriaFinanceira() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-blue-500/5 via-background to-blue-500/10 py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-4">Finance-NEXT</Badge>
              <h1 className="mb-6 font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
                <span className="text-primary">BPO Financeiro</span> para sua Empresa
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Terceirize a gestão financeira da sua empresa e foque no que realmente importa:
                fazer seu negócio crescer. Nossa equipe especializada cuida de tudo.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/contato">
                  <Button size="lg" data-testid="button-financeira-cta">
                    Solicitar Proposta
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/planos-e-precos">
                  <Button variant="outline" size="lg" data-testid="button-financeira-planos">
                    Ver Planos
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <img 
                  src={servicoFinanceOn} 
                  alt="Finance-NEXT BPO Financeiro" 
                  className="h-auto w-full max-w-md mx-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
              Serviços do Finance-NEXT
            </h2>
            <p className="text-muted-foreground">
              Uma gestão financeira completa e profissional para sua empresa.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={index} className="h-full" data-testid={`card-service-${index}`}>
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                    <service.icon className="h-6 w-6 text-blue-500" />
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
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2 rounded-lg border bg-background p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="mb-6 font-heading text-3xl font-bold md:text-4xl">
                Por que terceirizar a gestão financeira?
              </h2>
              <p className="mb-6 text-muted-foreground">
                Empresas que terceirizam a gestão financeira economizam em média 40% em custos
                operacionais e ganham mais eficiência nas operações do dia a dia.
              </p>
              <p className="mb-8 text-muted-foreground">
                Com o Finance-NEXT, você tem acesso a uma equipe de especialistas sem os custos
                de contratação CLT, treinamento e tecnologia.
              </p>
              <ServicePricingCard
                highlights={["BPO Financeiro completo", "Sem contratação CLT", "Especialistas dedicados"]}
                ctaLabel="Ver Planos com Finance-NEXT"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-4 font-heading text-3xl font-bold">
            Quer saber quanto você pode economizar?
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Solicite uma proposta personalizada para sua empresa.
          </p>
          <Link href="/contato">
            <Button size="lg" variant="secondary" data-testid="button-financeira-cta-final">
              Solicitar Proposta Gratuita
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
