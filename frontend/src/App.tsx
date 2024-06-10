import { BrowserRouter } from "react-router-dom";
import { RouterApp } from "./Router/RouterApp";
import { HeaderContextProvider } from "./contexts/HeaderContext";

const App = () => {
  return (
    <HeaderContextProvider>
      <BrowserRouter>
        <RouterApp />
      </BrowserRouter>
    </HeaderContextProvider>
  );
};

export default App;
