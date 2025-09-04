import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, Search, Filter, Download, MapPin, Phone, 
  Calendar, User, Building, FileText, Upload
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock voter data
const mockVoters = [
  {
    id: 'V001',
    name: 'राजेश कुमार शर्मा',
    age: 45,
    gender: 'Male',
    mobile: '9876543210',
    address: 'Shop No. 15, Gandhi Nagar, Pune - 411001',
    boothNo: 'B101',
    cardNo: 'ABC1234567',
    caste: 'General',
    alive: true,
    profession: 'Business',
    education: 'Graduate'
  },
  {
    id: 'V002',
    name: 'सुनीता देवी पटेल',
    age: 38,
    gender: 'Female',
    mobile: '9876543211',
    address: 'Flat 205, Shivaji Housing Society, Mumbai - 400001',
    boothNo: 'B102',
    cardNo: 'ABC1234568',
    caste: 'OBC',
    alive: true,
    profession: 'Teacher',
    education: 'Post Graduate'
  },
  {
    id: 'V003',
    name: 'अमित राज वर्मा',
    age: 29,
    gender: 'Male',
    mobile: '9876543212',
    address: 'House No. 45, Model Town, Delhi - 110001',
    boothNo: 'B103',
    cardNo: 'ABC1234569',
    caste: 'General',
    alive: true,
    profession: 'Engineer',
    education: 'Engineering'
  },
  {
    id: 'V004',
    name: 'प्रिया सिंह',
    age: 25,
    gender: 'Female',
    mobile: '9876543213',
    address: 'Apartment 12B, Green City, Bangalore - 560001',
    boothNo: 'B104',
    cardNo: 'ABC1234570',
    caste: 'General',
    alive: true,
    profession: 'Software Developer',
    education: 'Engineering'
  },
  {
    id: 'V005',
    name: 'रामचंद्र यादव',
    age: 52,
    gender: 'Male',
    mobile: '9876543214',
    address: 'Village: Rampur, Tehsil: Sadar, Lucknow - 226001',
    boothNo: 'B105',
    cardNo: 'ABC1234571',
    caste: 'OBC',
    alive: true,
    profession: 'Farmer',
    education: 'High School'
  }
];

interface SearchViewProps {
  searchType: string;
  onBack: () => void;
}

