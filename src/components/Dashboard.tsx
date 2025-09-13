import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Users, Search, MapPin, Calendar, Hash, Phone,
  Building, Heart, Home, Skull, Gift, UserX,
  Shield, List, CheckCircle, Briefcase, GraduationCap,
  FileSpreadsheet, Settings, Info, Download, Upload,
  BarChart, UserCheck, Vote, HelpCircle, Globe, RefreshCw, Languages
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface User {
  name: string;
  mobile: string;
  email?: string;
}

interface DashboardProps {
  user: User;
  onSearchSelect: (searchType: string) => void;
  onViewSelect: (viewType: string, data?: any) => void;
  onLogout: () => void;
}

const Dashboard = ({ user, onSearchSelect, onViewSelect, onLogout }: DashboardProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showReportOptions, setShowReportOptions] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const mainOptions = [
    { id: 'report', label: t('dashboard.report'), icon: FileSpreadsheet, color: 'bg-red-600' },
    { id: 'userMgt', label: t('dashboard.userMgt'), icon: UserCheck, color: 'bg-red-600' },
    { id: 'statistics', label: t('dashboard.statistics'), icon: BarChart, color: 'bg-red-600' },
    { id: 'boothMgt', label: t('dashboard.boothMgt'), icon: Building, color: 'bg-red-600' },
    { id: 'survey', label: t('dashboard.survey'), icon: List, color: 'bg-red-600' },
    { id: 'settings', label: t('dashboard.settings'), icon: Settings, color: 'bg-red-600' },
    { id: 'sync', label: t('dashboard.sync'), icon: RefreshCw, color: 'bg-red-600' },
    { id: 'about', label: t('dashboard.about'), icon: Info, color: 'bg-red-600' },
    { id: 'electionMgt', label: t('dashboard.electionMgt'), icon: Vote, color: 'bg-red-600' },
    { id: 'query', label: t('dashboard.query'), icon: HelpCircle, color: 'bg-red-600' }
  ];

  const reportOptions = [
    { id: 'name', label: t('search.nameWise'), icon: Users, color: 'bg-primary' },
    { id: 'alphabetical', label: t('search.alphabetical'), icon: Search, color: 'bg-accent' },
    { id: 'booth', label: t('search.boothWise'), icon: MapPin, color: 'bg-success' },
    { id: 'age', label: t('search.ageWise'), icon: Hash, color: 'bg-warning' },
    { id: 'address', label: t('search.addressWise'), icon: Home, color: 'bg-primary' },
    { id: 'lastname', label: t('search.lastNameWise'), icon: Users, color: 'bg-accent' },
    { id: 'mobile', label: t('search.mobileNo'), icon: Phone, color: 'bg-success' },
    { id: 'caste', label: t('search.casteWise'), icon: Shield, color: 'bg-warning' },
    { id: 'favour', label: t('search.favourWise'), icon: Heart, color: 'bg-destructive' },
    { id: 'nagar', label: t('search.nagarWise'), icon: Building, color: 'bg-primary' },
    { id: 'society', label: t('search.societyWise'), icon: Home, color: 'bg-accent' },
    { id: 'dead', label: t('search.deadWise'), icon: Skull, color: 'bg-muted' },
    { id: 'birthday', label: t('search.birthdayList'), icon: Gift, color: 'bg-success' },
    { id: 'nonvoters', label: t('search.nonVotersList'), icon: UserX, color: 'bg-warning' },
    { id: 'role', label: t('search.roleList'), icon: Shield, color: 'bg-primary' },
    { id: 'visited', label: t('search.visitedList'), icon: CheckCircle, color: 'bg-success' },
    { id: 'party', label: t('search.partyWorker'), icon: Users, color: 'bg-warning' },
    { id: 'education', label: t('search.education'), icon: GraduationCap, color: 'bg-primary' },
    { id: 'profession', label: t('search.profession'), icon: Briefcase, color: 'bg-accent' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-medium">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{t('dashboard.title')}</h1>
              <p className="text-primary-foreground/80 text-sm">{t('dashboard.welcome')}, {user.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={language} onValueChange={(value: 'en' | 'mr') => setLanguage(value)}>
                <SelectTrigger className="w-24 bg-white/10 border-white/20 text-primary-foreground">
                  <Languages className="w-4 h-4 mr-1" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{t('language.english')}</SelectItem>
                  <SelectItem value="mr">{t('language.marathi')}</SelectItem>
                </SelectContent>
              </Select>
              <Badge variant="secondary" className="bg-white/20 text-primary-foreground border-0">
                {t('dashboard.online')}
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
                {t('action.importData')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-white/10"
                onClick={() => onSearchSelect('export')}
              >
                <Download className="w-4 h-4 mr-2" />
                {t('action.exportData')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-white/10"
                onClick={() => onSearchSelect('about')}
              >
                <Info className="w-4 h-4 mr-2" />
                {t('action.about')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-white/10"
                onClick={onLogout}
              >
                {t('action.logout')}
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
              <h2 className="text-lg font-semibold text-foreground mb-2">{t('dashboard.mainDashboard')}</h2>
              <p className="text-muted-foreground text-sm">{t('dashboard.selectOption')}</p>
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
                        onViewSelect('reports');
                      } else {
                        onViewSelect(option.id);
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
                {t('dashboard.backToMain')}
              </Button>
              <h2 className="text-lg font-semibold text-foreground mb-2">{t('dashboard.reportsSearch')}</h2>
              <p className="text-muted-foreground text-sm">{t('dashboard.selectCategory')}</p>
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
            <div className="text-xs text-muted-foreground">{t('stats.totalVoters')}</div>
          </Card>
          <Card className="card-elevated p-4 text-center border-border">
            <div className="text-2xl font-bold text-success">8,234</div>
            <div className="text-xs text-muted-foreground">{t('stats.active')}</div>
          </Card>
          <Card className="card-elevated p-4 text-center border-border">
            <div className="text-2xl font-bold text-warning">156</div>
            <div className="text-xs text-muted-foreground">{t('stats.booths')}</div>
          </Card>
          <Card className="card-elevated p-4 text-center border-border">
            <div className="text-2xl font-bold text-accent">45</div>
            <div className="text-xs text-muted-foreground">{t('stats.areas')}</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;