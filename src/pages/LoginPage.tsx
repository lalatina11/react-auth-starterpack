import useAuth from "@/context/useAuth";
import { Link, Navigate } from "react-router-dom";

import LoginSubmitButton from "@/components/SubmitButtons/LoginSubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userNotVerifiedErrorMessage } from "@/lib/utils";
import { UserForm } from "@/utils";
import { FormEventHandler, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isError, setIsError] = useState({
    identifier: "",
    password: "",
  });

  const [errorBack, setErrorBack] = useState<string | boolean>(false);

  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to={"/"} />;

  const handleRegister: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { identifier, password } = Object.fromEntries(
      formData.entries()
    ) as UserForm;

    if (!identifier || identifier.trim() === "" || identifier.length < 6) {
      setIsError((prev) => {
        return {
          ...prev,
          identifier: "Email atau Username harus diisi mimimal 6 karakter",
        };
      });
    } else if (!password || password.trim() === "" || password.length < 6) {
      setIsError((prev) => {
        return { ...prev, password: "Password harus diisi mimimal 6 karakter" };
      });
    } else {
      const res = await fetch(
        import.meta.env.VITE_API_KEY + "/api/auth/user/login",
        {
          method: "POST",
          body: JSON.stringify({ identifier, password }),
          credentials: "include",
        }
      );
      const result = await res.json();
      if (!res.ok || result.error === userNotVerifiedErrorMessage) {
        sessionStorage.setItem("email", identifier);
        toast(result.error);
        location.replace("/verify-otp");
      } else if (!res.ok || result.error) {
        setErrorBack(result.error);
      } else {
        // setCookie("user_token", result.token, {
        //   expires: 1000 * 60 * 60 * 24 * 7,
        //   path: "/",
        // });
        toast("Login berhasil,\n anda akan diarahkan ke home page!");
        setTimeout(() => {
          location.replace("/");
        }, 1500);
        localStorage.removeItem("email");
      }
    }
  };

  return (
    <Card className="w-1/2 mx-auto mb-10">
      <CardHeader>
        <CardTitle>Login into Your Account</CardTitle>
        <CardDescription>
          Don&apos;t have an Account?{" "}
          <Link className={"text-blue-400"} to={"/register"}>
            Register Here
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="">
          <div className="grid w-full items-center gap-4 space-y-4">
            <span hidden={!isError} className="text-red-500">
              {errorBack ?? null}
            </span>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="identifier">Email atau Username</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="Your identifier"
              />
              <small hidden={!isError} className="text-red-500">
                {isError.identifier ?? null}
              </small>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type={isShowPassword ? "text" : "password"}
                placeholder="Your Password"
              />
              <small hidden={!isError} className="text-red-500">
                {isError.password ?? null}
              </small>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isShowPassword"
                onCheckedChange={(check) => setIsShowPassword(!!check)}
              />
              <label
                htmlFor="isShowPassword"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show Password
              </label>
            </div>
            <LoginSubmitButton />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex gap-4 items-center">
        <span>or Login with</span>
        <Button
          onClick={() => {
            window.location.href =
              import.meta.env.VITE_API_KEY + "/api/auth/user/google";
          }}
        >
          Google
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
