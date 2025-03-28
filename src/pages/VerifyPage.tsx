import AuthSubmitButton from "@/components/SubmitButtons/AuthSubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserForm } from "@/utils";
import { FormEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";

const Authentification = () => {
  const [identifier, setIdentifier] = useState<string | null>("");
  const [erorrs, setErorrs] = useState({
    email: "",
    otp: "",
    server: "",
  });

  useEffect(() => {
    const identifierFromLocal = sessionStorage.getItem("email");
    if (!identifierFromLocal) {
      location.replace("login");
    }
    setIdentifier(identifierFromLocal);
  }, [identifier]);

  const handleSendOtp: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { identifier, otp } = Object.fromEntries(
      formData.entries()
    ) as UserForm;
    if (!identifier || !otp) {
      setErorrs((prev) => {
        return { ...prev, email: "email harus diisi", otp: "OTP harus diisi" };
      });
      return;
    }

    try {
      const res = await fetch(
        import.meta.env.VITE_API_KEY +
          "/api/auth/user/authentification-user",
        {
          method: "POST",
          body: JSON.stringify({ identifier, otp }),
        }
      );

      if (!res.ok) {
        setErorrs((prev) => {
          return { ...prev, server: "Something went wrong" };
        });
        return;
      }
      const result = await res.json();

      if (result.errors) {
        setErorrs((prev) => {
          return { ...prev, server: result.errors };
        });
        return;
      } else {
        toast(
          "Akun anda berhasil di verifikasi,\nanda akan diarahkan ke halaman login!"
        );
        sessionStorage.removeItem("email");
        location.replace("/login");
      }
    } catch (err) {
      console.log((err as Error).message);
    }
  };

  const handleResendOtp: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    if (!email) {
      toast("Terjadi masalah \nsilahkan coba lagi beberapa saat");
      return;
    }
  };

  return (
    <Card className="w-1/2 mx-auto">
      <CardHeader>
        <CardTitle>Verified Your Account</CardTitle>
        <CardDescription>OTP code was Sent To your Email!</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSendOtp} className="">
          <div className="grid w-full items-center gap-4 space-y-4">
            <span className="text-red-500" hidden={!erorrs.server}>
              {erorrs.server}
            </span>
            <div hidden className="flex flex-col space-y-2">
              <Label htmlFor="identifier">Email</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                hidden
                placeholder="Your Email"
                defaultValue={identifier ?? ""}
              />
              <small className="text-red-500">{erorrs.email ?? ""}</small>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="otp">OTP</Label>
              <Input id="otp" name="otp" type="number" placeholder="Your OTP" />
              <small className="text-red-500">{erorrs.otp ?? ""}</small>
            </div>
            <AuthSubmitButton />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex gap-4 items-center">
        <span>Have no OTP?</span>
        <form onSubmit={handleResendOtp}>
          <div hidden className="flex flex-col space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="text"
              hidden={!!identifier}
              placeholder="Your Email"
              defaultValue={identifier ?? ""}
            />
            <small className="text-red-500">{erorrs.email ?? ""}</small>
          </div>
          <Button variant={"link"}>Resend OTP</Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default Authentification;
