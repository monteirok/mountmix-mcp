import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Calendar, DollarSign, Mail, CheckCircle } from "lucide-react";

interface StatsProps {
  inquiries: any[];
}

const DashboardStats = ({ inquiries }: StatsProps) => {
  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter(i => i.status === 'new').length;
  const bookedEvents = inquiries.filter(i => i.status === 'booked').length;
  const completedEvents = inquiries.filter(i => i.status === 'completed').length;
  
  // Calculate this month's inquiries
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const thisMonthInquiries = inquiries.filter(i => {
    const date = new Date(i.created_at);
    return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
  }).length;

  const stats = [
    {
      title: "Total Inquiries",
      value: totalInquiries.toString(),
      icon: Mail,
      trend: "+12% from last month"
    },
    {
      title: "New Inquiries",
      value: newInquiries.toString(),
      icon: TrendingUp,
      trend: "Pending response"
    },
    {
      title: "Booked Events",
      value: bookedEvents.toString(),
      icon: Calendar,
      trend: "Active bookings"
    },
    {
      title: "Completed Events",
      value: completedEvents.toString(),
      icon: CheckCircle,
      trend: "Successfully delivered"
    },
    {
      title: "This Month",
      value: thisMonthInquiries.toString(),
      icon: Users,
      trend: "New inquiries"
    },
    {
      title: "Conversion Rate",
      value: totalInquiries > 0 ? `${Math.round((bookedEvents / totalInquiries) * 100)}%` : "0%",
      icon: DollarSign,
      trend: "Inquiry to booking"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-dark-surface border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-mountain-muted">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-mountain-muted mt-1">
              {stat.trend}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;