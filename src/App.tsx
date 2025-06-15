import { routes } from "@/routes";
import { Login, Profile, Register, Home, Tweet } from "@/pages";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect } from "react";
import { useAuthStore } from "@/stores";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Outlet,
} from "react-router-dom";
import {
  AuthLayout,
  GuestLayout,
  Header,
  Loading,
  RouterInit,
} from "@/components";

function App() {
  const { initializeAuth, isUserLoading } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Header />
        <RouterInit />
        <Routes>
          {/* Public routes render immediately */}
          <Route
            element={
              <GuestLayout>
                <Outlet />
              </GuestLayout>
            }
          >
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Register />} />
          </Route>

          {/* Protected routes wait for auth */}
          {isUserLoading ? (
            <Route path="*" element={<Loading />} />
          ) : (
            <Route
              element={
                <AuthLayout>
                  <Outlet />
                </AuthLayout>
              }
            >
              <Route path={routes.profile} element={<Profile />} />
              <Route path={routes.home} element={<Home />} />
            </Route>
          )}

          {/* Other Routes */}
          <Route path="/tweets/:slug" element={<Tweet />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
