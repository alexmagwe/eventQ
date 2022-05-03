import Link from "next/link";
import React from "react";
import { EventInfo } from "./event/types";
import { DocumentData } from 'firebase/firestore';

type Props = {
  currentEvent: EventInfo|DocumentData;
};

const CurrentEvent = (props: Props) => {
  const { currentEvent } = props;
  return (
    <div className=" mt-4 md:mt-8">
      <h1 className="text-2xl capitalize font-sans font-bold text-cyan-200 ">Recent events</h1>
      <Link href={`/e/${currentEvent.code}`} passHref>
        <div className="bg-slate-700 my-4 cursor-pointer w-max bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-8 py-8">
          <h1 className="text-2xl  capitalize font-bold font-sans">
            {currentEvent.name}
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default CurrentEvent;
