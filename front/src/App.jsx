import AppRoutes from "./AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./utils/contexts/UserContext";
import { WebSocketProvider } from "./utils/contexts/WebSocketContext";

function App() {
  return (
    <>
      <UserProvider>
        <WebSocketProvider>
          <Router>
            <ToastContainer position="top-right" autoClose={3000} />
            <AppRoutes />
          </Router>
        </WebSocketProvider>
      </UserProvider>
    </>
  );
}

export default App;
