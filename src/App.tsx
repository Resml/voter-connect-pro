import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

  const handleLogout = () => {
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

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
