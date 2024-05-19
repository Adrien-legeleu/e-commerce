import { useAdminContext } from "../contexts/userContext";

export const Home = () => {
  const { onLogout } = useAdminContext(); // Call the hook correctly
  return (
    <div>
      <h1>Bienvenue</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};
