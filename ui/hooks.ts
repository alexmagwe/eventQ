import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ControlledInputType } from "./components/event/types";
import { auth } from "./firebase/client";
export const useControlledInput: any = (): ControlledInputType => {
  const [value, setValue] = useState("");
  const handleChange: any = (e) => {
    setValue(e.target.value);
  };
  return { handleChange, value };
};
export const useWithAuth = (pageRoute: string) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user)
      router.push({ pathname: "/login", query: { next: pageRoute } });
  }, [user, loading, router, pageRoute]);
};
