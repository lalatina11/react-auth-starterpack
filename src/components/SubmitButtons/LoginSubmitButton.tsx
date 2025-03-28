import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

const LoginSubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending ? "Please wait" : "Register now"}
    </Button>
  );
};

export default LoginSubmitButton;
