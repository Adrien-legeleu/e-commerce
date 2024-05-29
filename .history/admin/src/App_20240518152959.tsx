import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { UserContextProvider } from "./contexts/userContext";

const App = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default App;
