import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const HomePage = () => {
  const handleLogOutButton = async () => {
    await fetch(import.meta.env.VITE_API_KEY + "/api/auth/user/logout", {
      method: "POST",
      credentials: "include",
    });
    toast("Logout Success");
    setTimeout(() => {
      location.replace("/login");
    }, 1500);
  };
  return (
    <div>
      <h1>Home</h1>
      <div className="flex gap-2 items-center ">
        <Button onClick={() => toast("Hei")}>Hei</Button>
        <Button onClick={handleLogOutButton}>Logout</Button>
      </div>
    </div>
  );
};

export default HomePage;
