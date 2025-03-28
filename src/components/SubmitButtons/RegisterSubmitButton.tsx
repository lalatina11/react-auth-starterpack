import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

const RegisterSubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending ? "Please wait" : "Register now"}
    </Button>
  );
};

export default RegisterSubmitButton;
