import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import IsLogin from "./auth/IsLogin";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <IsLogin>
              <Dashboard />
            </IsLogin>
          }
        />
        <Route
          path="/history"
          element={
            <IsLogin>
              <History />
            </IsLogin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
