import { useAdminContext } from "../../contexts/userContext";

export const Header = () => {
  const { onLogout } = useAdminContext();
  return (
    <div className="w-full flex items-center justify-start px-12 py-6">
      <h1 className="flex-1 text-3xl">E-commerce</h1>
      <h2 className="flex-1 text-2xl">Admin</h2>
      <button className="flex-1 text-xl" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};
