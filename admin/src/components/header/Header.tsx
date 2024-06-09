import { useAdminContext } from "../../contexts/userContext";
import { LogOut } from "lucide-react";
import AnimatedShinyText from "../design/ShinyText";

export const Header = () => {
  const { onLogout } = useAdminContext();
  return (
    <div className="w-full flex 3 items-center  justify-center px-12  py-6 ">
      <AnimatedShinyText className="flex-1 text-3xl text-start tracking-wider">
        ChicEth
      </AnimatedShinyText>
      <div className="flex-1 flex items-center justify-end">
        <p onClick={onLogout} className="flex gap-2 text-lg">
          Logout <LogOut />
        </p>
      </div>
    </div>
  );
};
