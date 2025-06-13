import { Navigate } from "react-router-dom";
import { routes } from "@/routes";
import { useAuthStore } from "@/stores";
import type { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuthStore();
  console.log("AuthLayout user:");
  if (isLoading) return <div className="max-w-md mx-auto p-6">Loading...</div>;
  if (!user) return <Navigate to={routes.login} replace />;

  return <div className="max-w-md mx-auto p-6 space-y-6">{children}</div>;
};

export default AuthLayout;
