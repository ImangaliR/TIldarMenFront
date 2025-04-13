import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./utils/contexts/UserContext";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <ToastContainer position="top-right" autoClose={3000} />
          <AppRoutes />
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
