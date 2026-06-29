import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Kurikulum from "@/pages/kurikulum";
import KelasPage from "@/pages/kelas";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import MateriPage from "@/pages/materi/index";
import Admin from "@/pages/admin";
import Toolbox from "@/pages/toolbox";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/kurikulum" component={Kurikulum} />
      <Route path="/kelas" component={KelasPage} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/materi/:sesi" component={MateriPage} />
      <Route path="/admin" component={Admin} />
      <Route path="/toolbox" component={Toolbox} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
