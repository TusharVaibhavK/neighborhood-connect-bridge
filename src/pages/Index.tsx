
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import ResidentDashboard from "./dashboards/ResidentDashboard";
import LeaderDashboard from "./dashboards/LeaderDashboard";
import ProviderDashboard from "./dashboards/ProviderDashboard";

export default function Index() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const renderDashboardByRole = () => {
    if (!user) return null;

    switch (user.role) {
      case "resident":
        return <ResidentDashboard />;
      case "leader":
        return <LeaderDashboard />;
      case "service-provider":
        return <ProviderDashboard />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-4">Welcome to Community Connect!</h2>
            <p className="text-muted-foreground mb-8">
              Please complete your profile to access your dashboard.
            </p>
            <Button onClick={() => navigate("/profile")}>
              Complete Profile
            </Button>
          </div>
        );
    }
  };

  return (
    <DashboardLayout title={user ? `Welcome, ${user.name}` : "Welcome"}>
      {renderDashboardByRole()}
    </DashboardLayout>
  );
}
