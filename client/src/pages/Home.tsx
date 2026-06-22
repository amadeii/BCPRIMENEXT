import { Link } from "wouter";
import { siteStats as stats } from "@/lib/site-stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  FileText,
  Building2,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Star,
  Shield,
  Zap,
  BarChart3,
  Lock,
  Headphones,
  FileCheck,
  RefreshCcw,
  Bot,
  Cpu,
} from "lucide-react";

import servicoBalanceOn from "@assets/servico_balance_on_1769721849189.png";
import servicoFinanceOn from "@assets/servico_finance_on_1769721849189.png";
import servicoTaxOn from "@assets/servico_tax_on_1769721849188.png";
import servicoStartOn from "@assets/servico_start_on_1769721849188.png";
import porqueBcprimeon from "@assets/porque_bcprimeon_1769721849188.png";
import dashboardBeneficios from "@assets/dashboard_beneficios_1769721849187.png";

const features = [
  {
    icon: Bot,
    title: "Automação Inteligente com IA Maestro",
    description: "Processos contábeis gerenciados automaticamente pela inteligência artificial. Deixe a IA trabalhar enquanto você foca no crescimento do seu negócio.",
  },
  {
    icon: BarChart3,
    title: "Business Intelligence em Tempo Real",
    description: "Dashboards inteligentes que geram insights automáticos. Tome decisões melhores com dados precisos e atualizados em tempo real.",
  },
  {
    icon: Lock,
    title: "Segurança Avançada de Dados",
    description: "Proteção com criptografia de ponta e rotinas de backup gerenciadas por IA. Seus dados seguros 24/7.",
  },
  {
    icon: Headphones,
    title: "Suporte Humanizado Aliado à Tecnologia",
    description: "Equipe de especialistas atuando em conjunto com a automação. Respostas rápidas via WhatsApp e atendimento personalizado.",
  },
];

const services = [
  {
    icon: Calculator,
    title: "Balance-NEXT",
    subtitle: "Gestão contábil completa, automatizada pela IA Maestro",
    description: "Gestão contábil completa e automatizada para sua empresa crescer sem preocupações.",
    href: "/contabilidade-digital",
    color: "bg-primary/10",
    image: servicoBalanceOn,
  },
  {
    icon: TrendingUp,
    title: "Finance-NEXT",
    subtitle: "Gestão financeira inteligente, com insights em tempo real",
    description: "Terceirize sua gestão financeira e foque no que realmente importa: seu negócio.",
    href: "/consultoria-financeira",
    color: "bg-blue-500/10",
    image: servicoFinanceOn,
  },
  {
    icon: FileText,
    title: "Tax-NEXT",
    subtitle: "Planejamento tributário inteligente, otimizado pela IA",
    description: "Planejamento tributário inteligente para pagar menos impostos dentro da lei.",
    href: "/consultoria-tributaria",
    color: "bg-purple-500/10",
    image: servicoTaxOn,
  },
  {
    icon: Building2,
    title: "Start-NEXT",
    subtitle: "Abertura de empresa, acelerada pela automação",
    description: "Abra sua empresa grátis em até 15 dias. Nós cuidamos de toda a burocracia.",
    href: "/abrir-empresa",
    color: "bg-orange-500/10",
    image: servicoStartOn,
  },
];

const benefitCategories = [
  {
    title: "Automação Inteligente",
    icon: Bot,
    color: "text-primary",
    bg: "bg-primary/10",
    items: [
      "Processos contábeis automatizados pela IA Maestro",
      "Emissão ilimitada de notas fiscais (automática)",
      "Relatórios gerados automaticamente em tempo real",
    ],
  },
  {
    title: "Gestão Simplificada",
    icon: BarChart3,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    items: [
      "Dashboard completo de gestão com insights",
      "Lembretes inteligentes de obrigações fiscais",
      "Integração automática com bancos",
    ],
  },
  {
    title: "Suporte e Segurança",
    icon: Shield,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    items: [
      "Suporte humanizado via WhatsApp",
      "Segurança garantida com criptografia de ponta",
      "Abertura de empresa grátis",
    ],
  },
];

