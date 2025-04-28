
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, CheckIcon, ClockIcon, Calendar as CalendarIcon } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

// Mock data for the service provider dashboard
const assignedTickets = [
  {
    id: "T3001",
    title: "Fix kitchen sink",
    address: "123 Elm Street",
    priority: "high",
    scheduledFor: new Date("2023-05-18T14:00:00"),
    status: "assigned"
  },
  {
    id: "T3002",
    title: "Leaking bathroom pipe",
    address: "456 Oak Avenue",
    priority: "medium",
    scheduledFor: new Date("2023-05-19T10:00:00"),
    status: "in-progress"
  },
  {
    id: "T3003",
    title: "Replace toilet",
    address: "789 Pine Road",
    priority: "low",
    scheduledFor: new Date("2023-05-20T11:00:00"),
    status: "in-progress"
  }
];

const bookingRequests = [
  {
    id: "B3001",
    customerName: "Jane Smith",
    serviceType: "Plumbing",
    requestedDate: new Date("2023-05-22T15:00:00"),
    description: "Need to fix a leaky faucet"
  },
  {
    id: "B3002",
    customerName: "Mike Johnson",
    serviceType: "Plumbing",
    requestedDate: new Date("2023-05-23T09:00:00"),
    description: "Clogged drain needs unclogging"
  }
];

const completedJobs = [
  {
    id: "T2995",
    title: "Fixed water heater",
    address: "101 Maple Drive",
    completedOn: new Date("2023-05-10"),
    rating: 5,
    payment: 120
  },
  {
    id: "T2996",
    title: "Unclogged bathroom drain",
    address: "202 Cedar Lane",
    completedOn: new Date("2023-05-08"),
    rating: 4.5,
    payment: 80
  },
  {
    id: "T2997",
    title: "Replaced kitchen faucet",
    address: "303 Birch Court",
    completedOn: new Date("2023-05-05"),
    rating: 5,
    payment: 150
  }
];

export default function ProviderDashboard() {
  const { user } = useAuth();

  // Helper function to format dates
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  };

  // Helper function to format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit"
    });
  };

  // Calculate earnings
  const totalEarnings = completedJobs.reduce((sum, job) => sum + job.payment, 0);
  const avgRating = completedJobs.reduce((sum, job) => sum + job.rating, 0) / completedJobs.length;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Service Provider Dashboard</h2>
        <p className="text-muted-foreground">
          Manage your jobs, schedule, and track your performance.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Assigned Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignedTickets.length}</div>
            <div className="mt-1 text-xs text-muted-foreground">
              {assignedTickets.filter(t => t.status === "assigned").length} new,{" "}
              {assignedTickets.filter(t => t.status === "in-progress").length} in progress
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              This Month's Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings}</div>
            <div className="mt-1 text-xs text-muted-foreground">
              From {completedJobs.length} completed jobs
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">{avgRating.toFixed(1)}</span>
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`h-4 w-4 ${
                      i < Math.floor(avgRating) ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Based on {completedJobs.length} ratings
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Assigned Tickets */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Assigned Tickets</CardTitle>
              <CardDescription>
                Your current service requests
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignedTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex flex-col space-y-2 rounded-lg border p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{ticket.title}</h4>
                        <Badge
                          variant="outline"
                          className={`status-badge-${ticket.status}`}
                        >
                          {ticket.status.replace("-", " ")}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {ticket.address}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>ID: {ticket.id}</span>
                        <span>•</span>
                        <Badge variant="outline" className="ml-1">
                          {ticket.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center text-xs">
                        <CalendarIcon className="mr-1 h-3 w-3" />
                        <span>
                          {formatDate(ticket.scheduledFor)}{" "}
                          {formatTime(ticket.scheduledFor)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    {ticket.status === "assigned" ? (
                      <Button size="sm">Start Job</Button>
                    ) : (
                      <Button size="sm">Complete Job</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Booking Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Booking Requests</CardTitle>
              <CardDescription>
                New service requests
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookingRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-col space-y-2 rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{request.customerName}</h4>
                      <Badge variant="outline">{request.serviceType}</Badge>
                    </div>
                    <p className="text-sm">{request.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <ClockIcon className="mr-1 h-3 w-3" />
                      <span>
                        {formatDate(request.requestedDate)}{" "}
                        {formatTime(request.requestedDate)}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Decline
                    </Button>
                    <Button size="sm">Accept</Button>
                  </div>
                </div>
              ))}
              {bookingRequests.length === 0 && (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                  <h5 className="mt-2 font-medium">No booking requests</h5>
                  <p className="text-sm text-muted-foreground">
                    You'll see new requests here when residents book your services
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Schedule */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
            <CardDescription>
              Your upcoming appointments for this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-7 border-b">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div
                    key={day}
                    className="border-r p-2 text-center text-sm font-medium last:border-r-0"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid h-48 grid-cols-7">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-r p-2 last:border-r-0"
                  >
                    {i === 2 && (
                      <div className="rounded bg-primary/10 p-1 text-xs">
                        <div className="font-medium">9:00 AM - Kitchen sink</div>
                        <div className="text-muted-foreground">123 Elm St</div>
                      </div>
                    )}
                    {i === 3 && (
                      <div className="rounded bg-primary/10 p-1 text-xs">
                        <div className="font-medium">2:00 PM - Bathroom pipe</div>
                        <div className="text-muted-foreground">456 Oak Ave</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Completed Jobs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Recent Completions</CardTitle>
              <CardDescription>
                Your recently completed jobs
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex justify-between rounded-lg border p-3"
                >
                  <div className="space-y-1">
                    <h4 className="font-medium">{job.title}</h4>
                    <div className="text-xs text-muted-foreground">
                      <span>{formatDate(job.completedOn)}</span>
                      <span className="mx-1">•</span>
                      <span>${job.payment}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-amber-500">
                    <span className="mr-1 text-xs font-medium">
                      {job.rating}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-3 w-3"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>
            Your service quality and efficiency metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Response Time</h4>
              <Progress value={85} className="h-2" />
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Average: 1.2 hours</span>
                <span className="font-medium">Excellent</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Completion Rate</h4>
              <Progress value={95} className="h-2" />
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">19 of 20 jobs</span>
                <span className="font-medium">95%</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">On-time Arrival</h4>
              <Progress value={90} className="h-2" />
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">18 of 20 jobs</span>
                <span className="font-medium">90%</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Customer Satisfaction</h4>
              <Progress value={92} className="h-2" />
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Based on ratings</span>
                <span className="font-medium">4.6/5</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
