import { routes } from "@/routes";
import { useAuthStore } from "@/stores";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { user, logout, isUserLoading } = useAuthStore();

  return (
    <nav className="flex items-center gap-6">
      {isUserLoading ? (
        <div className="flex gap-6">
          <div className="h-6 w-16 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="h-6 w-16 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        </div>
      ) : user ? (
        <>
          <Link
            to={routes.profile}
            className="text-sm font-medium transition-colors hover:text-primary hover:underline"
          >
            Profile
          </Link>
          <button
            onClick={logout}
            className="text-sm font-medium transition-colors hover:text-primary hover:underline"
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <Link
            to={routes.register}
            className="text-sm font-medium transition-colors hover:text-primary hover:underline"
          >
            Register
          </Link>
          <Link
            to={routes.login}
            className="text-sm font-medium transition-colors hover:text-primary hover:underline"
          >
            Log In
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;
