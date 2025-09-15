import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, Users, Search, Shield, Activity, FileText,
  CheckCircle, Clock, AlertTriangle, Settings
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from '@/contexts/LanguageContext';

interface UserManagementViewProps {
  onBack: () => void;
}

const UserManagementView = ({ onBack }: UserManagementViewProps) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('admins')
          .select('*')
          .order('last_login', { ascending: false });

        if (error) {
          console.error('Error fetching admins:', error);
          return;
        }

        setAdmins(data || []);
      } catch (err) {
        console.error('Failed to fetch admins:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const filteredUsers = admins.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.mobile_number.includes(searchTerm)
  );

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
          <h1 className="text-lg font-semibold">User Management</h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name or mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60"
          />
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="card-elevated border-border">
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.mobile_number}</p>
                    </div>
                  </div>
                  <Badge variant="default">
                    Active
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{user.email || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Last login:</span>
                    <span>{new Date(user.last_login).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setSelectedUser(user)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Access
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    Activity
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Survey
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* User Details Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md card-elevated border-border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">User Permissions</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedUser(null)}
                  >
                    ×
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">{selectedUser.name}</h4>
                    <p className="text-sm text-muted-foreground">{selectedUser.mobile}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Current Permissions:</h4>
                    <div className="space-y-2">
                      {selectedUser.permissions.map((permission: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span className="text-sm">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Available Permissions:</h4>
                    <div className="space-y-2">
                      {['Dashboard Access', 'Report Generation', 'User Management', 'Survey Creation', 'Data Export', 'Settings Access'].map((perm) => (
                        <label key={perm} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="rounded border-border"
                            defaultChecked={selectedUser.permissions.includes(perm)}
                          />
                          <span className="text-sm">{perm}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">Save Changes</Button>
                    <Button variant="outline" className="flex-1" onClick={() => setSelectedUser(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Users Found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementView;