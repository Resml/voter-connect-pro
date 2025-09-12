import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, Settings, User, Bell, Shield, Database,
  Smartphone, Globe, Save, RefreshCw
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

interface SettingsViewProps {
  onBack: () => void;
}

const SettingsView = ({ onBack }: SettingsViewProps) => {
  const { t, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('general');
  
  // Settings state
  const [settings, setSettings] = useState({
    // General Settings
    appName: 'Voter Management System',
    organization: 'Political Party Organization',
    defaultLanguage: language,
    
    // Notification Settings
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: true,
    surveyReminders: true,
    
    // Security Settings
    autoLogout: true,
    logoutTime: '30',
    twoFactorAuth: false,
    biometricAuth: false,
    
    // Data Settings
    autoBackup: true,
    backupFrequency: 'daily',
    dataRetention: '365',
    exportFormat: 'excel'
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully",
    });
  };

  const handleLanguageChange = (newLanguage: 'en' | 'mr') => {
    setLanguage(newLanguage);
    setSettings({...settings, defaultLanguage: newLanguage});
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
          <h1 className="text-lg font-semibold">Settings</h1>
          <div className="ml-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="text-primary-foreground hover:bg-white/10"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="data">Data & Sync</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card className="card-elevated p-6 border-border">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-5 h-5" />
                <h3 className="text-lg font-semibold">General Settings</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Application Name
                  </label>
                  <Input
                    value={settings.appName}
                    onChange={(e) => setSettings({...settings, appName: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Organization Name
                  </label>
                  <Input
                    value={settings.organization}
                    onChange={(e) => setSettings({...settings, organization: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Default Language
                  </label>
                  <Select value={settings.defaultLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Theme Preference
                  </label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card className="card-elevated p-6 border-border">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Notification Settings</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Push Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive notifications on your device
                    </div>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, pushNotifications: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive updates via email
                    </div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, emailNotifications: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">SMS Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive important updates via SMS
                    </div>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, smsNotifications: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Survey Reminders</div>
                    <div className="text-sm text-muted-foreground">
                      Get reminders for pending surveys
                    </div>
                  </div>
                  <Switch
                    checked={settings.surveyReminders}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, surveyReminders: checked})
                    }
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card className="card-elevated p-6 border-border">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Security Settings</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Auto Logout</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically log out after inactivity
                    </div>
                  </div>
                  <Switch
                    checked={settings.autoLogout}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, autoLogout: checked})
                    }
                  />
                </div>

                {settings.autoLogout && (
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Auto Logout Time (minutes)
                    </label>
                    <Select 
                      value={settings.logoutTime}
                      onValueChange={(value) => setSettings({...settings, logoutTime: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">
                      Add an extra layer of security
                    </div>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, twoFactorAuth: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Biometric Authentication</div>
                    <div className="text-sm text-muted-foreground">
                      Use fingerprint or face recognition
                    </div>
                  </div>
                  <Switch
                    checked={settings.biometricAuth}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, biometricAuth: checked})
                    }
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <Card className="card-elevated p-6 border-border">
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Data & Sync Settings</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Auto Backup</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically backup data to cloud
                    </div>
                  </div>
                  <Switch
                    checked={settings.autoBackup}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, autoBackup: checked})
                    }
                  />
                </div>

                {settings.autoBackup && (
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Backup Frequency
                    </label>
                    <Select 
                      value={settings.backupFrequency}
                      onValueChange={(value) => setSettings({...settings, backupFrequency: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Every Hour</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Data Retention Period (days)
                  </label>
                  <Input
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) => setSettings({...settings, dataRetention: e.target.value})}
                    placeholder="365"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Export Format
                  </label>
                  <Select 
                    value={settings.exportFormat}
                    onValueChange={(value) => setSettings({...settings, exportFormat: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Sync Now
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsView;