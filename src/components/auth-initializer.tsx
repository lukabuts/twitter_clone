import { useEffect } from "react";
import { useAuthStore } from "@/stores";

export const AuthInitializer = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return null;
};
