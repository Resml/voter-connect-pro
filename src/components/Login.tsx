import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Vote, Shield, Users } from 'lucide-react';

interface LoginProps {
  onLogin: (userData: { name: string; mobile: string; email?: string }) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [formData, setFormData] = useState({
    activationKey: '',
    name: '',
    mobile: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple activation key validation (demo)
    if (formData.activationKey !== 'VOTE2024' && formData.activationKey !== 'ADMIN123') {
      toast({
        title: "Invalid Activation Key",
        description: "Please enter a valid activation key to access the system.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.name || !formData.mobile) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Store user data and login
    onLogin({
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email
    });

    toast({
      title: "Login Successful",
      description: `Welcome, ${formData.name}!`,
      variant: "default"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary-glow rounded-full mb-4 shadow-medium">
            <Vote className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Voter Management</h1>
          <p className="text-muted-foreground">Secure electoral data access system</p>
        </div>

        {/* Login Card */}
        <Card className="card-elevated p-6 border-border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="activationKey" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Activation Key *
              </Label>
              <Input
                id="activationKey"
                type="password"
                placeholder="Enter activation key"
                value={formData.activationKey}
                onChange={(e) => setFormData({ ...formData, activationKey: e.target.value })}
                className="bg-input"
                required
              />
              <p className="text-xs text-muted-foreground">Demo: Use VOTE2024 or ADMIN123</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-input"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number *</Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="bg-input"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-input"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full btn-dashboard h-12 text-lg font-semibold"
            >
              Access System
            </Button>
          </form>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>Secure • Reliable • Efficient</p>
        </div>
      </div>
    </div>
  );
};

export default Login;