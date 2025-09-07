import { useState, useMemo, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, Search, Filter, Download, MapPin, Phone, 
  Calendar, User, Building, FileText, Upload, Hash, Users
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';
import { supabase } from "@/integrations/supabase/client";

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
  const [voters, setVoters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

useEffect(() => {
  const fetchVoters = async () => {
    try {
      setLoading(true);
      const { data, error } = await (supabase as any)
        .from('voters')
        .select('*')
        .limit(2000);
      if (error) {
        console.error('Error fetching voters:', error);
        toast({ title: 'Error', description: 'Failed to load voters from database', variant: 'destructive' });
        setVoters([]);
      } else {
        setVoters(data || []);
      }
    } finally {
      setLoading(false);
    }
  };
  fetchVoters();
}, [searchType]);

const displayVoters = useMemo(() => {
  return (voters || []).map((row: any) => ({
    id: row.id,
    name: row.applicant_full_name || row.applicant_full_name_l1 || [row.applicant_first_name, row.applicant_last_name].filter(Boolean).join(' ') || 'Unknown',
    age: row.age ?? undefined,
    gender: row.gender ?? '',
    mobile: '',
    address: row.v_address || row.v_address_l1 || row.booth_address || row.booth_address_l1 || '',
    boothNo: `${row.ac_no || ''}-${row.part_no || ''}`,
    cardNo: row.epic_number || '',
    caste: undefined,
    profession: undefined,
    education: undefined,
    alive: true,
  }));
}, [voters]);

const filteredVoters = useMemo(() => {
  let filtered = displayVoters;

  if (searchTerm) {
    const st = searchTerm.toLowerCase();
    filtered = filtered.filter(voter => 
      (voter.name || '').toLowerCase().includes(st) ||
      (voter.mobile || '').includes(searchTerm) ||
      (voter.cardNo || '').toLowerCase().includes(st) ||
      (voter.address || '').toLowerCase().includes(st) ||
      (voter.boothNo || '').toLowerCase().includes(st)
    );
  }

  if (selectedBooth !== 'all') {
    filtered = filtered.filter(voter => (voter.boothNo || '') === selectedBooth);
  }

  if (selectedAge !== 'all') {
    const [min, max] = selectedAge.split('-').map(Number);
    filtered = filtered.filter(voter => (voter.age ?? 0) >= min && (voter.age ?? 0) <= max);
  }

  switch (searchType) {
    case 'birthday':
      // For demo, show all voters (in real app, filter by today's date)
      break;
    case 'alphabetical':
      filtered = [...filtered].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      break;
  }

  return filtered;
}, [searchTerm, selectedBooth, selectedAge, searchType, displayVoters]);

const handleExport = () => {
  toast({
    title: "Export Started",
    description: `Exporting ${filteredVoters.length} records to Excel...`,
  });
};

const handleImportClick = () => {
  fileInputRef.current?.click();
};

const handleFileChange = async (e: any) => {
  try {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    toast({ title: "Importing...", description: "Parsing Excel file, please wait..." });

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: null });

    if (!rows.length) {
      toast({ title: 'No data found', description: 'The uploaded Excel file is empty.', variant: 'destructive' });
      return;
    }

    const mapped = rows.map((r) => ({
      ac_no: r['AC_NO']?.toString() ?? null,
      part_no: r['PART_NO']?.toString() ?? null,
      slnoinpart: r['SLNOINPART']?.toString() ?? null,
      section_no: r['SECTION_NO']?.toString() ?? null,
      house_number: r['HOUSE_NUMBER']?.toString() ?? null,
      applicant_full_name_l1: r['APPLICANT_FULL_NAME_L1'] ?? null,
      applicant_full_name: r['APPLICANT_FULL_NAME'] ?? null,
      applicant_first_name_l1: r['APPLICANT_FIRST_NAME_L1'] ?? null,
      applicant_first_name: r['APPLICANT_FIRST_NAME'] ?? null,
      applicant_last_name_l1: r['APPLICANT_LAST_NAME_L1'] ?? null,
      applicant_last_name: r['APPLICANT_LAST_NAME'] ?? null,
      age: r['AGE'] != null ? Number(r['AGE']) : null,
      gender: r['GENDER'] ?? null,
      relation_type: r['RELATION_TYPE'] ?? null,
      relation_full_name_l1: r['RELATION_FULL_NAME_L1'] ?? null,
      relation_full_name: r['RELATION_FULL_NAME'] ?? null,
      relation_last_name_l1: r['RELATION_LAST_NAME_L1'] ?? null,
      epic_number: r['EPIC_NUMBER'] ?? null,
      v_address_l1: r['V_ADDRESS_L1'] ?? null,
      v_address: r['V_ADDRESS'] ?? null,
      booth_address_l1: r['BOOTH_ADDRESS_L1'] ?? null,
      booth_address: r['BOOTH_ADDRESS'] ?? null,
    }));

    // Insert in chunks
    const chunkSize = 500;
    let inserted = 0;
    for (let i = 0; i < mapped.length; i += chunkSize) {
      const chunk = mapped.slice(i, i + chunkSize);
      const { error } = await (supabase as any).from('voters').insert(chunk);
      if (error) {
        console.error('Import error:', error);
        toast({ title: 'Import failed', description: error.message, variant: 'destructive' });
        break;
      }
      inserted += chunk.length;
    }

    // Refresh data
    const { data } = await (supabase as any).from('voters').select('*').limit(2000);
    setVoters(data || []);

    toast({ title: 'Import complete', description: `Inserted ${inserted} records.` });
  } catch (err: any) {
    console.error('File import error:', err);
    toast({ title: 'Error', description: err?.message || 'Failed to import file', variant: 'destructive' });
  } finally {
    setLoading(false);
    if (e?.target) e.target.value = '';
  }
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
              <input 
                type="file" 
                accept=".xlsx,.xls" 
                ref={fileInputRef} 
                onChange={handleFileChange}
                className="hidden"
              />
              <Button className="btn-dashboard" onClick={handleImportClick}>
                <Upload className="w-4 h-4 mr-2" />
                Choose Excel File
              </Button>
              <div className="mt-6 text-left">
                <h3 className="font-semibold mb-2">Expected Excel Columns (exact headers):</h3>
                <div className="text-sm text-muted-foreground grid grid-cols-1 sm:grid-cols-2 gap-1">
                  <p>1. AC_NO</p>
                  <p>2. PART_NO</p>
                  <p>3. SLNOINPART</p>
                  <p>4. SECTION_NO</p>
                  <p>5. HOUSE_NUMBER</p>
                  <p>6. APPLICANT_FULL_NAME_L1</p>
                  <p>7. APPLICANT_FULL_NAME</p>
                  <p>8. APPLICANT_FIRST_NAME_L1</p>
                  <p>9. APPLICANT_FIRST_NAME</p>
                  <p>10. APPLICANT_LAST_NAME_L1</p>
                  <p>11. APPLICANT_LAST_NAME</p>
                  <p>12. AGE</p>
                  <p>13. GENDER</p>
                  <p>14. RELATION_TYPE</p>
                  <p>15. RELATION_FULL_NAME_L1</p>
                  <p>16. RELATION_FULL_NAME</p>
                  <p>17. RELATION_LAST_NAME_L1</p>
                  <p>18. EPIC_NUMBER</p>
                  <p>19. V_ADDRESS_L1</p>
                  <p>20. V_ADDRESS</p>
                  <p>21. BOOTH_ADDRESS_L1</p>
                  <p>22. BOOTH_ADDRESS</p>
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
              placeholder="Search by name, mobile, card no, AC no, address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60"
            />
          </div>

          <div className="flex gap-2">
            <Select value={selectedBooth} onValueChange={setSelectedBooth}>
              <SelectTrigger className="bg-white/10 border-white/20 text-primary-foreground">
                <SelectValue placeholder="All AC Numbers" />
              </SelectTrigger>
                <SelectContent>
                <SelectItem value="all">All AC Numbers</SelectItem>
                {Array.from(new Set(displayVoters.map(v => v.boothNo).filter(Boolean))).sort().map(acNo => (
                  <SelectItem key={acNo} value={acNo}>AC {acNo}</SelectItem>
                ))}
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
                  {/* Profile Photo */}
                  <div className="w-16 h-20 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center text-primary-foreground font-semibold">
                    {voter.name.charAt(0)}
                  </div>

                  {/* Right side of photo info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{voter.name}</h3>
                        {/* Part No / SlNoInPart */}
                        <div className="text-sm text-muted-foreground">
                          {voters.find(v => v.id === voter.id)?.part_no || ''} / {voters.find(v => v.id === voter.id)?.slnoinpart || ''}
                        </div>
                        {/* Gender / Age */}
                        <div className="text-sm text-muted-foreground">
                          {voter.gender || ''} / {voters.find(v => v.id === voter.id)?.age || ''}
                        </div>
                      </div>
                      {voter.alive && (
                        <Badge variant="default" className="bg-success text-success-foreground">
                          Active
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-1 text-sm mt-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Hash className="w-4 h-4" />
                        <span>Card No: {voter.cardNo}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>Mobile: {voter.mobile || 'Not available'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">Address: {voter.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building className="w-4 h-4" />
                        <span>Booth No: {voter.boothNo}</span>
                      </div>
                     </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {voter.caste && <Badge variant="secondary">{voter.caste}</Badge>}
                      {voter.profession && <Badge variant="secondary">{voter.profession}</Badge>}
                      {voter.education && <Badge variant="secondary">{voter.education}</Badge>}
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