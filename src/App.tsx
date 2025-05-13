
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import PatientProfile from "./pages/PatientProfile";
import RiskManagement from "./pages/RiskManagement";
import Compliance from "./pages/Compliance";
import Settings from "./pages/Settings";
import AdminPanel from "./pages/AdminPanel";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen bg-gray-50">
    <Sidebar />
    <div className="flex-1 overflow-auto">
      {children}
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          } />
          <Route path="/patients" element={
            <AppLayout>
              <PatientProfile />
            </AppLayout>
          } />
          <Route path="/risk" element={
            <AppLayout>
              <RiskManagement />
            </AppLayout>
          } />
          <Route path="/compliance" element={
            <AppLayout>
              <Compliance />
            </AppLayout>
          } />
          <Route path="/settings" element={
            <AppLayout>
              <Settings />
            </AppLayout>
          } />
          <Route path="/admin" element={
            <AppLayout>
              <AdminPanel />
            </AppLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
