import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Eye, LogOut, ArrowLeft } from "lucide-react";

interface AdminLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function AdminLayout({ title, children }: AdminLayoutProps) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth");
    if (!isAuth) setLocation("/admin/login");
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setLocation("/admin/login");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm" data-testid="button-back-admin">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <span className="text-sm font-medium text-muted-foreground">|</span>
            <span className="font-semibold">{title}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="outline" size="sm" data-testid="button-view-site">
                <Eye className="mr-2 h-4 w-4" />
                Ver Site
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
