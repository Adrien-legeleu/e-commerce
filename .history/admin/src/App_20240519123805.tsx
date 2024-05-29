import { BrowserRouter } from "react-router-dom";
import { AdminContextProvider } from "./contexts/userContext";
import { Router } from "./Router";

const App = () => {
  return (
    <AdminContextProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AdminContextProvider>
  );
};

export default App;
