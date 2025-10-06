import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading, isAdmin, adminLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ProtectedRoute:", { user: !!user, loading, isAdmin, adminLoading });
    if (!loading && !adminLoading) {
      if (!user) {
        console.log("No user, redirecting to /auth");
        navigate("/auth");
      } else if (!isAdmin) {
        console.log("User exists but not admin, redirecting to /");
        navigate("/");
      } else {
        console.log("User is admin, allowing access");
      }
    }
  }, [user, loading, isAdmin, adminLoading, navigate]);

  if (loading || adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;