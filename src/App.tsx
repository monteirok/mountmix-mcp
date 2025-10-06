import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { ThemeProvider } from "@/components/theme-provider";
import { useTheme } from "next-themes";

const AppContent = () => {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setTheme("system");
  }, [setTheme]);

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner theme={resolvedTheme === "dark" ? "dark" : "light"} />
      <AdminAuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </TooltipProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
