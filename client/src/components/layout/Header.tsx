import { useState } from "react";
import { Link, useLocation } from "wouter";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X, ChevronDown, Calculator, FileText, Building2, TrendingUp, Users } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const services = [
  {
    title: "Contabilidade Digital",
    href: "/contabilidade-digital",
    description: "Balance-NEXT: Gestão contábil completa e 100% online",
    icon: Calculator,
  },
  {
    title: "Consultoria Financeira",
    href: "/consultoria-financeira",
    description: "Finance-NEXT: BPO Financeiro para sua empresa",
    icon: TrendingUp,
  },
  {
    title: "Consultoria Tributária",
    href: "/consultoria-tributaria",
    description: "Planejamento tributário inteligente",
    icon: FileText,
  },
  {
    title: "Abrir Empresa",
    href: "/abrir-empresa",
    description: "Abra sua empresa grátis em poucos dias",
    icon: Building2,
  },
  {
    title: "Desenquadramento MEI",
    href: "/desenquadramento-mei",
    description: "Migre de MEI para ME sem complicação",
    icon: Users,
  },
];

export function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex min-h-[76px] items-center justify-between px-4 py-3 lg:min-h-[84px] lg:px-8">
        <Link href="/" className="flex items-center">
          <BrandLogo />
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <Link href="/">
                <NavigationMenuLink
                  className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                    isActive("/") ? "bg-accent text-accent-foreground" : "bg-background"
                  }`}
                  data-testid="link-home"
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent" data-testid="dropdown-services">
                Serviços
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {services.map((service) => (
                    <li key={service.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={service.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          data-testid={`link-${service.href.slice(1)}`}
                        >
                          <div className="flex items-center gap-2">
                            <service.icon className="h-4 w-4 text-primary" />
                            <div className="text-sm font-medium leading-none">{service.title}</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {service.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/planos-e-precos">
                <NavigationMenuLink
                  className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                    isActive("/planos-e-precos") ? "bg-accent text-accent-foreground" : "bg-background"
                  }`}
                  data-testid="link-planos"
                >
                  Planos e Preços
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/sobre-nos">
                <NavigationMenuLink
                  className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                    isActive("/sobre-nos") ? "bg-accent text-accent-foreground" : "bg-background"
                  }`}
                  data-testid="link-sobre"
                >
                  Sobre Nós
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/blog">
                <NavigationMenuLink
                  className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                    isActive("/blog") ? "bg-accent text-accent-foreground" : "bg-background"
                  }`}
                  data-testid="link-blog"
                >
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/contato">
                <NavigationMenuLink
                  className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                    isActive("/contato") ? "bg-accent text-accent-foreground" : "bg-background"
                  }`}
                  data-testid="link-contato"
                >
                  Contato
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/area-do-cliente">
            <Button variant="outline" size="sm" data-testid="button-area-cliente">
              Área do Cliente
            </Button>
          </Link>
          <Link href="/abrir-empresa">
            <Button size="sm" data-testid="button-comece-agora">
              Comece Agora
            </Button>
          </Link>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 pt-8">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <span className="block py-2 text-lg font-medium" data-testid="mobile-link-home">Home</span>
              </Link>
              
              <div className="space-y-2">
                <span className="text-lg font-medium text-muted-foreground">Serviços</span>
                {services.map((service) => (
                  <Link key={service.href} href={service.href} onClick={() => setMobileOpen(false)}>
                    <span className="flex items-center gap-2 py-2 pl-4 text-sm" data-testid={`mobile-link-${service.href.slice(1)}`}>
                      <service.icon className="h-4 w-4 text-primary" />
                      {service.title}
                    </span>
                  </Link>
                ))}
              </div>

              <Link href="/planos-e-precos" onClick={() => setMobileOpen(false)}>
                <span className="block py-2 text-lg font-medium" data-testid="mobile-link-planos">Planos e Preços</span>
              </Link>
              <Link href="/sobre-nos" onClick={() => setMobileOpen(false)}>
                <span className="block py-2 text-lg font-medium" data-testid="mobile-link-sobre">Sobre Nós</span>
              </Link>
              <Link href="/blog" onClick={() => setMobileOpen(false)}>
                <span className="block py-2 text-lg font-medium" data-testid="mobile-link-blog">Blog</span>
              </Link>
              <Link href="/contato" onClick={() => setMobileOpen(false)}>
                <span className="block py-2 text-lg font-medium" data-testid="mobile-link-contato">Contato</span>
              </Link>

              <div className="mt-4 flex flex-col gap-3">
                <Link href="/area-do-cliente" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full" data-testid="mobile-button-area-cliente">
                    Área do Cliente
                  </Button>
                </Link>
                <Link href="/abrir-empresa" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full" data-testid="mobile-button-comece-agora">
                    Comece Agora
                  </Button>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
