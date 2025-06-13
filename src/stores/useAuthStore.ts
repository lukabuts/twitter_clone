import { create } from "zustand";
import { api, navigate } from "@/lib";
import Cookies from "js-cookie";
import { z } from "zod";
import { LoginFormSchema, RegistrationFormSchema } from "@/schemas";
import { routes } from "@/routes";
import { AxiosError } from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (data: z.infer<typeof LoginFormSchema>) => Promise<void>;
  register: (data: z.infer<typeof RegistrationFormSchema>) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  clearError: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  initializeAuth: async () => {
    const token = Cookies.get("auth_token");
    if (!token) return;

    set({ isLoading: true });
    try {
      const response = await api.get("/user");

      set({
        user: response.data,
        token,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch user:", error);
      Cookies.remove("auth_token");
      set({
        user: null,
        token: null,
        isLoading: false,
      });
    }
  },
  login: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/login", {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        Cookies.set("auth_token", token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
        set({ user, token, isLoading: false });
        navigate(routes.home);
      }
    } catch (error: unknown) {
      console.error("Login error:", error);

      let errorMessage = "Login failed";
      if (error instanceof AxiosError) {
        errorMessage =
          error.response?.data?.message || error.message || "Login failed";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        Cookies.set("auth_token", token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
        set({ user, token, isLoading: false });
        navigate(routes.home);
      }
    } catch (error: unknown) {
      console.error("Registration error:", error);

      let errorMessage = "Registration failed";

      if (error instanceof AxiosError) {
        errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Registration failed";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  logout: async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Client-side cleanup
      Cookies.remove("auth_token");
      set({ user: null, token: null });
      navigate(routes.login);
    }
  },

  setUser: (user: User) => set({ user }),
  clearError: () => set({ error: null }),
}));
