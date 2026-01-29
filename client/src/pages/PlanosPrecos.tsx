import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, X } from "lucide-react";

const plans = [
  {
    name: "Essencial",
    description: "Ideal para MEI e empresas iniciantes",
    price: "99",
    billing: "/mês",
    popular: false,
    features: [
      { name: "Escrituração contábil", included: true },
      { name: "Apuração de impostos", included: true },
      { name: "Emissão de guias DAS", included: true },
      { name: "Suporte via WhatsApp", included: true },
      { name: "Dashboard básico", included: true },
      { name: "Folha de pagamento", included: false },
      { name: "BPO Financeiro", included: false },
      { name: "Consultoria tributária", included: false },
    ],
    cta: "Começar Agora",
    href: "/contato",
  },
  {
    name: "Profissional",
    description: "Para empresas em crescimento",
    price: "199",
    billing: "/mês",
    popular: true,
    features: [
      { name: "Tudo do plano Essencial", included: true },
      { name: "Folha de pagamento (até 5)", included: true },
      { name: "Certidões negativas", included: true },
      { name: "Dashboard completo", included: true },
      { name: "Relatórios gerenciais", included: true },
      { name: "Suporte prioritário", included: true },
      { name: "BPO Financeiro básico", included: false },
      { name: "Consultoria tributária", included: false },
    ],
    cta: "Escolher Plano",
    href: "/contato",
  },
  {
    name: "Empresarial",
    description: "Solução completa para sua empresa",
    price: "399",
    billing: "/mês",
    popular: false,
    features: [
      { name: "Tudo do plano Profissional", included: true },
      { name: "Folha de pagamento ilimitada", included: true },
      { name: "BPO Financeiro completo", included: true },
      { name: "Consultoria tributária", included: true },
      { name: "Planejamento tributário anual", included: true },
      { name: "Gestor de conta dedicado", included: true },
      { name: "Atendimento telefônico", included: true },
      { name: "Treinamentos exclusivos", included: true },
    ],
    cta: "Falar com Consultor",
    href: "/contato",
  },
];

const faq = [
  {
    question: "Posso mudar de plano depois?",
    answer: "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento, sem multas ou taxas adicionais.",
  },
  {
    question: "Existe fidelidade?",
    answer: "Não trabalhamos com fidelidade. Você pode cancelar quando quiser, sem multas ou burocracia.",
  },
  {
    question: "A abertura de empresa é realmente grátis?",
    answer: "Sim! A abertura da sua empresa é 100% gratuita em qualquer plano. Você paga apenas a mensalidade após a empresa estar funcionando.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer: "Aceitamos boleto bancário, cartão de crédito e PIX. Você escolhe a melhor opção para o seu negócio.",
  },
];

export default function PlanosPrecos() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">Planos e Preços</Badge>
            <h1 className="mb-6 font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
              Escolha o plano ideal para seu <span className="text-primary">negócio</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Planos flexíveis que crescem junto com sua empresa. Sem fidelidade, sem surpresas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative flex flex-col ${plan.popular ? "border-primary ring-2 ring-primary" : ""}`}
                data-testid={`card-plan-${index}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>Mais Popular</Badge>
                  </div>
                )}
                <CardHeader className="pb-0">
                  <div className="mb-2 font-heading text-xl font-bold">{plan.name}</div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col pt-6">
                  <div className="mb-6">
                    <span className="font-heading text-4xl font-bold">R$ {plan.price}</span>
                    <span className="text-muted-foreground">{plan.billing}</span>
                  </div>
                  <ul className="mb-8 flex-1 space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        {feature.included ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                        ) : (
                          <X className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                        )}
                        <span className={`text-sm ${!feature.included ? "text-muted-foreground/50" : ""}`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href}>
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                      data-testid={`button-plan-${index}`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center font-heading text-3xl font-bold">
              Perguntas Frequentes
            </h2>
            <div className="space-y-4">
              {faq.map((item, index) => (
                <Card key={index} data-testid={`card-faq-${index}`}>
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold">{item.question}</h3>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 text-center md:p-12">
            <h2 className="mb-4 font-heading text-2xl font-bold md:text-3xl">
              Precisa de um plano personalizado?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Para empresas com necessidades específicas, oferecemos planos customizados.
              Fale com nosso time comercial.
            </p>
            <Link href="/contato">
              <Button size="lg" data-testid="button-plano-personalizado">
                Solicitar Proposta Personalizada
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-4 font-heading text-3xl font-bold">
            Ainda com dúvidas?
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Nossa equipe está pronta para ajudar você a escolher o melhor plano.
          </p>
          <Link href="/contato">
            <Button size="lg" variant="secondary" data-testid="button-planos-contato">
              Fale Conosco
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
