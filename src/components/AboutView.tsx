import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, Info, Users, Shield, Globe, Heart,
  Mail, Phone, MapPin, ExternalLink, Star
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AboutViewProps {
  onBack: () => void;
}

const AboutView = ({ onBack }: AboutViewProps) => {
  const { t } = useLanguage();

  const features = [
    {
      title: 'Secure Authentication',
      description: 'Advanced activation key system with user management',
      icon: Shield
    },
    {
      title: 'Comprehensive Reports',
      description: 'Multiple search and filtering options for voter data',
      icon: Info
    },
    {
      title: 'Survey Management',
      description: 'Complete survey creation and management system',
      icon: Users
    },
    {
      title: 'Multi-language Support',
      description: 'Available in English and Marathi languages',
      icon: Globe
    }
  ];

  const team = [
    {
      name: 'Development Team',
      role: 'Core Development',
      description: 'Frontend & Backend Development'
    },
    {
      name: 'Design Team',
      role: 'UI/UX Design',
      description: 'User Interface & Experience'
    },
    {
      name: 'Support Team',
      role: 'Customer Support',
      description: 'User Assistance & Training'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
          <h1 className="text-lg font-semibold">About Us</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* App Info */}
        <Card className="card-elevated p-6 border-border text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-4">
            VMS
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Voter Management System</h2>
          <p className="text-muted-foreground mb-4">
            A comprehensive electoral data management application designed for efficient voter information handling and campaign management.
          </p>
          <div className="flex justify-center gap-2 mb-4">
            <Badge variant="secondary">Version 1.0</Badge>
            <Badge variant="outline">Production Ready</Badge>
          </div>
          <div className="flex justify-center items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="ml-2 text-sm text-muted-foreground">5.0 Rating</span>
          </div>
        </Card>

        {/* Features */}
        <Card className="card-elevated p-6 border-border">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-destructive" />
            Key Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{feature.title}</div>
                    <div className="text-sm text-muted-foreground">{feature.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Technology Stack */}
        <Card className="card-elevated p-6 border-border">
          <h3 className="text-lg font-semibold mb-4">Technology Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="font-medium text-foreground">React</div>
              <div className="text-xs text-muted-foreground">Frontend</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="font-medium text-foreground">TypeScript</div>
              <div className="text-xs text-muted-foreground">Language</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="font-medium text-foreground">Tailwind CSS</div>
              <div className="text-xs text-muted-foreground">Styling</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="font-medium text-foreground">Supabase</div>
              <div className="text-xs text-muted-foreground">Backend</div>
            </div>
          </div>
        </Card>

        {/* Team */}
        <Card className="card-elevated p-6 border-border">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Our Team
          </h3>
          <div className="space-y-3">
            {team.map((member, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-foreground">{member.name}</div>
                  <div className="text-sm text-muted-foreground">{member.role}</div>
                  <div className="text-xs text-muted-foreground">{member.description}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="card-elevated p-6 border-border">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium text-foreground">Email Support</div>
                <div className="text-sm text-muted-foreground">support@votermgmt.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium text-foreground">Phone Support</div>
                <div className="text-sm text-muted-foreground">+91 98765 43210</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium text-foreground">Office Address</div>
                <div className="text-sm text-muted-foreground">
                  123 Political Plaza, Democracy Street, Mumbai, Maharashtra, India
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Legal & Privacy */}
        <Card className="card-elevated p-6 border-border">
          <h3 className="text-lg font-semibold mb-4">Legal & Privacy</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Privacy Policy</div>
                <div className="text-xs text-muted-foreground">Data protection & usage</div>
              </div>
              <ExternalLink className="w-4 h-4 ml-auto" />
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Terms of Service</div>
                <div className="text-xs text-muted-foreground">Usage terms & conditions</div>
              </div>
              <ExternalLink className="w-4 h-4 ml-auto" />
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">License</div>
                <div className="text-xs text-muted-foreground">Software license info</div>
              </div>
              <ExternalLink className="w-4 h-4 ml-auto" />
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center py-4 text-sm text-muted-foreground">
          <p>© 2024 Voter Management System. All rights reserved.</p>
          <p className="mt-1">Built with ❤️ for democratic processes</p>
        </div>
      </div>
    </div>
  );
};

export default AboutView;