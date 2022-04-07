import React, { useEffect } from "react";
import { DocumentData } from "firebase/firestore";
import { EventInfo } from "./types";
import { useRouter } from "next/router";
import { eventsCollection } from "../../firebase/collections";
import { doc, getDoc } from "firebase/firestore";
import { useFirestoreDocumentData } from "@react-query-firebase/firestore";
import { EVENTS } from "../../constants";
import { AiOutlineLoading } from "react-icons/ai";
import { useWithAuth } from "../../hooks";

type Props = {
  eventCode: string;
};

function Details(props: Props) {
  const router = useRouter();
  const pathname = "/details/" + props.eventCode;
  useWithAuth(pathname);
  const eventRef = doc(eventsCollection, props.eventCode);
  const { data: eventData } = useFirestoreDocumentData<
    DocumentData | EventInfo
  >([EVENTS, props.eventCode], eventRef);
  useEffect(() => {
    console.log(eventData);
  });
  return eventData ? (
    <div className="flex mx-auto pt-8 md~pt-16 flex-col font-mono gap-4 justify-evenly items-center w-full md~w-3/5">
      <h1 className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 capitalize mb-4 font-sans font-bold">
        {eventData!.name}
      </h1>
      <h2 className="text-3xl capitalize">Location ~ {eventData!.location}</h2>
      <h2 className="text-3xl capitalize">Date ~ {eventData!.date}</h2>
      <h2 className="text-3xl capitalize">Time ~ {eventData!.time}</h2>
      <h2 className="text-3xl capitalize">
        Duration ~ {eventData!.duration} Hours
      </h2>
      <button
        className="p-4 md:w-56 rounded-md text-lg capitalize shadow-sm shadow-slate-500 my-4 font-sans bg-blue-600"
        onClick={() => {
          router.push(`/e/${eventData!.code}`);
        }}
      >
        Join
      </button>
    </div>
  ) : (
    <AiOutlineLoading />
  );
}

export default Details;
