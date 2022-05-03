import React from "react";
import { GetServerSideProps } from "next";
import { auth } from "../../firebase/client";
import Main from "../../components/event";
type Props = {
  eventCode: string;
};

function event(props: Props) {
  return <Main eventCode={props.eventCode} />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
 
  const eventCode = ctx.query.eventCode && ctx.query.eventCode[0];
 
  return {
    props: {
      eventCode: eventCode,
    },
  };
};
export default event;
