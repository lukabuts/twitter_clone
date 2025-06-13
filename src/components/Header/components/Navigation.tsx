import { useAuthStore } from "@/stores";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { user, logout, isLoading } = useAuthStore();

  if (isLoading) return <div className="animate-pulse">Loading...</div>;
  return (
    <nav className="flex items-center gap-4">
      {user ? (
        <>
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
          <button onClick={logout} className="hover:underline">
            Log Out
          </button>
        </>
      ) : (
        <>
          <Link to="/register" className="hover:underline">
            Register
          </Link>
          <Link to="/login" className="hover:underline">
            Log In
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;
