import { BrowserRouter } from "react-router-dom";
import { AdminContextProvider } from "./contexts/userContext";
import { Router } from "./Router";
import { ProductAdminContextProvider } from "./contexts/productAdminContext";

const App = () => {
  return (
    <AdminContextProvider>
      <ProductAdminContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ProductAdminContextProvider>
    </AdminContextProvider>
  );
};

export default App;
