export function validateEmail(email: string | null | undefined) {
    if (email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    }
  }
  
  export interface UserForm {
    username?: string;
    email?: string;
    password?: string;
    otp?: string;
    verified?: boolean;
    verifiedOtp?: string;
    identifier?:string
  }