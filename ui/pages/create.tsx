import React from "react";
import { NextPage } from "next";
import CreateEvent from "../components/event/CreateEvent";
import { useWithAuth } from "../hooks";
import { useRouter } from "next/router";

type Props = {};

const Create: NextPage = (props: Props) => {
  const router = useRouter();
  useWithAuth(router.pathname);
  return (
    <div>
      <CreateEvent />
    </div>
  );
};
export default Create;
