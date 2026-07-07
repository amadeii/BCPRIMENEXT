import { Link } from "wouter";
import { SiWhatsapp, SiInstagram, SiLinkedin, SiFacebook, SiYoutube } from "react-icons/si";
import { Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

const services = [
  { name: "Contabilidade Digital", href: "/contabilidade-digital" },
  { name: "Consultoria Financeira", href: "/consultoria-financeira" },
  { name: "Consultoria Tributária", href: "/consultoria-tributaria" },
  { name: "Abrir Empresa", href: "/abrir-empresa" },
  { name: "Desenquadramento MEI", href: "/desenquadramento-mei" },
];

const company = [
  { name: "Sobre Nós", href: "/sobre-nos" },
  { name: "Blog", href: "/blog" },
  { name: "Planos e Preços", href: "/planos-e-precos" },
  { name: "Contato", href: "/contato" },
  { name: "Área do Cliente", href: "/area-do-cliente" },
];

const social = [
  { name: "WhatsApp", href: "https://wa.me/5541985117177", icon: SiWhatsapp },
  { name: "Instagram", href: "https://instagram.com/bcprimeon", icon: SiInstagram },
  { name: "LinkedIn", href: "https://linkedin.com/company/bcprimeon", icon: SiLinkedin },
  { name: "Facebook", href: "https://facebook.com/bcprimeon", icon: SiFacebook },
  { name: "YouTube", href: "https://youtube.com/bcprimeon", icon: SiYoutube },
];

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center justify-center md:justify-start">
              <BrandLogo />
            </Link>
            <p className="text-sm text-muted-foreground">
              Contabilidade digital que simplifica a gestão do seu negócio. Somos especialistas em transformar a burocracia em resultados.
            </p>
            <div className="flex gap-3">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  data-testid={`social-${item.name.toLowerCase()}`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="sr-only">{item.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider">Serviços</h3>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span className="text-sm text-muted-foreground transition-colors hover:text-primary" data-testid={`footer-link-${item.href.slice(1)}`}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider">Empresa</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span className="text-sm text-muted-foreground transition-colors hover:text-primary" data-testid={`footer-link-${item.href.slice(1)}`}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Av. Camilo di Lellis, nº 633<br />
                  Salas 45 e 47 - Pinhais - PR
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+554134032089" className="text-sm text-muted-foreground hover:text-primary">
                  (41) 3403-2089
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:sales@bcprimeon.com" className="text-sm text-muted-foreground hover:text-primary">
                  sales@bcprimeon.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <SiWhatsapp className="h-4 w-4 shrink-0 text-primary" />
                <a
                  href="https://wa.me/5541985117177"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  (41) 9 8511-7177
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BcprimeNEXT — Central de Gestão Empresarial. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              <Link href="/privacidade">
                <span className="text-sm text-muted-foreground hover:text-primary">Política de Privacidade</span>
              </Link>
              <Link href="/termos">
                <span className="text-sm text-muted-foreground hover:text-primary">Termos de Uso</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
