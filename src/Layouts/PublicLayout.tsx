import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "../components/ThemeProvider";

const PublicLayout = () => {
  const theme = localStorage.getItem("vite-ui-theme");
  

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Navbar />
      <Outlet />
      <Toaster invert={theme === "dark"} />
      <footer>Public Footer</footer>
    </ThemeProvider>
  );
};

export default PublicLayout;
