import useAuth from "@/context/useAuth";
import { Link, Navigate } from "react-router-dom";

import { FormEventHandler, useState } from "react";
import { toast } from "sonner";
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
import RegisterSubmitButton from "@/components/SubmitButtons/RegisterSubmitButton";
import { UserForm, validateEmail } from "@/utils";
import AuthOption from "@/components/AuthOption";

const RegisterPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isError, setIsError] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errorBack, setErrorBack] = useState<string | boolean>(false);

  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to={"/"} />;

  const handleRegister: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, username, password } = Object.fromEntries(
      formData.entries()
    ) as UserForm;

    const validEmail = validateEmail(email);

    if (!username || username.trim() === "" || username.length < 6) {
      setIsError((prev) => {
        return { ...prev, username: "Username harus diisi mimimal 6 karakter" };
      });
    } else if (!password || password.trim() === "" || password.length < 6) {
      setIsError((prev) => {
        return { ...prev, password: "Password harus diisi mimimal 6 karakter" };
      });
    } else if (
      !email ||
      email.trim() === "" ||
      email.length < 6 ||
      !validEmail
    ) {
      setIsError((prev) => {
        return {
          ...prev,
          email: "Email harus valid dan diisi mimimal 6 karakter",
        };
      });
    } else {
      const res = await fetch(
        import.meta.env.VITE_API_KEY + "/api/auth/user/register",
        {
          method: "POST",
          body: JSON.stringify({ email, password, username }),
        }
      );
      const result = await res.json();
      if (!res.ok || result.error) {
        setErrorBack(result.error);
      } else {
        sessionStorage.setItem("email", email);
        toast(
          "Registrasi berhasil,\n silahkan masukkan kode OTP yang dikirimkan ke email " +
            email
        );
        location.replace("/verify-otp");
      }
    }
  };

  return (
    <Card className="w-1/2 mx-auto mb-10">
      <CardHeader>
        <CardTitle>Register Your Account</CardTitle>
        <CardDescription>
          Have an Account?{" "}
          <Link className={"text-blue-400"} to={"/login"}>
            Login Here
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
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Your Username"
              />
              <small hidden={!isError} className="text-red-500">
                {isError.username ?? null}
              </small>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
              />
              <small hidden={!isError} className="text-red-500">
                {isError.email ?? null}
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
            <RegisterSubmitButton />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 items-center">
        <div className="flex justify-between items-center gap-6 w-full">
          <div className="bg-zinc-500 h-[1px] w-full" />
          <span className="text-nowrap">or Login with</span>
          <div className="bg-zinc-500 h-[1px] w-full" />
        </div>
        <AuthOption />
      </CardFooter>
    </Card>
  );
};

export default RegisterPage;