const testimonials = [
  {
    name: "Carlos S.",
    role: "Empresário",
    content: "Economizei 20 horas por mês com a automação. A IA Maestro gerencia tudo enquanto eu foco no crescimento do meu negócio!",
    rating: 5,
  },
  {
    name: "Ana B.",
    role: "Empresária",
    content: "Reduzimos impostos em R$ 5.000/mês com o planejamento tributário inteligente. Perfeito!",
    rating: 5,
  },
  {
    name: "Roberto S.",
    role: "Empreendedor",
    content: "Abri minha empresa em 5 dias, sem burocracia. A automação fez toda a diferença!",
    rating: 5,
  },
];

const maestroSteps = [
  {
    icon: FileCheck,
    title: "Processamento de Documentos",
    items: [
      "Lê e classifica automaticamente notas fiscais, recibos e comprovantes",
      "Identifica padrões e anomalias",
      "Aprende com cada documento processado",
    ],
  },
  {
    icon: BarChart3,
    title: "Geração de Relatórios",
    items: [
      "Cria relatórios contábeis automaticamente",
      "Gera insights sobre saúde financeira da empresa",
      "Identifica oportunidades de economia",
    ],
  },
  {
    icon: FileText,
    title: "Conformidade Fiscal",
    items: [
      "Monitora obrigações fiscais em tempo real",
      "Alerta automaticamente sobre prazos importantes",
      "Sugere otimizações tributárias dentro da lei",
    ],
  },
  {
    icon: RefreshCcw,
    title: "Reconciliação Bancária",
    items: [
      "Integra com bancos automaticamente",
      "Reconcilia transações em tempo real",
      "Identifica discrepâncias e fraudes",
    ],
  },
];

const empresaSolutions = [
  {
    type: "MEI",
    full: "Microempreendedor Individual",
    color: "border-primary/30 bg-primary/5",
    badge: "bg-primary/10 text-primary",
    items: [
      "Abertura grátis em 15 dias",
      "Automação de nota fiscal",
      "Economia de até 10 horas/mês",
      "Plano a partir de R$ 195/mês",
    ],
  },
  {
    type: "Simples Nacional",
    full: "Empresas do Simples Nacional",
    color: "border-blue-500/30 bg-blue-500/5",
    badge: "bg-blue-500/10 text-blue-600",
    items: [
      "Gestão contábil completa",
      "Planejamento tributário inteligente",
      "Economia de até 15% em impostos",
      "Plano a partir de R$ 395/mês",
    ],
  },
  {
    type: "Lucro Presumido",
    full: "Empresas do Lucro Presumido",
    color: "border-purple-500/30 bg-purple-500/5",
    badge: "bg-purple-500/10 text-purple-600",
    items: [
      "Consultoria tributária especializada",
      "Relatórios gerenciais avançados",
      "Business Intelligence em tempo real",
      "Plano a partir de R$ 795/mês",
    ],
  },
  {
    type: "Lucro Real",
    full: "Empresas do Lucro Real",
    color: "border-orange-500/30 bg-orange-500/5",
    badge: "bg-orange-500/10 text-orange-600",
    items: [
      "Solução enterprise completa",
      "Integração com sistemas ERP",
      "Consultoria dedicada",
      "Orçamento personalizado",
    ],
  },
];