const SearchView = ({ searchType, onBack }: SearchViewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooth, setSelectedBooth] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');
  const [showImportModal, setShowImportModal] = useState(false);

  const getSearchTitle = (type: string) => {
    const titles: { [key: string]: string } = {
      name: 'Name wise Search',
      alphabetical: 'Alphabetical Search',
      booth: 'Booth wise Search',
      age: 'Age wise Search',
      address: 'Address wise Search',
      mobile: 'Mobile Number Search',
      caste: 'Caste wise Search',
      birthday: 'Birthday List',
      import: 'Import Excel Data',
      export: 'Export Data',
      about: 'About System'
    };
    return titles[type] || 'Search Results';
  };

  const filteredVoters = useMemo(() => {
    let filtered = mockVoters;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(voter => 
        voter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        voter.mobile.includes(searchTerm) ||
        voter.cardNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        voter.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by booth
    if (selectedBooth !== 'all') {
      filtered = filtered.filter(voter => voter.boothNo === selectedBooth);
    }

    // Filter by age range
    if (selectedAge !== 'all') {
      const [min, max] = selectedAge.split('-').map(Number);
      filtered = filtered.filter(voter => voter.age >= min && voter.age <= max);
    }

    // Special filters based on search type
    switch (searchType) {
      case 'birthday':
        // For demo, show all voters (in real app, filter by today's date)
        break;
      case 'alphabetical':
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [searchTerm, selectedBooth, selectedAge, searchType]);

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: `Exporting ${filteredVoters.length} records to Excel...`,
    });
  };

  const handleImport = () => {
    toast({
      title: "Import Feature",
      description: "Excel import functionality will be implemented here.",
    });
  };

  if (searchType === 'import') {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-primary-foreground hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-semibold">Import Excel Data</h1>
          </div>
        </div>

        <div className="p-4">
          <Card className="card-elevated p-6 border-border">
            <div className="text-center space-y-4">
              <Upload className="w-16 h-16 text-primary mx-auto" />
              <h2 className="text-xl font-semibold">Upload Voter Data</h2>
              <p className="text-muted-foreground">
                Select an Excel file (.xlsx) containing voter information
              </p>
              <Button className="btn-dashboard" onClick={handleImport}>
                <Upload className="w-4 h-4 mr-2" />
                Choose Excel File
              </Button>
              <div className="mt-6 text-left">
                <h3 className="font-semibold mb-2">Expected Excel Columns:</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Voter ID / Card No</p>
                  <p>• Name (First, Middle, Last)</p>
                  <p>• Age, Gender</p>
                  <p>• Mobile, Address</p>
                  <p>• Booth No</p>
                  <p>• Caste, Profession, Education</p>
                  <p>• Status (Alive/Dead)</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (searchType === 'about') {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-primary-foreground hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-semibold">About System</h1>
          </div>
        </div>

        <div className="p-4">
          <Card className="card-elevated p-6 border-border">
            <h2 className="text-xl font-semibold mb-4">Voter Management System</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>A comprehensive electoral data management application designed for efficient voter information handling.</p>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Features:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Secure authentication with activation keys</li>
                  <li>Excel data import and export</li>
                  <li>Advanced search and filtering</li>
                  <li>Multiple categorization options</li>
                  <li>Mobile-responsive design</li>
                  <li>Offline data storage</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm">Version 1.0 • Built with React & TypeScript</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

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
          <h1 className="text-lg font-semibold">{getSearchTitle(searchType)}</h1>
        </div>

        {/* Search Controls */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, mobile, card no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60"
            />
          </div>

          <div className="flex gap-2">
            <Select value={selectedBooth} onValueChange={setSelectedBooth}>
              <SelectTrigger className="bg-white/10 border-white/20 text-primary-foreground">
                <SelectValue placeholder="All Booths" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Booths</SelectItem>
                <SelectItem value="B101">Booth B101</SelectItem>
                <SelectItem value="B102">Booth B102</SelectItem>
                <SelectItem value="B103">Booth B103</SelectItem>
                <SelectItem value="B104">Booth B104</SelectItem>
                <SelectItem value="B105">Booth B105</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedAge} onValueChange={setSelectedAge}>
              <SelectTrigger className="bg-white/10 border-white/20 text-primary-foreground">
                <SelectValue placeholder="All Ages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ages</SelectItem>
                <SelectItem value="18-25">18-25 years</SelectItem>
                <SelectItem value="26-40">26-40 years</SelectItem>
                <SelectItem value="41-60">41-60 years</SelectItem>
                <SelectItem value="60-100">60+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {filteredVoters.length} Results
            </Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="btn-secondary"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="space-y-4">
          {filteredVoters.map((voter) => (
            <Card key={voter.id} className="card-elevated border-border">
              <div className="p-4">
                <div className="flex items-start gap-4">
                  {/* Avatar Placeholder */}
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                    {voter.name.charAt(0)}
                  </div>

                  {/* Voter Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{voter.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{voter.age} years • {voter.gender}</span>
                          <Badge variant="outline">
                            {voter.cardNo}
                          </Badge>
                        </div>
                      </div>
                      {voter.alive && (
                        <Badge variant="default" className="bg-success text-success-foreground">
                          Active
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{voter.mobile}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{voter.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building className="w-4 h-4" />
                        <span>Booth: {voter.boothNo}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <Badge variant="secondary">{voter.caste}</Badge>
                      <Badge variant="secondary">{voter.profession}</Badge>
                      <Badge variant="secondary">{voter.education}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredVoters.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Results Found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;