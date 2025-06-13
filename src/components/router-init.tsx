import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setRouterNavigate } from "@/lib/router";

export const RouterInit = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setRouterNavigate(navigate);
  }, [navigate]);

  return null;
};
