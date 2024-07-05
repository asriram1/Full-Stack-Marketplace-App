import React, { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={
        (pending ? "bg-gray-400 " : " bg-blue-600 ") +
        "mt-2 text-white px-4 py-2 rounded-xl"
      }
    >
      {pending && <span>Saving...</span>}
      {!pending && <span>{children}</span>}
    </button>
  );
}
