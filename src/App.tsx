import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
import Streaks from "./pages/Streaks";
import Leaderboard from "./pages/Leaderboard";
import Store from "./pages/Store";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Auth from "./pages/Auth";
import Navbar from "./components/layout/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="eco-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth route without navbar */}
            <Route path="/" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
            
            {/* Protected routes with navbar */}
            <Route
              path="/dashboard"
              element={
                <>
                  <Navbar />
                  <Dashboard />
                </>
              }
            />
            <Route
              path="/habits"
              element={
                <>
                  <Navbar />
                  <Habits />
                </>
              }
            />
            <Route
              path="/streaks"
              element={
                <>
                  <Navbar />
                  <Streaks />
                </>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <>
                  <Navbar />
                  <Leaderboard />
                </>
              }
            />
            <Route
              path="/store"
              element={
                <>
                  <Navbar />
                  <Store />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Navbar />
                  <Profile />
                </>
              }
            />
            <Route
              path="/notifications"
              element={
                <>
                  <Navbar />
                  <Notifications />
                </>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
