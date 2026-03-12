import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./LandingPage";
import "./App.css";
import HomePage from "./HomePage";
import Dashboard from "./Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<Navigate to="/login.html" replace />}
        />
        <Route
          path="/sign-in"
          element={<Navigate to="/sign_in.html" replace />}
        />
        <Route
          path="/forgot-password"
          element={<Navigate to="/forgot_password.html" replace />}
        />
        <Route
          path="/verify-otp"
          element={<Navigate to="/verify_otp.html" replace />}
        />
        <Route
          path="/reset-password"
          element={<Navigate to="/reset_password.html" replace />}
        />
        {/* keep root showing static login */}
        {/* React landing page */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
// ...existing code...
