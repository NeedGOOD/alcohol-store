import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./authprovider";
// import ProtectedRoute from "./protectedRoot";

import Header from "./components/addHeader";
import Home from "./components/addHomePage";
import Footer from "./components/addFooter";
import Catalog from "./components/addCatalogPage"

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        {/* <Route path="/product/:id" element={<Product />} /> */}
        {/* <Route path="/cart" element={<Cart />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/order" element={<Order />} /> */}
        {/* <Route path="/profile" element={<Profile />} />*/}
      </Routes>
      <Footer />
    </Router>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
