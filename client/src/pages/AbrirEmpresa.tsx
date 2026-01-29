import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  FileText,
  Shield,
  Clock,
  Zap,
  Users,
  Award,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Contato Inicial",
    description: "Fale com nosso time e tire todas as suas dúvidas sobre abertura de empresa.",
  },
  {
    number: "02",
    title: "Documentação",
    description: "Enviamos a lista de documentos necessários. Você nos envia tudo digitalmente.",
  },
  {
    number: "03",
    title: "Abertura",
    description: "Cuidamos de todo o processo de abertura junto aos órgãos competentes.",
  },
  {
    number: "04",
    title: "Pronto!",
    description: "Sua empresa está aberta e pronta para faturar. Em média, 15 dias úteis.",
  },
];

const included = [
  "Consulta de viabilidade",
  "Registro na Junta Comercial",
  "CNPJ na Receita Federal",
  "Inscrição Estadual",
  "Inscrição Municipal",
  "Alvará de funcionamento",
  "Certificado Digital e-CNPJ",
  "Contrato Social",
];

const businessTypes = [
  { name: "MEI", description: "Microempreendedor Individual", limit: "Até R$ 81 mil/ano" },
  { name: "ME", description: "Microempresa", limit: "Até R$ 360 mil/ano" },
  { name: "EPP", description: "Empresa de Pequeno Porte", limit: "Até R$ 4,8 milhões/ano" },
  { name: "LTDA", description: "Sociedade Limitada", limit: "Sem limite" },
];

export default function AbrirEmpresa() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-orange-500/5 via-background to-orange-500/10 py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">Start-ON</Badge>
            <h1 className="mb-6 font-heading text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              Abra sua Empresa <span className="text-primary">Grátis</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Nós cuidamos de toda a burocracia para você. Sem taxa de abertura, sem complicação.
              Sua empresa pronta para faturar em até 15 dias.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contato">
                <Button size="lg" className="min-w-[200px]" data-testid="button-abrir-cta">
                  Abra sua Empresa Grátis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Taxa de abertura: R$ 0</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Prazo: até 15 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>100% online</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
              Como funciona?
            </h2>
            <p className="text-muted-foreground">
              Simplificamos todo o processo para você. Veja como é fácil abrir sua empresa.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative" data-testid={`step-${index}`}>
                <div className="mb-4 font-heading text-5xl font-extrabold text-primary/20">
                  {step.number}
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-heading text-3xl font-bold md:text-4xl">
                O que está incluso na abertura?
              </h2>
              <p className="mb-8 text-muted-foreground">
                Tudo o que você precisa para começar seu negócio está incluído, sem custos adicionais.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {included.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-6 font-heading text-xl font-semibold">Tipos de empresa</h3>
              <div className="space-y-4">
                {businessTypes.map((type, index) => (
                  <Card key={index} data-testid={`card-type-${index}`}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <div className="font-heading font-semibold">{type.name}</div>
                        <div className="text-sm text-muted-foreground">{type.description}</div>
                      </div>
                      <Badge variant="secondary">{type.limit}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
              Por que abrir com a BCPrimeON?
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card data-testid="card-benefit-0">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-heading font-semibold">Rápido e Simples</h3>
                <p className="text-sm text-muted-foreground">
                  Processo 100% digital. Sua empresa aberta em até 15 dias úteis.
                </p>
              </CardContent>
            </Card>
            <Card data-testid="card-benefit-1">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-heading font-semibold">Segurança Total</h3>
                <p className="text-sm text-muted-foreground">
                  Seus dados protegidos e documentação segura em ambiente criptografado.
                </p>
              </CardContent>
            </Card>
            <Card data-testid="card-benefit-2">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-heading font-semibold">Experiência</h3>
                <p className="text-sm text-muted-foreground">
                  Mais de 5.000 empresas abertas com sucesso. Expertise que faz diferença.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-4 font-heading text-3xl font-bold">
            Pronto para começar seu negócio?
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Abra sua empresa grátis e comece a faturar. Sem burocracia, sem complicação.
          </p>
          <Link href="/contato">
            <Button size="lg" variant="secondary" data-testid="button-abrir-cta-final">
              Abra sua Empresa Grátis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
