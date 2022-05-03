import React from "react";
import JoinEvent from "../components/JoinEvent";
import Login from "../components/auth/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/client";
import { NextPage } from "next";
import { useWithAuth } from "../hooks";
import { useRouter } from "next/router";

type Props = {};

const Join: NextPage = ({}: Props) => {
    const router = useRouter();
  useWithAuth(router.pathname)
  const [user, loading] = useAuthState(auth);
  return <JoinEvent /> ;
};

export default Join;
