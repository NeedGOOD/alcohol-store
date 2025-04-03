import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./authprovider";
// import ProtectedRoute from "./protectedRoot";

import Header from "./components/addHeader";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes></Routes>
      {/* <Footer /> */}
    </Router>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
