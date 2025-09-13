import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, Save } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

interface SurveyFormViewProps {
  onBack: () => void;
  searchType?: string;
}

const SurveyFormView = ({ onBack, searchType }: SurveyFormViewProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    mobileNumber: '',
    society: '',
    serialNo: '',
    houseType: '',
    oldTown: '',
    caste: '',
    favourParty: '',
    role: '',
    bloodGroup: '',
    education: '',
    business: '',
    dateOfBirth: '',
    partyWorker: '',
    problems: '',
    dead: 'No',
    motherTongue: '',
    houseHoldIncome: '',
    votedPreviously: 'No',
    workerRating: 'Excellent'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Survey Saved",
      description: "Survey data has been saved successfully.",
    });
    onBack();
  };

  if (searchType === 'nonvoters') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-semibold">Survey</h1>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="bg-blue-600 text-white hover:bg-blue-700 flex-1">
              <Search className="w-4 h-4 mr-2" />
              Voter List
            </Button>
            <Button variant="ghost" size="sm" className="bg-blue-600 text-white hover:bg-blue-700 flex-1">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="ghost" size="sm" className="bg-blue-600 text-white hover:bg-blue-700 flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>

        {/* Survey Form */}
        <div className="p-4">
          <Card className="card-elevated p-6 border-border">
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Name</label>
                <Input
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Address</label>
                <Textarea
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Mobile Number</label>
                <Input
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                />
              </div>

              {/* Society */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Society</label>
                <Input
                  placeholder="Society"
                  value={formData.society}
                  onChange={(e) => handleInputChange('society', e.target.value)}
                />
              </div>

              {/* Serial No */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Serial No</label>
                <Input
                  placeholder="Serial No"
                  value={formData.serialNo}
                  onChange={(e) => handleInputChange('serialNo', e.target.value)}
                />
              </div>

              {/* House Type Checkboxes */}
              <div>
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-blue-600" />
                    <span>Own</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-blue-600" />
                    <span>Rental</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-blue-600" />
                    <span>Close</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-blue-600" />
                    <span>Shifted</span>
                  </label>
                </div>
              </div>

              {/* Old Town */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Old town</label>
                <Input
                  placeholder="Old town"
                  value={formData.oldTown}
                  onChange={(e) => handleInputChange('oldTown', e.target.value)}
                />
              </div>

              {/* Caste */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Caste</label>
                <Input
                  placeholder="Caste"
                  value={formData.caste}
                  onChange={(e) => handleInputChange('caste', e.target.value)}
                />
              </div>

              {/* Favour Party */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Favour party</label>
                <Select value={formData.favourParty} onValueChange={(value) => handleInputChange('favourParty', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Favour party" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="party1">Party 1</SelectItem>
                    <SelectItem value="party2">Party 2</SelectItem>
                    <SelectItem value="party3">Party 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Select Position</label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Role : Select options" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="polling_agent">Polling Agent</SelectItem>
                    <SelectItem value="booth_coordinator">Booth Coordinator</SelectItem>
                    <SelectItem value="party_worker">Party Worker</SelectItem>
                    <SelectItem value="page_president">Page President</SelectItem>
                    <SelectItem value="booth_president">Booth President</SelectItem>
                    <SelectItem value="social_media_team">Social Media Team</SelectItem>
                    <SelectItem value="well_wisher">Well Wisher</SelectItem>
                    <SelectItem value="political_leader">Political Leader</SelectItem>
                    <SelectItem value="community_member">Community Member</SelectItem>
                    <SelectItem value="local_business_person">Local Business Person</SelectItem>
                    <SelectItem value="society_community_member">Society Community Member</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Blood Group</label>
                <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange('bloodGroup', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Education */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Education</label>
                <Select value={formData.education} onValueChange={(value) => handleInputChange('education', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select education" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="postgraduate">Post Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Business */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Business</label>
                <Select value={formData.business} onValueChange={(value) => handleInputChange('business', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agriculture">Agriculture</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Date of Birth</label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              </div>

              {/* Party Worker */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Party worker</label>
                <Input
                  placeholder="Party worker"
                  value={formData.partyWorker}
                  onChange={(e) => handleInputChange('partyWorker', e.target.value)}
                />
              </div>

              {/* Problems */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Problems</label>
                <Textarea
                  placeholder="Problems"
                  value={formData.problems}
                  onChange={(e) => handleInputChange('problems', e.target.value)}
                  rows={3}
                />
              </div>

              {/* Dead Status */}
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Dead</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="dead" 
                        value="No" 
                        checked={formData.dead === 'No'}
                        onChange={(e) => handleInputChange('dead', e.target.value)}
                        className="accent-blue-600" 
                      />
                      No
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="dead" 
                        value="Yes" 
                        checked={formData.dead === 'Yes'}
                        onChange={(e) => handleInputChange('dead', e.target.value)}
                        className="accent-blue-600" 
                      />
                      Yes
                    </label>
                  </div>
                </div>
              </div>

              {/* Mother Tongue */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Mother Tongue</label>
                <Input
                  placeholder="Mother Tongue"
                  value={formData.motherTongue}
                  onChange={(e) => handleInputChange('motherTongue', e.target.value)}
                />
              </div>

              {/* House Hold Income */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">House Hold Income</label>
                <Input
                  placeholder="House Hold Income"
                  value={formData.houseHoldIncome}
                  onChange={(e) => handleInputChange('houseHoldIncome', e.target.value)}
                />
              </div>

              {/* Voted Previously */}
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Voted Previously - Yes or No?</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="votedPreviously" 
                        value="Yes" 
                        checked={formData.votedPreviously === 'Yes'}
                        onChange={(e) => handleInputChange('votedPreviously', e.target.value)}
                        className="accent-blue-600" 
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="votedPreviously" 
                        value="No" 
                        checked={formData.votedPreviously === 'No'}
                        onChange={(e) => handleInputChange('votedPreviously', e.target.value)}
                        className="accent-blue-600" 
                      />
                      No
                    </label>
                  </div>
                </div>
              </div>

              {/* Worker Rating */}
              <div className="bg-white p-4 rounded-lg border">
                <div className="space-y-3">
                  <div className="font-medium">How is worker as Online Neta Demo?</div>
                  <div className="space-y-2">
                    {['Excellent', 'Good', 'Average', 'Worst/Bad'].map((rating) => (
                      <label key={rating} className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          name="workerRating" 
                          value={rating} 
                          checked={formData.workerRating === rating}
                          onChange={(e) => handleInputChange('workerRating', e.target.value)}
                          className="accent-blue-600" 
                        />
                        {rating}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Save Survey
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
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
          <h1 className="text-lg font-semibold">Survey - {searchType}</h1>
        </div>
      </div>

      <div className="p-4">
        <Card className="card-elevated p-6 border-border">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Survey Feature</h3>
            <p className="text-muted-foreground">This survey type is not yet implemented.</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SurveyFormView;