import { useAdminContext } from "../../contexts/userContext";
import { LogOut } from "lucide-react";
import AnimatedShinyText from "../design/ShinyText";
import { Link } from "react-router-dom";

export const Header = () => {
  const { onLogout } = useAdminContext();
  return (
    <div className="w-full flex items-center justify-center px-12 py-6 font-montserrat">
      <Link to="/">
        <AnimatedShinyText className="flex-1 text-3xl text-start tracking-wider relative group cursor-pointer">
          ChicEth
        </AnimatedShinyText>
      </Link>
      <div className="flex-1 flex items-center gap-16 justify-end">
        <Link to="/order" className="relative group">
          <p className="cursor-pointer tracking-wider">
            Vos commandes
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-500 ease-in-out group-hover:w-full"></span>
          </p>
        </Link>
        <p
          onClick={onLogout}
          className="relative flex items-center justify-center gap-2 text-lg cursor-pointer group"
        >
          Logout <LogOut className="w-4 h-4" />
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-500 ease-in-out group-hover:w-full"></span>
        </p>
      </div>
    </div>
  );
};
