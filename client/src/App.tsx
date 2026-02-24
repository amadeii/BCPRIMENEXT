import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import ContabilidadeDigital from "@/pages/ContabilidadeDigital";
import ConsultoriaFinanceira from "@/pages/ConsultoriaFinanceira";
import ConsultoriaTributaria from "@/pages/ConsultoriaTributaria";
import AbrirEmpresa from "@/pages/AbrirEmpresa";
import DesenquadramentoMei from "@/pages/DesenquadramentoMei";
import PlanosPrecos from "@/pages/PlanosPrecos";
import SobreNos from "@/pages/SobreNos";
import Blog from "@/pages/Blog";
import BlogPostPage from "@/pages/BlogPost";
import Contato from "@/pages/Contato";
import AreaCliente from "@/pages/AreaCliente";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminPosts from "@/pages/admin/AdminPosts";
import AdminPostForm from "@/pages/admin/AdminPostForm";
import AdminKeywords from "@/pages/admin/AdminKeywords";
import AdminTeam from "@/pages/admin/AdminTeam";
import AdminLeads from "@/pages/admin/AdminLeads";
import NotFound from "@/pages/not-found";

function PublicRouter() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/contabilidade-digital" component={ContabilidadeDigital} />
        <Route path="/consultoria-financeira" component={ConsultoriaFinanceira} />
        <Route path="/consultoria-tributaria" component={ConsultoriaTributaria} />
        <Route path="/abrir-empresa" component={AbrirEmpresa} />
        <Route path="/desenquadramento-mei" component={DesenquadramentoMei} />
        <Route path="/planos-e-precos" component={PlanosPrecos} />
        <Route path="/sobre-nos" component={SobreNos} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPostPage} />
        <Route path="/contato" component={Contato} />
        <Route path="/area-do-cliente" component={AreaCliente} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function AdminRouter() {
  return (
    <Switch>
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/posts" component={AdminPosts} />
      <Route path="/admin/posts/new" component={AdminPostForm} />
      <Route path="/admin/posts/:id" component={AdminPostForm} />
      <Route path="/admin/keywords" component={AdminKeywords} />
      <Route path="/admin/keywords/new" component={AdminKeywords} />
      <Route path="/admin/team" component={AdminTeam} />
      <Route path="/admin/leads" component={AdminLeads} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/admin/*?" component={AdminRouter} />
      <Route component={PublicRouter} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
