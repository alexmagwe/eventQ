import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import {
  doc,
  getDocs,
  query,
  where,
  DocumentData,
  onSnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Event from "./Event";
import { auth, db } from "../../../firebase/client";
import { eventsCollection } from "../../../firebase/collections";
import { EventInfo } from "../types";
import { useWithAuth } from "../../../hooks";
import { useRouter } from 'next/router';

type Props = {};

function EventManagement({}: Props) {
  const [user, loading] = useAuthState(auth);
  const router=useRouter()
  useWithAuth(router.pathname)
  const [myEvents, setMyEvents] = useState<
    QueryDocumentSnapshot<DocumentData>[] | undefined
  >();
  useEffect(() => {
    if (!loading && user) {
      const myEventsQuery = query(
        eventsCollection,
        where("creator", "==", user!.uid)
      );
      const dataStream = onSnapshot(myEventsQuery, (snapshot) => {
        setMyEvents(snapshot.docs);
      });
    }
  },[loading, user]);
  return (
    <div>
      {myEvents&&myEvents!.length>0 ? (
        <ul className="p-12 flex gap-4 md:gap-8 flex-wrap">
          {myEvents?.map((event, i) => {
            return <Event key={i} eventData={event.data()} />;
          })}
        </ul>
      ) : (
        <div>
          <h1 className="text-6xl font-extrabold text-center m-4 pt-12">
            No events created
          </h1>
          <div className="p-4 lg:text-lg lg:px-8 w-56 bg-cyan-400  mx-auto hover:bg-cyan-300 hover:cursor-pointer shadow-slate-800 rounded-lg flex justify-center items-center">
            <Link href="/create" passHref>
              <a>Create Event</a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventManagement;
