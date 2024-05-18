import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./contexts/userContext";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <AppRoutes />
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
