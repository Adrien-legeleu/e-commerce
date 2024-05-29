import { useAdminContext } from "../../contexts/userContext";

export const Header = () => {
  const { onLogout } = useAdminContext();
  return (
    <div>
      <h1>E-commerce</h1>
      <h2>Admin</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};
