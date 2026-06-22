import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import type { Plan } from "@shared/schema";

interface ServicePricingCardProps {
  highlights?: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export function ServicePricingCard({
  highlights = ["Sem taxa de abertura", "Sem fidelidade", "Suporte ilimitado"],
  ctaLabel = "Ver Todos os Planos",
  ctaHref = "/planos-e-precos",
}: ServicePricingCardProps) {
  const { data: plans = [], isLoading } = useQuery<Plan[]>({
    queryKey: ["/api/plans"],
  });

  const lowestPlan = plans[0];

  return (
    <div className="rounded-2xl border bg-background p-8 shadow-sm">
      <div className="mb-6 text-center">
        <div className="mb-1 text-sm text-muted-foreground">A partir de</div>
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : lowestPlan ? (
          <>
            <div className="font-heading text-5xl font-bold text-primary">
              {lowestPlan.price === "sob consulta" ? (
                <span className="text-3xl">Sob consulta</span>
              ) : (
                <>R$ {lowestPlan.price}</>
              )}
            </div>
            {lowestPlan.billing && lowestPlan.price !== "sob consulta" && (
              <div className="text-muted-foreground">{lowestPlan.billing}</div>
            )}
            {lowestPlan.name && (
              <div className="mt-1 text-xs text-muted-foreground">Plano {lowestPlan.name}</div>
            )}
          </>
        ) : (
          <div className="font-heading text-3xl font-bold text-primary">Consulte</div>
        )}
      </div>

      <ul className="mb-8 space-y-3">
        {highlights.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
            {item}
          </li>
        ))}
      </ul>

      <Link href={ctaHref}>
        <Button className="w-full" size="lg" data-testid="button-ver-planos">
          {ctaLabel}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>

      {plans.length > 1 && (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          {plans.length} planos disponíveis · do {plans[0]?.name} ao {plans[plans.length - 1]?.name}
        </p>
      )}
    </div>
  );
}
