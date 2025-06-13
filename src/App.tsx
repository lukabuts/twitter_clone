import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { AuthInitializer, Header, RouterInit } from "@/components";
import { routes } from "@/routes";
import { Login, Profile, Register } from "@/pages";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Header />
        <RouterInit />
        <AuthInitializer />

        <Routes>
          <Route path={routes.home} element={<div>Home Page</div>} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.register} element={<Register />} />
          <Route path={routes.profile} element={<Profile />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
