import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import SearchView from "@/components/SearchView";
import ReportsView from "@/components/ReportsView";
import SurveyFormView from "@/components/SurveyFormView";
import UserDetailView from "@/components/UserDetailView";
import UserManagementView from "@/components/UserManagementView";
import StatisticsView from "@/components/StatisticsView";
import SurveyView from "@/components/SurveyView";
import SettingsView from "@/components/SettingsView";
import QueryView from "@/components/QueryView";
import AboutView from "@/components/AboutView";
import BoothWiseView from "@/components/BoothWiseView";
import AddressWiseView from "@/components/AddressWiseView";

const queryClient = new QueryClient();

interface User {
  name: string;
  mobile: string;
  email?: string;
}

type ViewType = 'login' | 'dashboard' | 'reports' | 'search' | 'userDetail' | 'userMgt' | 'statistics' | 'survey' | 'settings' | 'query' | 'about' | 'electionMgt' | 'boothMgt' | 'sync' | 'surveyForm' | 'boothwise' | 'addresswise';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('login');
  const [selectedSearch, setSelectedSearch] = useState<string>('');
  const [selectedVoter, setSelectedVoter] = useState<any>(null);

  const handleLogin = async (userData: User) => {
    try {
      // Store admin login in database
      const { error } = await supabase
        .from('admins')
        .upsert({
          name: userData.name,
          mobile_number: userData.mobile,
          email: userData.email || null,
          activation_key: 'logged_in', // You can set this from login form
          last_login: new Date().toISOString()
        }, {
          onConflict: 'mobile_number'
        });

      if (error) {
        console.error('Error storing admin login:', error);
      }
    } catch (err) {
      console.error('Failed to store admin login:', err);
    }
    
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

  const handleViewSelect = (viewType: ViewType, data?: any) => {
    if (viewType === 'userDetail' && data) {
      setSelectedVoter(data);
    }
    setCurrentView(viewType);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedSearch('');
    setSelectedVoter(null);
  };

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
              onViewSelect={handleViewSelect}
              onLogout={handleLogout}
            />
          )}
          
          {currentView === 'reports' && (
            <ReportsView 
              onBack={handleBackToDashboard}
              onSearchSelect={handleSearchSelect}
            />
          )}

          {currentView === 'search' && (
            <SearchView 
              searchType={selectedSearch}
              onBack={() => setCurrentView('reports')}
              onVoterSelect={(voter) => handleViewSelect('userDetail', voter)}
            />
          )}

          {currentView === 'boothwise' && (
            <BoothWiseView 
              onBack={handleBackToDashboard}
              onBoothSelect={(boothId, voters) => {
                setSelectedVoter({ boothId, voters });
                handleViewSelect('search');
              }}
            />
          )}

          {currentView === 'addresswise' && (
            <AddressWiseView 
              onBack={handleBackToDashboard}
              onAddressSelect={(addressId, voters) => {
                setSelectedVoter({ addressId, voters });
                handleViewSelect('search');
              }}
            />
          )}

          {currentView === 'userDetail' && selectedVoter && (
            <UserDetailView 
              voter={selectedVoter}
              onBack={handleBackToDashboard}
            />
          )}

          {currentView === 'userMgt' && (
            <UserManagementView 
              onBack={handleBackToDashboard}
            />
          )}

          {currentView === 'statistics' && (
            <StatisticsView 
              onBack={handleBackToDashboard}
            />
          )}

          {currentView === 'survey' && (
            <SurveyView 
              onBack={handleBackToDashboard}
              onSurveySelect={(surveyType) => {
                setSelectedSearch(surveyType);
                setCurrentView('surveyForm');
              }}
            />
          )}

          {currentView === 'surveyForm' && (
            <SurveyFormView 
              onBack={() => setCurrentView('survey')}
              searchType={selectedSearch}
            />
          )}

          {currentView === 'settings' && (
            <SettingsView 
              onBack={handleBackToDashboard}
            />
          )}

          {currentView === 'query' && (
            <QueryView 
              onBack={handleBackToDashboard}
            />
          )}

          {currentView === 'about' && (
            <AboutView 
              onBack={handleBackToDashboard}
            />
          )}
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
