import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users, Search, MapPin, Calendar, Hash, Phone,
  Building, Heart, Home, Skull, Gift, UserX,
  Shield, List, CheckCircle, Briefcase, GraduationCap,
  FileSpreadsheet, Settings, Info, Download, Upload,
  BarChart, UserCheck, Vote, HelpCircle, Globe, RefreshCw
} from 'lucide-react';

interface User {
  name: string;
  mobile: string;
  email?: string;
}

interface DashboardProps {
  user: User;
  onSearchSelect: (searchType: string) => void;
  onLogout: () => void;
}

const Dashboard = ({ user, onSearchSelect, onLogout }: DashboardProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showReportOptions, setShowReportOptions] = useState(false);

  const mainOptions = [
    { id: 'report', label: 'Report', icon: FileSpreadsheet, color: 'bg-primary' },
    { id: 'usermgt', label: 'User Mgt', icon: UserCheck, color: 'bg-accent' },
    { id: 'statistics', label: 'Statistics', icon: BarChart, color: 'bg-success' },
    { id: 'boothmgt', label: 'Booth Mgt', icon: Building, color: 'bg-warning' },
    { id: 'survey', label: 'Survey', icon: List, color: 'bg-primary' },
    { id: 'settings', label: 'Setting', icon: Settings, color: 'bg-accent' },
    { id: 'election', label: 'निवडणूक व्यवस्थापन', icon: Vote, color: 'bg-success' },
    { id: 'query', label: 'क्वेरी', icon: HelpCircle, color: 'bg-warning' },
    { id: 'sync', label: 'Sync', icon: RefreshCw, color: 'bg-primary' },
    { id: 'about', label: 'About Us', icon: Info, color: 'bg-accent' }
  ];

  const reportOptions = [
    { id: 'name', label: 'Name wise', icon: Users, color: 'bg-primary' },
    { id: 'alphabetical', label: 'Alphabetical', icon: Search, color: 'bg-accent' },
    { id: 'booth', label: 'Booth wise', icon: MapPin, color: 'bg-success' },
    { id: 'age', label: 'Age wise', icon: Hash, color: 'bg-warning' },
    { id: 'address', label: 'Address wise', icon: Home, color: 'bg-primary' },
    { id: 'lastname', label: 'Last Name wise', icon: Users, color: 'bg-accent' },
    { id: 'mobile', label: 'Mobile No', icon: Phone, color: 'bg-success' },
    { id: 'caste', label: 'Caste wise', icon: Shield, color: 'bg-warning' },
    { id: 'favour', label: 'Favour wise', icon: Heart, color: 'bg-destructive' },
    { id: 'nagar', label: 'Nagar wise', icon: Building, color: 'bg-primary' },
    { id: 'society', label: 'Society wise', icon: Home, color: 'bg-accent' },
    { id: 'dead', label: 'Dead wise', icon: Skull, color: 'bg-muted' },
    { id: 'birthday', label: 'Birthday list', icon: Gift, color: 'bg-success' },
    { id: 'nonvoters', label: 'Non-voters list', icon: UserX, color: 'bg-warning' },
    { id: 'role', label: 'Role list', icon: Shield, color: 'bg-primary' },
    { id: 'visited', label: 'Visited list', icon: CheckCircle, color: 'bg-success' },
    { id: 'party', label: 'Party Worker', icon: Users, color: 'bg-warning' },
    { id: 'education', label: 'Education', icon: GraduationCap, color: 'bg-primary' },
    { id: 'profession', label: 'Profession', icon: Briefcase, color: 'bg-accent' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-medium">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Voter Management</h1>
              <p className="text-primary-foreground/80 text-sm">Welcome, {user.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-primary-foreground border-0">
                Online
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="text-primary-foreground hover:bg-white/10"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {showSettings && (
          <div className="bg-white/10 backdrop-blur-sm border-t border-white/20 p-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-white/10"
                onClick={() => onSearchSelect('import')}
              >
                <Upload className="w-4 h-4 mr-2" />
                Import Data
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-white/10"
                onClick={() => onSearchSelect('export')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-white/10"
                onClick={() => onSearchSelect('about')}
              >
                <Info className="w-4 h-4 mr-2" />
                About
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-white/10"
                onClick={onLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Dashboard Grid */}
      <div className="p-4">
        {!showReportOptions ? (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-2">Main Dashboard</h2>
              <p className="text-muted-foreground text-sm">Select an option to access features</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mainOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <Card
                    key={option.id}
                    className="card-elevated cursor-pointer hover:scale-105 transition-all duration-300 border-border"
                    onClick={() => {
                      if (option.id === 'report') {
                        setShowReportOptions(true);
                      } else {
                        onSearchSelect(option.id);
                      }
                    }}
                  >
                    <div className="p-4 text-center">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${option.color} text-white mb-3 shadow-soft`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-medium text-sm text-foreground">{option.label}</h3>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => setShowReportOptions(false)}
                className="mb-4"
              >
                ← Back to Main
              </Button>
              <h2 className="text-lg font-semibold text-foreground mb-2">Reports & Search</h2>
              <p className="text-muted-foreground text-sm">Select a category to search voter data</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {reportOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <Card
                    key={option.id}
                    className="card-elevated cursor-pointer hover:scale-105 transition-all duration-300 border-border"
                    onClick={() => onSearchSelect(option.id)}
                  >
                    <div className="p-4 text-center">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${option.color} text-white mb-3 shadow-soft`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-medium text-sm text-foreground">{option.label}</h3>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="card-elevated p-4 text-center border-border">
            <div className="text-2xl font-bold text-primary">12,456</div>
            <div className="text-xs text-muted-foreground">Total Voters</div>
          </Card>
          <Card className="card-elevated p-4 text-center border-border">
            <div className="text-2xl font-bold text-success">8,234</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </Card>
          <Card className="card-elevated p-4 text-center border-border">
            <div className="text-2xl font-bold text-warning">156</div>
            <div className="text-xs text-muted-foreground">Booths</div>
          </Card>
          <Card className="card-elevated p-4 text-center border-border">
            <div className="text-2xl font-bold text-accent">45</div>
            <div className="text-xs text-muted-foreground">Areas</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;