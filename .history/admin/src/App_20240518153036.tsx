import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./contexts/userContext";
import { Router } from "./Router";

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
