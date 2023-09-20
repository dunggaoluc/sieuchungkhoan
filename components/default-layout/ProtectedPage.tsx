"use client";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../config";

interface IProps {
  children: any;
}

const ProtectedPageAdmin: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useAuthState(auth);
  const router = useRouter();

  React.useEffect(() => {
    if (sessionStorage == null) router.push("/");
    else {
      if (sessionStorage.getItem("user") != "admin@gmail.com") router.push("/");
    }
  }, [user, router]);

  return children;
};

export default ProtectedPageAdmin;
