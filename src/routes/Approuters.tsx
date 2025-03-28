import ProtectedLayout from "@/Layouts/ProtectedLayout";
import PublicLayout from "@/Layouts/PublicLayout";
import { lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Lazy Load Pages
const Home = lazy(() => import("../pages/HomePage"));
const Login = lazy(() => import("../pages/LoginPage"));
const Register = lazy(() => import("../pages/RegisterPage"));
const NotFound = lazy(() => import("../pages/NotFound"));
const VerifyPage = lazy(() => import("../pages/VerifyPage"));

const AppRouters = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyPage />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouters;
