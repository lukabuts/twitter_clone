import { Navigate } from "react-router-dom";
import { routes } from "@/routes";
import { useAuthStore } from "@/stores";
import { type ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthStore();

  if (!user) return <Navigate to={routes.login} replace />;

  return <div className="mx-auto px-6 space-y-6">{children}</div>;
};

export default AuthLayout;
