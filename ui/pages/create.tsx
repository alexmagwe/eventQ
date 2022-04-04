import React from "react";
import { NextPage } from "next";
import CreateEvent from "../components/event/CreateEvent";

type Props = {};

const Create: NextPage = (props: Props) => {
  return (
    <div>
      <CreateEvent />
    </div>
  );
};
export default Create;
