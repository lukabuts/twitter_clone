import { Link } from "react-router-dom";
import { routes } from "@/routes";
import { ModeToggle, Navigation } from "./components";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between p-4 border-b sticky top-0 z-50 backdrop-blur-2xl">
      <div className="text-lg font-semibold">
        <Link to={routes.home}>MyApp</Link>
      </div>

      <div className="flex items-center gap-4">
        <Navigation />

        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
