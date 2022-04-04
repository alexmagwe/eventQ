import React, { useEffect, useState } from "react";
import QnA from "./qna/QnA";
import { _Event } from "./types";
import { eventContext } from "../../context";
import { EVENTS, MEMBERS, QUESTIONS } from "../../constants";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  QueryDocumentSnapshot,
  setDoc,
} from "firebase/firestore";
import {
  useFirestoreDocumentData,
  useFirestoreQuery,
} from "@react-query-firebase/firestore";
import { db, auth } from "../../firebase/client";

import { eventsCollection } from "../../firebase/collections";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import AskForm from "./qna/askForm";
type Props = {
  eventCode: string;
};

function Main(props: Props) {
  const [members, setMembers] = useState<QueryDocumentSnapshot<DocumentData>[]>(
    []
  );
  const [questions, setQuestions] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const eventRef = doc(eventsCollection, props.eventCode);
  const { data: eventData } = useFirestoreDocumentData(
    [EVENTS, props.eventCode],
    eventRef
  );
  useEffect(() => {
    let unsubscribeMembers: Function = () => {};
    let unsubscribeQuestions: Function = () => {};
    try {
      unsubscribeMembers = onSnapshot(
        collection(db, EVENTS, props.eventCode, MEMBERS),
        (snapshot) => {
          setMembers(snapshot.docs);
        }
      );
      unsubscribeQuestions = onSnapshot(
        collection(db, EVENTS, props.eventCode, QUESTIONS),
        (snapshot) => {
          setQuestions(snapshot.docs);
        }
      );
    } catch (err) {
      unsubscribeMembers();
      unsubscribeQuestions();
    }
  }, [props.eventCode]);

  useEffect(() => {
    if (!loading && !user)
      router.push({
        pathname: "/login",
        query: { next: "/e/" + props.eventCode },
      });
  }, [user, loading, router, props.eventCode]);

  useEffect(() => {
    if (!loading && user) {
      const memberRef = doc(db, EVENTS, props.eventCode, MEMBERS, user!.uid);
      try {
        setDoc(memberRef, { name: user.displayName });
      } catch (err) {
        console.error(err);
      }
      return () => {
        deleteDoc(memberRef);
      };
    }
  }, [loading, props.eventCode, user]);

  return (
    <eventContext.Provider
      value={{ info: eventData && eventData, questions: questions }}
    >
      <div className="p-2 md:px-12 relative h-full">
        {eventData && (
          <h1 className=" bg-clip-text text-transparent capitalize  bg-gradient-to-br from-purple-600 text-center font-bold to-cyan-400 text-5xl">
            {eventData && eventData.name}
          </h1>
        )}
        <div className="grid grid-cols-2 md:grid-cols-5  w-full h-full grid-rows-3 gap-4">
          <div className="row-span-1 md:row-span-3 col-span-1">
           <h2>
             Members online
            <span className=" text-6xl rounded-full text-green-400 ">.</span>
             </h2> 
            <ul className="flex flex-col gap-2 ">
              {members &&
                members.map((member, i) => (
                  <li key={i}>{member.data().name}</li>
                ))}
            </ul>
          </div>
          {questions && (
            <div className="row-span-2 col-span-2 md:col-span-4">
              <QnA />
            </div>
          )}
          <div className="  row-start-3  col-span-3 md:col-start-2 md:col-span-3">
          <AskForm />
          </div>
        </div>
      </div>
    </eventContext.Provider>
  );
}

export default Main;
