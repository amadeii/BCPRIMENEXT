import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  CheckCircle2,
  ArrowRight,
  FileText,
  BarChart3,
  Clock,
  Shield,
  Laptop,
  RefreshCw,
  Bell,
  FileCheck,
} from "lucide-react";

import servicoBalanceOn from "@assets/servico_balance_on_1769721849189.png";

const features = [
  {
    icon: Laptop,
    title: "100% Online",
    description: "Acesse sua contabilidade de qualquer lugar, a qualquer hora. Tudo na nuvem.",
  },
  {
    icon: RefreshCw,
    title: "Automação Inteligente",
    description: "Processos automatizados que reduzem erros e economizam seu tempo.",
  },
  {
    icon: Bell,
    title: "Alertas e Lembretes",
    description: "Nunca mais perca um prazo fiscal. Notificações automáticas de obrigações.",
  },
  {
    icon: FileCheck,
    title: "Obrigações em Dia",
    description: "Todas as declarações e obrigações fiscais entregues no prazo.",
  },
  {
    icon: BarChart3,
    title: "Relatórios Gerenciais",
    description: "Dashboards completos para acompanhar a saúde financeira da sua empresa.",
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description: "Seus dados protegidos com criptografia de ponta e backups diários.",
  },
];

const included = [
  "Escrituração contábil completa",
  "Apuração de impostos",
  "Emissão de guias (DAS, DARF, GPS)",
  "Folha de pagamento",
  "Balanço patrimonial",
  "DRE (Demonstração de Resultados)",
  "Livros contábeis digitais",
  "Declarações anuais (IRPJ, ECD, ECF)",
  "Certidões negativas",
  "Suporte via WhatsApp",
  "Dashboard de gestão",
  "Relatórios personalizados",
];

export default function ContabilidadeDigital() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-4">Balance-NEXT</Badge>
              <h1 className="mb-6 font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
                Contabilidade <span className="text-primary">Digital</span> Completa
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Esqueça a burocracia e foque no crescimento do seu negócio. Nossa contabilidade
                digital cuida de tudo para você, com transparência, agilidade e tecnologia de ponta.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/abrir-empresa">
                  <Button size="lg" data-testid="button-contabilidade-cta">
                    Comece Agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contato">
                  <Button variant="outline" size="lg" data-testid="button-contabilidade-contato">
                    Fale com Especialista
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <img 
                  src={servicoBalanceOn} 
                  alt="Balance-NEXT Contabilidade Digital" 
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
              Recursos que fazem a diferença
            </h2>
            <p className="text-muted-foreground">
              Nossa plataforma foi desenvolvida para simplificar sua vida empresarial.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="h-full" data-testid={`card-feature-${index}`}>
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
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
                O que está incluso no Balance-NEXT
              </h2>
              <p className="mb-8 text-muted-foreground">
                Tenha acesso a todos os serviços contábeis que sua empresa precisa em uma única mensalidade.
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
            <div className="rounded-2xl border bg-background p-8">
              <div className="mb-6 text-center">
                <div className="mb-2 text-sm text-muted-foreground">A partir de</div>
                <div className="font-heading text-5xl font-bold text-primary">R$ 99</div>
                <div className="text-muted-foreground">/mês</div>
              </div>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Sem taxa de abertura
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Sem fidelidade
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Suporte ilimitado
                </li>
              </ul>
              <Link href="/planos-e-precos">
                <Button className="w-full" size="lg" data-testid="button-ver-planos">
                  Ver Todos os Planos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-4 font-heading text-3xl font-bold">
            Pronto para simplificar sua contabilidade?
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Comece agora e tenha uma contabilidade digital de verdade.
          </p>
          <Link href="/contato">
            <Button size="lg" variant="secondary" data-testid="button-contabilidade-cta-final">
              Fale com um Especialista
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
