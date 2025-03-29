import { Button } from "@/components/ui/button";
import useAuth from "@/context/useAuth";
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

  const { user } = useAuth();
  return (
    <div>
      <div className="flex gap-2 items-center text-xl">
        <span>Hello</span>
        <span className="font-semibold">{user?.username}</span>
      </div>
      <div className="flex gap-2 items-center ">
        <Button onClick={() => toast("Hei")}>Hei</Button>
        <Button onClick={handleLogOutButton} variant={"destructive"}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
