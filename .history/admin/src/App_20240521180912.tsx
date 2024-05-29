import { BrowserRouter } from "react-router-dom";
import { AdminContextProvider } from "./contexts/userContext";
import { Router } from "./Router";
import { ProductAdminContextProvider } from "../../.history/admin/src/contexts/productAdminContext_20240521180830";

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
