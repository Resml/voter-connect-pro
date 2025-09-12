import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, User, Phone, MapPin, Calendar, Hash, Building,
  Edit, Save, X, MessageSquare, Heart, Users, Clock, 
  CheckCircle, AlertCircle, Star, FileText, Camera, QrCode
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

interface UserDetailViewProps {
  voter: any;
  onBack: () => void;
}

const UserDetailView = ({ voter, onBack }: UserDetailViewProps) => {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(voter);
  const [activeTab, setActiveTab] = useState('basic');

  const handleSave = () => {
    // In real app, save to database
    toast({
      title: "Success",
      description: "Voter details updated successfully",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(voter);
    setIsEditing(false);
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
          <h1 className="text-lg font-semibold">Voter Details</h1>
          <div className="ml-auto flex gap-2">
            {!isEditing ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="text-primary-foreground hover:bg-white/10"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSave}
                  className="text-primary-foreground hover:bg-white/10"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  className="text-primary-foreground hover:bg-white/10"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
            <TabsTrigger value="survey">Survey</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card className="card-elevated p-6 border-border">
              <div className="flex items-start gap-6">
                {/* Profile Photo */}
                <div className="relative">
                  <div className="w-24 h-32 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center text-primary-foreground font-bold text-2xl">
                    {formData.name?.charAt(0)}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs"
                  >
                    <Camera className="w-3 h-3" />
                  </Button>
                </div>

                {/* Basic Information */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Full Name</label>
                      {isEditing ? (
                        <Input
                          value={formData.name || ''}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="mt-1"
                        />
                      ) : (
                        <div className="text-lg font-semibold text-foreground mt-1">{formData.name}</div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">EPIC Number</label>
                      {isEditing ? (
                        <Input
                          value={formData.cardNo || ''}
                          onChange={(e) => setFormData({...formData, cardNo: e.target.value})}
                          className="mt-1"
                        />
                      ) : (
                        <div className="text-sm text-muted-foreground mt-1">{formData.cardNo}</div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Age / Gender</label>
                      <div className="flex gap-2 mt-1">
                        {isEditing ? (
                          <>
                            <Input
                              type="number"
                              value={formData.age || ''}
                              onChange={(e) => setFormData({...formData, age: e.target.value})}
                              className="w-20"
                              placeholder="Age"
                            />
                            <Select value={formData.gender || ''} onValueChange={(value) => setFormData({...formData, gender: value})}>
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                              </SelectContent>
                            </Select>
                          </>
                        ) : (
                          <div className="text-sm text-muted-foreground">{formData.age} / {formData.gender}</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Booth Number</label>
                      {isEditing ? (
                        <Input
                          value={formData.boothNo || ''}
                          onChange={(e) => setFormData({...formData, boothNo: e.target.value})}
                          className="mt-1"
                        />
                      ) : (
                        <div className="text-sm text-muted-foreground mt-1">{formData.boothNo}</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">Address</label>
                    {isEditing ? (
                      <Textarea
                        value={formData.address || ''}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="mt-1"
                        rows={2}
                      />
                    ) : (
                      <div className="text-sm text-muted-foreground mt-1">{formData.address}</div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card className="card-elevated p-6 border-border">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Mobile Number</label>
                  {isEditing ? (
                    <Input
                      value={formData.mobile || ''}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground mt-1">{formData.mobile || 'Not available'}</div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">WhatsApp Number</label>
                  {isEditing ? (
                    <Input
                      value={formData.whatsapp || ''}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground mt-1">{formData.whatsapp || 'Not available'}</div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Email</label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground mt-1">{formData.email || 'Not available'}</div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Preferred Contact</label>
                  {isEditing ? (
                    <Select value={formData.preferredContact || ''} onValueChange={(value) => setFormData({...formData, preferredContact: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mobile">Mobile</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-sm text-muted-foreground mt-1">{formData.preferredContact || 'Not specified'}</div>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="family" className="space-y-4">
            <Card className="card-elevated p-6 border-border">
              <h3 className="text-lg font-semibold mb-4">Family Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Father's/Husband's Name</label>
                  <div className="text-sm text-muted-foreground mt-1">{formData.relation_full_name || 'Not available'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Relation Type</label>
                  <div className="text-sm text-muted-foreground mt-1">{formData.relation_type || 'Not available'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Family Members</label>
                  <div className="text-sm text-muted-foreground mt-1">Information not available</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="survey" className="space-y-4">
            <Card className="card-elevated p-6 border-border">
              <h3 className="text-lg font-semibold mb-4">Survey Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Survey Status</label>
                  <Badge variant={formData.surveyCompleted ? "default" : "secondary"} className="ml-2">
                    {formData.surveyCompleted ? "Completed" : "Pending"}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Last Survey Date</label>
                  <div className="text-sm text-muted-foreground mt-1">{formData.lastSurveyDate || 'Not surveyed'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Political Preference</label>
                  <div className="text-sm text-muted-foreground mt-1">{formData.politicalPreference || 'Not specified'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Issues/Concerns</label>
                  <div className="text-sm text-muted-foreground mt-1">{formData.issues || 'None reported'}</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card className="card-elevated p-6 border-border">
              <h3 className="text-lg font-semibold mb-4">Activity Log</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <div>
                    <div className="text-sm font-medium">Profile Updated</div>
                    <div className="text-xs text-muted-foreground">2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm font-medium">Survey Completed</div>
                    <div className="text-xs text-muted-foreground">1 day ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Users className="w-5 h-5 text-accent" />
                  <div>
                    <div className="text-sm font-medium">Contact Attempted</div>
                    <div className="text-xs text-muted-foreground">3 days ago</div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <Card className="card-elevated p-6 border-border">
              <h3 className="text-lg font-semibold mb-4">Notes & Comments</h3>
              <div className="space-y-4">
                <Textarea
                  placeholder="Add notes about this voter..."
                  rows={4}
                  className="w-full"
                />
                <Button className="btn-dashboard">
                  <FileText className="w-4 h-4 mr-2" />
                  Save Note
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDetailView;