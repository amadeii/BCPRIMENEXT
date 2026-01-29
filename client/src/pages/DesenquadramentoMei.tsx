import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  TrendingUp,
  Clock,
  FileText,
  Shield,
} from "lucide-react";

const reasons = [
  {
    icon: TrendingUp,
    title: "Faturamento acima de R$ 81 mil",
    description: "Se seu faturamento ultrapassou o limite do MEI, é obrigatório migrar para ME.",
  },
  {
    icon: Users,
    title: "Mais de um funcionário",
    description: "MEI pode ter apenas um funcionário. Precisando de mais? Hora de migrar.",
  },
  {
    icon: FileText,
    title: "Atividade não permitida",
    description: "Algumas atividades não são permitidas para MEI e exigem migração.",
  },
  {
    icon: Shield,
    title: "Participação em outra empresa",
    description: "Se você é sócio de outra empresa, não pode ser MEI.",
  },
];

const benefits = [
  "Faturamento ilimitado",
  "Contratação de mais funcionários",
  "Mais atividades permitidas",
  "Acesso a licitações",
  "Maior credibilidade no mercado",
  "Possibilidade de ter sócios",
  "Acesso a linhas de crédito",
  "Emissão de notas para qualquer cliente",
];

const steps = [
  { step: "1", title: "Contato", description: "Fale conosco e tire suas dúvidas sobre a migração." },
  { step: "2", title: "Documentos", description: "Enviamos a lista do que precisamos." },
  { step: "3", title: "Processo", description: "Cuidamos de todo o processo de desenquadramento." },
  { step: "4", title: "Pronto", description: "Sua empresa está migrada e regularizada." },
];

export default function DesenquadramentoMei() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-amber-500/5 via-background to-amber-500/10 py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-4">MEI para ME</Badge>
              <h1 className="mb-6 font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
                <span className="text-primary">Desenquadramento</span> de MEI
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Seu negócio cresceu e ultrapassou os limites do MEI? Não se preocupe!
                Fazemos a migração para ME de forma rápida, segura e sem dor de cabeça.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/contato">
                  <Button size="lg" data-testid="button-mei-cta">
                    Fazer Migração
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contato">
                  <Button variant="outline" size="lg" data-testid="button-mei-duvidas">
                    Tirar Dúvidas
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-transparent p-8">
                <div className="flex h-full items-center justify-center">
                  <Users className="h-32 w-32 text-amber-500/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-amber-50 py-6 dark:bg-amber-950/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <AlertTriangle className="h-6 w-6 shrink-0 text-amber-600" />
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Atenção:</strong> O desenquadramento do MEI deve ser feito até o último dia útil do mês
              seguinte ao que ocorreu o excesso de faturamento ou outra situação que exija a migração.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
              Quando é preciso migrar de MEI para ME?
            </h2>
            <p className="text-muted-foreground">
              Existem algumas situações que exigem o desenquadramento do MEI.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {reasons.map((reason, index) => (
              <Card key={index} data-testid={`card-reason-${index}`}>
                <CardContent className="flex gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                    <reason.icon className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-heading font-semibold">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground">{reason.description}</p>
                  </div>
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
                Benefícios de migrar para ME
              </h2>
              <p className="mb-8 text-muted-foreground">
                A migração para ME abre novas possibilidades para o crescimento do seu negócio.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-6 font-heading text-xl font-semibold">Como funciona o processo?</h3>
              <div className="space-y-4">
                {steps.map((item, index) => (
                  <div key={index} className="flex gap-4" data-testid={`step-${index}`}>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-heading font-bold text-primary-foreground">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 text-center md:p-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-4 font-heading text-2xl font-bold md:text-3xl">
              Migração rápida e sem complicação
            </h2>
            <p className="mb-6 text-muted-foreground">
              Todo o processo é feito em até 30 dias. Cuidamos de toda a burocracia para você
              continuar focando no crescimento do seu negócio.
            </p>
            <div className="mb-8 flex flex-wrap justify-center gap-4">
              <div className="rounded-lg bg-muted px-4 py-2">
                <div className="font-heading text-2xl font-bold text-primary">30 dias</div>
                <div className="text-xs text-muted-foreground">prazo médio</div>
              </div>
              <div className="rounded-lg bg-muted px-4 py-2">
                <div className="font-heading text-2xl font-bold text-primary">100%</div>
                <div className="text-xs text-muted-foreground">digital</div>
              </div>
              <div className="rounded-lg bg-muted px-4 py-2">
                <div className="font-heading text-2xl font-bold text-primary">0</div>
                <div className="text-xs text-muted-foreground">complicações</div>
              </div>
            </div>
            <Link href="/contato">
              <Button size="lg" data-testid="button-mei-iniciar">
                Iniciar Migração
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-4 font-heading text-3xl font-bold">
            Seu negócio cresceu? Parabéns!
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Agora é hora de regularizar. Fale com nossos especialistas e faça a migração sem preocupações.
          </p>
          <Link href="/contato">
            <Button size="lg" variant="secondary" data-testid="button-mei-cta-final">
              Fale com um Especialista
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
