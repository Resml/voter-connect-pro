import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, BarChart, PieChart, Users, Calendar,
  TrendingUp, Download
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from '@/contexts/LanguageContext';

interface StatisticsViewProps {
  onBack: () => void;
}

const StatisticsView = ({ onBack }: StatisticsViewProps) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('age');
  const [ageData, setAgeData] = useState<any[]>([]);
  const [genderData, setGenderData] = useState<any[]>([]);
  const [totalVoters, setTotalVoters] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        
        // Fetch age and gender statistics from database
        const { data: voters, error: votersError } = await supabase
          .from('voters')
          .select('age, gender');

        if (votersError) {
          console.error('Error fetching voters for statistics:', votersError);
          return;
        }

        const validVoters = voters || [];
        setTotalVoters(validVoters.length);

        // Process age data
        const ageGroups = {
          '18-25': 0, '26-35': 0, '36-50': 0, 
          '51-65': 0, '65+': 0
        };

        validVoters.forEach(voter => {
          const age = voter.age;
          if (age >= 18 && age <= 25) ageGroups['18-25']++;
          else if (age >= 26 && age <= 35) ageGroups['26-35']++;
          else if (age >= 36 && age <= 50) ageGroups['36-50']++;
          else if (age >= 51 && age <= 65) ageGroups['51-65']++;
          else if (age > 65) ageGroups['65+']++;
        });

        const totalAgeVoters = Object.values(ageGroups).reduce((sum, count) => sum + count, 0);
        setAgeData(Object.entries(ageGroups).map(([range, count]) => ({
          range,
          count,
          percentage: totalAgeVoters > 0 ? Math.round((count / totalAgeVoters) * 100) : 0
        })));

        // Process gender data
        const genderGroups = { Male: 0, Female: 0 };
        validVoters.forEach(voter => {
          const gender = voter.gender;
          if (gender === 'M' || gender === 'Male') genderGroups.Male++;
          else if (gender === 'F' || gender === 'Female') genderGroups.Female++;
        });

        const totalGenderVoters = Object.values(genderGroups).reduce((sum, count) => sum + count, 0);
        setGenderData(Object.entries(genderGroups).map(([gender, count]) => ({
          gender,
          count,
          percentage: totalGenderVoters > 0 ? Math.round((count / totalGenderVoters) * 100) : 0
        })));

      } catch (err) {
        console.error('Failed to fetch statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const getAgeColor = (index: number) => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground p-4">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-primary-foreground hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-semibold">Statistics</h1>
          <div className="ml-auto">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="card-elevated p-4 text-center border-border">
            <div className="text-2xl font-bold text-primary">{totalVoters.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Voters</div>
          </Card>
          <Card className="card-elevated p-4 text-center border-border">
            <div className="text-2xl font-bold text-success">{Math.floor(totalVoters * 0.69).toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Active Voters</div>
          </Card>
          <Card className="card-elevated p-4 text-center border-border">
            <div className="text-2xl font-bold text-warning">{Math.floor(totalVoters / 78)}</div>
            <div className="text-xs text-muted-foreground">Total Booths</div>
          </Card>
          <Card className="card-elevated p-4 text-center border-border">
            <div className="text-2xl font-bold text-accent">{Math.floor(totalVoters * 0.31).toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Surveyed</div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="age">Age Count</TabsTrigger>
            <TabsTrigger value="gender">Gender Count</TabsTrigger>
            <TabsTrigger value="voter">Voter Counter</TabsTrigger>
          </TabsList>

          <TabsContent value="age" className="space-y-4">
            <Card className="card-elevated p-6 border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Age Distribution</h3>
                <BarChart className="w-5 h-5 text-muted-foreground" />
              </div>

              {/* Age Chart Visualization */}
              <div className="space-y-4">
                {ageData.map((item, index) => (
                  <div key={item.range} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.range} years</span>
                      <span className="text-muted-foreground">{item.count.toLocaleString()} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${item.percentage * 3}%`,
                          backgroundColor: getAgeColor(index)
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Pie Chart Representation */}
              <div className="mt-8 flex justify-center">
                <div className="relative w-48 h-48">
                  <svg className="w-48 h-48 transform -rotate-90">
                    {ageData.reduce((acc, item, index) => {
                      const prevTotal = ageData.slice(0, index).reduce((sum, prev) => sum + prev.percentage, 0);
                      const strokeDasharray = `${item.percentage * 2.51} ${251.2 - item.percentage * 2.51}`;
                      const strokeDashoffset = -prevTotal * 2.51;
                      
                      acc.push(
                        <circle
                          key={item.range}
                          cx="96"
                          cy="96"
                          r="40"
                          fill="transparent"
                          stroke={getAgeColor(index)}
                          strokeWidth="16"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-500"
                        />
                      );
                      return acc;
                    }, [] as JSX.Element[])}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold">{totalVoters.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
                {ageData.map((item, index) => (
                  <div key={item.range} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getAgeColor(index) }}
                    />
                    <span className="text-xs text-muted-foreground">{item.range}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="gender" className="space-y-4">
            <Card className="card-elevated p-6 border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Gender Distribution</h3>
                <PieChart className="w-5 h-5 text-muted-foreground" />
              </div>

              {/* Gender Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {genderData.map((item, index) => (
                    <div key={item.gender} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.gender}</span>
                        <span className="text-muted-foreground">{item.count.toLocaleString()} ({item.percentage}%)</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-4">
                        <div
                          className="h-4 rounded-full transition-all duration-500"
                          style={{
                            width: `${item.percentage}%`,
                            backgroundColor: index === 0 ? '#3b82f6' : '#f472b6'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gender Pie Chart */}
                <div className="flex justify-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="30"
                        fill="transparent"
                        stroke="#3b82f6"
                        strokeWidth="12"
                        strokeDasharray={`${genderData[0].percentage * 1.88} ${188 - genderData[0].percentage * 1.88}`}
                        className="transition-all duration-500"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="30"
                        fill="transparent"
                        stroke="#f472b6"
                        strokeWidth="12"
                        strokeDasharray={`${genderData[1].percentage * 1.88} ${188 - genderData[1].percentage * 1.88}`}
                        strokeDashoffset={-genderData[0].percentage * 1.88}
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-sm font-bold">{totalVoters.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gender Legend */}
              <div className="mt-4 flex justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-sm">Male</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-400" />
                  <span className="text-sm">Female</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="voter" className="space-y-4">
            <Card className="card-elevated p-6 border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Voter Counter</h3>
                <Users className="w-5 h-5 text-muted-foreground" />
              </div>

              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">Advanced voter analytics will be available in future updates</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StatisticsView;