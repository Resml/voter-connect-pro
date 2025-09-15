import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from '@/contexts/LanguageContext';

interface AddressWiseViewProps {
  onBack: () => void;
  onAddressSelect: (addressId: string, voters: any[]) => void;
}

const AddressWiseView = ({ onBack, onAddressSelect }: AddressWiseViewProps) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('voters')
          .select('v_address, v_address_l1')
          .not('v_address', 'is', null);

        if (error) {
          console.error('Error fetching addresses:', error);
          return;
        }

        // Group by address
        const addressGroups: any = {};
        data.forEach((voter: any) => {
          const address = voter.v_address || voter.v_address_l1 || '';
          if (address && !addressGroups[address]) {
            addressGroups[address] = {
              id: address,
              address: address,
              count: 0
            };
          }
          if (address) {
            addressGroups[address].count++;
          }
        });

        setAddresses(Object.values(addressGroups).sort((a: any, b: any) => b.count - a.count));
      } catch (err) {
        console.error('Failed to fetch addresses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const filteredAddresses = addresses.filter(addr =>
    addr.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddressClick = async (address: any) => {
    try {
      const { data, error } = await supabase
        .from('voters')
        .select('*')
        .or(`v_address.eq.${address.address},v_address_l1.eq.${address.address}`);

      if (error) {
        console.error('Error fetching address voters:', error);
        return;
      }

      onAddressSelect(address.id, data || []);
    } catch (err) {
      console.error('Failed to fetch address voters:', err);
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
          <h1 className="text-lg font-semibold">{t('reports.addresswise')}</h1>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search address..."
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
          Total: {filteredAddresses.length}
        </div>

        <div className="space-y-3">
          {filteredAddresses.map((address, index) => (
            <Card
              key={address.id}
              className="card-elevated p-4 border-border cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleAddressClick(address)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-lg">{index + 1}</span>
                  </div>
                  <p className="text-sm">{address.address}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold">{address.count}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressWiseView;