import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, FileText, Users, Building, Plus, Search,
  CheckCircle, Clock, User, Phone, MapPin
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

interface SurveyViewProps {
  onBack: () => void;
}

const SurveyView = ({ onBack }: SurveyViewProps) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('nonvoter');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSurveyForm, setShowSurveyForm] = useState(false);

  // Survey form state
  const [surveyData, setSurveyData] = useState({
    voterName: '',
    mobile: '',
    address: '',
    profession: '',
    issues: '',
    politicalPreference: '',
    likelyToVote: '',
    suggestions: ''
  });

  const handleSurveySubmit = () => {
    // In real app, save to database
    toast({
      title: "Survey Submitted",
      description: "Survey data has been saved successfully",
    });
    setShowSurveyForm(false);
    setSurveyData({
      voterName: '',
      mobile: '',
      address: '',
      profession: '',
      issues: '',
      politicalPreference: '',
      likelyToVote: '',
      suggestions: ''
    });
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
          <h1 className="text-lg font-semibold">Survey Management</h1>
          <div className="ml-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSurveyForm(true)}
              className="text-primary-foreground hover:bg-white/10"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Survey
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="nonvoter">Non Voter</TabsTrigger>
            <TabsTrigger value="namewise">Name wise</TabsTrigger>
            <TabsTrigger value="societywise">Society wise</TabsTrigger>
          </TabsList>

          <TabsContent value="nonvoter" className="space-y-4">
            {!showSurveyForm ? (
              <Card className="card-elevated p-6 border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Non-Voter Survey</h3>
                  <Button onClick={() => setShowSurveyForm(true)} className="btn-dashboard">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Survey
                  </Button>
                </div>

                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Surveys Available</h3>
                  <p className="text-muted-foreground">Click "Create Survey" to start collecting non-voter information</p>
                </div>
              </Card>
            ) : (
              <Card className="card-elevated p-6 border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Non-Voter Survey Form</h3>
                  <Button
                    variant="outline"
                    onClick={() => setShowSurveyForm(false)}
                  >
                    Cancel
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Voter Name *
                    </label>
                    <Input
                      value={surveyData.voterName}
                      onChange={(e) => setSurveyData({...surveyData, voterName: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Mobile Number *
                    </label>
                    <Input
                      value={surveyData.mobile}
                      onChange={(e) => setSurveyData({...surveyData, mobile: e.target.value})}
                      placeholder="Enter mobile number"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Address *
                    </label>
                    <Textarea
                      value={surveyData.address}
                      onChange={(e) => setSurveyData({...surveyData, address: e.target.value})}
                      placeholder="Enter complete address"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Profession
                    </label>
                    <Input
                      value={surveyData.profession}
                      onChange={(e) => setSurveyData({...surveyData, profession: e.target.value})}
                      placeholder="Enter profession"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Political Preference
                    </label>
                    <Select 
                      value={surveyData.politicalPreference} 
                      onValueChange={(value) => setSurveyData({...surveyData, politicalPreference: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="party1">Party 1</SelectItem>
                        <SelectItem value="party2">Party 2</SelectItem>
                        <SelectItem value="independent">Independent</SelectItem>
                        <SelectItem value="undecided">Undecided</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Likely to Vote?
                    </label>
                    <Select 
                      value={surveyData.likelyToVote} 
                      onValueChange={(value) => setSurveyData({...surveyData, likelyToVote: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select likelihood" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="definitely">Definitely</SelectItem>
                        <SelectItem value="probably">Probably</SelectItem>
                        <SelectItem value="maybe">Maybe</SelectItem>
                        <SelectItem value="unlikely">Unlikely</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Main Issues/Concerns
                    </label>
                    <Textarea
                      value={surveyData.issues}
                      onChange={(e) => setSurveyData({...surveyData, issues: e.target.value})}
                      placeholder="Enter main concerns"
                      rows={2}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Suggestions for Improvement
                    </label>
                    <Textarea
                      value={surveyData.suggestions}
                      onChange={(e) => setSurveyData({...surveyData, suggestions: e.target.value})}
                      placeholder="Enter suggestions"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleSurveySubmit} className="btn-dashboard flex-1">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit Survey
                  </Button>
                  <Button variant="outline" onClick={() => setShowSurveyForm(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="namewise" className="space-y-4">
            <Card className="card-elevated p-6 border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Name-wise Survey List</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by voter name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
              </div>

              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">Name-wise survey listing will be available in future updates</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="societywise" className="space-y-4">
            <Card className="card-elevated p-6 border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Society-wise Survey List</h3>
                <Building className="w-5 h-5 text-muted-foreground" />
              </div>

              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">Society-wise survey listing will be available in future updates</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Surveys */}
        <Card className="card-elevated p-6 border-border mt-6">
          <h3 className="text-lg font-semibold mb-4">Recent Survey Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <User className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">राज कुमार शर्मा</div>
                  <div className="text-xs text-muted-foreground">2 hours ago</div>
                </div>
                <div className="text-xs text-muted-foreground">Survey completed by Volunteer Team</div>
              </div>
              <CheckCircle className="w-5 h-5 text-success" />
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <User className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">सुनीता देवी</div>
                  <div className="text-xs text-muted-foreground">1 day ago</div>
                </div>
                <div className="text-xs text-muted-foreground">Survey completed by Field Worker</div>
              </div>
              <CheckCircle className="w-5 h-5 text-success" />
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <User className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">अमित वर्मा</div>
                  <div className="text-xs text-muted-foreground">2 days ago</div>
                </div>
                <div className="text-xs text-muted-foreground">Survey pending completion</div>
              </div>
              <Clock className="w-5 h-5 text-warning" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SurveyView;