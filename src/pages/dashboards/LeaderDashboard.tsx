
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { ArrowUpIcon, ArrowDownIcon, CalendarIcon, CheckIcon, ClockIcon, Users } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

// Mock data
const ticketData = [
  { month: "Jan", open: 12, resolved: 10, cancelled: 2 },
  { month: "Feb", open: 18, resolved: 15, cancelled: 1 },
  { month: "Mar", open: 15, resolved: 12, cancelled: 2 },
  { month: "Apr", open: 20, resolved: 18, cancelled: 1 },
  { month: "May", open: 25, resolved: 20, cancelled: 3 }
];

const financialData = [
  { month: "Jan", revenue: 2500, expenses: 2000 },
  { month: "Feb", revenue: 3200, expenses: 2400 },
  { month: "Mar", revenue: 3100, expenses: 2300 },
  { month: "Apr", revenue: 3800, expenses: 2700 },
  { month: "May", revenue: 4200, expenses: 3000 }
];

const pendingTickets = [
  {
    id: "T2001",
    title: "Pool maintenance needed",
    priority: "medium",
    createdBy: "Alex Johnson",
    createdAt: new Date("2023-05-08")
  },
  {
    id: "T2002",
    title: "Security gate malfunction",
    priority: "high",
    createdBy: "Maria Garcia",
    createdAt: new Date("2023-05-10")
  },
  {
    id: "T2003",
    title: "Fallen tree on sidewalk",
    priority: "urgent",
    createdBy: "John Smith",
    createdAt: new Date("2023-05-12")
  }
];

const upcomingEvents = [
  {
    id: "E2001",
    title: "Summer Block Party",
    date: new Date("2023-06-15"),
    attendees: 65,
    capacity: 100,
    status: "approved"
  },
  {
    id: "E2002",
    title: "Neighborhood Watch Meeting",
    date: new Date("2023-05-25"),
    attendees: 32,
    capacity: 50,
    status: "pending"
  },
  {
    id: "E2003",
    title: "Community Cleanup",
    date: new Date("2023-06-03"),
    attendees: 18,
    capacity: 40,
    status: "approved"
  }
];

export default function LeaderDashboard() {
  const { user, isLeaderWithRole } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Helper function to format dates
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Leader Dashboard</h2>
        <p className="text-muted-foreground">
          Manage your community, view reports, and handle tickets and events.
        </p>
      </div>

      {/* Role-specific tabs */}
      <Tabs defaultValue="overview" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tickets" disabled={!isLeaderWithRole("president")}>
            Ticket Management
          </TabsTrigger>
          <TabsTrigger value="finances" disabled={!isLeaderWithRole("treasurer")}>
            Finances
          </TabsTrigger>
          <TabsTrigger value="events" disabled={!isLeaderWithRole("event-coordinator")}>
            Events
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Stats Cards */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Open Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">24</div>
                  <div className="flex items-center text-xs text-green-500">
                    <ArrowDownIcon className="mr-1 h-4 w-4" />
                    12% from last month
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  8 high priority, 10 medium, 6 low
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Budget
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">$12,450</div>
                  <div className="flex items-center text-xs text-green-500">
                    <ArrowUpIcon className="mr-1 h-4 w-4" />
                    5% from last month
                  </div>
                </div>
                <Progress value={75} className="mt-2 h-2" />
                <p className="mt-1 text-xs text-muted-foreground">
                  75% of monthly allocation
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Community Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">67%</div>
                  <div className="flex items-center text-xs text-green-500">
                    <ArrowUpIcon className="mr-1 h-4 w-4" />
                    8% from last month
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Based on event attendance and ticket submission
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Ticket Analytics</CardTitle>
                <CardDescription>
                  Monthly ticket submission and resolution
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ticketData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="open" fill="#3b82f6" name="Open" />
                    <Bar dataKey="resolved" fill="#22c55e" name="Resolved" />
                    <Bar dataKey="cancelled" fill="#ef4444" name="Cancelled" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>
                  Revenue vs. expenses over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={financialData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, ""]} />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Revenue" />
                    <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="Expenses" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest tickets, events and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* Pending Tickets */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" />
                      Pending Tickets
                    </h4>
                    {pendingTickets.slice(0, 2).map((ticket) => (
                      <div key={ticket.id} className="flex items-start justify-between rounded-lg border p-3">
                        <div className="space-y-1">
                          <h5 className="font-medium">{ticket.title}</h5>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Badge variant="outline" className="mr-2">
                              {ticket.priority}
                            </Badge>
                            <span>{formatDate(ticket.createdAt)}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Assign
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Upcoming Events */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      Upcoming Events
                    </h4>
                    {upcomingEvents.slice(0, 2).map((event) => (
                      <div key={event.id} className="flex items-start justify-between rounded-lg border p-3">
                        <div className="space-y-1">
                          <h5 className="font-medium">{event.title}</h5>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{formatDate(event.date)}</span>
                            <span className="mx-2">•</span>
                            <span>{event.attendees}/{event.capacity}</span>
                          </div>
                        </div>
                        <Badge variant={event.status === "approved" ? "default" : "outline"}>
                          {event.status}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  {/* Community Stats */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Community Stats
                    </h4>
                    <div className="rounded-lg border p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Active Members</span>
                          <span className="text-sm font-medium">156/200</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Verified Providers</span>
                          <span className="text-sm font-medium">24/30</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ticket Management Tab */}
        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Ticket Management</CardTitle>
                <CardDescription>
                  Assign, prioritize, and resolve community service requests
                </CardDescription>
              </div>
              <Button>Create Ticket</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {pendingTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex flex-col justify-between space-y-2 rounded-lg border p-4"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Badge variant="outline">{ticket.priority}</Badge>
                          <span className="text-xs text-muted-foreground">{ticket.id}</span>
                        </div>
                        <h4 className="font-semibold">{ticket.title}</h4>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>Created by: {ticket.createdBy}</span>
                          <span className="mx-1">•</span>
                          <span>{formatDate(ticket.createdAt)}</span>
                        </div>
                      </div>
                      <div className="flex justify-between gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Details
                        </Button>
                        <Button size="sm" className="flex-1">
                          Assign
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Finances Tab */}
        <TabsContent value="finances" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>
                  Manage community dues, expenses and budgets
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Download Report</Button>
                <Button>Add Transaction</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Balance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$45,231.89</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Last updated: May 15, 2023
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Monthly Revenue
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$4,395.00</div>
                      <div className="flex items-center text-xs text-green-500 mt-1">
                        <ArrowUpIcon className="mr-1 h-4 w-4" />
                        12% from last month
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Monthly Expenses
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$3,240.15</div>
                      <div className="flex items-center text-xs text-destructive mt-1">
                        <ArrowUpIcon className="mr-1 h-4 w-4" />
                        8% from last month
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={financialData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, ""]} />
                      <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Revenue" />
                      <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="Expenses" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Event Management</CardTitle>
                <CardDescription>
                  Create, manage and track community events
                </CardDescription>
              </div>
              <Button>Create Event</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex flex-col justify-between space-y-4 rounded-lg border p-4"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Badge variant={event.status === "approved" ? "default" : "outline"}>
                            {event.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{event.id}</span>
                        </div>
                        <h4 className="font-semibold">{event.title}</h4>
                        <div className="flex items-center text-sm">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>Attendance</span>
                            <span>{event.attendees}/{event.capacity}</span>
                          </div>
                          <Progress
                            value={(event.attendees / event.capacity) * 100}
                            className="h-1"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Details
                        </Button>
                        <Button size="sm" className="flex-1">
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
