import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, Calendar, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface InquiryReplyModalProps {
  inquiry: any;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (inquiryId: string, status: string) => void;
}

const InquiryReplyModal = ({ inquiry, isOpen, onClose, onStatusUpdate }: InquiryReplyModalProps) => {
  const [replyMessage, setReplyMessage] = useState("");
  const [newStatus, setNewStatus] = useState(inquiry?.status || "new");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const statusOptions = [
    { value: "new", label: "New" },
    { value: "contacted", label: "Contacted" },
    { value: "quoted", label: "Quoted" },
    { value: "booked", label: "Booked" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" }
  ];

  const handleSendReply = async () => {
    if (!replyMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reply message",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const subject = `Re: ${inquiry.event_type} Event Inquiry`;
      
      const { data, error } = await supabase.functions.invoke('send-inquiry-reply', {
        body: {
          to: inquiry.email,
          customerName: inquiry.name || `${inquiry.first_name} ${inquiry.last_name}`,
          subject: subject,
          message: replyMessage,
          inquiryDetails: {
            eventType: inquiry.event_type,
            guestCount: inquiry.guest_count,
            eventDate: inquiry.preferred_date ? new Date(inquiry.preferred_date).toLocaleDateString() : 'TBD',
            budget: inquiry.budget_range || 'Not specified',
            venue: inquiry.venue || 'Not specified',
          }
        }
      });

      if (error) throw error;

      // Update status if changed
      if (newStatus !== inquiry.status) {
        await onStatusUpdate(inquiry.id, newStatus);
      }
      
      toast({
        title: "Email sent successfully",
        description: `Reply sent to ${inquiry.first_name} ${inquiry.last_name}`,
      });
      
      setReplyMessage("");
      onClose();
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error sending email",
        description: "There was an error sending your reply. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getQuickReplyTemplate = (type: string) => {
    const templates = {
      initial: `Thank you for your interest in our catering services for your ${inquiry?.event_type}. We would love to help make your event memorable.\n\nI've reviewed your requirements for ${inquiry?.guest_count} and your vision for the event. Could we schedule a call to discuss the details and provide you with a customized quote?\n\nPlease let me know your availability for this week.`,
      quote: `Thank you for your patience. Based on your requirements for your ${inquiry?.event_type} with ${inquiry?.guest_count}, I've prepared a detailed quote.\n\nThe estimated cost for your event would be $X,XXX, which includes:\n- Menu items\n- Service staff\n- Setup and cleanup\n- All necessary equipment\n\nI'll send the detailed quote as a separate attachment. Please review and let me know if you have any questions.`,
      followup: `I wanted to follow up on the quote we sent for your ${inquiry?.event_type}. Do you have any questions about the proposal?\n\nWe're here to accommodate any adjustments needed to make your event perfect. Please don't hesitate to reach out if you'd like to discuss any modifications.`
    };
    return templates[type as keyof typeof templates] || "";
  };

  if (!inquiry) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-dark-surface border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <Mail className="w-5 h-5 text-gold" />
            Reply to {inquiry.first_name} {inquiry.last_name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Inquiry Summary */}
          <div className="bg-secondary p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-mountain-muted">Event:</span>
                <span className="text-foreground ml-2">{inquiry.event_type}</span>
              </div>
              <div>
                <span className="text-mountain-muted">Guests:</span>
                <span className="text-foreground ml-2">{inquiry.guest_count}</span>
              </div>
              {inquiry.preferred_date && (
                <div>
                  <span className="text-mountain-muted">Date:</span>
                  <span className="text-foreground ml-2">
                    {new Date(inquiry.preferred_date).toLocaleDateString()}
                  </span>
                </div>
              )}
              {inquiry.budget_range && (
                <div>
                  <span className="text-mountain-muted">Budget:</span>
                  <span className="text-foreground ml-2">{inquiry.budget_range}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Reply Templates */}
          <div>
            <Label className="text-foreground mb-2 block">Quick Templates</Label>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setReplyMessage(getQuickReplyTemplate("initial"))}
              >
                Initial Response
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setReplyMessage(getQuickReplyTemplate("quote"))}
              >
                Send Quote
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setReplyMessage(getQuickReplyTemplate("followup"))}
              >
                Follow Up
              </Button>
            </div>
          </div>

          {/* Reply Message */}
          <div>
            <Label htmlFor="reply" className="text-foreground">Reply Message</Label>
            <Textarea
              id="reply"
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your reply message..."
              className="min-h-32 bg-secondary border-border text-foreground mt-2"
            />
          </div>

          {/* Status Update */}
          <div>
            <Label className="text-foreground">Update Status</Label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger className="bg-secondary border-border text-foreground mt-2">
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

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSendReply} 
              disabled={isLoading}
              className="bg-gold hover:bg-gold/90 text-dark"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Reply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InquiryReplyModal;