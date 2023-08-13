import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { POHome } from "./pages/PurchaseOrders/POHome";
import { NavBar } from "./components/NavBar";
import { SuppliersHome } from "./pages/Suppliers/SuppliersHome";

const App = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/purchase-orders" element={<POHome />} />
          <Route path="/suppliers" element={<SuppliersHome />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
