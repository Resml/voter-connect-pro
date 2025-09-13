import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, MessageSquare, Phone, Printer, 
  Users, Volume2, Play, Bluetooth, Clock,
  Save, Plus
} from 'lucide-react';

interface UserDetailViewProps {
  voter: any;
  onBack: () => void;
}

const UserDetailView = ({ voter, onBack }: UserDetailViewProps) => {
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [isVisited, setIsVisited] = useState(true);
  const [formData, setFormData] = useState({
    mobileNo: '1',
    partyWorker: 'varsha nemade',
    caste: 'Bihari',
    nagar: 'laxman nagar',
    society: 'Om',
    role: 'Select options',
    dead: 'No'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-semibold">Voter ...</h1>
          </div>
          
          {/* Toggle Switches */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">WhatsApp:</span>
              <div className="flex items-center">
                <button 
                  className={`w-12 h-6 rounded-full transition-colors ${isWhatsApp ? 'bg-white' : 'bg-gray-400'}`}
                  onClick={() => setIsWhatsApp(!isWhatsApp)}
                >
                  <div className={`w-5 h-5 bg-gray-600 rounded-full transition-transform ${isWhatsApp ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Visited:</span>
              <div className="flex items-center">
                <button 
                  className={`w-12 h-6 rounded-full transition-colors ${isVisited ? 'bg-red-500' : 'bg-gray-400'}`}
                  onClick={() => setIsVisited(!isVisited)}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${isVisited ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-pink-100 p-3 rounded-lg">
          <div className="grid grid-cols-6 gap-2 mb-3">
            <Button size="sm" className="bg-black text-white hover:bg-gray-800">
              <MessageSquare className="w-4 h-4" />
            </Button>
            <Button size="sm" className="bg-white text-black hover:bg-gray-100">
              SMS
            </Button>
            <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
              <MessageSquare className="w-4 h-4" />
            </Button>
            <Button size="sm" className="bg-white text-black hover:bg-gray-100">
              Image
            </Button>
            <Button size="sm" className="bg-white text-black hover:bg-gray-100">
              <Volume2 className="w-4 h-4" />
            </Button>
            <Button size="sm" className="bg-white text-black hover:bg-gray-100">
              <Play className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-6 gap-2">
            <Button size="sm" className="bg-white text-black hover:bg-gray-100">
              <Bluetooth className="w-4 h-4" />
            </Button>
            <Button size="sm" className="bg-white text-black hover:bg-gray-100 text-xs">
              <Printer className="w-3 h-3 mr-1" />
              Print
            </Button>
            <Button size="sm" className="bg-white text-black hover:bg-gray-100 text-xs">
              <Printer className="w-3 h-3 mr-1" />
              Family Slip
            </Button>
            <Button size="sm" className="bg-white text-black hover:bg-gray-100">
              <Phone className="w-4 h-4" />
            </Button>
            <Button size="sm" className="bg-white text-black hover:bg-gray-100">
              <Users className="w-4 h-4" />
            </Button>
            <Button size="sm" className="bg-white text-black hover:bg-gray-100">
              <Clock className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-2 mt-3">
            <Button size="sm" className="bg-white text-black hover:bg-gray-100 flex-1">
              Survey
            </Button>
            <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
              ▼
            </Button>
            <Button size="sm" className="bg-green-600 text-white hover:bg-green-700 flex-1">
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Voter Information */}
      <div className="p-4">
        <Card className="card-elevated p-4 border-border">
          <div className="flex items-start gap-4 mb-6">
            {/* Profile Photo */}
            <div className="w-20 h-24 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center text-white font-semibold text-2xl">
              {voter.name?.charAt(0) || 'V'}
            </div>

            {/* Voter Details */}
            <div className="flex-1">
              <div className="space-y-2">
                <div className="flex gap-4">
                  <span className="font-semibold">Booth No :</span>
                  <span>1,</span>
                  <span className="font-semibold">Sr.No :</span>
                  <span>1</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-semibold">Card No:</span>
                  <span>{voter.cardNo || 'ZSL6215909'}</span>
                  <span className="font-semibold">Age:</span>
                  <span>28</span>
                </div>
                <div>
                  <span className="font-semibold">Name :</span>
                  <span className="ml-2">{voter.name || 'Voter Name'}</span>
                </div>
                <div>
                  <span className="font-semibold">Address:</span>
                  <span className="ml-2">{voter.address || 'Address not available'}</span>
                </div>
                <div>
                  <span className="font-semibold">Booth Name:</span>
                  <span className="ml-2">{voter.boothNo || '1'} / Booth Address Details</span>
                </div>
                <div>
                  <span className="font-semibold">Part No :</span>
                </div>
              </div>
            </div>
          </div>

          {/* Editable Fields */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <Label className="font-semibold min-w-[120px]">Mobile No. .:</Label>
              <Input 
                value={formData.mobileNo}
                onChange={(e) => handleInputChange('mobileNo', e.target.value)}
                className="flex-1 mx-2"
              />
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between border-b pb-2">
              <Label className="font-semibold min-w-[120px]">Party Worker:</Label>
              <Input 
                value={formData.partyWorker}
                onChange={(e) => handleInputChange('partyWorker', e.target.value)}
                className="flex-1 mx-2"
              />
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between border-b pb-2">
              <Label className="font-semibold min-w-[120px]">Caste :</Label>
              <Input 
                value={formData.caste}
                onChange={(e) => handleInputChange('caste', e.target.value)}
                className="flex-1 mx-2"
              />
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between border-b pb-2">
              <Label className="font-semibold min-w-[120px]">Nagar :</Label>
              <Input 
                value={formData.nagar}
                onChange={(e) => handleInputChange('nagar', e.target.value)}
                className="flex-1 mx-2"
              />
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between border-b pb-2">
              <Label className="font-semibold min-w-[120px]">Society :</Label>
              <Input 
                value={formData.society}
                onChange={(e) => handleInputChange('society', e.target.value)}
                className="flex-1 mx-2"
              />
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <Label className="font-semibold min-w-[120px]">Role :</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                <SelectTrigger className="flex-1 mx-2">
                  <SelectValue placeholder="Select options" />
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
              <Button size="sm" variant="outline">▼</Button>
            </div>
          </div>

          {/* Dead Status */}
          <div className="mt-6 flex items-center gap-4">
            <span className="font-semibold">Dead</span>
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

          {/* Action Buttons */}
          <div className="mt-6 flex gap-2">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              Read Google Location
            </Button>
            <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
              ◇
            </Button>
          </div>
          
          <div className="mt-2 flex gap-2">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              All Voters on this address
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              All Voters on this booth
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserDetailView;