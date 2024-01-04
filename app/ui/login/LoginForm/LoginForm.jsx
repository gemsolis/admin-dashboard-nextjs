"use client";

import { authenticate } from "@/app/lib/actions";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);
  return (
    <form action={formAction} className="single-form flex flex-col">
      <input type="text" placeholder="Username" name="username" />
      <input type="password" placeholder="Password" name="password" />
      <button className="bg-green-600 py-3 rounded-sm">Login</button>
      <span className="text-red-600 mt-10">{state && state}</span>
    </form>
  );
};

export default LoginForm;
