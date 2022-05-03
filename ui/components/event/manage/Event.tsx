import React from "react";
import { EventInfo } from "../types";
import { DocumentData } from "firebase/firestore";
import {useRouter} from "next/router";
import { FiEdit2 } from "react-icons/fi";

type Props = {
  eventData: EventInfo | DocumentData;
};

const Event = (props: Props) => {
    const router=useRouter()
  const { eventData } = props;
  return (
    <li className="bg-gradient-to-tr font-mono rounded-xl w-max max-w-lg p-8 from-blue-600 to-blue-800 h-max flex flex-col gap-4">
      <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 capitalize mb-4 font-sans font-bold">
        {eventData!.name}
      </h1>
      <h2 className="text-3xl flex gap-4  justify-between capitalize">Venue ~ {eventData!.location}<span className="text-orange-400"><FiEdit2 size={20}/></span></h2>
      <h2 className="text-3xl flex gap-4 justify-between capitalize">Date ~ {eventData!.date}<span className="text-orange-400"><FiEdit2 size={20}/></span></h2>
      <h2 className="text-3xl flex gap-4 justify-between capitalize">Time ~ {eventData!.time}<span className="text-orange-400"><FiEdit2 size={20}/></span></h2>
      <h2 className="text-3xl flex gap-4  justify-between capitalize">Duration ~ {eventData!.duration} Hours<span className="text-orange-400"><FiEdit2 size={20}/></span></h2>
     
    </li>
  );
};

export default Event;
