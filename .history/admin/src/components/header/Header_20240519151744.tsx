import { useAdminContext } from "../../contexts/userContext";

export const Header = () => {
  const { onLogout } = useAdminContext();
  return (
    <div className="w-full flex items-center justify-between px-12 py-6">
      <h1 className="flex-1 text-3xl">E-commerce</h1>
      <h2 className="flex-1 text-3xl">Admin</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};
