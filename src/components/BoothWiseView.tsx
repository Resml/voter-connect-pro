import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from '@/contexts/LanguageContext';

interface BoothWiseViewProps {
  onBack: () => void;
  onBoothSelect: (boothId: string, voters: any[]) => void;
}

const BoothWiseView = ({ onBack, onBoothSelect }: BoothWiseViewProps) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [booths, setBooths] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooths = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('voters')
          .select('ac_no, part_no, booth_address, booth_address_l1')
          .not('ac_no', 'is', null)
          .not('part_no', 'is', null);

        if (error) {
          console.error('Error fetching booths:', error);
          return;
        }

        // Group by booth (ac_no-part_no combination)
        const boothGroups: any = {};
        data.forEach((voter: any) => {
          const boothKey = `${voter.ac_no}-${voter.part_no}`;
          if (!boothGroups[boothKey]) {
            boothGroups[boothKey] = {
              id: boothKey,
              ac_no: voter.ac_no,
              part_no: voter.part_no,
              address: voter.booth_address || voter.booth_address_l1 || '',
              count: 0
            };
          }
          boothGroups[boothKey].count++;
        });

        setBooths(Object.values(boothGroups));
      } catch (err) {
        console.error('Failed to fetch booths:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooths();
  }, []);

  const filteredBooths = booths.filter(booth =>
    booth.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booth.id.includes(searchTerm)
  );

  const handleBoothClick = async (booth: any) => {
    try {
      const { data, error } = await supabase
        .from('voters')
        .select('*')
        .eq('ac_no', booth.ac_no)
        .eq('part_no', booth.part_no);

      if (error) {
        console.error('Error fetching booth voters:', error);
        return;
      }

      onBoothSelect(booth.id, data || []);
    } catch (err) {
      console.error('Failed to fetch booth voters:', err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
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
          <h1 className="text-lg font-semibold">{t('reports.boothwise')}</h1>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search booth..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="flex-1">Search</Button>
            <Button variant="secondary" size="sm" className="flex-1">Reset</Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="text-sm text-muted-foreground mb-4">
          Total: {filteredBooths.length}
        </div>

        <div className="space-y-3">
          {filteredBooths.map((booth, index) => (
            <Card
              key={booth.id}
              className="card-elevated p-4 border-border cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleBoothClick(booth)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-lg">{index + 1}</span>
                    <span className="text-sm text-muted-foreground">
                      {booth.id}
                    </span>
                  </div>
                  <p className="text-sm">{booth.address}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold">{booth.count}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoothWiseView;