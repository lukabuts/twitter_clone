import { Link } from "react-router-dom";
import { routes } from "@/routes";
import { ModeToggle, Navigation } from "./components";

const Header = () => {
  return (
    <header className="w-full p-4 border-b sticky top-0 z-50 backdrop-blur-2xl">
      <div className="flex items-center justify-between max-w-2xl mx-auto px-4">
        <div className="text-lg font-semibold">
          <Link to={routes.home}>BetterX</Link>
        </div>

        <div className="flex items-center gap-4">
          <Navigation />

          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
