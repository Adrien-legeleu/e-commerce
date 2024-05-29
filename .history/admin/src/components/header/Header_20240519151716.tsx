import { useAdminContext } from "../../contexts/userContext";

export const Header = () => {
  const { onLogout } = useAdminContext();
  return (
    <div className="w-full flex items-center justify-between">
      <h1>E-commerce</h1>
      <h2>Admin</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};
