import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

const AuthSubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending ? "Please wait" : "Send OTP"}
    </Button>
  );
};

export default AuthSubmitButton;
