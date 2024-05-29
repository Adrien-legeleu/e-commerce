import { useAdminContext } from "../../contexts/userContext";

export const Header = () => {
  const { onLogout } = useAdminContext();
  return (
    <div className="w-full flex 3 items-center  justify-center px-12  py-6">
      <h1 className="flex-1 text-3xl text-start">E-commerce</h1>
      <h2 className="flex-1 text-center text-2xl">Admin</h2>
      <div className="flex-1 flex items-center justify-center">
        <button
          className=" rounded-full bg-slate-100 text-xl py-3"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
