import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaApple, FaGithub } from "react-icons/fa";

const AuthOption = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
    <Button
      className="flex gap-2 items-center cursor-pointer"
      onClick={() => {
        window.location.href =
          import.meta.env.VITE_API_KEY + "/api/auth/user/google";
      }}
    >
      <FcGoogle />
      Google
    </Button>
    <Button
      className="flex gap-2 items-center cursor-pointer"
      onClick={() => {
        window.location.href =
          import.meta.env.VITE_API_KEY + "/api/auth/user/google";
      }}
    >
      <FaGithub />
      Github
    </Button>
    <Button
      className="flex gap-2 items-center cursor-pointer"
      onClick={() => {
        window.location.href =
          import.meta.env.VITE_API_KEY + "/api/auth/user/google";
      }}
    >
      <FaApple />
      Apple
    </Button>
  </div>  )
}

export default AuthOption