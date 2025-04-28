
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, TicketIcon, Users, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock data for the resident dashboard
const recentTickets = [
  {
    id: "T1001",
    title: "Water leak in bathroom",
    status: "in-progress",
    createdAt: new Date("2023-05-10"),
    priority: "high"
  },
  {
    id: "T1002",
    title: "Broken street light",
    status: "pending",
    createdAt: new Date("2023-05-12"),
    priority: "medium"
  },
  {
    id: "T1003",
    title: "Garbage not collected",
    status: "completed",
    createdAt: new Date("2023-05-08"),
    priority: "low"
  }
];

const upcomingEvents = [
  {
    id: "E1001",
    title: "Summer Block Party",
    date: new Date("2023-06-15T18:00:00"),
    location: "Main Park"
  },
  {
    id: "E1002",
    title: "Neighborhood Watch Meeting",
    date: new Date("2023-05-25T19:00:00"),
    location: "Community Center"
  }
];

const recommendedProviders = [
  {
    id: "P1001",
    name: "John's Plumbing",
    category: "plumber",
    rating: 4.8
  },
  {
    id: "P1002",
    name: "Elite Electrical",
    category: "electrician",
    rating: 4.5
  }
];

export default function ResidentDashboard() {
  // Helper function to format dates
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Resident Dashboard</h2>
        <p className="text-muted-foreground">
          Stay updated with your community activities and service requests.
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Button className="h-auto py-4 flex flex-col items-center justify-center gap-2">
          <TicketIcon className="h-6 w-6" />
          <span>Submit New Ticket</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
          <Users className="h-6 w-6" />
          <span>Find Service Provider</span>
        </Button>
        <Button variant="secondary" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
          <Calendar className="h-6 w-6" />
          <span>View Community Calendar</span>
        </Button>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent tickets */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Recent Tickets</CardTitle>
              <CardDescription>
                Your service requests and their status
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex flex-col space-y-2 rounded-lg border p-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-semibold">{ticket.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>ID: {ticket.id}</span>
                        <span>•</span>
                        <span>{formatDate(ticket.createdAt)}</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`status-badge status-badge-${ticket.status}`}
                    >
                      {ticket.status.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming events */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                Community events happening soon
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col space-y-2 rounded-lg border p-3"
                >
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold">{event.title}</h4>
                      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {event.date.toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Maybe
                    </Button>
                    <Button size="sm">RSVP</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended service providers */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Recommended Providers</CardTitle>
              <CardDescription>
                Top-rated service providers
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="space-y-1">
                    <h4 className="font-semibold">{provider.name}</h4>
                    <p className="text-xs capitalize text-muted-foreground">
                      {provider.category}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center">
                      <span className="mr-1 text-sm font-medium">
                        {provider.rating}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 text-amber-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <Button size="sm" variant="outline">
                      Book
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community stats */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Community Stats</CardTitle>
            <CardDescription>
              Current status and activity in your neighborhood
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Current Ticket Resolution
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">High Priority</span>
                    <span className="text-xs font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Medium Priority</span>
                    <span className="text-xs font-medium">62%</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Low Priority</span>
                    <span className="text-xs font-medium">38%</span>
                  </div>
                  <Progress value={38} className="h-2" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Upcoming Events Attendance
                </h4>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Summer Block Party</span>
                    <span className="text-xs font-medium">65/100</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Neighborhood Watch</span>
                    <span className="text-xs font-medium">32/50</span>
                  </div>
                  <Progress value={64} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Community Cleanup</span>
                    <span className="text-xs font-medium">18/40</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </div>
              
              <div className="flex flex-col justify-center gap-1 rounded-lg bg-muted p-4 text-center">
                <h4 className="text-lg font-semibold">Next Community Meeting</h4>
                <p className="text-muted-foreground">June 5, 2023 • 7:00 PM</p>
                <p className="text-muted-foreground">Community Center</p>
                <Button variant="outline" className="mt-2">
                  Add to Calendar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
