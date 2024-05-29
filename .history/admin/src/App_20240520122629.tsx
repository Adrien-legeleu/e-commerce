import { BrowserRouter } from "react-router-dom";
import { AdminContextProvider } from "./contexts/userContext";
import { Router } from "./Router";
import "react-toastify/dist/ReactToastify.css";

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
