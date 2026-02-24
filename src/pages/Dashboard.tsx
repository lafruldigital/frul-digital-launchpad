import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SubscriptionCard } from "@/components/dashboard/SubscriptionCard";
import { QuickAccessCard } from "@/components/dashboard/QuickAccessCard";
import { ActivityCard } from "@/components/dashboard/ActivityCard";

const Dashboard = () => {
  const { user, profile, subscribed, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    } else if (!loading && user && !subscribed) {
      navigate("/subscription");
    }
  }, [loading, user, subscribed, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-darker flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !subscribed) return null;

  return (
    <div className="min-h-screen bg-surface-darker flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-auto">
        <DashboardHeader firstName={profile?.first_name || "Client"} avatarUrl={profile?.avatar_url} />
        <main className="flex-1 p-6 md:p-10">
          <div className="grid lg:grid-cols-2 gap-6 max-w-6xl">
            <SubscriptionCard />
            <QuickAccessCard />
            <div className="lg:col-span-2">
              <ActivityCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
