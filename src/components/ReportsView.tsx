import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, User, Users, MapPin, Calendar, 
  Phone, Hash, FileText, Users2, MapPinIcon,
  Building2, Cake, UserCheck, UserX, ClipboardList,
  Eye, Briefcase, GraduationCap, MessageSquare,
  ThumbsUp, Home
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ReportsViewProps {
  onBack: () => void;
  onSearchSelect: (searchType: string) => void;
}

const ReportsView = ({ onBack, onSearchSelect }: ReportsViewProps) => {
  const { t } = useLanguage();

  const reportOptions = [
    { id: 'name', icon: User, color: 'bg-red-600' },
    { id: 'alphabetical', icon: Hash, color: 'bg-red-600' },
    { id: 'booth', icon: Building2, color: 'bg-red-600' },
    { id: 'age', icon: Calendar, color: 'bg-red-600' },
    { id: 'duplicate', icon: Users2, color: 'bg-red-600' },
    { id: 'mobile', icon: Phone, color: 'bg-red-600' },
    { id: 'address', icon: MapPin, color: 'bg-red-600' },
    { id: 'lastname', icon: FileText, color: 'bg-red-600' },
    { id: 'caste', icon: Users, color: 'bg-red-600' },
    { id: 'favour', icon: ThumbsUp, color: 'bg-red-600' },
    { id: 'nagar', icon: MapPinIcon, color: 'bg-red-600' },
    { id: 'society', icon: Home, color: 'bg-red-600' },
    { id: 'dead', icon: UserX, color: 'bg-red-600' },
    { id: 'birthday', icon: Cake, color: 'bg-red-600' },
    { id: 'role', icon: UserCheck, color: 'bg-red-600' },
    { id: 'nonvoters', icon: UserX, color: 'bg-red-600' },
    { id: 'survey', icon: ClipboardList, color: 'bg-red-600' },
    { id: 'visited', icon: Eye, color: 'bg-red-600' },
    { id: 'partyworker', icon: Users, color: 'bg-red-600' },
    { id: 'education', icon: GraduationCap, color: 'bg-red-600' },
    { id: 'profession', icon: Briefcase, color: 'bg-red-600' },
    { id: 'prabhag', icon: MessageSquare, color: 'bg-red-600' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-semibold">{t('reports.allReports')}</h1>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {reportOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Card
                key={option.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onSearchSelect(option.id)}
              >
                <div className="p-4 flex items-center gap-3">
                  <div className={`w-12 h-12 ${option.color} rounded-full flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">
                      {t(`reports.${option.id}`)}
                    </h3>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReportsView;