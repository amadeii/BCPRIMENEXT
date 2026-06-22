import { Link } from "wouter";
import { siteStats as stats } from "@/lib/site-stats";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Clock,
  CheckCircle2,
  ArrowRight,
  Building2,
  Lightbulb,
  Shield,
} from "lucide-react";
import type { TeamMember } from "@shared/schema";

const values = [
  {
    icon: Heart,
    title: "Compromisso",
    description: "Tratamos cada cliente como único, com dedicação e responsabilidade.",
  },
  {
    icon: Lightbulb,
    title: "Inovação",
    description: "Buscamos constantemente novas soluções para simplificar a contabilidade.",
  },
  {
    icon: Shield,
    title: "Confiança",
    description: "Transparência e ética em todas as nossas relações.",
  },
  {
    icon: Users,
    title: "Parceria",
    description: "Crescemos junto com nossos clientes, celebrando cada conquista.",
  },
];

const milestones = [
  { year: "2009", event: "Fundação da BCPrime" },
  { year: "2015", event: "Expansão para todo o Brasil" },
  { year: "2018", event: "Lançamento da plataforma digital" },
  { year: "2020", event: "Marco de 300 clientes ativos" },
  { year: "2023", event: "Lançamento do BCPrimeNEXT" },
  { year: "2024", event: "+500 empresas atendidas" },
];

export default function SobreNos() {
  const { data: team } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-4">Sobre Nós</Badge>
              <h1 className="mb-6 font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
                Contabilidade <span className="text-primary">humana</span> e{" "}
                <span className="text-primary">digital</span>
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Há mais de 15 anos transformando a maneira como empresas cuidam de sua contabilidade.
                Combinamos experiência, tecnologia e atendimento humanizado para entregar resultados
                excepcionais.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/contato">
                  <Button size="lg" data-testid="button-sobre-contato">
                    Fale Conosco
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8">
                <div className="flex h-full items-center justify-center">
                  <Building2 className="h-24 w-24 text-primary/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <Card data-testid="card-missao">
              <CardContent className="p-8">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="mb-4 font-heading text-2xl font-bold">Nossa Missão</h2>
                <p className="text-muted-foreground">
                  Simplificar a gestão contábil e financeira das empresas brasileiras através de
                  tecnologia, conhecimento e atendimento humanizado, permitindo que empreendedores
                  foquem no crescimento de seus negócios.
                </p>
              </CardContent>
            </Card>
            <Card data-testid="card-visao">
              <CardContent className="p-8">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h2 className="mb-4 font-heading text-2xl font-bold">Nossa Visão</h2>
                <p className="text-muted-foreground">
                  Ser referência nacional em contabilidade digital, reconhecida pela excelência
                  no atendimento, inovação tecnológica e contribuição para o sucesso de
                  milhares de empresas em todo o Brasil.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-card py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">Nossos Valores</h2>
            <p className="text-muted-foreground">
              Os princípios que guiam tudo o que fazemos.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} data-testid={`card-value-${index}`}>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-heading font-semibold">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">Nossa História</h2>
            <p className="text-muted-foreground">
              Uma trajetória de crescimento, inovação e resultados.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <div className="relative border-l-2 border-primary/20 pl-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative mb-8 last:mb-0" data-testid={`milestone-${index}`}>
                  <div className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-background">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div className="font-heading text-lg font-bold text-primary">{milestone.year}</div>
                  <div className="text-muted-foreground">{milestone.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {team && team.length > 0 && (
        <section className="bg-card py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">Nossa Equipe</h2>
              <p className="text-muted-foreground">
                Profissionais experientes e apaixonados pelo que fazem.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {team.map((member, index) => (
                <Card key={member.id} data-testid={`card-team-${index}`}>
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-primary/10">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Users className="h-10 w-10 text-primary/50" />
                      )}
                    </div>
                    <h3 className="font-heading font-semibold">{member.name}</h3>
                    <div className="mb-2 text-sm text-primary">{member.role}</div>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-4 font-heading text-3xl font-bold">
            Quer fazer parte dessa história?
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Junte-se a milhares de empresas que confiam na BCPrimeON.
          </p>
          <Link href="/contato">
            <Button size="lg" variant="secondary" data-testid="button-sobre-cta">
              Fale com a Gente
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
