import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, X, Loader2 } from "lucide-react";
import type { Plan } from "@shared/schema";

interface Feature {
  name: string;
  included: boolean;
}

const faq = [
  {
    question: "O que é a Central BcprimeNEXT?",
    answer: "A Central BcprimeNEXT é nossa plataforma completa de gestão empresarial que une contabilidade digital, ERP integrado e consultoria especializada em um único lugar.",
  },
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
    answer: "Sim! A abertura da sua empresa é 100% gratuita no plano Central Starter com 12 meses de assinatura, e em todos os planos superiores. Você paga apenas a mensalidade após a empresa estar funcionando.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer: "Aceitamos boleto bancário, cartão de crédito e PIX. Você escolhe a melhor opção para o seu negócio.",
  },
  {
    question: "O que é o Maestro IA?",
    answer: "Maestro IA é nossa consultoria fiscal inteligente disponível 24/7, que responde dúvidas tributárias, analisa cenários e auxilia na tomada de decisões do seu negócio.",
  },
];

export default function PlanosPrecos() {
  const { data: plans, isLoading } = useQuery<Plan[]>({
    queryKey: ["/api/plans"],
  });

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
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <CheckCircle2 className="h-4 w-4" />
              Central BcprimeNEXT — contabilidade, ERP e consultoria em um só lugar
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : plans && plans.length > 0 ? (
            <div className={`grid gap-8 ${plans.length === 4 ? "lg:grid-cols-4" : plans.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
              {[...plans].sort((a, b) => Number(a.displayOrder) - Number(b.displayOrder)).map((plan, index) => {
                let features: Feature[] = [];
                try { features = JSON.parse(plan.features); } catch {}
                const isFreePrice = plan.price === "Sob consulta";

                return (
                  <Card
                    key={plan.id}
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
                        {isFreePrice ? (
                          <span className="font-heading text-2xl font-bold">Sob consulta</span>
                        ) : (
                          <>
                            <span className="font-heading text-4xl font-bold">R$ {plan.price}</span>
                            <span className="text-muted-foreground">{plan.billing}</span>
                          </>
                        )}
                      </div>
                      <ul className="mb-8 flex-1 space-y-3">
                        {features.map((feature, featureIndex) => (
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
                      <Link href={plan.ctaHref}>
                        <Button
                          className="w-full"
                          variant={plan.popular ? "default" : "outline"}
                          data-testid={`button-plan-${index}`}
                        >
                          {plan.ctaLabel}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center text-muted-foreground">
              Nenhum plano disponível no momento.
            </div>
          )}
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
