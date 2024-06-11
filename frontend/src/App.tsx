import { BrowserRouter } from "react-router-dom";
import { RouterApp } from "./Router/RouterApp";
import { HeaderContextProvider } from "./contexts/HeaderContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <HeaderContextProvider>
      <BrowserRouter>
        <RouterApp />
        <ToastContainer />
      </BrowserRouter>
    </HeaderContextProvider>
  );
};

export default App;
