import { GetServerSideProps } from "next/types";
import React from "react";
import Details from "../../components/event/Details";
import { _Event } from "../../components/event/types";

type Props = {
  eventCode: string;
};

function code(props: Props) {
  return <Details eventCode={props.eventCode} />;
}

export default code;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const eventCode = ctx.query.eventCode && ctx.query.eventCode[0];

  return {
    props: {
      eventCode: eventCode,
    },
  };
};
