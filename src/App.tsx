import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import SearchView from "@/components/SearchView";

const queryClient = new QueryClient();

interface User {
  name: string;
  mobile: string;
  email?: string;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'login' | 'dashboard' | 'search'>('login');
  const [selectedSearch, setSelectedSearch] = useState<string>('');

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentView('login');
    setSelectedSearch('');
  };

  const handleSearchSelect = (searchType: string) => {
    setSelectedSearch(searchType);
    setCurrentView('search');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedSearch('');
  };

  // Check for existing session on app load
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Auto-login if session exists
        setUser({
          name: 'Authenticated User',
          mobile: '',
          email: session.user.email || ''
        });
        setCurrentView('dashboard');
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null);
        setCurrentView('login');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          {currentView === 'login' && (
            <Login onLogin={handleLogin} />
          )}
          
          {currentView === 'dashboard' && user && (
            <Dashboard 
              user={user} 
              onSearchSelect={handleSearchSelect}
              onLogout={handleLogout}
            />
          )}
          
          {currentView === 'search' && (
            <SearchView 
              searchType={selectedSearch}
              onBack={handleBackToDashboard}
            />
          )}
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
