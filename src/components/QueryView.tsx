import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, HelpCircle, Send, MessageSquare, Bug,
  Lightbulb, AlertTriangle, CheckCircle, Clock, User
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

interface QueryViewProps {
  onBack: () => void;
}

const QueryView = ({ onBack }: QueryViewProps) => {
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState<'submit' | 'list'>('submit');
  
  // Query form state
  const [queryData, setQueryData] = useState({
    title: '',
    category: '',
    priority: '',
    description: '',
    userEmail: ''
  });

  // Mock queries data
  const queries = [
    {
      id: 1,
      title: 'Excel Import Issue',
      category: 'Bug',
      priority: 'High',
      status: 'In Progress',
      description: 'Having trouble importing Excel files with special characters',
      submittedBy: 'राज कुमार',
      submittedAt: '2 hours ago',
      response: 'We are working on this issue and will fix it in the next update.'
    },
    {
      id: 2,
      title: 'Add Bulk SMS Feature',
      category: 'Feature Request',
      priority: 'Medium',
      status: 'Under Review',
      description: 'Need ability to send SMS to multiple voters at once',
      submittedBy: 'सुनीता देवी',
      submittedAt: '1 day ago',
      response: null
    },
    {
      id: 3,
      title: 'Performance Improvement',
      category: 'Enhancement',
      priority: 'Low',
      status: 'Completed',
      description: 'App is slow when loading large voter lists',
      submittedBy: 'अमित शर्मा',
      submittedAt: '3 days ago',
      response: 'Performance has been optimized in version 1.2. Please update your app.'
    }
  ];

  const handleSubmit = () => {
    if (!queryData.title || !queryData.category || !queryData.description) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // In real app, send to server
    toast({
      title: "Query Submitted",
      description: "Your query has been submitted successfully. We'll get back to you soon.",
    });
    
    setQueryData({
      title: '',
      category: '',
      priority: '',
      description: '',
      userEmail: ''
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'In Progress':
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <MessageSquare className="w-4 h-4 text-primary" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-success text-success-foreground';
      case 'In Progress':
        return 'bg-warning text-warning-foreground';
      case 'Under Review':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-destructive text-destructive-foreground';
      case 'Medium':
        return 'bg-warning text-warning-foreground';
      case 'Low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
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
          <h1 className="text-lg font-semibold">Query & Support</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2">
          <Button
            variant={activeView === 'submit' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('submit')}
            className={activeView === 'submit' ? 'bg-white/20 text-primary-foreground' : 'text-primary-foreground hover:bg-white/10'}
          >
            Submit Query
          </Button>
          <Button
            variant={activeView === 'list' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('list')}
            className={activeView === 'list' ? 'bg-white/20 text-primary-foreground' : 'text-primary-foreground hover:bg-white/10'}
          >
            My Queries
          </Button>
        </div>
      </div>

      <div className="p-4">
        {activeView === 'submit' ? (
          <Card className="card-elevated p-6 border-border">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Submit New Query</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Query Title *
                </label>
                <Input
                  value={queryData.title}
                  onChange={(e) => setQueryData({...queryData, title: e.target.value})}
                  placeholder="Brief description of your issue or request"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Category *
                  </label>
                  <Select 
                    value={queryData.category} 
                    onValueChange={(value) => setQueryData({...queryData, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bug">
                        <div className="flex items-center gap-2">
                          <Bug className="w-4 h-4" />
                          Bug Report
                        </div>
                      </SelectItem>
                      <SelectItem value="feature">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" />
                          Feature Request
                        </div>
                      </SelectItem>
                      <SelectItem value="enhancement">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Enhancement
                        </div>
                      </SelectItem>
                      <SelectItem value="support">
                        <div className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4" />
                          General Support
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Priority
                  </label>
                  <Select 
                    value={queryData.priority} 
                    onValueChange={(value) => setQueryData({...queryData, priority: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Email (Optional)
                </label>
                <Input
                  type="email"
                  value={queryData.userEmail}
                  onChange={(e) => setQueryData({...queryData, userEmail: e.target.value})}
                  placeholder="Your email for updates"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Detailed Description *
                </label>
                <Textarea
                  value={queryData.description}
                  onChange={(e) => setQueryData({...queryData, description: e.target.value})}
                  placeholder="Please provide detailed information about your issue or request..."
                  rows={6}
                />
              </div>

              <Button onClick={handleSubmit} className="w-full btn-dashboard">
                <Send className="w-4 h-4 mr-2" />
                Submit Query
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your Submitted Queries</h3>
              <Badge variant="secondary">{queries.length} Total</Badge>
            </div>

            {queries.map((query) => (
              <Card key={query.id} className="card-elevated p-6 border-border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-foreground">{query.title}</h4>
                      <Badge className={getStatusColor(query.status)}>
                        {getStatusIcon(query.status)}
                        <span className="ml-1">{query.status}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{query.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {query.submittedBy}
                      </div>
                      <div>{query.submittedAt}</div>
                      <Badge variant="outline" className={getPriorityColor(query.priority)}>
                        {query.priority}
                      </Badge>
                      <Badge variant="outline">
                        {query.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                {query.response && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="text-sm font-medium text-foreground mb-1">Response:</div>
                    <div className="text-sm text-muted-foreground">{query.response}</div>
                  </div>
                )}
              </Card>
            ))}

            {queries.length === 0 && (
              <Card className="card-elevated p-12 text-center border-border">
                <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Queries Found</h3>
                <p className="text-muted-foreground mb-4">You haven't submitted any queries yet</p>
                <Button onClick={() => setActiveView('submit')} className="btn-dashboard">
                  Submit Your First Query
                </Button>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryView;