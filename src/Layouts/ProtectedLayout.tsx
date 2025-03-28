import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import useAuth from "@/context/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();
  const theme = localStorage.getItem("vite-ui-theme");

  return isAuthenticated ? (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Navbar />
      <Outlet />
      <Toaster invert={theme === "dark"} />
      <footer>Protected Footer</footer>
    </ThemeProvider>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedLayout;