const garantias = [
  "Segurança ISO 27001",
  "Criptografia de ponta a ponta",
  "Backup automático diário",
  "Garantia de satisfação 30 dias",
  "Suporte 24/7 humanizado",
  "Conformidade com LGPD",
  "Certificação de Segurança de Dados",
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">
              Automação Inteligente
            </Badge>
            <h1 className="mb-6 font-heading text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              Sua Central de Gestão Empresarial com{" "}
              <span className="text-primary">IA</span> — contabilidade, automação e insights sempre{" "}
              <span className="text-primary">ON</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Transforme a gestão do seu negócio com automação inteligente. Implantamos sistemas que a IA Maestro gerencia automaticamente,
              reduzindo burocracia em até 80% e gerando insights em tempo real. Abertura de empresa grátis, suporte humanizado e tecnologia de ponta.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/abrir-empresa">
                <Button size="lg" className="min-w-[200px]" data-testid="button-hero-abrir-empresa">
                  Comece Grátis em 5 Minutos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contato">
                <Button variant="outline" size="lg" className="min-w-[200px]" data-testid="button-hero-fale-especialista">
                  Agende Demo Gratuita
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Automação Inteligente</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>IA Maestro Gerencia Tudo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Suporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-card py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto grid max-w-md grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-heading text-3xl font-bold text-primary md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">Nossos Serviços</Badge>
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
              Soluções completas para sua empresa
            </h2>
            <p className="text-muted-foreground">
              Do início ao crescimento, temos a solução ideal para cada fase do seu negócio.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Link key={index} href={service.href}>
                <Card className="group h-full cursor-pointer transition-all hover-elevate" data-testid={`card-service-${index}`}>
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-4 flex h-24 items-center justify-center">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    <h3 className="mb-1 font-heading text-xl font-semibold">{service.title}</h3>
                    <div className="mb-2 text-xs font-medium text-primary">{service.subtitle}</div>
                    <p className="flex-1 text-sm text-muted-foreground">{service.description}</p>
                    <div className="mt-4 flex items-center text-sm font-medium text-primary">
                      Saiba mais
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Por que a BCPrimeNEXT */}
      <section className="bg-card py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-4">Por que a BCPrimeNEXT?</Badge>
              <h2 className="mb-6 font-heading text-3xl font-bold md:text-4xl">
                Tecnologia e expertise a serviço do seu negócio
              </h2>
              <p className="mb-8 text-muted-foreground">
                Combinamos automação inteligente com atendimento humanizado que você merece.
                Nossa plataforma foi desenvolvida para simplificar sua vida empresarial.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={porqueBcprimeon}
                  alt="Por que a BCPrimeNEXT"
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona a IA Maestro */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">IA Maestro</Badge>
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
              Como Funciona a IA Maestro
            </h2>
            <p className="text-muted-foreground">
              A IA Maestro é o coração da BCPrimeNEXT. Ela gerencia automaticamente todos os processos do seu negócio.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {maestroSteps.map((step, index) => (
              <Card key={index} className="h-full" data-testid={`card-maestro-${index}`}>
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">
                    0{index + 1}
                  </div>
                  <h3 className="mb-3 font-heading text-lg font-semibold">{step.title}</h3>
                  <ul className="space-y-2">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Soluções por Tipo de Empresa */}
      <section className="bg-card py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">Soluções Personalizadas</Badge>
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
              Soluções para Cada Tipo de Empresa
            </h2>
            <p className="text-muted-foreground">
              Independente do regime tributário, temos o plano ideal para o seu negócio.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {empresaSolutions.map((sol, index) => (
              <div key={index} className={`rounded-2xl border p-6 ${sol.color}`} data-testid={`card-empresa-${index}`}>
                <div className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold ${sol.badge}`}>
                  {sol.type}
                </div>
                <p className="mb-4 text-sm text-muted-foreground">{sol.full}</p>
                <ul className="space-y-2">
                  {sol.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/planos-e-precos">
              <Button size="lg" data-testid="button-ver-planos-solucoes">
                Ver Planos com IA Maestro
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">Benefícios</Badge>
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
              Tudo o que você precisa em um só lugar
            </h2>
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {benefitCategories.map((cat, index) => (
                <div key={index} className="rounded-xl border bg-card p-5" data-testid={`card-benefit-cat-${index}`}>
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${cat.bg}`}>
                    <cat.icon className={`h-5 w-5 ${cat.color}`} />
                  </div>
                  <h3 className="mb-3 font-heading font-semibold">{cat.title}</h3>
                  <ul className="space-y-2">
                    {cat.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="relative">
              <img
                src={dashboardBeneficios}
                alt="Dashboard BCPrimeNEXT"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-card py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">Depoimentos</Badge>
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
              O que nossos clientes dizem
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full" data-testid={`card-testimonial-${index}`}>
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mb-4 flex-1 text-muted-foreground">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Garantias e Certificações */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">Confiança e Segurança</Badge>
            <h2 className="mb-8 font-heading text-3xl font-bold md:text-4xl">
              Garantias e Certificações
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {garantias.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium"
                  data-testid={`badge-garantia-${index}`}
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
              Pronto para transformar sua contabilidade?
            </h2>
            <p className="mb-8 text-primary-foreground/80">
              Junte-se a centenas de empresas que já simplificaram sua gestão contábil com a BCPrimeNEXT.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/abrir-empresa">
                <Button size="lg" variant="secondary" className="min-w-[220px]" data-testid="button-cta-comece-agora">
                  Ativar Automação Agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/planos-e-precos">
                <Button size="lg" variant="outline" className="min-w-[220px] border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" data-testid="button-cta-ver-planos">
                  Ver Planos com IA Maestro
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
