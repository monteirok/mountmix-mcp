import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Mail, Phone, MapPin, Users, DollarSign, Clock, Eye, LogOut, Reply, BarChart3, FileText, Archive } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import DashboardStats from "@/components/admin/DashboardStats";
import InquiryReplyModal from "@/components/admin/InquiryReplyModal";

interface Inquiry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  event_type: string;
  guest_count: string;
  preferred_date?: string;
  budget_range?: string;
  venue?: string;
  vision: string;
  wants_updates: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

const statusColors = {
  new: "bg-blue-500",
  contacted: "bg-yellow-500", 
  quoted: "bg-purple-500",
  booked: "bg-green-500",
  completed: "bg-gray-500",
  cancelled: "bg-red-500"
};

const statusOptions = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "quoted", label: "Quoted" },
  { value: "booked", label: "Booked" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" }
];

const Admin = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();
  const { signOut } = useAuth();

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching inquiries:', error);
        toast({
          title: "Error",
          description: "Failed to fetch inquiries",
          variant: "destructive",
        });
      } else {
        setInquiries(data || []);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast({
        title: "Error",
        description: "Failed to fetch inquiries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (inquiryId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status: newStatus })
        .eq('id', inquiryId);

      if (error) {
        console.error('Error updating status:', error);
        toast({
          title: "Error",
          description: "Failed to update status",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Status updated successfully",
        });
        fetchInquiries(); // Refresh the list
        // Update selected inquiry if it's the one being updated
        if (selectedInquiry?.id === inquiryId) {
          setSelectedInquiry(prev => prev ? {...prev, status: newStatus} : null);
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Filter inquiries for different tabs
  const activeInquiries = inquiries.filter(inquiry => inquiry.status !== 'cancelled');
  const cancelledInquiries = inquiries.filter(inquiry => inquiry.status === 'cancelled');
  
  const filteredActiveInquiries = statusFilter === "all" 
    ? activeInquiries 
    : activeInquiries.filter(inquiry => inquiry.status === statusFilter);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading inquiries...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-mountain-muted">
              Manage customer inquiries and bookings
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={signOut}
            className="border-border hover:bg-secondary"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-dark-surface border-border">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gold data-[state=active]:text-dark">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="data-[state=active]:bg-gold data-[state=active]:text-dark">
              <Mail className="w-4 h-4 mr-2" />
              Inquiries
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-gold data-[state=active]:text-dark">
              <Archive className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-gold data-[state=active]:text-dark">
              <FileText className="w-4 h-4 mr-2" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DashboardStats inquiries={inquiries} />
          </TabsContent>

          <TabsContent value="inquiries" className="space-y-6">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Inquiries List */}
              <div className="lg:col-span-2 space-y-4">
                <Card className="bg-dark-surface border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                       <CardTitle className="text-foreground">
                         Customer Inquiries ({filteredActiveInquiries.length})
                       </CardTitle>
                      <div className="flex items-center gap-3">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="w-40 bg-secondary border-border text-foreground">
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            {statusOptions.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button onClick={fetchInquiries} variant="outline" size="sm">
                          Refresh
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                     {filteredActiveInquiries.length === 0 ? (
                       <p className="text-mountain-muted text-center py-8">
                         {statusFilter === "all" ? "No inquiries found" : `No ${statusFilter} inquiries found`}
                       </p>
                     ) : (
                       <div className="space-y-4">
                         {filteredActiveInquiries.map((inquiry) => (
                      <Card 
                        key={inquiry.id} 
                        className={`bg-secondary border-border cursor-pointer hover:bg-secondary/80 transition-colors ${
                          selectedInquiry?.id === inquiry.id ? 'ring-2 ring-gold' : ''
                        }`}
                        onClick={() => setSelectedInquiry(inquiry)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {inquiry.first_name} {inquiry.last_name}
                              </h3>
                              <p className="text-sm text-mountain-muted">
                                {inquiry.event_type} • {inquiry.guest_count}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge 
                                className={`${statusColors[inquiry.status as keyof typeof statusColors]} text-white`}
                              >
                                {inquiry.status}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedInquiry(inquiry);
                                  setIsReplyModalOpen(true);
                                }}
                                title="Reply to inquiry"
                              >
                                <Reply className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedInquiry(inquiry);
                                }}
                                title="View details"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-mountain-muted">
                              <Mail className="w-4 h-4" />
                              {inquiry.email}
                            </div>
                            <div className="flex items-center gap-2 text-mountain-muted">
                              <Clock className="w-4 h-4" />
                              {formatDate(inquiry.created_at)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Inquiry Details */}
                <div className="space-y-4">
                  {selectedInquiry ? (
                    <Card className="bg-dark-surface border-border">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-foreground">
                            Inquiry Details
                          </CardTitle>
                          <Button
                            onClick={() => {
                              setIsReplyModalOpen(true);
                            }}
                            className="bg-gold hover:bg-gold/90 text-dark"
                            size="sm"
                          >
                            <Reply className="w-4 h-4 mr-2" />
                            Reply
                          </Button>
                        </div>
                      </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {selectedInquiry.first_name} {selectedInquiry.last_name}
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gold" />
                        <a 
                          href={`mailto:${selectedInquiry.email}`}
                          className="text-mountain-muted hover:text-gold transition-colors"
                        >
                          {selectedInquiry.email}
                        </a>
                      </div>
                      
                      {selectedInquiry.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gold" />
                          <a 
                            href={`tel:${selectedInquiry.phone}`}
                            className="text-mountain-muted hover:text-gold transition-colors"
                          >
                            {selectedInquiry.phone}
                          </a>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gold" />
                        <span className="text-mountain-muted">
                          {selectedInquiry.event_type} • {selectedInquiry.guest_count}
                        </span>
                      </div>
                      
                      {selectedInquiry.preferred_date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gold" />
                          <span className="text-mountain-muted">
                            {new Date(selectedInquiry.preferred_date).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      
                      {selectedInquiry.budget_range && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gold" />
                          <span className="text-mountain-muted">
                            {selectedInquiry.budget_range}
                          </span>
                        </div>
                      )}
                      
                      {selectedInquiry.venue && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gold" />
                          <span className="text-mountain-muted">
                            {selectedInquiry.venue}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Vision</h4>
                    <p className="text-sm text-mountain-muted bg-secondary p-3 rounded">
                      {selectedInquiry.vision}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Status</h4>
                    <Select 
                      value={selectedInquiry.status} 
                      onValueChange={(value) => updateStatus(selectedInquiry.id, value)}
                    >
                      <SelectTrigger className="bg-secondary border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-mountain-muted">
                      Submitted: {formatDate(selectedInquiry.created_at)}
                    </p>
                    <p className="text-xs text-mountain-muted">
                      Updated: {formatDate(selectedInquiry.updated_at)}
                    </p>
                    {selectedInquiry.wants_updates && (
                      <p className="text-xs text-gold mt-1">
                        ✓ Wants marketing updates
                      </p>
                    )}
                  </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="bg-dark-surface border-border">
                      <CardContent className="p-8 text-center">
                        <p className="text-mountain-muted">
                          Select an inquiry to view details
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cancelled Inquiries List */}
                <div className="lg:col-span-2 space-y-4">
                  <Card className="bg-dark-surface border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">
                        Cancelled Inquiries ({cancelledInquiries.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {cancelledInquiries.length === 0 ? (
                        <p className="text-mountain-muted text-center py-8">
                          No cancelled inquiries found
                        </p>
                      ) : (
                        <div className="space-y-4">
                          {cancelledInquiries.map((inquiry) => (
                            <Card 
                              key={inquiry.id} 
                              className={`bg-secondary border-border cursor-pointer hover:bg-secondary/80 transition-colors ${
                                selectedInquiry?.id === inquiry.id ? 'ring-2 ring-gold' : ''
                              }`}
                              onClick={() => setSelectedInquiry(inquiry)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <h3 className="font-semibold text-foreground">
                                      {inquiry.first_name} {inquiry.last_name}
                                    </h3>
                                    <p className="text-sm text-mountain-muted">
                                      {inquiry.event_type} • {inquiry.guest_count}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge 
                                      className={`${statusColors[inquiry.status as keyof typeof statusColors]} text-white`}
                                    >
                                      {inquiry.status}
                                    </Badge>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedInquiry(inquiry);
                                      }}
                                      title="View details"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div className="flex items-center gap-2 text-mountain-muted">
                                    <Mail className="w-4 h-4" />
                                    {inquiry.email}
                                  </div>
                                  <div className="flex items-center gap-2 text-mountain-muted">
                                    <Clock className="w-4 h-4" />
                                    {formatDate(inquiry.created_at)}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Inquiry Details - Same as in inquiries tab */}
                <div className="space-y-4">
                  {selectedInquiry ? (
                    <Card className="bg-dark-surface border-border">
                      <CardHeader>
                        <CardTitle className="text-foreground">
                          Inquiry Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">
                            {selectedInquiry.first_name} {selectedInquiry.last_name}
                          </h3>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gold" />
                              <a 
                                href={`mailto:${selectedInquiry.email}`}
                                className="text-mountain-muted hover:text-gold transition-colors"
                              >
                                {selectedInquiry.email}
                              </a>
                            </div>
                            
                            {selectedInquiry.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gold" />
                                <a 
                                  href={`tel:${selectedInquiry.phone}`}
                                  className="text-mountain-muted hover:text-gold transition-colors"
                                >
                                  {selectedInquiry.phone}
                                </a>
                              </div>
                            )}
                            
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gold" />
                              <span className="text-mountain-muted">
                                {selectedInquiry.event_type} • {selectedInquiry.guest_count}
                              </span>
                            </div>
                            
                            {selectedInquiry.preferred_date && (
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gold" />
                                <span className="text-mountain-muted">
                                  {new Date(selectedInquiry.preferred_date).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                            
                            {selectedInquiry.budget_range && (
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-gold" />
                                <span className="text-mountain-muted">
                                  {selectedInquiry.budget_range}
                                </span>
                              </div>
                            )}
                            
                            {selectedInquiry.venue && (
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gold" />
                                <span className="text-mountain-muted">
                                  {selectedInquiry.venue}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Vision</h4>
                          <p className="text-sm text-mountain-muted bg-secondary p-3 rounded">
                            {selectedInquiry.vision}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Status</h4>
                          <Badge className={`${statusColors[selectedInquiry.status as keyof typeof statusColors]} text-white`}>
                            {selectedInquiry.status}
                          </Badge>
                        </div>
                        
                        <div className="pt-4 border-t border-border">
                          <p className="text-xs text-mountain-muted">
                            Submitted: {formatDate(selectedInquiry.created_at)}
                          </p>
                          <p className="text-xs text-mountain-muted">
                            Updated: {formatDate(selectedInquiry.updated_at)}
                          </p>
                          {selectedInquiry.wants_updates && (
                            <p className="text-xs text-gold mt-1">
                              ✓ Wants marketing updates
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="bg-dark-surface border-border">
                      <CardContent className="p-8 text-center">
                        <p className="text-mountain-muted">
                          Select an inquiry to view details
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-dark-surface border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Inquiry Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {statusOptions.map((status) => {
                        const count = inquiries.filter(i => i.status === status.value).length;
                        const percentage = inquiries.length > 0 ? (count / inquiries.length * 100).toFixed(1) : 0;
                        return (
                          <div key={status.value} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${statusColors[status.value as keyof typeof statusColors]}`}></div>
                              <span className="text-foreground">{status.label}</span>
                            </div>
                            <div className="text-mountain-muted">
                              {count} ({percentage}%)
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-dark-surface border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {inquiries.slice(0, 5).map((inquiry) => (
                        <div key={inquiry.id} className="flex items-center justify-between text-sm">
                          <div>
                            <span className="text-foreground">{inquiry.first_name} {inquiry.last_name}</span>
                            <p className="text-mountain-muted">{inquiry.event_type}</p>
                          </div>
                          <Badge className={`${statusColors[inquiry.status as keyof typeof statusColors]} text-white`}>
                            {inquiry.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Reply Modal */}
          <InquiryReplyModal
            inquiry={selectedInquiry}
            isOpen={isReplyModalOpen}
            onClose={() => setIsReplyModalOpen(false)}
            onStatusUpdate={updateStatus}
          />
        </div>
      </div>
    );
};

export default Admin;