import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  FileText,
  Building2,
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowRight,
  Star,
  Shield,
  Clock,
  Headphones,
  Zap,
  BarChart3,
  FileCheck,
  PiggyBank,
} from "lucide-react";

import servicoBalanceOn from "@assets/servico_balance_on_1769721849189.png";
import servicoFinanceOn from "@assets/servico_finance_on_1769721849189.png";
import servicoTaxOn from "@assets/servico_tax_on_1769721849188.png";
import servicoStartOn from "@assets/servico_start_on_1769721849188.png";
import porqueBcprimeon from "@assets/porque_bcprimeon_1769721849188.png";
import dashboardBeneficios from "@assets/dashboard_beneficios_1769721849187.png";

const features = [
  {
    icon: Calculator,
    title: "Contabilidade 100% Digital",
    description: "Gerencie sua empresa de qualquer lugar, a qualquer hora. Tudo online e simplificado.",
  },
  {
    icon: Shield,
    title: "Segurança Garantida",
    description: "Seus dados protegidos com a mais alta tecnologia de criptografia e backup.",
  },
  {
    icon: Clock,
    title: "Economia de Tempo",
    description: "Automatize processos e reduza em até 80% o tempo gasto com burocracia.",
  },
  {
    icon: Headphones,
    title: "Suporte Especializado",
    description: "Equipe de contadores experientes prontos para atender suas demandas.",
  },
];

const services = [
  {
    icon: Calculator,
    title: "Balance-ON",
    subtitle: "Contabilidade Digital",
    description: "Gestão contábil completa e automatizada para sua empresa crescer sem preocupações.",
    href: "/contabilidade-digital",
    color: "bg-primary/10",
    image: servicoBalanceOn,
  },
  {
    icon: TrendingUp,
    title: "Finance-ON",
    subtitle: "BPO Financeiro",
    description: "Terceirize sua gestão financeira e foque no que realmente importa: seu negócio.",
    href: "/consultoria-financeira",
    color: "bg-blue-500/10",
    image: servicoFinanceOn,
  },
  {
    icon: FileText,
    title: "Tax-ON",
    subtitle: "Consultoria Tributária",
    description: "Planejamento tributário inteligente para pagar menos impostos dentro da lei.",
    href: "/consultoria-tributaria",
    color: "bg-purple-500/10",
    image: servicoTaxOn,
  },
  {
    icon: Building2,
    title: "Start-ON",
    subtitle: "Abertura de Empresa",
    description: "Abra sua empresa grátis em até 15 dias. Nós cuidamos de toda a burocracia.",
    href: "/abrir-empresa",
    color: "bg-orange-500/10",
    image: servicoStartOn,
  },
];

const benefits = [
  "Abertura de empresa grátis*",
  "Emissão ilimitada de notas fiscais",
  "Dashboard completo de gestão",
  "Lembretes de obrigações fiscais",
  "Suporte via WhatsApp",
  "Integração com bancos",
  "Relatórios automatizados",
  "Atendimento humanizado",
];

const testimonials = [
  {
    name: "Carlos S.",
    role: "Empresário",
    content: "A BCPrimeON transformou a gestão contábil da minha empresa. Economizei tempo e dinheiro!",
    rating: 5,
  },
  {
    name: "Ana B.",
    role: "Empresária",
    content: "Profissionais extremamente competentes. O atendimento é rápido e sempre resolvem minhas dúvidas.",
    rating: 5,
  },
  {
    name: "Roberto S.",
    role: "Empreendedor",
    content: "Desde que migrei para a BCPrimeON, não tive mais dor de cabeça com impostos e obrigações.",
    rating: 5,
  },
];

const stats = [
  { value: "Centenas", label: "de empresas atendidas" },
  { value: "98%", label: "Clientes satisfeitos" },
  { value: "15+", label: "Anos de experiência" },
  { value: "24h", label: "Tempo médio de resposta" },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">
              Contabilidade 100% Digital
            </Badge>
            <h1 className="mb-6 font-heading text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              Sua contabilidade{" "}
              <span className="text-primary">simples, digital</span> e sempre{" "}
              <span className="text-primary">ON</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Transforme a gestão do seu negócio com a contabilidade digital que cresce junto com você.
              Abertura de empresa grátis a partir do plano Profissional, suporte humanizado e tecnologia de ponta.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/abrir-empresa">
                <Button size="lg" className="min-w-[200px]" data-testid="button-hero-abrir-empresa">
                  Abra sua Empresa Grátis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contato">
                <Button variant="outline" size="lg" className="min-w-[200px]" data-testid="button-hero-fale-especialista">
                  Fale com um Especialista
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Sem taxa de abertura</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Atendimento humanizado</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Suporte via WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-card py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
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
                    <div className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {service.subtitle}
                    </div>
                    <h3 className="mb-2 font-heading text-xl font-semibold">{service.title}</h3>
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

      <section className="bg-card py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-4">Por que a BCPrimeON?</Badge>
              <h2 className="mb-6 font-heading text-3xl font-bold md:text-4xl">
                Tecnologia e expertise a serviço do seu negócio
              </h2>
              <p className="mb-8 text-muted-foreground">
                Combinamos a eficiência da tecnologia com o atendimento humanizado que você merece.
                Nossa plataforma foi desenvolvida para simplificar a sua vida empresarial.
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
                  alt="Por que a BCPrimeON" 
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">Benefícios</Badge>
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
              Tudo o que você precisa em um só lugar
            </h2>
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg border bg-card p-4"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="relative">
              <img 
                src={dashboardBeneficios} 
                alt="Dashboard BCPrimeON" 
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

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

      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
              Pronto para transformar sua contabilidade?
            </h2>
            <p className="mb-8 text-primary-foreground/80">
              Junte-se a centenas de empresas que já simplificaram sua gestão contábil com a BCPrimeON.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/abrir-empresa">
                <Button size="lg" variant="secondary" className="min-w-[200px]" data-testid="button-cta-comece-agora">
                  Comece Agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/planos-e-precos">
                <Button size="lg" variant="outline" className="min-w-[200px] border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" data-testid="button-cta-ver-planos">
                  Ver Planos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
