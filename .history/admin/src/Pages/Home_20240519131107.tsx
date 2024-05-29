import { useAdminContext } from "../contexts/userContext";

export const Home = () => {
  const { onLogout } = useAdminContext;
  return (
    <div>
      <h1>Bienvenue</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};
